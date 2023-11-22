import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe('pk_test_51NSlijEGkXT5HRVhKo6NaiFwOzTBNj2ZSfi0GEhKeBzQQk6gMcB0FRL1zBPfDEpDICZ6A2HguaTZXMhpl5IQXMCQ00FPXvTP71');

export default function PaymentModal({ isOpen,togglePay, total }) {
  const { cartItems } = useContext(CartContext);
  let lineItems = cartItems.map(item =>({["price"]: item.default_price.id, ["quantity"] : item.quantity }))
  console.log(lineItems);
  const makePayment = async () => { 
    const stripe = await loadStripe("pk_test_51NSlijEGkXT5HRVhKo6NaiFwOzTBNj2ZSfi0GEhKeBzQQk6gMcB0FRL1zBPfDEpDICZ6A2HguaTZXMhpl5IQXMCQ00FPXvTP71"); 
    const body = { lineItems }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 
 
    const response = await fetch( 
      "http://localhost:5000/api/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
 
    const session = await response.json(); 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
 
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 

  return (
    isOpen && (
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
          <div className="w-full">
            <div className="m-8 my-20 max-w-[450px] mx-auto">
              <div className="mb-8">
                <h1 className="mb-4 text-4xl font-extrabold">
                  Payment Confirmation
                </h1>
                <p className="text-gray-600">
                  Continue with your purchase of ${total}
                </p>
              </div>
              <div className="space-y-4">
                <button className="p-3 bg-black rounded-full text-white w-full font-semibold"
                onClick={makePayment}
                >
                  Continue
                </button>
                <button className="p-3 bg-red-600 text-white border rounded-full w-full font-semibold"
                
                onClick={togglePay}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

PaymentModal.propTypes = {
    isOpen: PropTypes.bool,
    togglePay: PropTypes.func
  };
