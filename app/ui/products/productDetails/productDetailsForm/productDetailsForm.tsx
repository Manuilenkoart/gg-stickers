'use client';

import { Product } from 'app/lib/definitions';

interface ProductDetailsFormProps {
  id: Product['id'];
}

export default function ProductDetailsForm({ id }: ProductDetailsFormProps) {
  console.log('ProductDetailsForm', id);

  return <div>form</div>;
}
