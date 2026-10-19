import clsx from 'clsx';
import { Check, ChevronDown, CircleAlert, Search } from 'lucide-react';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type Ref,
} from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  hint?: string;
  error?: string | undefined;
  options: readonly SelectOption[];
  /** Shown in the trigger while nothing is selected. */
  placeholder?: string;
  /** Shown in the search box of the open list. */
  searchPlaceholder?: string;
  value: string;
  onChange: (value: string) => void;
  /** Called when the focus leaves the whole control (trigger and list), like a native blur. */
  onBlur?: () => void;
  disabled?: boolean;
  name?: string;
  /** Points to the trigger, so a form library can focus the field with an error. */
  ref?: Ref<HTMLButtonElement>;
  className?: string;
}

/** Case and accent insensitive, so "bolivar" finds "Bolívar". */
function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

/**
 * Labelled dropdown with a search box to filter its options. Sibling of `TextField`, same
 * conventions. Controlled: use it with `react-hook-form`'s `Controller`.
 *
 * Accessibility follows the WAI-ARIA combobox pattern: the search box is the combobox, the arrow
 * keys move through the filtered options, Enter picks one and Escape closes the list.
 */
export function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  searchPlaceholder = 'Buscar…',
  value,
  onChange,
  onBlur,
  disabled,
  name,
  ref,
  className,
}: SelectProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const valueId = `${id}-value`;
  const listboxId = `${id}-listbox`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const describedBy = clsx(hint && hintId, error && errorId) || undefined;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = options.find((option) => option.value === value);
  const normalizedQuery = normalize(query);
  const filtered = normalizedQuery
    ? options.filter((option) => normalize(option.label).includes(normalizedQuery))
    : options;

  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    listboxRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, activeIndex]);

  // A tap outside closes the list without picking anything.
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const open = () => {
    setQuery('');
    setActiveIndex(selected ? options.indexOf(selected) : 0);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const pick = (option: SelectOption) => {
    if (option.value !== value) onChange(option.value);
    close();
  };

  const setTriggerRef = (element: HTMLButtonElement | null) => {
    triggerRef.current = element;
    if (typeof ref === 'function') ref(element);
    else if (ref) ref.current = element;
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      open();
    }
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case 'Enter': {
        // Inside a form, Enter would submit it.
        event.preventDefault();
        const option = filtered[activeIndex];
        if (option) pick(option);
        break;
      }
      case 'Escape':
        event.preventDefault();
        close();
        break;
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (containerRef.current?.contains(event.relatedTarget)) return;
    setIsOpen(false);
    onBlur?.();
  };

  return (
    <div ref={containerRef} className={clsx('mb-[18px]', className)} onBlur={handleBlur}>
      <label id={labelId} htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <button
          ref={setTriggerRef}
          id={id}
          type="button"
          name={name}
          value={value}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-describedby={describedBy}
          onClick={() => (isOpen ? setIsOpen(false) : open())}
          onKeyDown={handleTriggerKeyDown}
          className={clsx(
            'flex w-full items-center justify-between gap-2 rounded-field border-[1.5px] bg-white px-[15px] py-[13px] text-left font-sans text-base text-ink focus:border-accent focus:ring-3 focus:ring-accent/20 focus:outline-hidden disabled:bg-muted disabled:text-ink-muted',
            error ? 'border-danger' : 'border-line',
          )}
        >
          <span id={valueId} className={clsx('truncate', !selected && 'text-ink-muted')}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown
            aria-hidden
            className={clsx(
              'size-5 shrink-0 text-ink-muted transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-field border-[1.5px] border-line bg-white shadow-lg">
            <div className="relative border-b border-line">
              <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-[15px] size-4 -translate-y-1/2 text-ink-muted"
              />
              <input
                ref={searchRef}
                type="text"
                role="combobox"
                aria-label={`Buscar ${label.toLowerCase()}`}
                aria-expanded
                aria-controls={listboxId}
                aria-autocomplete="list"
                aria-activedescendant={filtered[activeIndex] ? optionId(activeIndex) : undefined}
                autoComplete="off"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-transparent py-3 pr-[15px] pl-10 font-sans text-base text-ink placeholder:text-ink-muted focus:outline-hidden"
              />
            </div>
            {filtered.length > 0 ? (
              <ul
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-labelledby={labelId}
                // Keeps the focus in the search box while an option is clicked or tapped.
                onMouseDown={(event) => event.preventDefault()}
                className="max-h-60 overflow-y-auto py-1"
              >
                {filtered.map((option, index) => {
                  const isSelected = option.value === value;
                  const isActive = index === activeIndex;
                  return (
                    // The keyboard drives the options from the search box (aria-activedescendant).
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <li
                      key={option.value}
                      id={optionId(index)}
                      role="option"
                      aria-selected={isSelected}
                      data-active={isActive}
                      onClick={() => pick(option)}
                      onMouseMove={() => setActiveIndex(index)}
                      className={clsx(
                        'flex cursor-pointer items-center justify-between gap-2 px-[15px] py-2.5 text-base text-ink',
                        isActive && 'bg-accent/10',
                        isSelected && 'font-semibold',
                      )}
                    >
                      {option.label}
                      {isSelected && <Check aria-hidden className="size-4 shrink-0 text-accent" />}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p id={listboxId} role="status" className="px-[15px] py-3 text-sm text-ink-muted">
                Sin resultados para «{query.trim()}»
              </p>
            )}
          </div>
        )}
      </div>

      {hint && (
        <p id={hintId} className="mt-1.5 text-[13px] font-light text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-[7px] flex items-start gap-2 text-sm text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
