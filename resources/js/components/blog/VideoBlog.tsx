import clsx from "clsx";
import { CarouselBlogProps, filesBlogProps } from "@/types/global";
export default function VideoBlog ({ className, video = [] } : CarouselBlogProps & filesBlogProps) {
    if (video.length === 0) return null;
    
    return (
        <div className={clsx("relative w-full max-w-[700px] aspect-video mx-auto overflow-hidden rounded-lg shadow-lg", className)}>
        <video
            controls
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
        >
            <source 
            src={video[0]} 
            type="video/mp4" 
            />
            Tu navegador no soporta la etiqueta de video.
        </video>
        </div>
    );

}

