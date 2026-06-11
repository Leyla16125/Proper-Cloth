import { Link } from "react-router-dom";

function MegaMenu({ categories = [] }) {
  return (
    <div className="absolute left-0 top-full z-50 w-225 bg-white text-black shadow-lg rounded-b-md">
      <div className="px-8 py-7">
        <div className="grid grid-cols-4 gap-x-16 gap-y-10">
          {categories.map((category) => (
            <div key={category._id}>
              <h3 className="text-[20px] font-semibold mb-3">
                {category.name}
              </h3>

              <ul className="space-y-1.5">
                {category.children?.map((child) => (
                  <li key={child._id}>
                    <Link
                      to={`/shop?category=${category.slug},${child.slug}`}
                      className="text-[15px] text-slate-400 hover:text-black transition"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;