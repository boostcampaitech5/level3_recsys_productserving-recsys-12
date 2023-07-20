import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@mui/material/Button';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
const sections = [

];

const mainFeaturedPost = {
  title: '오늘 당신의 감자튀김',
  TextField:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  Button : 'submit'
};
const artist = 'abc'
const title = 'abc'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="음악 추천추천~" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost}>
          </MainFeaturedPost>
          <Grid container spacing={5} sx={{ mt: 3 }}>
          </Grid>
        </main>
      </Container>
      <>
      <Typography 
      sx={{
        position: 'relative',
        p: { md: 3 },
        pl: { md: 30 },
      }}
      variant="h4" color="inherit" >
        이런 노래는 어떠세요?
      </Typography>
      
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='color1'>
          Artist : {artist} 
          Title : {title}
        </SwiperSlide>
        <SwiperSlide className='color2'></SwiperSlide>
        <SwiperSlide className='color3'></SwiperSlide>
        <SwiperSlide className='color4'>Slide 4</SwiperSlide>
        <SwiperSlide className='color5'>Slide 5</SwiperSlide>
        <SwiperSlide className='color6'>Slide 6</SwiperSlide>
        <SwiperSlide className='color7'>Slide 7</SwiperSlide>
        <SwiperSlide className='color8'>Slide 8</SwiperSlide>
        <SwiperSlide className='color9'>Slide 9</SwiperSlide>
      </Swiper>
    </>
    <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
    
  );
}