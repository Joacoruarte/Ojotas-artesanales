import Head from "next/head";
import { Fragment } from "react";
import Fade from "react-reveal/Fade";
import Card from "../Components/Card";
import Layout from "../Components/Layout";
import styles from "../styles/Home.module.css";
import { products } from "../utils";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Web ojotas</title>
        <meta name="description" content="E-commerce ojotas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout home={true}>
        <div className={`${styles.containerCards} gap-4 mx-auto px-9 mt-10`}>
          {products.map((product, i) => (
            <Fragment key={i}>
              {i > 5 ? (
                <Fade bottom>
                  <Card
                    id={product.id}
                    alt={product.alt}
                    img={product.img}
                    color={product.color}
                    name={product.name}
                    price={product.price}
                    priority={i < 10}
                  />
                </Fade>
              ) : (
                <Card
                  id={product.id}
                  alt={product.alt}
                  img={product.img}
                  color={product.color}
                  name={product.name}
                  price={product.price}
                  priority={i < 10}
                />
              )}
            </Fragment>
          ))}
        </div>
      </Layout>
    </div>
  );
}
