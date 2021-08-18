import React, { useState } from 'react'
import './Carousel.scss'

function Carousel({ images }) {
  const [current, setCurrent] = useState(0)
  const length = images.length
  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }
  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  return (
    <div className="Carousel">
      <div onClick={prevImage} className="Carousel__arrow--left ">
        <i className="fas fa-chevron-left Carousel--icon"></i>
      </div>
      <div onClick={nextImage} className="Carousel__arrow--right">
        <i className="fas fa-chevron-right Carousel--icon"></i>
      </div>
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className={index === current ? 'slide active' : 'slide'}
          >
            {index === current && (
              <img className="slide--image" src={image} alt="product" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Carousel
//<i class="fas fa-chevron-left"></i>
