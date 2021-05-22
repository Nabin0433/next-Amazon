import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ Products }) {
  return (
    <div className=" bg-gray-100">
      <Head>
        <title>Amazon</title>
        <meta
          name="description"
          content="Build on nextjs and reactjs and firebase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="mx-auto max-w-screen-2xl">
        {/* Banner */}
        <Banner />
        {/* product */}
        <ProductFeed products={Products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const Products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      Products,
    },
  };
}
