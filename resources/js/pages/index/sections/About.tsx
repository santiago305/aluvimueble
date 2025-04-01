import { Button } from "@/components/ui/button";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { motion } from 'framer-motion';
import { page, contact } from '../../../../data'

export default function About () {
    const {sectionRef, isVisible} = useSectionObserver()
    return (
    <div 
    ref={sectionRef}
    className="container px-4 md:px-6"
    >
        <div 
        className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
        >
            <motion.img
            src={page[2].image}
            alt={page[2].content}
            width={800}
            height={600}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            initial={{x: '50%', opacity: 0.3, scale: 0.4}}
            animate={isVisible ? {x: 0, opacity: 1, scale: 1} : {x: '50%', opacity: 0.3, scale: 0.4}}
            exit={{x: '50%', opacity: 0.3, scale: 0.4}}
            transition={{duration: 1}}
            />
            
            <motion.div 
            className="space-y-4"
            initial={{x: '-50%', opacity: 0.3, scale: 0.4}}
            animate={isVisible ? {x: 0, opacity: 1, scale: 1} : {x: '-50%', opacity: 0.3, scale: 0.4}}
            exit={{x: '-50%', opacity: 0.3, scale: 0.4}}
            transition={{duration: 1}}
            >
                <h2 
                className="text-3xl font-bold tracking-tighter"
                >
                    {page[2].content}
                </h2>
                <p 
                className="text-muted-foreground"
                >
                    {page[2].description}
                </p>
                <p 
                className="text-muted-foreground"
                >
                    {page[2].description2}
                </p>
                <div 
                className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                    <Button 
                    variant="outline" 
                    asChild
                    >
                        <a 
                        href={contact[0].url}
                        rel="noopener noreferrer"
                        target="_blank"
                        >
                            Conoce más
                        </a>
                    </Button>
                </div>
            </motion.div>
        </div>
    </div>
    )
}