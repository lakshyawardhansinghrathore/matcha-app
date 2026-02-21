import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-black min-h-screen">
      <Navbar />
      <HeroCanvas />
      <ProductGrid />
      <Footer />
    </main>
  );
}
