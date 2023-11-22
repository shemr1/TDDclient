import { CartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-slate-500 ring-opacity-10 max-w-sm"
      key={product.id}
    >
      <img className=" h-60 object-fill cursor-pointer" src={product.images[0]} alt="" onClick={()=>{
        navigate(`/product/${product.id}`)
      }}/>

      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 italic">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">
            {formatter.format(product.default_price.unit_amount / 100)}
          </span>
          <button
            className="bg-[#DFD7BF] hover:bg-[#3F2305] text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              addToCart(product);
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
