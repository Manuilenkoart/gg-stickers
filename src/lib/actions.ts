'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type CartSchemaState = {
  errors?: {
    id?: string[];
    quantity?: string[];
  };
  message?: string | null;
};

const CartSchema = z.object({
  id: z.string(),
  quantity: z.coerce.number({
    invalid_type_error: 'Please enter quantity.',
  }),
});

const AddToCartSchema = CartSchema.omit({ id: true });

export async function addToCart(id: string, prevState: CartSchemaState, formData: FormData) {
  const validatedFields = AddToCartSchema.safeParse({
    quantity: formData.get('quantity'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed add to Cart.',
    };
  }
  const { quantity } = validatedFields.data;

  console.log('addToCart', { id, quantity });
  // throw new Error('Failed to Update Cart');
  try {
    // request to DB
    revalidatePath(`/products/${id}`);
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Cart.' };
  }
}
