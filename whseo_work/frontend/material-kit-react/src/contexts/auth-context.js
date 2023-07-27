import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes, { bool } from 'prop-types';

import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });
export const UserContext = createContext({username : ""});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const [username, setUsername] = useState('');
  const [loginState, setLoginState] = useState(Boolean);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };


  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (name, password) =>{
    try{      
        const res = await axios.post('http://localhost:8001/api/auth/login',{
            name : name,
            password : password
        });
        if(res.data.status == "None"){
          setLoginState(false);
          throw new Error('Please check your name and password');
          
        }
        else{
          setLoginState(true);
          window.sessionStorage.setItem('authenticated', 'true');
        }
        
        const user = {
          id: '5e86809283e28b96d2d38537',
          avatar: '/assets/avatars/avatar-anika-visser.png',
          name: name,
          email: 'anika.visser@devias.io'
        };

        setUsername(name);

        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });

    }catch(e){
      console.log(e);
      //alert(e);
    }
  }

  /*
  const signIn = async (email, password) => {

    if (email !== 'demo@devias.io' || password !== 'Password123!') {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };*/

/*
  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };
*/
  
  const signUp = async (name, password) => {
    
    try{      
      const res = await axios.post('http://localhost:8001/api/auth/register',{
          name : name,
          password : password
      });
      //alert(res.data);

    }catch(e){
      console.log(e);
      throw new Error('Sign up is not implemented');
      //alert(e);
    }
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        username,
        loginState
      }}
    >
      {children}
    </AuthContext.Provider>

  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
