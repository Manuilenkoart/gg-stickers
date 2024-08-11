import { cartMock } from 'app/lib/mock/cart';

export default function CartDetails() {
  return (
    <section>
      <h1>Your Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(cartMock).map((product) =>
            Object.values(product.size).map((size) => (
              <tr key={`${product.id}-${size.id}`}>
                <td>{`${product.name}, ${size.name}`}</td>
                <td>{size.quantity}</td>
                <td>{size.price.value}</td>
                <td>
                  <button>x</button>
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </section>
  );
}
