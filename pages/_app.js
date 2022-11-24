import CartProvider from "../Context/CartContext/CartProvider";
import "../styles/globals.css";
import axios from "axios";
import AuthProvider from "../Context/AuthProvider/AuthProvider";


axios.defaults.baseURL = process.env.NODE_ENV === "production" ? process.env.URI : process.env.URI_DEVELOP;
 
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp;
