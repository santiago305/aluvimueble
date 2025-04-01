import { motion } from "framer-motion";

// Tipado de los props
interface NavLinksProps  {
  links: { href: string; label: string }[];
}

const linkVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

export default function NavLinks({ links }: NavLinksProps) {
  return (
    <motion.nav 
      className="hidden md:flex gap-15"
      initial="hidden"
      animate="visible" 

    >
      {links.map((link, index) => (
        <motion.a 
          key={index} 
          href={link.href} 
          variants={linkVariants}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}
