import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <nav className="flex justify-center bg-gray-100 p-4">
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
            {item.dropDownMenu && openDropdown === index && (
              <ul className="absolute top-full left-0 min-w-[200px] bg-white border border-gray-300 p-2 rounded-lg shadow-lg">
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
                      {subItem.name}
                    </Link>

                    {/* SubDropDown Menu */}
                    {subItem.subDropDownMenu &&
                      openSubDropdown === subIndex && (
                        <ul className="absolute top-0 left-full min-w-[200px] bg-white border border-gray-300 p-2 rounded-lg shadow-lg ml-5">
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
  );
}

export default Navbar;
