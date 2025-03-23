import React from "react";

const Button = ({
  children,
  px
  py = 2,
  borderRadius = 8,
  borderColor = "border-gray-500",
  hoverBorderColor = "hover:border-blue-500",
  bgColor = "bg-white",
  hoverBgColor = "hover:bg-blue-500",
  textColor = "text-black",
  hoverTextColor = "hover:text-white",
}) => {
  return (
    <button
      className={`transition-all duration-300 border ${borderColor} ${hoverBorderColor} ${bgColor} ${hoverBgColor} ${textColor} ${hoverTextColor} font-medium
        px-${px} py-${py} rounded-[${borderRadius}px]
        sm:px-6 sm:py-3 sm:text-base   /* Small screens */
        md:px-8 md:py-4 md:text-lg     /* Tablets */
        lg:px-10 lg:py-5 lg:text-xl    /* Laptops */
      `}
    >
      {children}
    </button>
  );
};

export default Button;
