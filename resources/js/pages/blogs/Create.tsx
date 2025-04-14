import FormCreateBlog from "@/components/blog/FormCreateBlog";
import PreviewBlog from "@/components/blog/PrewiewBlog";
import FlashMessage from "@/components/flashMessage";
import { BlogFormProvider} from "@/hooks/FormBlogContext";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Blog',
        href: route('blogs.create')
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blogs" />
            <FlashMessage/>
            <BlogFormProvider>
                    <div 
                    className="flex h-full flex-1 flex-wrap-reverse  gap-4 rounded-xl p-4"
                    >
                        <PreviewBlog  />
                        <FormCreateBlog mode='post' />
                    </div>
            </BlogFormProvider>
        </AppLayout>
    );
}