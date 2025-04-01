import { useSectionObserver } from '@/hooks/useSectionObserver';
import {motion} from 'framer-motion'
import { logo, networks } from '../../../data';

const Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  };
export default function Footer () {
    const {sectionRef, isVisible}  = useSectionObserver(0.3)
    return (
        <footer
        ref={sectionRef} 
        className="w-full border-t py-6 select-none"
        >
        <motion.div 
        className="px-10 container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between"
        initial="hidden"
        animate= {isVisible? "visible" : "hidden" }
        exit="hidden"
        variants={Variants}
        >
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 {logo[0].name} Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {networks.map((network) => (
                <a
                key={network.id}
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
                >
                <img
                    src={network.logo}
                    alt={network.name}
                    className="h-6 w-6" // Puedes ajustar el tamaño del icono si es necesario
                />
                </a>
            ))}
          </div>
        </motion.div>
      </footer>
    )
}