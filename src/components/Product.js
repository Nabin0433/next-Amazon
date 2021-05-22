import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";

const Product = ({ Products }) => {
  const { id, title, description, price, image, category } = Products;
  const [rating] = useState(Math.floor(Math.random() * 5) + 1);
  const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 hover:shadow-lg">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        objectFit="contain"
      />
      <h4 className="my-3">{title}</h4>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <div className="mb-5">
        <Currency quantity={price * 100} currency="NPR" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            src="https://links.papareact.com/fdw"
            alt="icon"
            className="w-12"
          />
          <p className="text-xs text-gray-500">Free Delevery</p>
        </div>
      )}
      <button className="mt-auto button">Add To Basket</button>
    </div>
  );
};

export default Product;
