import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/config/routes';
import { ActionRow } from '@/shared/components/ActionRow';
import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { Panel, PanelHeader } from '@/shared/components/Panel';
import { TextDivider } from '@/shared/components/TextDivider';
import { TextField } from '@/shared/components/TextField';

import { GENERIC_ERROR_MESSAGE } from '../constants';
import { useProductValidation } from '../hooks/use-product-validation';
import { useWarrantyFlow } from '../hooks/use-warranty-flow';
import { serialNumberFormSchema, type SerialNumberFormValues } from '../schemas/product.schema';

import { ProductScanCard } from './ProductScanCard';
import { ProductSummaryCard } from './ProductSummaryCard';

/** Messages that guide the user while the label is scanned. */
const SHOW_SCAN_HINTS = true;

/** Step 2: identify the product by scanning or typing its code. */
export function ProductStep() {
  const navigate = useNavigate();
  const { state, dispatch } = useWarrantyFlow();
  const validation = useProductValidation();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    clearErrors,
    formState: { errors },
  } = useForm<SerialNumberFormValues>({
    resolver: zodResolver(serialNumberFormSchema),
    mode: 'onTouched',
    defaultValues: { serialNumber: '' },
  });

  const validateAndStore = async (code: string) => {
    const product = await validation.validate(code);
    if (product) dispatch({ type: 'product-validated', product });
  };

  // A new scan replaces whatever serial was typed or scanned before, along with its messages.
  const handleScanStart = () => {
    validation.reset();
    setValue('serialNumber', '');
    clearErrors('serialNumber');
  };

  const handleSerialDetected = (serialNumber: string) => {
    validation.reset();
    setValue('serialNumber', serialNumber);
    void validateAndStore(serialNumber);
  };

  const handleChangeProduct = () => {
    dispatch({ type: 'product-cleared' });
    validation.reset();
  };

  const isValidating = validation.state.status === 'validating';
  const isNotFound = validation.state.status === 'not-found';

  return (
    <Panel>
      <PanelHeader
        title="¿Qué producto vas a registrar?"
        description="Encuentras el número de serie en la etiqueta adherida al producto o en su empaque original."
      />

      {state.product ? (
        <div>
          <Alert tone="success">Producto identificado.</Alert>
          <ProductSummaryCard product={state.product} />
          <ActionRow>
            <Button variant="secondary" onClick={handleChangeProduct}>
              Cambiar producto
            </Button>
            <Button onClick={() => void navigate(ROUTES.warranty.invoice)}>Continuar</Button>
          </ActionRow>
        </div>
      ) : (
        <div>
          <ProductScanCard
            showHints={SHOW_SCAN_HINTS}
            onScanStart={handleScanStart}
            onSerialDetected={handleSerialDetected}
            onTypeInstead={() => setFocus('serialNumber')}
            disabled={isValidating}
          />
          <TextDivider>o ingrésalo a mano</TextDivider>

          <form
            noValidate
            onSubmit={(event) => {
              void handleSubmit((values) => validateAndStore(values.serialNumber))(event);
            }}
          >
            <TextField
              label="Número de serie"
              placeholder="Ej.: E01080086700730725"
              autoComplete="off"
              error={errors.serialNumber?.message}
              aria-invalid={isNotFound || errors.serialNumber ? true : undefined}
              onKeyDown={(event) => {
                if (event.key === ' ') event.preventDefault();
              }}
              onPaste={(event) => {
                event.preventDefault();
                const text = event.clipboardData.getData('text').replace(/\s+/g, '');
                const input = event.currentTarget;
                const start = input.selectionStart ?? input.value.length;
                const end = input.selectionEnd ?? input.value.length;
                const nextValue = input.value.slice(0, start) + text + input.value.slice(end);
                input.value = nextValue;
                input.setSelectionRange(start + text.length, start + text.length);
                input.dispatchEvent(new Event('input', { bubbles: true }));
              }}
              {...register('serialNumber')}
            />

            {isNotFound && <Alert tone="error">No encontramos un producto con ese código.</Alert>}
            {validation.state.status === 'error' && (
              <Alert tone="error">{GENERIC_ERROR_MESSAGE}</Alert>
            )}

            <ActionRow>
              <Button
                variant="secondary"
                onClick={() => void navigate(ROUTES.warranty.identification)}
              >
                Atrás
              </Button>
              <Button type="submit" loading={isValidating}>
                Validar producto
              </Button>
            </ActionRow>
          </form>
        </div>
      )}
    </Panel>
  );
}
