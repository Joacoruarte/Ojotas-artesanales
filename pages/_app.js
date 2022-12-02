import CartProvider from "../Context/CartContext/CartProvider";
import "../styles/globals.css";
import AuthProvider from "../Context/AuthProvider/AuthProvider";
 
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
