import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import YouTube from 'react-youtube';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './recpage.css';


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useLocation } from "react-router-dom";



export default function RecPage_t() {
    const opts = {
        height: '450',
        margin: '2',
        width: '700',
        playerVars: {
          autoplay: 1,
        },
      };

    const location = useLocation();
    console.log(location);


    let [heart1, setheart1] = useState(false);
    let [heart2, setheart2] = useState(false);
    let [heart3, setheart3] = useState(false);


 
  return (
    <>
    <Typography 
      sx={{
        position: 'relative',
        p: { md: 3 },
        pl: { md: 30 },
      }}
      variant="h3" color="inherit">
        당신을 위한 추천 노래
      </Typography>

      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide className='swiper'>
            <Grid>
            <YouTube 
            videoId={location.state.test1_u} opts={opts}/>
            <Typography
             variant="h2"
             margin={5}>
                {location.state.test1_a}의 {location.state.test1_t}
                <Button onClick={() => { setheart1(!heart1);}} > {heart1 ? <FavoriteIcon fontSize='large' color='red'/> : <FavoriteBorderIcon fontSize='large'/>}</Button></Typography>
               
            </Grid>
        

        </SwiperSlide>
        <SwiperSlide className='swiper'>
        <Grid>
            <YouTube 
            videoId={location.state.test2_u} opts={opts}  />
            <Typography
             variant="h2"
             margin={5}>
                {location.state.test2_a}의 {location.state.test2_t}
                <Button onClick={() => { setheart2(!heart2);}} > {heart2 ? <FavoriteIcon fontSize='large' color='red'/> : <FavoriteBorderIcon fontSize='large'/>}</Button></Typography>
            </Grid>
            
        </SwiperSlide>
        <SwiperSlide className='swiper'>
        <Grid>
            <YouTube 
            videoId={location.state.test3_u} opts={opts}  />
            <Typography
             variant="h2"
             margin={5}>
                {location.state.test3_a}의 {location.state.test3_t}
                <Button onClick={() => { setheart3(!heart3);}} > {heart3 ? <FavoriteIcon fontSize='large' color='red'/> : <FavoriteBorderIcon fontSize='large'/>}</Button></Typography>
            </Grid>
            
        </SwiperSlide>
      </Swiper>
    </>
  );
}
