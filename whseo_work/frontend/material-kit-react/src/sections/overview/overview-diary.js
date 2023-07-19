import PropTypes, { func } from 'prop-types';
import {TextField, Stack, Card ,CardContent, Typography, Button, Alert} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useDiary } from 'src/hooks/use-diary';
import { useCallback, useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const OverviewDiary = (props) => {
    const router = useRouter();
    const diary = useDiary();
    const { sx } = props;
    const [text, setText] = useState('');
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    
  const onChange = (e) => {
    setText(e.target.value);
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

  async function postText(){
    try{      
        const res = await axios.post('http://localhost:8001/recomm_music',{
            text : text
        });
        setArtist(res.data.artist)
        setTitle(res.data.title)
        setText('')

    }catch(e){
        //alert(e);
        console.log(e);
    }
  }

    


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
                    //inputProps={{sx : {height : 100}}}
                    sx={{height:300, width:300}}
                    maxRows={10}
                    onChange={onChange}
                    value={text}
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
                
               <h2>
                Update : {text}
               </h2>
               <h3>
                Response : {artist} {title}
               </h3>
            </Stack>
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