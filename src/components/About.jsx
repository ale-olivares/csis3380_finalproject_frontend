import React from "react";
import img from "../assets/img/bg-about.jpg";
import Button from "../layouts/Button";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center  lg:px-32 px-5 bg-[#FFFF] text-black">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">About Us</h1>

      <div className=" flex flex-col lg:flex-row items-center ">
        <div className=" w-full lg:w-2/4">
          <img className=" rounded-lg" src={img} alt="img" />
        </div>
        <div className=" w-full lg:w-2/4 p-4 space-y-3">
          <h2 className=" font-semibold text-3xl">
            What Makes Our Coffee Special?
          </h2>
          <p>
            If you’re an avid coffee drinker, chances are that you’ve come across
            the term specialty coffee at least once in the hunt for that perfect cup of coffee.

          </p>
          <p>
            Passionate baristas, latte art, manual coffee brewing, and tiny espresso drinks make up
            just a portion of the specialty coffee movement; the foundations run much deeper.

          </p>

          {/* <Button title="Learn More" /> */}
        </div>
      </div>
    </div>
  );
};

export default About;
