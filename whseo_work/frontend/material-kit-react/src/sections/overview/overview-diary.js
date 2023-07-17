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
    
    
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onClick = () => {
    alert(text);
    try{
        //diary.recomm(text);
        postText();
    }
    catch(err){

    }

  };

  const url = "http://localhost:8001/input";
  const bodyData = {
    "text" : "test"
  };
  const config = {"Content-Type": 'application/json'};

  
  async function postText(){
    
    axios.post(url, bodyData)
        .then(res => {
            localStorage.setItem("text", JSON.stringify(res.data.data.text))
           // navigate(`/`);
        })
        .catch(err => {
            alert("error!!!");
            console.log(err.response);
        })
      /*
    try{
        axios.post(
            url, {text : "test"}, config
        ).then(function(response){
            alert("success");
            console.log("");
            console.log("RESPONSE : " + JSON.stringify(response.data));
            console.log("");
        }).catch(
            error=>{
                console.log("ERROR : " + JSON.stringify(error));
                alert(error);
            }
        );
        
        const res = await axios.post('http://localhost:8001/input', {text : "test"}
        ).then(function(response){
            alert("success!");
        }).catch(
            error=> {
                alert(error);
            }
        );
        
        const res = await axios.post('http://localhost:8001/input',{
            text : "react push to fastapi"
        });
    }catch(e){
        alert("error!");
    }
    */
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