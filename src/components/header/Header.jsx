import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBag } from "react-icons/fa";
import MegaMenu from "./MegaMenu";
import { getNestedCategories } from "../../services/categoryService";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getNestedCategories();
        setCategories(data);
      } catch (error) {
        console.log("Categories could not be loaded:", error);
      }
    }

    loadCategories();
  }, []);

  return (
    <header className="relative h-16 bg-black text-white grid grid-cols-[1fr_auto_1fr] items-center px-14">
      <div
        className="relative h-full flex items-center"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <Link
          to="/shop"
          onClick={() => setIsMenuOpen(false)}
          className="text-[18px] cursor-pointer hover:text-gray-300"
        >
          Shop
        </Link>

        {isMenuOpen && <MegaMenu categories={categories} />}
      </div>

      <Link to="/">
        <h1 className="text-[20px] font-normal cursor-pointer hover:text-gray-300">
          PROPER CLOTH
        </h1>
      </Link>

      <div className="flex justify-end items-center gap-8 text-[18px]">
        <button className="hover:text-gray-300 cursor-pointer">
          <FaSearch />
        </button>

        <button className="hover:text-gray-300 cursor-pointer">
          <FaUser />
        </button>

        <button className="hover:text-gray-300 cursor-pointer">
          <FaShoppingBag />
        </button>
      </div>
    </header>
  );
}

export default Header;