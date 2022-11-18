import CartProvider from "../Context/CartProvider";
import "../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = "https://ojotas-artesanales-dnzr00cts-joacoruarte.vercel.app/api"
 
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />;
    </CartProvider>
  )
}

export default MyApp;
