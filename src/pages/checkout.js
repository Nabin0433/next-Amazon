import { useSession } from "next-auth/client";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import Header from "../components/Header";
import { selectItems, selectItemsTotalPrice } from "../redux/reduser";

const Checkout = () => {
  const items = useSelector(selectItems);
  const itemTotalPrice = useSelector(selectItemsTotalPrice);
  const [session] = useSession();
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto ">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex p-5 flex-col space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Dont Have Items"
                : "Your Shopping Basket"}
            </h1>
            {items.map((item, index) => (
              <CheckoutProduct key={index} Product={item} />
            ))}
          </div>
        </div>
        <div className="flex-col flex bg-white p-10 shadow-md ">
          {items.length > 0 && (
            <>
              <h2 className=" whitespace-nowrap">
                Total {items.length} :{" "}
                <span className="font-bold">
                  <Currency quantity={itemTotalPrice * 100} currency="NPR" />
                </span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {session ? "Proceed To Checkout" : "SignIn To Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
