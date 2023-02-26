import React from 'react';
import Image from 'next/image';

// material
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// components
import Header3 from 'components/Header3';

const Section = styled(Box)(({ theme }) => ({
  height: '100vh',
  backgroundColor: '#48773E',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 80px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: '0 24px',
    backgroundPosition: 'center',
  },
  [theme.breakpoints.down(321)]: {
    padding: '0 15px',
  },
}));

const Heading2 = styled(Typography)(({ theme }) => ({
  fontFamily: 'Bahnschrift',
  fontWeight: 400,
  fontSize: '56px',
  lineHeight: '70px',
  color: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
    lineHeight: '40px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  width: '56px',
  height: '56px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: '48px',
    height: '48px',
  },
}));

const HeroImage = () => (
  <ImageContainer>
    <Image
      src="/public/images/Hero-1.jpg"
      alt="arrow-down-circle"
      layout="fill"
      objectFit="contain"
      quality={100}
    />
  </ImageContainer>
);

const Hero = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Header3 logo="original" />
      <Section>
        <Heading2>Hero Section</Heading2>
        {/* <HeroImage /> */}
      </Section>
    </Box>
  );
};

export default Hero;
