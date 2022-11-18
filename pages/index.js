import axios from "axios";
import Head from "next/head";
import Card from "../Components/Card";
import Layout from "../Components/Layout";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Web ojotas</title>
        <meta name="description" content="E-commerce ojotas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout home={true}>
        <div className={`${styles.containerCards} gap-4 mx-auto px-9 mt-10`}>
          {products.success && products.data.map((product, i) => (
              <Card
                id={product._id}
                key={i}
                alt={product.alt}
                img={product.img}
                color={product.color}
                name={product.name}
                price={product.price}
              />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get("/products")
  const products = await response.data

  return {
    props: {
      products,
    },
  };
}
