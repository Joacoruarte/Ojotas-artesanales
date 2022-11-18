import CartProvider from "../Context/CartProvider";
import "../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = process.env.URI;
 
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />;
    </CartProvider>
  )
}

export default MyApp;
