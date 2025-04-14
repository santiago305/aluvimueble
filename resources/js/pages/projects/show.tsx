import { BlogsProps } from "@/types/blogs";

export default function ProjectsShow ({blogs}: BlogsProps) {
    return (
        <>
        {blogs?.title}
        </>
    )
}