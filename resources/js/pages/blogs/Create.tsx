import FormCreateBlog from "@/components/blog/FormCreateBlog";
import PreviewBlog from "@/components/blog/PrewiewBlog";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Block',
        href: route('blogs.create')
    },
];

export default function Create() {
    const [previewData, setPreviewData] = useState({
        title: '',
        description: '',
        seo_meta: '',
        cover_image: []as string[],
        images: [] as string[],
        videos: [] as string[],
      });

      const handlePreviewBlogs = (
        title: string,
        description: string,
        seo_meta: string,
        cover_image: string[],
        images: string[],
        videos: string[],
      ) => {
        setPreviewData({
          title,
          description,
          seo_meta,
          cover_image,
          images,
          videos,
        });
      };
      
      const handleFormChange = (field: string, value: string | string[]) => {
        setPreviewData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blogs" />
            <div 
            className="flex h-full flex-1 flex-wrap-reverse  gap-4 rounded-xl p-4"
            >
                {/* <PreviewBlog previewData={previewData} /> */}
                <FormCreateBlog onFormChange={handleFormChange} onPreviewBlogs={handlePreviewBlogs} />
            </div>
        </AppLayout>
    );
}
