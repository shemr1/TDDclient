import "./App.css";
import PaymentSuccess from "./pages/paymentSuccess";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import ModernProductListing from "./pages/productListing";
import HomePage from "./pages/home";
import ProductDetailsPage from "./pages/productDetails";
import ServicePage from "./pages/services";
import AboutPage from "./pages/about";
import ContactUsPage from "./pages/contact";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/products" element={<ModernProductListing />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
