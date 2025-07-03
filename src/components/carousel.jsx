import { useState } from 'react';

export default function Carousel({ slides }) {
  const [slide, setSlide] = useState(0);

  return (
    <div className="carousel_content">
      <div
        className="carousel_track"
        style={{
          transform: `translateX(-${slide * 100}%)`,
        }}
      >
        {slides.map((slideObject, index) => (
          <div
            key={index}
            className="carousel_slide"
            style={{ backgroundImage: `url(${slideObject.image})` }}
          >
            <h2>{slideObject.title}</h2>
            <p>{slideObject.subtitle}</p>
          </div>
        ))}
      </div>
      <div className="carousel_buttons">
        {slides.map((slideObject, index) => (
          <button
            key={index}
            className={index == slide ? 'active' : ''}
            onClick={() => setSlide(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
