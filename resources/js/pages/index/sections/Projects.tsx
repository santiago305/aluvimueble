import { useSectionObserver } from '@/hooks/useSectionObserver';
import { motion } from 'framer-motion';
import { page } from '../../../../data';
import { BlogsListProps } from '@/types/blogs';
export default function Projects ({blogs}: BlogsListProps) {
    const {sectionRef, isVisible}  = useSectionObserver(0.3)

    return(
        <div 
        ref={sectionRef} 
        className="w-full px-4 md:px-6"
        >
            <div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <a
              href={route('projects.index')} 
              className="space-y-2"
              >
                <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl "
                initial={{ y: 200, scale: 0.5 }}
                animate={ isVisible? { y: 0, scale: 1 } : { y: 200, scale: 0.5 } }
                exit={{ y: 200, scale: 0.5 }}
                transition={{ duration: 1 }}
                >
                    {page[1].content}
                </motion.h2>
                <motion.p 
                className="max-w-[700px] text-muted-foreground md:text-xl/relaxed"
                initial={{ y: '200%', scale: 0.5 }}
                animate={ isVisible? { y: 0, scale: 1 } : { y: '200%', scale: 0.5 } }
                exit={{ y: '200%', scale: 0.5 }}
                transition={{ duration: 1 }}
                >
                  {page[1].description}
                </motion.p>
              </a>
            </div>
            {blogs.length === 0 ? (
            <motion.div
              className="flex items-center justify-center h-60 bg-gray-200 rounded-lg"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xl font-medium text-gray-600">Próximamente</h3>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1 }}
            >
              {blogs.map((blog) => (
                <a 
                href={route('projects.show', blog.slug)} 
                key={blog.id} 
                className="group relative overflow-hidden rounded-lg">
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-medium text-white">{blog.title}</h3>
                  </div>
                </a>
              ))}
            </motion.div>
          )}
      </div>
    )
}