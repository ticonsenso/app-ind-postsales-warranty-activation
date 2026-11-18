import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/config/routes';
import { ActionRow } from '@/shared/components/ActionRow';
import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { Panel, PanelHeader } from '@/shared/components/Panel';
import { Sheet } from '@/shared/components/Sheet';
import { TextDivider } from '@/shared/components/TextDivider';
import { TextField } from '@/shared/components/TextField';

import { GENERIC_ERROR_MESSAGE } from '../constants';
import { useProductValidation } from '../hooks/use-product-validation';
import { useSapCodeLookup } from '../hooks/use-sap-code-lookup';
import { useWarrantyFlow } from '../hooks/use-warranty-flow';
import {
  serialNumberFormSchema,
  type Product,
  type SerialNumberFormValues,
} from '../schemas/product.schema';

import { ProductScanCard } from './ProductScanCard';
import { ProductSummaryCard } from './ProductSummaryCard';
import { SapCodeForm } from './SapCodeForm';

/** Messages that guide the user while the label is scanned. */
const SHOW_SCAN_HINTS = true;

/** Step 2: identify the product by scanning or typing its code. */
export function ProductStep() {
  const navigate = useNavigate();
  const { state, dispatch } = useWarrantyFlow();
  const validation = useProductValidation();
  const sapLookup = useSapCodeLookup();
  // The product is searched by serial; when SAP does not know it, the user can switch to its SAP code.
  const [searchBy, setSearchBy] = useState<'serial' | 'sap-code'>('serial');
  const serialFormId = useId();
  const sapCodeFormId = useId();

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

  const storeProduct = (product: Product) => {
    dispatch({ type: 'product-validated', product });
  };

  const validateAndStore = async (code: string) => {
    const product = await validation.validate(code);
    if (product) storeProduct(product);
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
    sapLookup.reset();
    setSearchBy('serial');
  };

  const searchBySapCode = async (sapCode: string, serialNumber: string) => {
    const product = await sapLookup.lookup(sapCode, serialNumber);
    if (product) storeProduct(product);
  };

  // Going back to the serial keeps the typed serial and its "not found" notice.
  const handleBackToSerial = () => {
    sapLookup.reset();
    setSearchBy('serial');
  };

  // Closing the notice leaves the step ready to scan or type another serial.
  const handleCloseAlreadyRegistered = () => {
    validation.reset();
    setValue('serialNumber', '');
    clearErrors('serialNumber');
  };

  const isValidating = validation.state.status === 'validating';
  const isNotFound = validation.state.status === 'not-found';
  // Editing the serial discards the SAP code fallback, so a product is never stored with a serial
  // other than the one SAP did not recognize.
  const handleSerialChange = () => {
    if (isNotFound) validation.reset();
  };

  const isSapCodeSearch =
    !state.product && searchBy === 'sap-code' && validation.state.status === 'not-found';

  return (
    <Panel>
      <PanelHeader
        title="¿Qué producto vas a registrar?"
        description={
          isSapCodeSearch
            ? 'Encuentras el código SAP en la etiqueta adherida al producto o en su empaque original, junto al número de serie.'
            : 'Encuentras el número de serie en la etiqueta adherida al producto o en su empaque original.'
        }
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
      ) : searchBy === 'sap-code' && validation.state.status === 'not-found' ? (
        <div>
          <SapCodeForm
            id={sapCodeFormId}
            serialNumber={validation.state.serialNumber}
            lookupState={sapLookup.state}
            onSubmit={(sapCode) => {
              if (validation.state.status === 'not-found') {
                void searchBySapCode(sapCode, validation.state.serialNumber);
              }
            }}
          />
          <ActionRow>
            <Button variant="secondary" onClick={handleBackToSerial}>
              Atrás
            </Button>
            <Button
              type="submit"
              form={sapCodeFormId}
              loading={sapLookup.state.status === 'searching'}
            >
              Validar producto
            </Button>
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
            id={serialFormId}
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
              {...register('serialNumber', { onChange: handleSerialChange })}
            />

            {isNotFound && (
              <Alert tone="error">
                No encontramos un producto con ese número de serie.{' '}
                <button
                  type="button"
                  className="cursor-pointer font-semibold underline underline-offset-2"
                  onClick={() => setSearchBy('sap-code')}
                >
                  Buscar por código SAP
                </button>
              </Alert>
            )}
            {validation.state.status === 'error' && (
              <Alert tone="error">{GENERIC_ERROR_MESSAGE}</Alert>
            )}
          </form>

          <ActionRow>
            <Button
              variant="secondary"
              onClick={() => void navigate(ROUTES.warranty.identification)}
            >
              Atrás
            </Button>
            <Button type="submit" form={serialFormId} loading={isValidating}>
              Validar producto
            </Button>
          </ActionRow>
        </div>
      )}

      <Sheet
        open={validation.state.status === 'already-registered'}
        onClose={handleCloseAlreadyRegistered}
        title="Este producto ya fue registrado"
      >
        <Button onClick={handleCloseAlreadyRegistered}>Entendido</Button>
      </Sheet>
    </Panel>
  );
}
