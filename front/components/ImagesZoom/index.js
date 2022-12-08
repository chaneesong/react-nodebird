import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import {
  Global,
  Overlay,
  Header,
  CloseButton,
  SlickWrapper,
  ImageWrapper,
  Indicator,
} from './styles';
import { BACKEND } from '../../utils/factory';

const ImagesZoom = ({ images, onClose }) => {
  const [CurrentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseButton onClick={onClose}>X</CloseButton>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <ImageWrapper key={`${BACKEND}/${image.name}`}>
                <img src={`${BACKEND}/${image.name}`} alt={image.name} />
              </ImageWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {CurrentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
