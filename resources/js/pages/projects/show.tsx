import { BlogsProps } from "@/types/blogs";
import { router } from "@inertiajs/react";
import { useEffect } from "react";

export default function ProjectsShow ({blogs}: BlogsProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            router.post(
                route('projects.incrementViews', blogs?.slug),
                {},
            );
        }, 10000);
        return () => clearTimeout(timer); 
    },[])
    return (
        <>
        {blogs?.title}
        </>
    )
}