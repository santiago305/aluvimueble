import { useState, useEffect } from "react";

const images = [
  "https://cataas.com/cat/says/hola?size=50&color=red",
  "https://cataas.com/cat/says/perro?size=50&color=red",
  "https://cataas.com/cat/says/gato?size=50&color=red"
];

const CarouselBlog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(()=>{
        nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full aspect-video mx-auto overflow-hidden rounded-lg shadow-lg">
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
