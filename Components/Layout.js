import Footer from "./Footer";
import Navbar from "./Navbar";
import s from "../styles/Layout.module.css";

export default function Layout({ children, home }) {
  return (
    <div className={s.containerLayout}>
      <Navbar />
      <main className={`w-full h-full pb-8`}>{children}</main>
      <Footer />
    </div>
  );
}
