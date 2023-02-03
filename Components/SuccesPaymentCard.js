import Image from "next/image";
import React from "react";
import { transformToDinero } from "../utils/utils";

export default function SuccesPaymentCard({ product }) {
    return (
        <div className="flex gap-2 border-b py-2">
            <div className="">
                <Image
                    width={90}
                    height={90}
                    alt={"Foto de producto"}
                    src={product.picture_url}
                    className="object-cover w-6 h-6 object-center"
                />
            </div>
            <div className={`w-[10rem] flex flex-col gap-2`}>
                <span className="text-black text-sm font-montserrat">
                    {product.title}{" "}
                </span>
                <span className="text-xs font-montserrat whitespace-nowrap">
                    {"("}
                    {product.description.split("size:")[0]}
                    {")"}
                </span>

                <p className="font-montserrat text-sm">
                    {transformToDinero(product.unit_price)}
                </p>

                <p className="w-10 h-10 text-xs ">
                    Cantidad:{product.quantity}
                </p>
            </div>
        </div>
    );
}
