import React from "react";

const services = [
  {
    title: "Custom Cakes",
    description:
      "Order customized cakes for special occasions such as birthdays, weddings, and anniversaries. Choose from a variety of flavors and designs to suit your preferences.",
    image:
      "https://images.pexels.com/photos/8477963/pexels-photo-8477963.jpeg?auto=compress&cs=tinysrgb", // Replace with the actual image URL
  },
  {
    title: "Pastries and Desserts",
    description:
      "Indulge in a delightful selection of pastries and desserts. From flaky croissants to creamy eclairs, our pastries will satisfy your sweet cravings.",
    image:
      "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb", // Replace with the actual image URL
  },
  {
    title: "Catering Services",
    description:
      "Let us take care of your events with our catering services. We offer a wide range of savory and sweet treats to make your gathering memorable.",
    image:
      "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb", // Replace with the actual image URL
  },
  {
    title: "Online Ordering",
    description:
      "Convenience at your fingertips. Place your orders online and have our delicious pastries and cakes delivered to your doorstep.",
    image:
      "https://images.pexels.com/photos/6205525/pexels-photo-6205525.jpeg?auto=compress&cs=tinysrgb", // Replace with the actual image URL
  },
];

const ServicePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card transform transition-transform hover:-translate-y-2 shadow-md rounded-lg p-4"
          >
            <img
              src={service.image}
              alt={service.title}
              className="mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
