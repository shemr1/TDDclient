import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const getProduct = async (productid) => {
    fetch(`/product/${productid}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    // Perform data fetching based on productId
    getProduct(id);
  }, [id]);

  console.log(data);

  return !data ? (
    <div className="flex flex-col m-8 rounded shadow-md  animate-pulse h-96">
      <div className="h-48 rounded-t dark:bg-gray-700"></div>
      <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
        <div className="w-full h-6 rounded dark:bg-gray-700"></div>
        <div className="w-full h-6 rounded dark:bg-gray-700"></div>
        <div className="w-3/4 h-6 rounded dark:bg-gray-700"></div>
      </div>
    </div>
  ) : (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        {/* <h2>Product ID: {id}</h2> */}
        <img
          className="w-full"
          alt="img of a girl posing"
          src={data.product.images[0]}
        />
      </div>
      <div className="md:hidden">
        <img
          className="w-full"
          alt="img of a girl posing"
          src={data.product.images[0]}
        />
      </div>
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm leading-none text-gray-600">
            Muffins
          </p>
          <h1
            className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
          >
            {data.product.name}
          </h1>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Description</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600">
              {data.product.description}
            </p>
          </div>
        </div>

        <button
          className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
        >
          <PlusIcon className=" h-6 w-6 pr-2" />
          Add to Cart
        </button>
        <div>
          <p className="xl:pr-6 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
            Welcome to our digital wonderland of delectable delights! At our
            online pastry shop, we craft confections that dance on your taste
            buds like a sweet sonnet. From cupcakes that wear frosting crowns to
            cookies that reveal secrets with every bite, we're here to sprinkle
            a little extra magic into your day. Join us in this scrumptious
            adventure, where every click is a step closer to pastry paradise.
            Your cravings, our creations – let's bake life a little sweeter, one
            click at a time! 🍰🍪✨
          </p>
          <p className="text-base leading-4 mt-7 text-gray-600">
            Product Code: {data.product.id}
          </p>
         
          <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
            Composition: 100% flavour, inside: 100% made with love
          </p>
        </div>
        <div>
          <div className="border-t border-b py-4 mt-7 border-gray-200">
            <div
              onClick={() => setShow(!show)}
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="text-base leading-4 text-gray-800">
                Shipping and returns
              </p>
              <button
                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                aria-label="show or hide"
              >
                <svg
                  className={"transform " + (show ? "rotate-180" : "rotate-0")}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
                (show ? "block" : "hidden")
              }
              id="sect"
            >
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are nonrefundable
            </div>
          </div>
        </div>
        <div>
          <div className="border-b py-4 border-gray-200">
            <div
              onClick={() => setShow2(!show2)}
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="text-base leading-4 text-gray-800">Contact us</p>
              <button
                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                aria-label="show or hide"
              >
                <svg
                  className={"transform " + (show2 ? "rotate-180" : "rotate-0")}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
                (show2 ? "block" : "hidden")
              }
              id="sect"
            >
              If you have any questions on how to return your item to us,
              contact us.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
