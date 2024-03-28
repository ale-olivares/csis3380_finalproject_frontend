import React from "react";

const Button = (props) => {
  return (
    <div>
      <button className={props.title === "Out of Stock"? "px-10 py-3 border-2 border-white bg-[#d9a97c]  transition-all rounded-full" :"px-10 py-3 border-2 border-white bg-hoverColor hover:text-[#AB6B2E] transition-all rounded-full"} onClick={()=>props.onClick()} >
        {props.title}
      </button>
    </div>
  );
};

export default Button;
