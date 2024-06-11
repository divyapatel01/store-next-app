/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleProductPage() {
  const params = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product>();
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then((response) => {
        setProduct(response.data);
        setImgUrl(response.data.thumbnail);
      });
  }, [params.id]);

  return (
    <>
      <div className="grid grid-cols-6 grid-rows-1 gap-4">
        <div className="flex flex-col">
          {product?.images.map((image, i) => {
            return (
              <img
                src={image}
                alt=""
                key={i}
                className="w-full border-sky-100 cursor-pointer"
                onClick={() => setImgUrl(image)}
              />
            );
          })}
        </div>
        <div className="col-span-2">
          <img src={imgUrl} alt="" className="w-full" />
        </div>
        <div className="col-span-3 col-start-4">
          <h3 className="font-bold text-lg">{product?.title}</h3>
          <p>{product?.description}</p>
        </div>
      </div>
    </>
  );
}
