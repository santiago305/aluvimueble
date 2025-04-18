import CarouselBlog from "@/components/blog/CarouselBlog";
import DescriptionBlog from "@/components/blog/DescriptionBlog";
import TitleBlog from "@/components/blog/TitleBlog";
import VideoBlog from "@/components/blog/VideoBlog";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { BlogsProps } from "@/types/blogs";
import { Head } from "@inertiajs/react";


export default function ProjectsShow ({blogs}: BlogsProps) {
    
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Head title={blogs?.title}>
            {blogs?.seo_meta && (
                <meta name="description" content={blogs?.seo_meta} />
            )}
            </Head>
            <Header />
            <main className="w-full flex-1 p-4 md:p-10 flex justify-center">   
                <div className="flex-1 max-w-[900px] h-full select-none">
                    <TitleBlog title={blogs?.title} />
                    {Array.isArray(blogs?.images) && blogs.images.length > 0 && (
                    <div className="p-4 select-auto">
                        <CarouselBlog images={blogs?.images} />
                    </div>
                    )}
                    <DescriptionBlog description={blogs?.description} />
                    {Array.isArray(blogs?.videos) && blogs.videos.length > 0 && (
                    <div className="p-4 select-auto">
                        <VideoBlog video={blogs.videos} />
                    </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
        
    )
}