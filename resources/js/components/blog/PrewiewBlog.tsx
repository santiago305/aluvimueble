import CarouselBlog from "./CarouselBlog";
import DescriptionBlog from "./DescriptionBlog";
import TitleBlog from "./TitleBlog";

interface PreviewBlogProps {
    previewData: {
      title: string;
      description: string;
      cover_image: string;
      seo_meta: string;
      images: string[];
      videos: string[];
    };
  }

export default function PreviewBlog ({ previewData }: PreviewBlogProps) {
    return (
        <div 
        className="flex-1 min-w-[300px] select-none"
        >
            <div 
            className="w-full h-full border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-xl border flex flex-col"
            >
                <TitleBlog title={previewData.title}/>
                <div className="p-4">
                    <CarouselBlog images={previewData.images} />
                </div>
                <DescriptionBlog description={previewData.description} />
            </div>
        </div>
    )
}