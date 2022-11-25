import Image from "next/image";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { TABS, transformToDinero } from "../utils/utils";
import Trash from "../Icons/Trash";
export default function ProductDashboard({ product , setEditedProduct , setTab }) {
  const handleSetEditProduct = () => {
    setEditedProduct(product)
    setTab(TABS.EDIT_PRODUCT)
  }
  return (
    <div className="flex justify-between gap-4 w-full border-b border-t py-4 border-gray-300">
      <div className="min-w-[6rem] justify-center ml-4 flex items-center">
        <Image
          className="shadow-lg rounded-md"
          width={90}
          height={90}
          src={product?.img}
          alt={product.alt}
          objectFit="cover"
        />
      </div>
        <div className="lg:flex hidden lg:min-w-[6rem] w-full justify-center items-center">
            <p>{product.name}</p>
        </div>
        <div className="lg:flex hidden lg:min-w-[6rem] w-full justify-center items-center">
            <p>{product.color}</p>
        </div>
      <div className="sm:min-w-[6rem] w-full flex justify-center items-center">
        <p>{transformToDinero(product.price)}</p>
      </div>
      <div className="sm:min-w-[6rem] w-full flex justify-center items-center">
        <p>{product.stock}</p>
      </div>
      <div className="sm:min-w-[6rem] w-full flex justify-center items-center">
        <p>{product.talles.join(" , ")}</p>
      </div>

      <div className="flex items-center justify-around sm:min-w-[6rem] w-full">
        <button
          className="bg-[#051e34] active:scale-95 p-2 rounded-md transition-all duration-300"
          onClick={handleSetEditProduct}
        >
          <FiEdit className="w-6 h-6 text-white" />
        </button>
        <button className="bg-red-600 active:scale-95 p-2 rounded-md transition-all duration-300">
          <Trash className="w-[1.5rem] h-[1.5rem] text-white" />
        </button>
      </div>
    </div>
  );
}
