import HomeBannerCarousel from "./HomeBannerCarousel";
import HomeBannerCategories from "./HomeBannerCategories";

export default function Home() {
  const images: string[] = ["/banner.png", "/banner.png"];
  return (
    <section id="home-banner">
      <div className="container mx-auto px-5 py-6">
        <div className="flex">
          <div className="w-1/5 border-e border-e-gray-300">
            <HomeBannerCategories />
          </div>

          <div className="w-4/5 px-10 relative">
            <HomeBannerCarousel images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
