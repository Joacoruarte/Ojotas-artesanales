import Link from "next/link";
import Image from "next/image";
import React from "react";
import { transformToDinero } from "../utils";

export default function Card({ id, name, alt, img, color, price , priority}) {
  return (
    <div className="relative shadow-xl">
      <div className="min-h-60 relative lg:h-60 sm:h-60 h-60 w-full overflow-hidden rounded-t-md  bg-gray-200 group-hover:opacity-75">
      <Link href={`/product/${id}`}>
        <Image
          src={Array.isArray(img) ? img[0] : img}
          width={600}
          height={740}
          alt={alt}
          priority={priority}
          placeholder="blur"
          blurDataURL="/blur.webp"
          layout="responsive"
          className="h-full cursor-pointer w-full hover:transform hover:scale-105 transition-all duration-500 object-cover object-center lg:h-full lg:w-full"
        />
      </Link>
      </div>
      <div className="mt-4 px-4 py-2 flex justify-between">
        <div>
          <Link href={`/product/${id}`}>
            <h3 className="text-sm cursor-pointer font-montserrat font-bold hover:underline text-gray-700">
                {name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500 font-montserrat">{color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{transformToDinero(price)}</p>
      </div>
    </div>
  );
}
