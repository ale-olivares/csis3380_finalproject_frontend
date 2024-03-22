import React from "react";
import img from '../../assets/img/wholesalep.jpg';
import img2 from '../../assets/img/wholesale2.jpg';


const Wholesale = () => {
    return (
        <div className=" min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 text-black">
            <br />
            <br />
            <br />
            <br />
            <div className=" flex flex-col lg:flex-row items-center gap-5">
                <div className=" w-full lg:w-2/4">
                    <img className=" rounded-lg" src={img} alt="img" />
                </div>
                <div className=" w-full lg:w-2/4 p-4 space-y-3">
                    <h2 className=" font-semibold text-3xl">
                        We are wholesale partners
                    </h2>
                    <p>
                        If you’re an avid coffee drinker, chances are that you’ve come across
                        the term specialty coffee at least once in the hunt for that perfect cup of coffee.

                    </p>
                    <p>
                        Passionate baristas, latte art, manual coffee brewing, and tiny espresso drinks make up
                        just a portion of the specialty coffee movement; the foundations run much deeper.

                    </p>

                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className=" flex flex-col lg:flex-row items-center gap-5 text-black">

                <div className=" w-full m-6 lg:w-2/4 p-4 space-y-3">
                    <h2 className=" font-semibold text-3xl">
                        Our coffee
                    </h2>
                    <p>
                        Our ethically traded specialty coffee is roasted to perfection and categorized into 4
                        different categories so it is easy for you to find a coffee that is perfect
                        for you, your customers and staff.
                    </p>
                    <p>
                        From bolder, darker flavour profiles, easy
                        drinking every day coffees to exciting eye opening coffees, we have you covered.
                        We work closely with producers around the globe to showcase the many different
                        qualities coffee can offer.
                    </p>

                </div>
                <div className=" w-full lg:w-2/4">
                    <img className=" rounded-lg" src={img2} alt="img" />
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />

        </div>


    );


}

export default Wholesale;