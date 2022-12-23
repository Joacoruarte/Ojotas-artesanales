import Head from "next/head";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Layout from "../Components/Layout";
import Loading from "../Components/Loading";
import Publicity from "../Components/Publicity";
import styles from "../styles/Home.module.css";
import axios from "../utils/configAxios";


export default function Home({ products }) {
  const [loading , setLoading] = useState(true);

  useEffect(()=> {
    if(products){
      setLoading(false)
    }
  }, [products])

  return (
    <div>
      <Head>
        <title>Web ojotas</title>
        <meta name="description" content="E-commerce ojotas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout home={true}>
        {loading ? ( 
            <Loading/>
        ) : ( 
          <div className={`${styles.containerCards} gap-4 mx-auto px-9 mt-10`}>
            {products && Array.isArray(products) && products?.map((product, i) => (
                <Card
                  id={product.pid}
                  key={i}
                  alt={product.alt}
                  img={product.img[0]}
                  color={product.color}
                  name={product.name}
                  price={product.price}
                />
            ))}
          </div>
        )} 

        {/* <Publicity/> */}
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