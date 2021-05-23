import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Header from "../components/Header";

function Sucess() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className=" text-green-500 h-10" />
            <h1 className="text-3xl">Thank you, You'r order has Placed</h1>
          </div>
          <p>
            “You're the best.” “I'm humbled and grateful.” “You knocked me off
            my feet!” “My heart is still smiling.” “Your thoughtfulness is a
            gift I will always treasure.” “Sometimes the simplest things mean
            the most.” “The banana bread was fabulous. You made my day.” “I'm
            touched beyond words.”
          </p>
          <button onClick={() => router.push("/order")} className="button mt-8">
            Go To MY Order
          </button>
        </div>
      </main>
    </div>
  );
}

export default Sucess;
