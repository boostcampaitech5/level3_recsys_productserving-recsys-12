import PropTypes, { func } from 'prop-types';
import {TextField, Stack, Card ,CardContent, Typography, Button, Alert, Paper} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { pink } from '@mui/material/colors';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useDiary } from 'src/hooks/use-diary';
import { useCallback, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

import Carousel from 'react-material-ui-carousel';

import { useAuth } from 'src/hooks/use-auth';

export const OverviewDiary = (props) => {
    const router = useRouter();
    const diary = useDiary();
    const { sx } = props;
    const [text, setText] = useState('');
    let [inputCount, setInputCount] =useState(0);
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [url, setURL] = useState('');

    const [musicList, setMusicList] = useState('');
    const [urlList, setUrlList] = useState('');

    const [comment, setComment] = useState('');

    let [heart1, setheart1] = useState(false);
    let [heart2, setheart2] = useState(false);
    let [heart3, setheart3] = useState(false);
    
    const auth = useAuth();

  const onChange = (e) => {
    setText(e.target.value);
    setInputCount(e.target.value.length);
  };

  const onClick = () => {
    //alert(text);
    try{
      postText();
        
        //diary.recomm(text);
    }
    catch(err){

    }

  };

  async function postText_back(){
    try{      
        const res = await axios.post('http://localhost:8001/api/recomm_music_back',{
            text : text
        });
        setArtist(res.data.artist);
        setTitle(res.data.title);
        setURL(res.data.url);
        setText('');
        

    }catch(e){
        //alert(e);
        console.log(e);
    }
  }

  async function postText(){
    try{      
        const res = await axios.post('http://localhost:8001/api/recomm_music',{
            user_name : auth.username, content : text
        });
        
        setMusicList(res.data.musicList);
        setUrlList(res.data.urlList);
        setText('');
        setInputCount(0);
        setheart1(false);
        setheart2(false);
        setheart3(false);

    }catch(e){
        //alert(e);
        console.log(e);
    }
  }

  async function postDiray(){
    try{      
      const res = await axios.post('http://localhost:8001/api/diary_test',{
          user_name : auth.username, content : text
      });
      //alert(res.data);
    }catch(e){
      //alert(e);
      console.log(e);
  }
  
  }
    
const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };
  

let strCount = inputCount + " / 250자";

async function postHeart(index) {
 
  try{
      const res = await axios.post('http://localhost:8001/api/click_like',{
      artist : musicList[index][0], title : musicList[index][1], name: auth.username
  });
  
  }
  catch(err){

  }

};


  return (
    <Card sx={sx}>
        <CardContent>
        <h3> {auth.username} 님 환영합니다 </h3>
            <Stack
            alignItems="flex-start"
            direction="column"
            justifyContent="space-between"
            spacing={3}
            >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Diary"
                    multiline
                    sx={{
                        width: 600
                    }}
                    InputProps={{ sx: { height: 200 } }}
                    maxRows={10}
                    onChange={onChange}
                    value={text}
                    helperText = {strCount}
                    maxLength={250}
                    
                />
                <Button  
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                    onClick={onClick}
                    
                >
                recommendation
                </Button>
               {/*
                <YouTube
                videoId= {url} opts={opts} 
                 />
               */}
               
            </Stack>
   
            { urlList && <h4>당신을 위한 추천 노래</h4>}
            {urlList &&
               <Carousel
                autoPlay='true'
                interval={10000}
                >
                <CardContent> 
                  <h4> {musicList[0][0]} - {musicList[0][1]}</h4>
                  {<YouTube videoId= {urlList[0]} opts={opts}  /> }
                <Button 
                   size="large"
                   sx={{ mt: 3 }}
                   type="submit"
                   onClick = {() => { setheart1(!heart1); postHeart(0)}} > {heart1 ? <FavoriteIcon fontSize='large' sx={{ color: pink[500] }} /> : <FavoriteBorderIcon fontSize='large' sx={{ color: pink[500] }}/>}
                   like </Button>
                </CardContent>
                <CardContent> 
                <h4> {musicList[1][0]} - {musicList[1][1]}</h4>
                  {<YouTube videoId= {urlList[1]} opts={opts} /> }
                  <Button 
                   size="large"
                   sx={{ mt: 3 }}
                   type="submit"
                   onClick = {() => { setheart2(!heart2); postHeart(1)}} > {heart2 ? <FavoriteIcon fontSize='large' sx={{ color: pink[500] }} /> : <FavoriteBorderIcon fontSize='large' sx={{ color: pink[500] }}/>}
                   like </Button>
                </CardContent>
                <CardContent> 
                <h4> {musicList[2][0]} - {musicList[2][1]}</h4>
                  {<YouTube videoId= {urlList[2]} opts={opts} />}
                  <Button 
                   size="large"
                   sx={{ mt: 3 }}
                   type="submit"
                   onClick = {() => { setheart3(!heart3); postHeart(2)}} > {heart3 ? <FavoriteIcon fontSize='large' sx={{ color: pink[500] }} /> : <FavoriteBorderIcon fontSize='large' sx={{ color: pink[500] }}/>}
                   like </Button>
                  </CardContent>                  
               </Carousel>
              }
      
        </CardContent>
    </Card>

  );
}

function DiaryText(props){
    return(
        <h1>
            Diary Test : {props.update} 
        </h1>
    )
}

OverviewDiary.prototypes = {
    strInput : PropTypes.strInput,
    sx: PropTypes.object,
    username : PropTypes.username
}