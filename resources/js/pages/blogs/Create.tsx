import FormCreateBlog from "@/components/blog/FormCreateBlog";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Block',
        href: '/block/create'
    },
];

export default function Create() {
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Block" />
            <div 
            className="flex h-full flex-1 flex-wrap-reverse  gap-4 rounded-xl p-4"
            >
                {/* <div 
                className="flex-1 min-w-[300px] "
                >
                    <div 
                    className="p-5 w-full h-full border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border flex flex-col gap-8"
                    >
                        <TitleBlog title={data.title} />
                        <CarouselBlog />
                        <p>{data.description}</p>
                    </div>
                </div> */}
                <FormCreateBlog />
            </div>
        </AppLayout>
    );
}
