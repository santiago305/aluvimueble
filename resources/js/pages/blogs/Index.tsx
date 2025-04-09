import FlashMessage from "@/components/flashMessage";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blogs',
        href: route('blogs.index')
    },
];


export default function IndexBlogs (){

    return (
        <>
            <FlashMessage />
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head 
                title="Blogs" 
                />
                    
                    <div
                    className="w-full h-full p-4"
                    >
                        hola
                    </div>
            </AppLayout>
        </>
    )
}