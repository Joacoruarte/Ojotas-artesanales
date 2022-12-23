import Link from "next/link";
import Image from "next/image";
import React from "react";
import { transformToDinero } from "../utils/utils";
import s from "../styles/Card.module.css";

export default function Card({ id, name, alt, img, price }) {
  return (
    <div className={`${s.cardImage} relative flex flex-col`}>
      <div className="min-h-60 relative sm:h-96 h-96 w-full -mb-4 overflow-hidden  bg-gray-200 group-hover:opacity-75">
        <Link href={`/product/${id}`}>
            <Image
              src={img}
              width={600}
              height={740}
              alt={alt}
              layout="fill"
              className="h-full cursor-pointer w-full hover:transform hover:scale-105 transition-all duration-500 object-cover object-center lg:h-full lg:w-full"
            />
        </Link>
      </div>
      <div className="mt-4 px-4 py-2 flex flex-col justify-center items-center">
          <Link href={`/product/${id}`}>
            <h3 className="text-sm cursor-pointer font-montserrat uppercase hover:underline text-gray-700">
                {name}
            </h3>
          </Link>
          <p className="text-lg font-bold text-gray-900">{transformToDinero(price)}</p>
      </div>
    </div>
  );
}
