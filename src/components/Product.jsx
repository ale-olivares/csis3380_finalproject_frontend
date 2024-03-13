import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCountries } from "../services/ProductService";
import img1 from "../assets/img/product1.jpg";
import ProductCard from "../layouts/ProductCard";
//import ProductFilter from "./ProductFilter";
import ProductFilter from "./Products/ProductFilter";

const Product = () => {
  const [products, setProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [searchParams] = useSearchParams();
  const [uniqueCountries, setUniqueCountries] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const filters = Object.fromEntries([...searchParams]);  // Convert searchParams to an object to pass as filters
      //console.log(filters);
        try {
            const productsData = await getProducts(filters); 
            //console.log(productsData); 
            const data = [...productsData, ...productsData, ...productsData,...productsData,...productsData];
            setProducts(data); 
            //setProducts(productsData); 

        } catch (error) {
            console.error('Error while fetching products', error);
        }
    };

    fetchProducts(); // Invoke the async function to fetch products
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


  //Sort by price - ascending
  const sortingProducts = (event) => {
    const selectedValue = event.target.value;
    switch(selectedValue){
      case "price-low-to-high":
        setProducts([...products].sort(function(a,b){return a.product_subtypes[0].price - b.product_subtypes[0].price}));
        break;
      case "price-high-to-low":
        setProducts([...products].sort(function(a,b){return b.product_subtypes[0].price - a.product_subtypes[0].price}));
        break;
      case "rating":
        setProducts([...products].sort(function(a,b){return calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews)}));
        break;
      default:
        setProducts([...products].sort(function(a,b){return a.prod_id.localeCompare(b.prod_id)}));
        break;
    } 
  }

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const numberOfPages = Math.ceil(products.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const calculateAverageRating = (reviews) => {
      let total = 0.0;
      reviews.forEach(review => {
          total += parseFloat(review.rating);
      });
      return total / parseFloat(reviews.length);
  }

  return (
      <div className="flex">
        <ProductFilter countries={uniqueCountries}/>
        <div className="w-3/4">
          <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-[#FFF] h-full pt-[55px] ">
            <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">Our Products</h1>
            <div className="flex items-center mb-4">
                <div className="text-gray-600">Showing {indexOfFirstProduct+1>products.length?products.length:indexOfFirstProduct+1}–{indexOfLastProduct>products.length?products.length:indexOfLastProduct} of {products.length} results</div>
                <div className="flex gap-2 ml-auto">
                <select name="sort" id="sort"
                    className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow rounded focus:ring-primary focus:border-primary" onChange={sortingProducts}>
                    <option value="default">Default sorting</option>
                    <option value="price-low-to-high" >Price low to high</option>
                    <option value="price-high-to-low">Price high to low</option>
                    <option value="rating">Highest Rating</option>
                </select>
                </div>
            </div>
       
            {/* <div className="flex flex-col lg:flex-row gap-12 justify-center"> */}
            {products.length === 0 && <div className="text-center text-2xl text-gray-500 container pt-40 px-40 pb-40 md:mx-auto min-h-screen">No products found</div>}
            <div className="flex flex-wrap gap-12 pb-10 justify-start product-list">
              {products.slice(indexOfFirstProduct, indexOfLastProduct).map((product, index) => (
                <ProductCard key={(index+1)*currentPage} ind={(index+1)*currentPage} product={product} img={img1} rating={calculateAverageRating(product.reviews).toFixed(1)}/> //Change img1 to product.image_url key={/*product.prod_id*/} 
              ))}
            </div>

            <div className="flex justify-center pb-10">
              <div className="flex space-x-2">
              {[...Array(numberOfPages).keys()].map(number => (
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

