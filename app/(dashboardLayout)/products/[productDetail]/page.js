"use client";
import ProductDetail from "@/components/ProductList/ProdcutDetail";
import React, { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";
import Loading from "@/components/Loading";

function Page({ params: { productDetail } }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(""); // Changed initial state to an empty string

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPI("/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }

      try {
        const imageResponse = await fetch("/data.json");
        const imageData = await imageResponse.json();

        // Find the image path for the current productDetail
        const matchedImage = imageData.find((item) => item.stkkod === productDetail);
        if (matchedImage) {
          setImg(matchedImage.path); // Set the image path if found
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err);
      }
    };

    fetchData();
  }, [productDetail]); // Added productDetail to dependency array

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const product = products.find(
    (product) => product.STKKOD.toString() === productDetail
  );

  return <ProductDetail product={product} img={img.toString()} />; // Pass img to ProductDetail if needed
}

export default Page;