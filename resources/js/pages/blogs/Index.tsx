import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Block',
        href: route('blogs.index')
    },
];

interface PageProps {
    flash: {
      error?: string;
      success?: string;
    };
  }
export default function IndexBlogs (){
    const { flash } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />
            'hola aca mostraremos todos los blogs de 15 en 15'
            {flash.error && <div className="text-red-500">{flash.error}</div>}
            {flash.success && <div className="text-green-500">{flash.success}</div>}
        </AppLayout>
    )
}