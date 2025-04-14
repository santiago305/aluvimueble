import { BlogsProps } from "@/types/blogs";
import { motion } from 'framer-motion';


export default function ProjectsCard ({blogs}: BlogsProps) {

    const formattedDate = blogs?.published_at
    ? new Date(blogs.published_at).toLocaleDateString("es-ES")
    : "";

    return (
        <motion.a 
        href={route('projects.show', blogs?.slug)} 
        initial={{ opacity: 0, scale: 0 }}
        animate={{opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
        className="w-[300px] aspect-square group relative overflow-hidden rounded-lg"
        >
            <img
            src={blogs?.cover_image}
            alt={blogs?.title}
            className="w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-medium text-white line-clamp-3">{blogs?.title}</h3>
            <p className="text-sm text-white text-end mt-2">{formattedDate}</p>
            </div>
        </motion.a>
    )
}