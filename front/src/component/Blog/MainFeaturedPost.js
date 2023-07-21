import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useState} from "react";
import './mainfeatured.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function MainFeaturedPost(props) {


  const { post } = props;
  const [text, setText] = useState('');
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');


  let [inputCount, setInputCount] =useState(0);
  const onChange = (e) => {
    setText(e.target.value);
    setInputCount(e.target.value.length);
  }

  async function postText(){
    try{      
        const res = await axios.post('http://localhost:8001/recomm_music',{
            text : text
        });
        setArtist(res.data.artist)
        setTitle(res.data.title)
        setUrl(res.data.url)
        setText('')

    }catch(e){
        console.log(e);
    }
  }



  
  const navigate = useNavigate();





  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        //backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 8 },
              pr: { md: 0 },
              bottom: 20,
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <textarea 
            className = 'input_box' 
            onChange={onChange} 
            value={text} 
            maxLength={250}
            size/>
            <p><span>{inputCount}</span><span>/250자</span></p>
            
          </Box>
          <Button 
          className = 'main_button'
          variant="outlined" 
          onClick={() =>
            {try{
              //diary.recomm(text);
              postText();
          }
          catch(err){
      
          }
            navigate("/RecPage", {
              state: { artist,title,url }
            })
          }}>
              {post.Button}
            </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    Button: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    TextField: PropTypes.string.isRequired
  }).isRequired,
};

export default MainFeaturedPost;