import Footer from "./Footer";
import Navbar from "./Navbar";
import s from "../styles/Layout.module.css"


export default function Layout({children , home}) {
  return (
    <>
      <div className={s.containerLayout}>
        {/* CODIGO DE NAVBAR */}
        <Navbar home={home}/>
        <main className={`${home ? "my-10" : "mt-0"} flex-1 h-full`}>
          {children}
        </main>
      
        <Footer/>
      </div>
    </>
  )
}
