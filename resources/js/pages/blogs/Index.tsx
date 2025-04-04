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
            <Head title="Blogs" />
            'hola aca mostraremos todos los blogs de 15 en 15'
        </AppLayout>
    )
}