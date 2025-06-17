"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
type Props = {
  images: string[];
};
const HomeBannerCarousel = ({ images }: Props) => {
  return (
    <Carousel
      infiniteLoop={true}
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      interval={3000}
      transitionTime={500}
    >
      {images.map((image, index) => (
        <div key={index}>
          <Image
            width={800}
            height={300}
            src={image}
            alt={`Banner ${index + 1}`}
            className="w-full"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default HomeBannerCarousel;
