import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
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

export const OverviewMusicList = (props) => {
  const { products = [], sx } = props;
  const auth = useAuth();

  const[result, setResult] = useState('');

  async function getRecommMusciList(){
    try{      
        let url = "http://localhost:8001/api/recomm_musiclist/"+auth.username ;
        let res = await axios.get(url);
        let result = res.data;          
        setResult(result);
        //alert(JSON.stringify(result));
  
    }catch(e){
        //alert(e);
        console.log(e);
    }
  }
  
  useEffect(() =>{
   //getRecommMusciList();
  }, []);

  return (
    
    <Card sx={sx}>
      <CardHeader title="음악 리스트" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = formatDistanceToNow(product.updatedAt);

          return (
            <ListItem
              divider={hasDivider}
              key={product.id}
            >
              <ListItemAvatar>
                {
                  product.image
                    ? (
                      <Box
                        component="img"
                        src={product.image}
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
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
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

OverviewMusicList.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
