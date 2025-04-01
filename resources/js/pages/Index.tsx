import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Main from "@/pages/index/Main";
import { BlogsProps,  } from '@/types/blogs';

export default function Index ({blogs}: BlogsProps) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <Main blogs={blogs} />
            <Footer />
        </div>
    )
}