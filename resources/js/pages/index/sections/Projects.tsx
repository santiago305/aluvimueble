import { useSectionObserver } from '@/hooks/useSectionObserver';
import { motion } from 'framer-motion';
import { page } from '../../../../data';
export default function Projects () {
    const {sectionRef, isVisible}  = useSectionObserver(0.3)

    return(
        <div 
        ref={sectionRef} 
        className="container px-4 md:px-6"
        >
            <div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div 
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
              </div>
            </div>
            {/* aca bamos a hacer la */}
            <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={ isVisible? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 } }
            exit={{opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            >
              <div className="group relative overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Muebles minimalistas"
                  width={600}
                  height={400}
                  className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-medium text-white">Muebles</h3>
                  <p className="text-sm text-white/90 mt-2">
                    Diseños contemporáneos que combinan funcionalidad y estética.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Trabajos en vidrio"
                  width={600}
                  height={400}
                  className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-medium text-white">Vidriería</h3>
                  <p className="text-sm text-white/90 mt-2">Soluciones en vidrio para espacios modernos y elegantes.</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Estructuras de aluminio"
                  width={600}
                  height={400}
                  className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-medium text-white">Aluminio</h3>
                  <p className="text-sm text-white/90 mt-2">
                    Estructuras resistentes y ligeras con acabados perfectos.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
    )
}