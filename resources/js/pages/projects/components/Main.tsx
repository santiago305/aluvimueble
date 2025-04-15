import { BlogsListProps } from "@/types/blogs";
import ProjectsCard from "./Card";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";


export default function Main ({blogs, meta}: BlogsListProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const images = Array.from(document.images);
      const totalImages = images.length;
      let loadedImages = 0;
  
      if (totalImages === 0) {
        setLoading(false);
        return;
      }
  
      images.forEach((img) => {
        if (img.complete) {
          incrementCounter();
        } else {
          img.addEventListener('load', incrementCounter);
          img.addEventListener('error', incrementCounter);
        }
      });
  
      function incrementCounter() {
        loadedImages += 1;
        if (loadedImages === totalImages) {
          setLoading(false);
        }
      }
    }, []);

    return (
        <>
            {loading && <Preloader onFinish={() => setLoading(false)} />}
            {!loading && (
            <>
                <div className="w-full h-auto flex p-10">
                    <h3 className="m-auto text-3xl text-center md:text-5xl md:text-start font-medium ">Nuestros trabajos son de calidad</h3>
                </div>
                <div className="w-full h-full flex gap-7 flex-wrap p-7 justify-center items-center">
                    {blogs.length ? (
                        blogs.map((blog) => (
                            <ProjectsCard key={blog.id} blogs={blog} />
                        ))
                    )
                    :
                    (
                        <p className="text-center text-4xl">No hay proyectos disponibles 💤</p>
                    )}
                </div>

                { blogs.length && meta && meta.current_page > 1  ?(
                <div className="flex w-full gap-4 p-4 justify-center items-center">
                    <div className="pagination">
                        <ul className="flex space-x-2">
                        {meta?.links.map((link, index) => {
                            const isPrev = link.label.toLowerCase().includes('previous'); 
                            const isNext = link.label.toLowerCase().includes('next');

                            return (
                                <li key={index}>
                                    <a
                                        href={link.url || "#"}
                                        className={`px-4 py-2 rounded ${link.active ? 'bg-blue-900/70 text-white' : 'border'}`}
                                        dangerouslySetInnerHTML={{
                                            __html: isPrev ? '&lt;' : isNext ? '&gt;' : link.label // Cambia los "labels"
                                        }}
                                    />
                                </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>
                ):(
                    ''
                )}
            </>
            )}
        </>
        
    )
}