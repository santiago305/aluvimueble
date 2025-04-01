import { ArrowRight } from "lucide-react";
import { contact } from '../../../../data';
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { motion } from 'framer-motion';
import { page } from '../../../../data'
import { Button } from "@/components/ui/button";

export default function FrontPage (){
    const {sectionRef, isVisible}  = useSectionObserver(0.3)
  
    return (
        <div 
        ref={sectionRef}
        className="container px-4 md:px-6"
        >
            <div 
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            >
              <motion.div 
              className="space-y-4"
              initial={{ x: -200, opacity: 0.5}}
              animate={ isVisible? { x: 0, opacity: 1 } : { x: -200, opacity: 0.5 } }
              exit={{ x: -200, opacity: 0.5 }}
              transition={{ duration: 1.5 }}
              >
                <h1 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  {page[0].content}
                </h1>
                <p 
                className="text-muted-foreground md:text-xl"
                >
                  {page[0].description}
                </p>
                <div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button 
                  asChild
                  >
                    <a 
                    href="#productos"
                    >
                      Ver productos 
                      <ArrowRight 
                      className="ml-2 h-4 w-4" 
                      />
                    </a>
                  </Button>
                  <Button 
                  variant="outline" 
                  asChild
                  >
                    <a 
                    href={contact[0].url}
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                        Solicitar presupuesto
                    </a>
                  </Button>
                </div>
              </motion.div>
              <motion.img
                src={page[0].image}
                alt={page[0].content}
                width={800}
                height={550}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                initial={{ x: 200, opacity: 0.5}}
                animate={ isVisible? { x: 0, opacity: 1 } : { x: 200, opacity: 0.5 } }
                exit={{ x: 200, opacity: 0.5 }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
    )
}