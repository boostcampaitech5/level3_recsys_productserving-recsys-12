import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

import { useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from 'src/hooks/use-auth';

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;
  const auth = useAuth();

  const[result, setResult] = useState('');
  
  const [listState, setListState] = useState(Boolean);

  async function getRecommMusciList(){
    try{      
        let url = "http://localhost:8001/api/recomm_musiclist/"+auth.username ;
        let res = await axios.get(url);
        let result = res.data;          
        if(result.data != "none}"){
          setResult(result);
          setListState(true);
          //alert(JSON.stringify(result));
        }
        else{
          setResult('');
          setListState(false);
        }
  
    }catch(e){
        //alert(e);
        console.log(e);
    }
  }
  
  useEffect(() =>{
    if(auth.username){
      getRecommMusciList();
    }
  }, []);
  

  return (
    
    <Card sx={sx}>
      <CardHeader title="추천된 음악 리스트"/>
      {listState &&
      <List>
        { result.map((result, index) => {
          const hasDivider = index < result.length - 1;
          //const ago = formatDistanceToNow(product.updatedAt);

          return (
            <ListItem
              divider={hasDivider}
              key={result.id}
            >
              <ListItemAvatar>
                {
                  products[0].image
                    ? (
                      <Box
                        component="img"
                        src={products[index].image}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={result.title}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={result.artist}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      }
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
