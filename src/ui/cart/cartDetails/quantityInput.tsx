import { ProductCart, ProductSize } from '@/lib/definitions';
import { InputNumber } from '@/ui/components';
import { memo, useCallback } from 'react';

interface QuantityInputProps {
  sizeQuantity: number;
  sizeId: ProductSize['id'];
  productId: ProductCart['id'];
  onChange: ({
    productId,
    quantity,
    sizeId,
  }: {
    productId: ProductCart['id'];
    quantity: string;
    sizeId: ProductSize['id'];
  }) => void;
}

function QuantityInput({ onChange, productId, sizeId, sizeQuantity }: QuantityInputProps) {
  const handleChange = useCallback(
    (quantity: string) => onChange({ productId, quantity, sizeId }),
    [onChange, productId, sizeId],
  );

  return (
    <InputNumber
      label=""
      name="quantity"
      value={sizeQuantity}
      onChange={handleChange}
    />
  );
}
export default memo(QuantityInput);
