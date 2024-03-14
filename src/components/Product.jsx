import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCountries } from "../services/ProductService";
import img1 from "../assets/img/product1.jpg";
import ProductCard from "../layouts/ProductCard";
import ProductFilter from "./Products/ProductFilter";

const Product = () => {
  const [products, setProducts] = useState([]); 
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [productPerPage] = useState(9);
  

  useEffect(() => {
    const fetchProducts = async () => {

      const page = searchParams.get('page') || 1; 
      const filters = { ...Object.fromEntries(searchParams), page };
      //const filters = Object.fromEntries([...searchParams]);  
        try {
            const productsData = await getProducts(filters); 
            setProducts(productsData.products); 
            setTotalPages(productsData.totalPages);
            setCurrentPage(productsData.page);
            setTotalProducts(productsData.totalCount);
        } catch (error) {
            console.error('Error while fetching products', error);
        }
    };

    fetchProducts(); 
    window.scrollTo(0, 0); 
  }, [searchParams]); 

  useEffect(() => {
    const fetchCountries = async () => {
      try {
          const countriesData = await getCountries();
          setUniqueCountries(countriesData);
      } catch (error) {
          console.error('Error while fetching countries', error);
      }
    };
    fetchCountries();
  },[]);

   // Update Search Params
   const paginate = (pageNumber) => {
    const newSearchParams = new URLSearchParams(searchParams); 
    newSearchParams.set('page', pageNumber);
    setSearchParams(newSearchParams); 
  };

  //Sorting
  const handleSortChange = (event) => {
    const { name, value } = event.target;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', '1');
    newSearchParams.set(name, value);
    setSearchParams(newSearchParams);
  }

  return (
      <div className="flex">
        <ProductFilter countries={uniqueCountries}/>
        <div className="w-3/4">
          <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-[#FFF] h-full pt-[55px] ">
            <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">Our Products</h1>
            <div className="flex items-center mb-4">
                <div className="text-gray-600">Showing {Math.min(1 + ((currentPage-1)*productPerPage), totalProducts)}–{products.length+((currentPage-1)*productPerPage)} of {totalProducts} results</div>
                <div className="flex gap-2 ml-auto">
                <select name="sort" id="sort"
                    className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow rounded focus:ring-primary focus:border-primary" onChange={handleSortChange}>
                    <option value="default">Default sorting</option>
                    <option value="price-low-to-high" >Price low to high</option>
                    <option value="price-high-to-low">Price high to low</option>
                    <option value="rating">Highest Rating</option>
                </select>
                </div>
            </div>
       
            {products.length === 0 && <div className="text-center text-2xl text-gray-500 container pt-40 px-40 pb-40 md:mx-auto min-h-screen">No products found</div>}
            <div className="flex flex-wrap gap-12 pb-10 justify-start product-list">
              {products.map((product, index) => (
                <ProductCard key={index+1} ind={index+1} product={product} img={img1} /> //Change img1 to product.image_url key={/*product.prod_id*/} rating={calculateAverageRating(product.reviews).toFixed(1)}
              ))}
            </div>

            <div className="flex justify-center pb-10">
              <div className="flex space-x-2">
              {[...Array(totalPages).keys()].map(number => (
                <button key={number+1} onClick={() => paginate(number + 1)} className={`px-4 py-2 ${currentPage === number + 1 ? 'bg-gray-300' : 'bg-white'} rounded shadow`}>
                  {number + 1}
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Product;

