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
      <>
      <div
      ref={sectionRef} 
      className="w-full p-10 flex items-center justify-center"
      >
        <motion.a 
        className='w-32 aspect-square flex justify-center items-center hover:scale-105 transition-all duration-300 select-none cursor-pointer'
        href={route('home')}
        initial={{scale: 0.7, opacity: 0}}
        animate={isVisible ? {scale: 1, opacity: 1}:{scale: 0.7, opacity: 0}}
        exit={{scale: 0.7, opacity: 0}}
        transition={{duration: 1, ease: "linear" }}
        >
          <img 
          src={logo[0].logo} 
          alt={logo[0].name} 
          />
        </motion.a>
      </div>
      <footer
        
        className="w-full border-t py-6 select-none"
        >
        <motion.div 
        className="w-full px-10 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between"
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
                className="text-sm font-medium cursor-pointer select-none"
                >
                <img
                    src={network.logo}
                    alt={network.name}
                    className="h-6 w-6 select-none" // Puedes ajustar el tamaño del icono si es necesario
                />
                </a>
            ))}
          </div>
        </motion.div>
      </footer>
      </>
    )
}