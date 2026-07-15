import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import MegaMenu from "./MegaMenu";
import { fetchCategories } from "../../store/categorySlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { categories } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);


  function handleSearchKeyDown(e) {
    if (e.key === "Enter") {
      const value = searchText.trim();

      if (value === "") return;

      navigate(`/shop?search=${encodeURIComponent(value)}`);

      setIsSearchOpen(false);
      setSearchText("");
    }
  }


  return (
    <header className="relative h-16 bg-black text-white grid grid-cols-[1fr_auto_1fr] items-center px-5 md:px-14">

      <div
        className="relative h-full flex items-center"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >

        {/* Desktop */}
        <div className="hidden md:block">

          <Link
            to="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="text-[18px] cursor-pointer hover:text-gray-300"
          >
            Shop
          </Link>

          {isMenuOpen && <MegaMenu categories={categories} />}

        </div>


        {/* Mobile */}
        <div className="md:hidden">

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-xl cursor-pointer"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>


          {isMobileMenuOpen && (
            <MegaMenu
              categories={categories}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}

        </div>


      </div>


      <Link to="/">
        <h1 className="md:text-[20px] hidden md:block font-normal cursor-pointer hover:text-gray-300">
          PROPER CLOTH
        </h1>
      </Link>


      <div className="relative flex justify-end items-center gap-5 md:gap-8 text-[18px]">

        {isSearchOpen && (
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search products..."
            autoFocus
            className="absolute md:right-32 right-28 h-10 w-50 md:w-60 rounded-md bg-white px-4 text-sm text-black outline-none"
          />
        )}


        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="hover:text-gray-300 cursor-pointer"
        >
          <FaSearch />
        </button>


        <button className="hover:text-gray-300 cursor-pointer">
          <FaUser />
        </button>


        <Link
          to="/bag"
          className="relative hover:text-gray-300 cursor-pointer"
        >
          <FaShoppingBag />

          {cartCount > 0 && (
            <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
              {cartCount}
            </span>
          )}

        </Link>


      </div>


    </header>
  );
}

export default Header;