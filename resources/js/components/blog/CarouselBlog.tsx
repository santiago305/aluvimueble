import { CarouselBlogProps, filesBlogProps } from "@/types/global";
import clsx from "clsx";
import { useState, useEffect } from "react";

const CarouselBlog: React.FC<CarouselBlogProps & filesBlogProps> = ({ className, images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <div className={clsx("relative w-full max-w-[700px] aspect-video mx-auto overflow-hidden rounded-lg shadow-lg", className)}>
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-500"
      />

      {/* Botón Izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all duration-200"
      >
        ❮
      </button>

      {/* Botón Derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all duration-200"
      >
        ❯
      </button>
    </div>
  );
};

export default CarouselBlog;
