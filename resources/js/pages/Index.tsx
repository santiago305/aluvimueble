import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Main from "@/pages/index/Main";
import { BlogsProps,  } from '@/types/blogs';
import { Head } from "@inertiajs/react";

export default function Index ({blogs}: BlogsProps) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Head title="Aluvimueble"/>
            <Header />
            <Main blogs={blogs} />
            <Footer />
        </div>
    )
}