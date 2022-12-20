import React from "react";

export default function ModalTransition({ open, setOpen, children }) {
   return (
      <>
         <div
            onClick={() => setOpen(false)}
            className={`w-screen h-screen fixed bg-slate-600 inset-0 bg-opacity-50 ${
               open ? "opacity-1 z-[300]" : "opacity-0 -z-50"
            } transition-all`}
         ></div>
         <div
            className={`bg-white fixed sm:min-w-[30rem] min-h-[20rem] p-4 max-h-full ${open ? "opacity-1 z-[400]" : "opacity-0 -z-40"} top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transition-all`}
         >
            {children}
         </div>
      </>
   );
}
