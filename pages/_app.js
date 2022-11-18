import CartProvider from "../Context/CartProvider";
import "../styles/globals.css";
import axios from "axios";


axios.defaults.baseURL = process.env.NODE_ENV === "production" ? process.env.URI : process.env.URI_DEVELOP;
 
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />;
    </CartProvider>
  )
}

export default MyApp;
