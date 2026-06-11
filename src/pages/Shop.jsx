import { useSearchParams } from "react-router-dom";

function Shop() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <main className="px-14 py-12">
      <div className="flex items-start justify-between mb-20">
        <h1 className="text-[44px] italic font-light">
          Men's Clothing & Accessories
        </h1>

        <input
          type="text"
          placeholder="Search products..."
          className="w-105 h-11 bg-gray-100 rounded-md px-4 outline-none"
        />
      </div>

      <div className="border-t border-gray-300 pt-10">
        {category ? (
          <p className="text-lg">
            Selected category: {category}
          </p>
        ) : (
          <p className="text-lg">
            Showing all products
          </p>
        )}
      </div>
    </main>
  );
}

export default Shop;