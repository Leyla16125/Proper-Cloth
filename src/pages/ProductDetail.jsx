import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../services/productService";
import { SlArrowDown } from "react-icons/sl";

function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const data = await getProductBySlug(slug);
        setProduct(data);

        const firstVariant = data.variants?.[0];

        setSelectedVariant(firstVariant || null);
        setSelectedImage(firstVariant?.images?.[0]?.url || null);
        setSelectedImageIndex(0);
      } catch (error) {
        console.log("Product detail could not be loaded:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return <main className="px-5 py-8 md:px-14 md:py-12">Loading product...</main>;
  }

  if (!product) {
    return <main className="px-5 py-8 md:px-14 md:py-12">Product not found.</main>;
  }

  const variants = product.variants || [];
  const images = selectedVariant?.images || [];
  const colors = [
    ...new Set(variants.map((item) => item.specs?.color).filter(Boolean)),
  ];
  const sizes = [
    ...new Set(variants.map((item) => item.specs?.size).filter(Boolean)),
  ];

  function handleColorClick(color) {
    const variantByColor = variants.find((item) => item.specs?.color === color);

    if (variantByColor) {
      setSelectedVariant(variantByColor);
      setSelectedImage(variantByColor.images?.[0]?.url || null);
      setSelectedImageIndex(0);
    }
  }

  function handleSizeClick(size) {
    const variantBySize = variants.find(
      (item) =>
        item.specs?.size === size &&
        item.specs?.color === selectedVariant?.specs?.color
    );

    if (variantBySize) {
      setSelectedVariant(variantBySize);
      setSelectedImage(variantBySize.images?.[0]?.url || selectedImage);
      setSelectedImageIndex(0);
    }
  }

  function showNextImage() {
    if (images.length === 0) return;

    const nextIndex =
      selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;

    setSelectedImageIndex(nextIndex);
    setSelectedImage(images[nextIndex].url);
  }

  function showPrevImage() {
    if (images.length === 0) return;

    const prevIndex =
      selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;

    setSelectedImageIndex(prevIndex);
    setSelectedImage(images[prevIndex].url);
  }

  return (
    <main className="px-5 py-8 md:px-14 md:py-12">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[90px_1fr_1fr] lg:gap-14">
        <div className="hidden lg:flex flex-col gap-4">
          {images.map((image, index) => (
            <button
              key={image._id || image.url}
              onClick={() => {
                setSelectedImage(image.url);
                setSelectedImageIndex(index);
              }}
              className={`h-24 w-24 rounded-md border bg-gray-100 p-2 ${
                selectedImage === image.url
                  ? "border-black"
                  : "border-transparent"
              }`}
            >
              <img
                src={image.url}
                alt={product.title}
                className="h-full w-full object-contain cursor-pointer"
              />
            </button>
          ))}
        </div>

        <div className="relative bg-[#f7f6f4] flex min-h-95 items-center justify-center overflow-hidden md:min-h-130 lg:min-h-160">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={showPrevImage}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl shadow md:hidden"
              >
                ‹
              </button>

              <button
                onClick={showNextImage}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl shadow md:hidden"
              >
                ›
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
                {images.map((image, index) => (
                  <button
                    key={image._id || image.url}
                    onClick={() => {
                      setSelectedImage(image.url);
                      setSelectedImageIndex(index);
                    }}
                    className={`h-2 w-2 rounded-full ${
                      selectedImageIndex === index ? "bg-black" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="pt-3">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-[30px] font-medium leading-tight md:text-[34px]">
              {product.title}
            </h1>
          </div>

          {selectedVariant?.price && (
            <p className="mt-5 text-[18px]">${selectedVariant.price}</p>
          )}

          {selectedVariant?.specs?.color && (
            <div className="mt-10 md:mt-12">
              <p className="mb-4 text-sm font-semibold uppercase">
                {selectedVariant.specs.color}
              </p>

              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorClick(color)}
                    className={`h-12 w-12 rounded-md border p-1 ${
                      selectedVariant?.specs?.color === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    <span
                      className="block h-full w-full rounded"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mt-10 md:mt-12">
              <h3 className="mb-5 text-[22px] font-semibold md:text-[24px]">
                Select your Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`h-14 min-w-14 rounded-md border px-5 font-semibold ${
                      selectedVariant?.specs?.size === size
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-8 text-gray-500">
            Stock in {selectedVariant?.stock || 0}
          </p>

          <div className="mt-3 flex gap-4">
            <button className="h-16 flex-1 rounded-md bg-black text-lg font-semibold text-white hover:bg-gray-800">
              Add to Bag
            </button>

            <div className="relative h-16 w-24">
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-full w-full appearance-none rounded-md border border-black bg-white px-5 pr-10 text-lg outline-none cursor-pointer"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl">
                <SlArrowDown />
              </span>
            </div>
          </div>

          <hr className="my-8 border-gray-300" />

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase">Description</h3>

            <p className="text-[17px] leading-8 text-gray-600">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;