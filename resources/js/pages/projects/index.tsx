import Header from "@/components/header/Header";
import { BlogsListProps } from "@/types/blogs";
import { Head } from "@inertiajs/react";
import Footer from "@/components/footer/Footer";
import Main from "./components/Main";

export default function ProjectsIndex ({blogs, meta}: BlogsListProps) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Head title="Proyectos - aluvimueble"/>
            <Header />
            <Main blogs={blogs} meta={meta} />
            <Footer />
        </div>
    )
}