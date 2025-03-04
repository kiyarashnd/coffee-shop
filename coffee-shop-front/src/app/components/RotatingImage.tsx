// app/components/RotatingImage.tsx
import React from 'react';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

// Define the keyframes for the X-axis rotation
const rotateXAnimation = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

// A container to provide perspective for a 3D rotation effect
const ImageContainer = styled('div')({
  perspective: '1000px',
  display: 'inline-block', // Adjust as needed (inline-block, block, etc.)
});

// The styled image that will rotate infinitely along the X axis
const AnimatedImage = styled('img')({
  animation: `${rotateXAnimation} 15s infinite linear`,
  transformStyle: 'preserve-3d',
  display: 'block',
});

interface RotatingImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

const RotatingImage: React.FC<RotatingImageProps> = ({
  src,
  alt = 'Rotating image',
  width = '500',
  height = '500',
}) => {
  return (
    <ImageContainer>
      <AnimatedImage src={src} alt={alt} width={width} height={height} />
    </ImageContainer>
  );
};

export default RotatingImage;
