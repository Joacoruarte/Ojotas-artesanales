import { useRouter } from "next/router";
import React, { useContext } from "react";
import AuthContext from "../../Context/AuthProvider/AuthContext";
import XIcon from "../../Icons/XIcon";

export default function SideBarModal({ setOpen }) {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  return (
    <div>
      <div className="flex items-center justify-between w-full h-10">
        <h2 className="font-bold text-[19px] font-montserrat">
          OJOTAS ARTESANALES
        </h2>
        <XIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      <hr className="bg-slate-500 w-full my-2" />

      <ul className="flex flex-col gap-8 text-lg mt-8 font-montserrat">
        <li
          onClick={() => {
            router.push("/");
            setOpen(false);
          }}
        >
          Inicio
        </li>
        <li
          onClick={() => {
            router.push("/contacto");
            setOpen(false);
          }}
        >
          Contacto
        </li>
        {!user?.token ? (
          <>
            <li
              onClick={() => {
                router.push("/login");
                setOpen(false);
              }}
            >
              Iniciar Sesion
            </li>
            <li
              onClick={() => {
                router.push("/register");
                setOpen(false);
              }}
            >
              Registrarse
            </li>
          </>
        ) : (
          <>
            <li>
              <hr className="bg-slate-500 w-full my-2" />
              <p>
                Ingreso como <b>{user.email}</b>
              </p>
              <hr className="bg-slate-500 w-full my-2" />
              {user.role === "ADMIN" && (
                <div
                  onClick={() => {
                    router.push("/dashboard");
                    setOpen(false);
                  }}
                >
                  <p>Panel Admin</p>
                  <hr className="bg-slate-500 w-full my-2" />
                </div>
              )}
            </li>
            <li
              onClick={() => {
                setOpen(false);
                localStorage.removeItem("user");
                setUser({});
              }}
            >
              Cerrar sesion
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
