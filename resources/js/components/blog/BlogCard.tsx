import { Button } from "@/components/ui/button";
import { FaPencilRuler } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

interface BlogCardProps {
  id: number;
  title: string;
  createdAt: string;
  imageUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  button1Icon?: React.ReactNode;
  button2Icon?: React.ReactNode;
}

export default function BlogCard({
  title,
  createdAt,
  imageUrl,
  onEdit,
  onDelete,
  button1Icon,
  button2Icon
}: BlogCardProps) {
  const isNew = (() => {
    const created = new Date(createdAt);
    const now = new Date();
    const diff = now.getTime() - created.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days < 2;
  })();

  return (
    <div className="w-55 h-65 rounded-xl shadow-md border-sidebar-border/70 dark:border-sidebar-border overflow-hidden border relative">
      <div className="absolute h-full w-full py-2 flex flex-col justify-between items-end select-none z-10">
        {isNew && (
          <div className="w-20 h-10 p-2 text-white bg-green-600 flex justify-center items-center rounded-xl">
            <strong>Nuevo</strong>
          </div>
        )}
        <div className="flex gap-2">
        {onEdit && (
          <Button
            className="h-10 aspect-square bg-blue-500 text-white hover:bg-blue-800 cursor-pointer"
            onClick={onEdit}
          >
            {button1Icon ?? <FaPencilRuler />}
          </Button>
        )}
          <Button
            className="h-10 aspect-square bg-red-800 text-white hover:bg-red-950 cursor-pointer"
            onClick={onDelete}
          >
            {button2Icon ?? <IoTrashBin />}
          </Button>
        </div>
      </div>

      <div className="h-full w-full p-3">
        <div
          className="w-full h-full rounded-sm overflow-hidden select-none bg-center bg-cover"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <div className="w-full h-full flex justify-center items-center bg-black/50 p-2">
            <p className="w-full line-clamp-3 text-white">
              {title}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}
