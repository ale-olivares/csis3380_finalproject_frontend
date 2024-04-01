import React from "react";

const Button = (props) => {
  return (
    <div>

      <button className={"px-10 py-3 border-2 border-white bg-hoverColor hover:text-[#AB6B2E] transition-all rounded-full"} onClick={() => props.onClick()} >
        {props.title}
      </button>
    </div>
  );
};

export default Button;
