import FormCreateBlog from "@/components/blog/FormCreateBlog";
import PreviewBlog from "@/components/blog/PrewiewBlog";
import FlashMessage from "@/components/flashMessage";
import { BlogFormProvider } from "@/hooks/FormBlogContext";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { BlogsProps } from "@/types/blogs";
import { Head } from "@inertiajs/react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit blog',
        href: ''
    },
];
export default function UpdateBlogs ({ blogs }: BlogsProps){
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Update ${blogs?.title}`} />
            <FlashMessage/>
            <BlogFormProvider>
                    <div 
                    className="flex h-full flex-1 flex-wrap-reverse  gap-4 rounded-xl p-4"
                    >
                        <PreviewBlog  />
                        <FormCreateBlog mode='put' blogs={blogs} />
                    </div>
            </BlogFormProvider>
        </AppLayout>
    )
}