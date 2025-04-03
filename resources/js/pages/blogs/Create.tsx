import FormCreateBlog from "@/components/blog/FormCreateBlog";
import PreviewBlog from "@/components/blog/PrewiewBlog";
import TitleBlog from "@/components/blog/TitleBlog";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Block',
        href: '/block/create'
    },
];

export default function Create() {
    const [previewData, setPreviewData] = useState({
        title: '',
        description: '',
        cover_image: '',
        seo_meta: '',
        images: [] as string[],
        videos: [] as string[],
      });

      const handlePreviewBlogs = (
        title: string,
        description: string,
        cover_image: string,
        seo_meta: string,
        images: string[],
        videos: string[],
      ) => {
        setPreviewData({
          title,
          description,
          cover_image,
          seo_meta,
          images,
          videos,
        });
      };
      
      const handleFormChange = (field: string, value: string | string[]) => {
        setPreviewData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Block" />
            <div 
            className="flex h-full flex-1 flex-wrap-reverse  gap-4 rounded-xl p-4"
            >
                <PreviewBlog previewData={previewData} />
                <FormCreateBlog onFormChange={handleFormChange} onPreviewBlogs={handlePreviewBlogs} />
            </div>
        </AppLayout>
    );
}
