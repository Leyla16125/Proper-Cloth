import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
        <img
          src="/img/hero.jpg"
          alt="Proper Cloth collection"
          className="hidden h-full w-full object-cover md:block"
        />

        <img
          src="/img/hero-mobile.jpg"
          alt="Proper Cloth mobile collection"
          className="block h-full w-full object-cover md:hidden"
        />

        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
          <h1 className="text-4xl font-light md:text-6xl">
            Custom Clothing, Perfectly Fit
          </h1>

          <Link
            to="/shop"
            className="mt-8 border border-white bg-transparent px-8 py-3 text-sm uppercase tracking-wider text-white transition hover:bg-black/40"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-1 px-4 py-10 md:flex-row md:px-14">
        <Link
          to="/shop?category=shirts,dress-shirts"
          className="group relative w-full overflow-hidden bg-black md:w-1/2"
        >
          <img
            src="/img/img1.jpg"
            alt="Dress Shirts"
            className="h-auto w-full object-contain transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/30" />

          <div className="absolute bottom-10 left-8 text-white md:bottom-14 md:left-14">
            <p className="mb-2 text-lg">Explore</p>

            <p className="text-[12px] font-light underline underline-offset-8 md:text-[20px]">
              Dress Shirts
            </p>
          </div>
        </Link>

        <Link
          to="/shop?category=suits"
          className="group relative w-full overflow-hidden bg-black md:w-1/2"
        >
          <img
            src="/img/img2.jpg"
            alt="Men's Suits"
            className="h-auto w-full object-contain transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/30" />

          <div className="absolute bottom-10 left-8 text-white md:bottom-14 md:left-14">
            <p className="mb-2 text-lg">Explore</p>

            <p className="text-[12px] font-light underline underline-offset-8 md:text-[20px]">
              Men' s Suits
            </p>
          </div>
        </Link>
      </section>
    </>
  );
}

export default Hero;