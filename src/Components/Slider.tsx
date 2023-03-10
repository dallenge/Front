import { useMemo } from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlideWrapper = styled.section`
  position: relative;
`;

interface sliderProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
}

function Slick({ children, className, autoplay = true, speed = 500, loop = true }: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
    }),
    [autoplay, loop, speed],
  );
  return (
    <SlideWrapper className={className}>
      <Slider {...settings}>{children}</Slider>
    </SlideWrapper>
  );
}

export default Slick;
