import { useBlogForm } from "@/hooks/FormBlogContext.tsx";
import CarouselBlog from "./CarouselBlog";
import DescriptionBlog from "./DescriptionBlog";
import TitleBlog from "./TitleBlog";
import VideoBlog from "./VideoBlog";

export default function PreviewBlog () {
    const { data } = useBlogForm();
    return (
        <div 
        className="flex-1 min-w-[300px] select-none"
        >
            <div 
            className="w-full h-full border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-xl border flex flex-col"
            >
                <TitleBlog title={data.title}/>
                <div className="p-4">
                    <CarouselBlog images={data.image_previews} />
                </div>
                <DescriptionBlog description={data.description} />
                <div className="p-4">
                    <VideoBlog video={data.video_previews} />
                </div>
            </div>
        </div>
    )
}