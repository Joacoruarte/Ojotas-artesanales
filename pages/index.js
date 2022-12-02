import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Layout from "../Components/Layout";
import Loading from "../Components/Loading";
import { useGetProducts } from "../hooks/useGetProducts";
import styles from "../styles/Home.module.css";
   
export default function Home({ products }) {
  // const { products , loading , error } = useGetProducts();

  // if(error){
  //   return <div>Something went wrong</div>
  // }

  return (
    <div>
      <Head>
        <title>Web ojotas</title>
        <meta name="description" content="E-commerce ojotas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout home={true}>
        {/* {loading ? ( 
            <Loading/>
        ) : (  */}
          <div className={`${styles.containerCards} gap-4 mx-auto px-9 mt-10`}>
            {products && Array.isArray(products) && products?.map((product, i) => (
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
        {/* )} */}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("/api/products")
  const products = await res.data.data;

  return {
    props: {
      products,
    }
  }
}