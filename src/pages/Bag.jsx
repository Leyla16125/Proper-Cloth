import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

function Bag() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const discount = 0;
  const shipping = cartItems.length > 0 ? 18 : 0;
  const total = subtotal - discount + shipping;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f7f7f7] px-5 py-10 md:px-14 lg:px-32">
      <h1 className="mb-10 text-[36px] md:text-[44px] italic font-light">
        Shopping Bag
      </h1>

      {cartItems.length === 0 ? (
        <section className="rounded-md bg-white px-8 py-16 text-center shadow-sm">
          <h2 className="text-2xl font-semibold">Your bag is empty</h2>

          <p className="mt-3 text-gray-500">
            Looks like you have not added anything to your bag yet.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-md bg-black px-8 py-4 text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <div className="hidden rounded-md bg-white px-7 py-5 text-sm uppercase tracking-[2px] text-gray-500 shadow-sm md:flex md:items-center md:justify-between">
              <span>Custom Orders</span>
              <span>Delivery in 2-3 days</span>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.variantId}
                className="rounded-md bg-white p-5 shadow-sm md:p-7"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  <Link
                    to={`/product/${item.slug}`}
                    className="flex h-44 w-full items-center justify-center bg-[#f3f3f3] md:h-48 md:w-40"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                      <div>
                        <Link to={`/product/${item.slug}`}>
                          <h2 className="text-[22px] font-semibold leading-7 hover:underline">
                            {item.title}
                          </h2>
                        </Link>

                        <p className="mt-3 text-sm uppercase tracking-wide text-gray-500">
                          {item.size && <span>{item.size}</span>}
                          {item.size && item.color && <span> | </span>}
                          {item.color && <span>{item.color}</span>}
                        </p>

                        <p className="mt-5 text-[18px] font-semibold">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex h-11 w-fit items-center overflow-hidden rounded-md border border-gray-300">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.variantId))}
                          className="h-full w-11 text-xl transition hover:bg-gray-100"
                        >
                          -
                        </button>

                        <span className="flex h-full w-12 items-center justify-center border-x border-gray-300">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => dispatch(increaseQuantity(item.variantId))}
                          className="h-full w-11 text-xl transition hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        onClick={() => dispatch(removeFromCart(item.variantId))}
                        className="text-sm text-gray-400 transition hover:text-black"
                      >
                        Remove
                      </button>

                      <p className="text-lg font-semibold">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-md bg-white p-7 shadow-sm">
            <h2 className="mb-7 text-2xl font-semibold">Order Summary</h2>

            <div className="space-y-5 text-[17px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Discount</span>
                <span>${discount.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            </div>

            <hr className="my-7 border-gray-200" />

            <div className="flex items-center justify-between text-[24px] font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="mt-8 h-16 w-full rounded-md bg-black text-sm font-bold uppercase tracking-[2px] text-white transition hover:bg-gray-800">
              Secure Checkout →
            </button>

            <Link
              to="/shop"
              className="mt-5 block text-center text-sm text-gray-500 underline-offset-4 hover:text-black hover:underline"
            >
              Continue Shopping
            </Link>
          </aside>
        </section>
      )}
    </main>
  );
}

export default Bag;