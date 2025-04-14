import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { motion } from 'framer-motion';
import { contact } from '../../../data'

// Definimos los enlaces en una variable separada
const leftLinks = [
  { href: "/#about", label: "Nosotros" },
  { href: route('projects.index'), label: "Proyectos" },
];

const linkVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};
export default function Navbar() {
  return (
    <div className="h-full w-[1200px] m-auto p-5">
      <div className="h-full w-full flex justify-between items-center">
        <Logo  />
        <NavLinks links={leftLinks}  />
        <motion.div 
          className="flex"
          initial="hidden"
          animate="visible" 

        >
            <motion.a 
              className="bg-black px-4 py-2 text-white rounded-lg dark:bg-white dark:text-black"
              href={contact[0].url}
              variants={linkVariants}
            >
              <strong>
              Contactanos
              </strong>
            </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
