import React from "react";
import img from "../../assets/img/coffeeabout.jpg"

const AboutUs = () => {
    return (
        <div className=" min-h-screen flex flex-col items-center lg:px-32 px-5 bg-[#FFFF] text-black">
            <h1 className=" font-semibold text-center text-3xl lg:mt-14 mt-8"> Our mission: </h1>
            <h2 className=" font-semibold text-center text-xl mb-8 italic"> We want to provide our community with exceptional coffee experiences.</h2>

            <div className=" flex flex-col lg:flex-row items-center gap-5">
                <div className=" w-full lg:w-2/4">
                    <img className=" rounded-lg" src={img} alt="img" />
                </div>
                <div className=" w-full lg:w-2/4 p-4 space-y-3">
                    <h2 className=" font-semibold text-3xl">
                        How it started
                    </h2>
                    <p>
                        Established in Vancouver in late 2023, CoffeeBeans was born from a vision to make
                        great specialty coffee accessible to all members of our community.We pride ourselves
                        on being a locally owned and community-minded coffee company, and stand above the
                        rest with our unwavering dedication to providing our community with an excellent product and love for specialty coffee.
                    </p>
                    <p>
                        From humble beginnings in a 4,000-square-foot space, previously home to a seafood
                        packager, our very first multi purpose roasting and retail space at Pallet Semlin was created.
                    </p>
                </div>

            </div>
            <div>

            </div>
        </div>
    );


}

export default AboutUs;