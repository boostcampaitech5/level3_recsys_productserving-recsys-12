import PropTypes, { func } from 'prop-types';
import {TextField, Stack, Card ,CardContent, Typography, Button, Alert} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCallback, useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const RecPage = (props) => {

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

  async function postText(){
    try{
          
        const res = await axios.post('http://localhost:8001/input',{
            text : text
            
        });
        
    }catch(e){
        alert("error!");
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
            </Stack>
        </CardContent>
    </Card>

  );
}


RecPage.prototypes = {
    strInput : PropTypes.strInput,
    sx: PropTypes.object
}
export default RecPage;