import FlashMessage from "@/components/flashMessage";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { BlogsListProps } from "@/types/blogs";
import { Head, router } from "@inertiajs/react";
import BlogCard from "@/components/blog/BlogCard";
import { FaWindowRestore } from "react-icons/fa6";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Papelera",
    href: route("blogs.bin"),
  },
];

export default function binBlogs({ blogs, meta }: BlogsListProps
) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <FlashMessage />
      <Head title="Papelera" />

      <div className="flex h-full flex-1 flex-wrap gap-4 rounded-xl p-4">
        {blogs.length ? (
            blogs.map((blog) => (
                <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                createdAt="2025-04-08T12:00:00Z"
                imageUrl={blog.cover_image}
                button2Icon={<FaWindowRestore />}
                onDelete={() => {
                    if (confirm(`¿Deseas restaurar el blog "${blog.title}"?`)) {
                    router.put(route("blogs.activate", blog.id), {
                        preserveScroll: true,
                    });
                    }
                }}
                />

            ))
        ) : (
            <p>No hay blogs disponibles 💤</p>
        )}
      </div>
     
      { blogs.length && meta.current_page > 1  ?(
         <div className="flex w-full gap-4 p-4 justify-center items-center">
            <div className="pagination">
                <ul className="flex space-x-2">
                {meta.links.map((link, index) => {
                    const isPrev = link.label.toLowerCase().includes('previous'); 
                    const isNext = link.label.toLowerCase().includes('next');

                    return (
                        <li key={index}>
                            <a
                                href={link.url || "#"}
                                className={`px-4 py-2 rounded ${link.active ? 'bg-blue-900/70 text-white' : 'border'}`}
                                dangerouslySetInnerHTML={{
                                    __html: isPrev ? '&lt;' : isNext ? '&gt;' : link.label // Cambia los "labels"
                                }}
                            />
                        </li>
                    );
                })}
                </ul>
            </div>
         </div>
        ):(
            ''
        )}
    </AppLayout>
  );
}
