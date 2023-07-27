import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import exp from 'constants';

const HANDLERS = {
    INITIALIZE: 'INITIALIZE',
    RECOMMENDATION: 'RECOMMENDATION'
  };

export const DiaryContext = createContext({undefined});

export const DiaryProvider = (props) => {
    const { children } = props;
    const[result, setResult] = useState(null);
    const message = async()=> {
        try{
            let res = await axios.get('http://localhost:8001/api/input');
            let result = res.data;
            setResult(result);
        } catch(e){
            console.log(e);
        }
    };

    useEffect(() =>{
        message();
    }, []);

    const recomm = async(strInput) => {
        <Alert severity="success">This is a success alert — check it out!</Alert>
    };

    return (
        <DiaryContext.Provider
            value={
                {recomm}
            }
        >   
        {children}
        </DiaryContext.Provider>
    );
 
};

DiaryProvider.PropTypes = {
    children: PropTypes.node
};

export const useDiaryContext = () => useContext(DiaryContext);