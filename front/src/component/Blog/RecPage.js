import PropTypes, { func } from 'prop-types';
import {TextField, Stack, Card ,CardContent, Typography, Button, Alert} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useCallback, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import {useLocation,useNavigate } from 'react-router-dom';

export const RecPage = (props) => {

  const { sx } = props;
  const [text, setText] = useState('');
  
  const location = useLocation();
  console.log(location);
    
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onClick = () => {
    alert(text);
    try{
        //diary.recomm(text);
    }
    catch(err){

    }

  };


  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };
  
    


  return (
    <Card sx={sx}>
        <CardContent>
        <YouTube 
    videoId="Je5ejxnbQVc" opts={opts}  />
                <Button  
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                    onClick={onClick}
                >
                recommendation
                </Button>
                <div>
      <p>Text : {location.state.text}</p>
    </div>

        </CardContent>
       

    </Card>

  );
}


RecPage.prototypes = {
    strInput : PropTypes.strInput,
    sx: PropTypes.object
}
export default RecPage;