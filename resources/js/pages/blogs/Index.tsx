import FlashMessage from "@/components/flashMessage";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Block',
        href: route('blogs.index')
    },
];


export default function IndexBlogs (){

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head 
            title="Blogs" 
            />
            <div 
            className="relative w-full h-full"
            >
                <FlashMessage />
                <div
                className="w-full h-full p-4"
                >
                    hola
                </div>
            </div>
        </AppLayout>
    )
}