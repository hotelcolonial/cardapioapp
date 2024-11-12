"use client";

import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { LanguageOptions } from "@/state/api";

interface SlideItem {
  name: LanguageOptions;
  price: number;
  info: LanguageOptions;
}

interface Slide {
  title: LanguageOptions; // Cambiar a un objeto que contenga los idiomas
  picUrl: string;
  items: SlideItem[];
}

type Language = "pt" | "en" | "es";

interface PropType {
  slides: Slide[];
  options: Partial<EmblaOptionsType>;
  onSlideClick: (index: number) => void;
  activeIndex: number;
  language: Language;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, onSlideClick, activeIndex, language } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              className="embla__slide font-quicksand py-6"
              key={index}
              onClick={() => onSlideClick(index)}
            >
              <p
                className={`cursor-pointer text-center font-semibold text-gray-900 text-sm ${
                  activeIndex == index && "font-bold text-primary-green"
                }`}
              >
                {slide.title[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
