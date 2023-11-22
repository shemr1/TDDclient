import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import PaymentModal from "../components/paymentModal";

export default function Cart({ showModal, toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);
  console.log(cartItems);
  const [showPayment, setShowPayment] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

  });
  const togglePay = () => {
    setShowPayment(!showPayment);
  };

  return (
    showModal && (
      <div className="flex-col flex items-center fixed inset-0 left-2/3 bg-white dark:bg-black border-2 gap-8  py-10  text-black dark:text-white font-normal uppercase text-sm">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="absolute right-16 top-10">
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto h-5/6 w-5/6 ">
          <ul className="flex flex-col divide-y divide-gray-700 mx-1">
            {cartItems.map((item) => (
              <li className="flex flex-col py-6 sm:flex-row sm:justify-between" key={item.id}>
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src={item.images[0]}
                    alt="Polaroid camera"
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leadi sm:pr-8">
                          {item.name}
                        </h3>
                        <p className="text-xs dark:text-gray-400">Quantity</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          {formatter.format(
                            item.default_price.unit_amount / 100
                          )}
                        </p>
                        <p className="text-xs  dark:text-gray-600">
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-sm divide-x">
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                        onClick={() => {
                          removeFromCart(item);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 space-x-1"
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length > 0 ? (
          <>
            <div className="space-y-1 text-right">
              <p>
                Total amount:
                <span className="font-semibold">
                  {formatter.format(getCartTotal() / 100)}
                </span>
              </p>
              <p className="text-sm dark:text-gray-400">
                Not including taxes and shipping costs
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border rounded-md dark:border-violet-400"
                onClick={clearCart}
              >
                <span className="sr-only sm:not-sr-only">Clear</span>
              </button>
              <button
                type="button"
                className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
                onClick={togglePay}
              >
                <span className="sr-only sm:not-sr-only">Checkout</span>
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )}
        <PaymentModal
          isOpen={showPayment}
          togglePay={togglePay}
          total={getCartTotal()}
        />
      </div>
    )
  );
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
};
