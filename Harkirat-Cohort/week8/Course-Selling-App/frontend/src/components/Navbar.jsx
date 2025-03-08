import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ReUseableComponents";
import { AiFillPhone, AiOutlineArrowRight } from "react-icons/ai";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);

  const menuItem = [
    { name: "Home", path: "/" },
    {
      name: "Course",
      path: "/course",
      dropDownMenu: [
        {
          name: "Neet",
          path: "/neet",
          subDropDownMenu: [
            { name: "10th", path: "/neet/10th" },
            { name: "11th", path: "/neet/11th" },
            { name: "12th", path: "/neet/12th" },
          ],
        },
        {
          name: "JEE",
          path: "/jee",
          subDropDownMenu: [
            { name: "10th", path: "/jee/10th" },
            { name: "11th", path: "/jee/11th" },
            { name: "12th", path: "/jee/12th" },
          ],
        },
      ],
    },
    {
      name: "Test Series",
      path: "/testSeries",
      dropDownMenu: [
        {
          name: "Neet",
          path: "/neet",
          subDropDownMenu: [
            { name: "10th", path: "/neet/10th" },
            { name: "11th", path: "/neet/11th" },
            { name: "12th", path: "/neet/12th" },
          ],
        },
        {
          name: "JEE",
          path: "/jee",
          subDropDownMenu: [
            { name: "10th", path: "/jee/10th" },
            { name: "11th", path: "/jee/11th" },
            { name: "12th", path: "/jee/12th" },
          ],
        },
      ],
    },
  ];

  return (
    <div className=" p-4 bg-transparent sticky flex justify-between px-20">
      <h1>Hello</h1>
      <nav className="">
        <ul className="flex space-x-8">
          {menuItem.map((item, index) => (
            <li
              className="relative"
              key={index}
              onMouseEnter={() => setOpenDropdown(index)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                className="text-gray-800 hover:text-gray-900 p-2"
                to={item.path}
              >
                
                  {item.name}
                 
              </Link>

              {/* DropDown Menu */}
              {item.dropDownMenu && (
                <ul
                  className={`absolute top-full mt-2 left-0 min-w-[200px] bg-white border border-gray-300 p-2 rounded-lg shadow-lg 
            before:absolute before:-top-2 before:left-0 before:w-full before:h-2 before:bg-transparent 
            transition-all duration-300 ease-in-out 
            ${
              openDropdown === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
                >
                  {item.dropDownMenu.map((subItem, subIndex) => (
                    <li
                      className="relative"
                      key={subIndex}
                      onMouseEnter={() => setOpenSubDropdown(subIndex)}
                      onMouseLeave={() => setOpenSubDropdown(null)}
                    >
                      <Link
                        to={subItem.path}
                        className="block p-2 text-gray-800 hover:bg-gray-100"
                      >
                        <div className="flex justify-between">
                          {subItem.name}
                          <AiOutlineArrowRight />
                        </div>
                      </Link>

                      {/* SubDropDown Menu */}
                      {subItem.subDropDownMenu && (
                        <ul
                          className={`absolute top-0 left-[calc(100%+16px)] min-w-[200px] bg-white border border-gray-300 p-2 rounded-lg shadow-lg 
                    before:absolute before:top-0 before:-left-6 before:w-6 before:h-full before:bg-transparent 
                    transition-all duration-300 ease-in-out 
                    ${
                      openSubDropdown === subIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                        >
                          {subItem.subDropDownMenu.map(
                            (subMenuItem, subMenuItemIndex) => (
                              <li key={subMenuItemIndex}>
                                <Link
                                  to={subMenuItem.path}
                                  className="block p-2 text-gray-800 hover:bg-gray-100"
                                >
                                  {subMenuItem.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className=" flex gap-4">
        <Button rounded="full" backgroundColor="sky">
          <AiFillPhone size={20} color="white" />
        </Button>
        <Button rounded="full" borderColor="sky" borderSize="2">
          Login
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
