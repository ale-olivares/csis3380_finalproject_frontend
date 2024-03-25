import React from "react";
import Button from "../layouts/Button";
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleClick = () => {
    navigate(`/product/${props.product.prod_id}`); // Navigate to the product details page
  };

  const calculateStock = () => {
    let stock = 0;
    props.product.product_subtypes.map((productSubType) => {
      stock += productSubType.stock;
    });
    return stock;
  }

  return (
    <div className=" w-full lg:w-1/4 bg-orange-50 p-3 rounded-lg text-center h-[375px] ml-10" >
      <img className=" rounded-lg" src={props.img} alt="img" /> {/*If product.product_subtypes[0].stock===0, display image2 and if the two stocks are 0, diplay image1*/}
      <div className=" flex flex-col items-center mt-5 gap-3" >
        <h2 className=" font-semibold text-xl cursor-pointer" onClick={handleClick}>{props.product.name}</h2>
        <h3 className=" font-semibold text-lg">${(props.product.product_subtypes[0].price)}</h3> {/*If product.product_subtypes[0].stock===0, display price2 and if the two stocks are 0, diplay price1 .toFixed(2)*/}
        <Button title={calculateStock() > 0 ? "Add To Cart" : "Out of Stock"} />
      </div>
    </div>
  );
};

export default ProductCard;
