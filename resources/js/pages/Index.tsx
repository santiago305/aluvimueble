import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Main from "@/pages/index/Main";

export default function Index () {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <Main />
            <Footer />
        </div>
    )
}