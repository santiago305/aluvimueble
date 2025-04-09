import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillAlert,
  AiOutlineExclamationCircle,
  AiFillInfoCircle
} from "react-icons/ai";
import Message from "./Message";

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
  const [customError, setCustomError] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setCustomError(detail);
      setTimeout(() => setCustomError(null), 5000);
    };

    window.addEventListener("flash:error", handler);
    return () => window.removeEventListener("flash:error", handler);
  }, []);

  const types = {
    success: {
      title: "Éxito",
      color: "#16a34a",
      icon: <AiFillCheckCircle className="h-full w-full" />,
      message: flash.success,
    },
    error: {
      title: "Error",
      color: "#c50202",
      icon: <AiFillAlert className="h-full w-full" />,
      message: customError || flash.error,
    },
    warning: {
      title: "Advertencia",
      color: "#eab308",
      icon: <AiOutlineExclamationCircle className="h-full w-full" />,
      message: flash.warning,
    },
    info: {
      title: "Información",
      color: "#2563eb",
      icon: <AiFillInfoCircle className="h-full w-full" />,
      message: flash.info,
    },
  };

  const activeFlash = Object.entries(types).find(([, data]) => data.message);

  if (!activeFlash) return null;

  const [key, { title, color, icon, message }] = activeFlash;

  return (
    <div className="absolute h-screen w-full pointer-events-none select-none overflow-hidden">
      <div className="h-full w-full relative">
        <motion.div
          key={key}
          className="absolute bottom-0 right-0 p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            transition: {
              duration: 6,
              ease: "easeInOut",
              times: [0, 0.2, 0.7, 0.8, 1],
            },
          }}
          exit={{  opacity: 0 }}
        >
          <div className="bg-white dark:bg-black rounded-lg">
            <Message
              title={title}
              description={message as string}
              color={color}
              icon={icon}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
