import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useRef } from "react";
import s from "../styles/Carousel.module.css";

export default function Carousel({ product }) {
   const rowRef = useRef(null);
   const handleClick = (direction) => {
      if (rowRef.current) {
         const { scrollLeft, clientWidth } = rowRef.current;
         const scrollTo =
            direction === "left"
               ? scrollLeft - clientWidth
               : scrollLeft + clientWidth;

         rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
   };
   return (
      <>
         <div className={s.containerImage}>
            <ChevronLeftIcon
                onClick={() => handleClick("left")}
                className="sm:opacity-0 cursor-pointer duration-200 transition-all sm:block hidden sm:absolute z-10 w-14 h-14 sm:left-0 sm:bottom-[50%] sm:top-[40%]"
            />

            <div ref={rowRef} className={s.carrousel}>
               {product.img.map((img, index) => (
                  <div key={index}>
                     <Image
                        src={img}
                        alt={product.alt}
                        layout="fill"
                        objectFit="cover"
                     />
                  </div>
               ))}
            </div>
            <ChevronRightIcon
                onClick={() => handleClick("right")}
                className="sm:opacity-0 cursor-pointer duration-200 transition-all sm:block hidden sm:absolute z-10 w-14 h-14 sm:bottom-[50%] sm:top-[40%] sm:right-0"
            />
            <div className="sm:hidden flex justify-around items-center">
                <ChevronLeftIcon
                    onClick={() => handleClick("left")}
                    className="w-16 cursor-pointer bg-black text-white h-6"
                />
                <ChevronRightIcon
                    onClick={() => handleClick("right")}
                    className="w-16 cursor-pointer bg-black text-white h-6"
                />
            </div>
         </div>
      </>
   );
}
