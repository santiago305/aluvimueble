import { AiFillCheckCircle, AiFillAlert, AiOutlineExclamationCircle, AiFillInfoCircle } from 'react-icons/ai';
import { usePage } from "@inertiajs/react";
import { motion } from 'framer-motion';
import { useSectionObserver } from "@/hooks/useSectionObserver";
import Message from './Message';

interface PageProps {
  flash: {
    error?: string;
    success?: string;
    warning?: string;
    info?: string;
  };
  [key: string]: any;
}

export default function FlashMessage() {
  const { flash } = usePage<PageProps>().props;
  const { sectionRef, isVisible } = useSectionObserver(0.3);

  const types = {
    success: {
      title: "Éxito",
      color: "#16a34a", 
      icon: <AiFillCheckCircle className='h-full w-full' />,
      message: flash.success,
    },
    error: {
      title: "Error",
      color: "#c50202", 
      icon: <AiFillAlert className='h-full w-full' />,
      message: flash.error,
    },
    warning: {
      title: "Advertencia",
      color: "#eab308",
      icon: <AiOutlineExclamationCircle className='h-full w-full' />,
      message: flash.warning,
    },
    info: {
      title: "Información",
      color: "#2563eb", 
      icon: <AiFillInfoCircle className='h-full w-full' />,
      message: flash.info,
    },
  };

  const activeFlash = Object.entries(types).find(([, data]) => data.message);

  if (!activeFlash) return null;

  const [key, { title, color, icon, message }] = activeFlash;

  return (
    <div
    className='absolute h-full w-full pointer-events-none select-none overflow-hidden'
    >
      <div
        ref={sectionRef}
        className="h-full w-full relative "
      >
        <motion.div
          key={key}
          className="absolute bottom-0 right-0 p-4 z-50"
          initial={{ y: '100%', opacity: 0 }}
          animate={{
            y: isVisible ? ['100%', 0, 0, 0, '100%'] : '100%',
            opacity: isVisible ? [0, 1, 1, 1, 0] : 0,
            transition: {
              duration: 5,
              ease: 'easeInOut',
              times: [0, 0.2, 0.8, 0.8, 1],
            },
          }}
          exit={{ y: '100%', opacity: 0 }}
        >
          <Message
            title={title}
            description={message as string}
            color={color}
            icon={icon}
          />
        </motion.div>
      </div>
    </div>
  );
}
