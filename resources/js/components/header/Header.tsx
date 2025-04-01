import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full h-[80px] border-b bg-background/95 backdrop-blur flex select-none"
    >
      <Navbar />
    </header>
  );
}
