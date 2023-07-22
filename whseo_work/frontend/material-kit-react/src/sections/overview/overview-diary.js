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
    
  const onChange = (e) => {
    setText(e.target.value);
    setInputCount(e.target.value.length);
  };

  const onClick = () => {
    //alert(text);
    try{
        //diary.recomm(text);
        postText();
    }
    catch(err){

    }

  };

  async function postText_back(){
    try{      
        const res = await axios.post('http://localhost:8001/recomm_music_back',{
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
        const res = await axios.post('http://localhost:8001/recomm_music',{
            text : text
        });
        
        setMusicList(res.data.musicList);
        setUrlList(res.data.urlList);
        setText('');

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

  return (
    <Card sx={sx}>
        <CardContent>
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
           
               <Carousel
                autoPlay='true'
                interval={2000}
                >
                
                <Paper> <YouTube videoId= {urlList[0]} opts={opts}  /> 
                <Button onClick={() => { setheart2(!heart2);}} > {heart2 ? <FavoriteIcon fontSize='large' color='red'/> : <FavoriteBorderIcon fontSize='large'/>}</Button>
                </Paper>
                <Paper> <YouTube videoId= {urlList[1]} opts={opts} /> 
                  <FavoriteBorderIcon  sx={{ color: pink[500] }} fontSize='large' >
                  </FavoriteBorderIcon>
                </Paper>
                <Paper> <YouTube videoId= {urlList[2]} opts={opts} />
                  <FavoriteBorderIcon  sx={{ color: pink[500] }} fontSize='large' >
                  </FavoriteBorderIcon>
                  </Paper>
                  
                  
               </Carousel>

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
    sx: PropTypes.object
}