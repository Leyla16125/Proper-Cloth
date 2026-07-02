import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { fetchCategories } from "../store/categorySlice";
import { fetchProducts } from "../store/productSlice";

function Shop() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [filter, setFilter] = useState(true);
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const { categories } = useSelector((state) => state.category);
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    const params = {
      limit: 50,
    };

    if (selectedCategory && categories.length > 0) {
      const slugs = selectedCategory.split(",");
      const childSlug = slugs[1];

      let selectedChildCategory = null;

      categories.forEach((category) => {
        const foundChild = category.children?.find(
          (child) => child.slug === childSlug
        );

        if (foundChild) {
          selectedChildCategory = foundChild;
        }
      });

      if (selectedChildCategory) {
        params.categories = selectedChildCategory._id;
      }
    }

    if (!selectedCategory || categories.length > 0) {
      dispatch(fetchProducts(params));
    }
  }, [dispatch, selectedCategory, categories]);

  function handleCategoryClick(categoryId) {
    setOpenCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
  }

  return (
    <main className="px-14 py-12">
      <section>
        <div className="md:flex items-center justify-between mb-16">
          <h1 className="text-[44px] italic font-light">
            Men's Clothing & Accessories
          </h1>

          <input
            type="text"
            placeholder="Search products..."
            className="w-100 h-11 bg-gray-100 rounded-md px-4 outline-none"
          />
        </div>
      </section>

      <section>
        <div
          onClick={() => setFilter(!filter)}
          className="hidden md:flex items-center justify-end gap-4 cursor-pointer"
        >
          <PiSlidersHorizontalLight className="text-xl" />

          <span className="text-[18px]">
            {filter ? "Hide Filters" : "Show Filters"}
          </span>
        </div>

        <hr className="text-gray-300 my-6" />
      </section>

      <section className="flex gap-10">
        {filter && (
          <aside className="hidden md:block w-1/5">
            <h3 className="uppercase tracking-[2px] text-[16px] font-semibold mb-7">
              Category
            </h3>

            <ul className="space-y-3 text-gray-500">
              {categories.map((category) => (
                <li key={category._id}>
                  <button
                    onClick={() => handleCategoryClick(category._id)}
                    className="hover:text-black cursor-pointer"
                  >
                    {category.name}
                  </button>

                  {openCategoryId === category._id && (
                    <ul className="ml-4 mt-3 space-y-2">
                      {category.children?.map((child) => {
                        const currentCategory = `${category.slug},${child.slug}`;
                        const isActive = selectedCategory === currentCategory;

                        return (
                          <li key={child._id}>
                            <Link
                              to={`/shop?category=${currentCategory}`}
                              className={
                                isActive
                                  ? "text-black"
                                  : "text-gray-400 hover:text-black"
                              }
                            >
                              {child.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div
          className={
            filter
              ? "w-full md:w-4/5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
              : "w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
          }
        >
          {loading ? (
            <p className="text-lg">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-lg">No products found.</p>
          ) : (
            products.map((product) => {
              const firstVariant = product.variants?.[0];
              const firstImage = firstVariant?.images?.[0]?.url;
              const price = firstVariant?.price;

              return (
                <Link to={`/product/${product.slug}`} key={product._id}>
                  <article>
                    <div className="bg-[#f7f6f4] h-60 flex items-center justify-center overflow-hidden cursor-pointer">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </div>

                    <div className="mt-5 text-black">
                      <h3 className="text-[18px] font-medium leading-6">
                        {product.title}
                      </h3>

                      {price && (
                        <p className="mt-4 text-[17px]">
                          ${price}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default Shop;