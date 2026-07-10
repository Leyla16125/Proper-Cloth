import { Link } from "react-router-dom";

function MegaMenu({ categories = [], onClose }) {
  return (
    <div className="absolute left-0 top-full z-50 w-[90vw] md:w-225 bg-white text-black shadow-lg rounded-b-md">

      <div className="px-6 py-6 md:px-8 md:py-7">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 md:gap-x-16">

          {categories.map((category) => (

            <div key={category._id}>

              <h3 className="text-[18px] md:text-[20px] font-semibold mb-3">
                {category.name}
              </h3>


              <ul className="space-y-1.5">

                {category.children?.map((child) => (

                  <li key={child._id}>

                    <Link
                      to={`/shop?category=${category.slug},${child.slug}`}
                      onClick={onClose}
                      className="text-[14px] md:text-[15px] text-slate-400 hover:text-black transition"
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