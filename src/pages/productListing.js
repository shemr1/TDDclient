import React, { useState, useEffect } from "react";
import ProductCard from "../components/productCard";

function ModernProductListing() {
  const [data, setData] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState({
    All: true,
    Cakes: false,
    Cookie: false,
    Muffins: false,
    Cupcakes: false,
    Doughnuts: false,
    Danishes: false,
    // Add other categories here
  });
  const [nameFilter, setNameFilter] = useState("");
  const [isLoading] = useState(true);

  const getProducts = async () => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setData(data.products.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(filteredProducts);

  useEffect(() => {
    filterProducts();
  }, [categoryFilters, nameFilter, data]);

  const handleCategoryChange = (category) => {
    setCategoryFilters({
      ...categoryFilters,
      [category]: !categoryFilters[category],
    });
  };

  const handleNameChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filterProducts = () => {
    const updatedFilteredProducts = data.filter((product) => {
      return (
        (categoryFilters["All"] || categoryFilters[product.category]) &&
        (!nameFilter ||
          product.name.toLowerCase().includes(nameFilter.toLowerCase()))
      );
    });

    setFilteredProducts(updatedFilteredProducts);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5 p-4">
        <div className="bg-gray-200 p-4 rounded">
          <div className="font-semibold mb-2">Filters</div>
          <div>
            <div className="block text-gray-600 mb-2">Category:</div>
            <div>
              {Object.keys(categoryFilters).map((category) => (
                <label key={category} className="block mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={categoryFilters[category]}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/4 p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-2 border rounded"
            onChange={handleNameChange}
            value={nameFilter}
          />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
          {isLoading && filteredProducts.length === 0 ? (
            <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
              <div className="h-48 rounded-t bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex-1 px-4 py-8 bg-gray-300 space-y-4 sm:p-8 dark:bg-gray-900">
                <div className="w-full h-6 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="w-full h-6 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="w-3/4 h-6 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
            
          ) : (
            filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ModernProductListing;
