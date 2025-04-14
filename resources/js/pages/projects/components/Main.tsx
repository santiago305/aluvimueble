import { BlogsListProps } from "@/types/blogs";
import ProjectsCard from "./Card";

export default function main ({blogs, meta}: BlogsListProps) {
    return (
        <>
            <div className="w-full h-auto flex p-10">
                <h3 className="m-auto text-3xl text-center md:text-5xl md:text-start font-medium ">Nuestros trabajos son de calidad</h3>
            </div>
            <div className="w-full h-full flex gap-7 flex-wrap p-7 justify-center items-center">
                {blogs.map((blog) => (
                    <ProjectsCard key={blog.id} blogs={blog} />
                ))}
            </div>

            { blogs.length && meta && meta.current_page > 1  ?(
            <div className="flex w-full gap-4 p-4 justify-center items-center">
                <div className="pagination">
                    <ul className="flex space-x-2">
                    {meta?.links.map((link, index) => {
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
        </>

    )
}