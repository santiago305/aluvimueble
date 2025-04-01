import { motion } from "framer-motion";
import { logo } from '../../../data';

const logoVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

export default function Logo() {
  return (
    <motion.a 
      className="h-full w-auto flex justify-center items-center"
      href={route('home')}
      initial="hidden"
       animate= "visible" 
      variants={logoVariants}
    >
      <img 
      className="h-[50px] object-contain" 
      src={logo[0].logo} 
      alt={logo[0].name} 
      />
    </motion.a>
  );
}
