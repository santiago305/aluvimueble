import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Block',
        href: route('blogs.index')
    },
];

export default function UpdateBlogs (){
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update blog" />
            'hola aca el blog que vamos a modificar'
        </AppLayout>
    )
}