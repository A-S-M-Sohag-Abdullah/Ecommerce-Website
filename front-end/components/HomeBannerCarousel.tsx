"use client";
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
          <img src={image} alt={`Banner ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default HomeBannerCarousel;
