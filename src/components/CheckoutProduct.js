import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/reduser";

const CheckoutProduct = ({ Product }) => {
  const { id, title, description, price, image, category, hasPrime, rating } =
    Product;
  const dispath = useDispatch();
  const removeItemFromBasket = () => {
    dispath(removeFromBasket({ id }));
  };
  return (
    <div className=" grid grid-cols-5">
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        objectFit="contain"
      />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={id} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price * 100} currency="NPR" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              src="https://links.papareact.com/fdw"
              alt="icon"
              className="w-12"
            />
            <p className="text-xs text-gray-500">Free Delevery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-auto">
        <button className="button">Buy Now</button>
        <button onClick={removeItemFromBasket} className="button">
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
