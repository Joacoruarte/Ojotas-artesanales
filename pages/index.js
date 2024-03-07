import Head from 'next/head'
import { useEffect, useState } from 'react'
import Card from '../Components/Card'
import Layout from '../Components/Layout'
import Loading from '../Components/Loading'
import styles from '../styles/Home.module.css'
import axios from '../utils/configAxios'
// import Publicity from '../Components/Publicity'

export default function Home ({ products }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (products) {
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
                {loading
                  ? (
                    <Loading />
                    )
                  : (
                    <>
                        {products.length === 0
                          ? (
                            <div className="flex flex-col justify-center items-center h-80">
                                <h1 className="text-center text-3xl mt-10 font-montserrat">
                                    No hay productos disponibles en este
                                    momento.
                                </h1>
                                <p className="text-center text-3xl mt-10 font-montserrat">
                                    Estamos trabajando para ofrecerte los
                                    mejores productos...
                                </p>
                            </div>
                            )
                          : (
                            <div
                                className={`${styles.containerCards} gap-4 mx-auto px-9 mt-10`}
                            >
                                {products &&
                                    Array.isArray(products) &&
                                    products?.map((product, i) => (
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
                    </>
                    )}
                {/* <Publicity/> */}
            </Layout>
        </div>
  )
}

export async function getServerSideProps () {
  let products = []

  try {
    const res = await axios.get('/api/products')
    products = await res?.data?.data
  } catch (error) {
    console.log('Get products error', error)
  }

  return {
    props: {
      products
    }
  }
}
