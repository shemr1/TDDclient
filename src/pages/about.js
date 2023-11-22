import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About Our Bakery</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-8">
          <img
            src="https://images.pexels.com/photos/6578891/pexels-photo-6578891.jpeg?auto=compress&cs=tinysrgb" // Replace with the actual image URL
            alt="Bakery Owner"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <p className="text-gray-600">
            Welcome to our small Jamaican pastries and bakery shop, where
            tradition meets passion. Our bakery is the result of a dream and a
            decade of experience in the art of baking, led by a young and
            talented UTECH graduate.
          </p>
          <p className="text-gray-600 mt-4">
            We take pride in serving you the flavors of Jamaica with every bite.
            Our menu includes a range of traditional Jamaican pastries as well
            as classic favorites that have been perfected over time.
          </p>
          <p className="text-gray-600 mt-4">
            At our bakery, we are committed to delivering the highest quality
            pastries and desserts that reflect our love for baking and the rich
            culinary heritage of Jamaica. Every pastry is made with care and
            dedication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
