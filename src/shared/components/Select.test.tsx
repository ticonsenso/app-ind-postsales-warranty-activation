import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select, type SelectOption } from './Select';

const PROVINCES: SelectOption[] = [
  { value: 'azuay', label: 'Azuay' },
  { value: 'bolivar', label: 'Bolívar' },
  { value: 'guayas', label: 'Guayas' },
  { value: 'pichincha', label: 'Pichincha' },
];

function renderSelect(onSubmit = vi.fn()) {
  function Harness() {
    const [value, setValue] = useState('');
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Select
          label="Provincia"
          placeholder="Selecciona…"
          options={PROVINCES}
          value={value}
          onChange={setValue}
        />
      </form>
    );
  }
  render(<Harness />);
  return { trigger: screen.getByLabelText('Provincia') };
}

const searchBox = () => screen.getByRole('combobox', { name: 'Buscar provincia' });

describe('Select', () => {
  it('filters the options ignoring case and accents', async () => {
    const user = userEvent.setup();
    const { trigger } = renderSelect();

    await user.click(trigger);
    await user.type(searchBox(), 'BOLIVAR');

    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual(['Bolívar']);
  });

  it('picks the highlighted option with the keyboard without submitting the form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { trigger } = renderSelect(onSubmit);

    await user.click(trigger);
    await user.type(searchBox(), 'a');
    await user.keyboard('{ArrowDown}{Enter}');

    expect(trigger).toHaveTextContent('Bolívar');
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('says so when nothing matches', async () => {
    const user = userEvent.setup();
    const { trigger } = renderSelect();

    await user.click(trigger);
    await user.type(searchBox(), 'quito');

    expect(screen.getByRole('status')).toHaveTextContent('Sin resultados para «quito»');
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('closes with Escape keeping the previous value', async () => {
    const user = userEvent.setup();
    const { trigger } = renderSelect();

    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Guayas' }));
    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(trigger).toHaveTextContent('Guayas');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
