import React, { useState, useEffect, useReducer, useContext } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-content';
import { Input } from '../UI/Input/Input';

// The parameter 'state' is the previous email state and would be passed in by default...
// The parameter 'action' is a conventional parameter that can hold what ever value is needed on exection in the reducer function...
const emailReducer = (state, action) =>{
  // value-- a string type property that holds the email text passed from the email input field...
  // isValid -- a boolean type property that holds a conditional value(True or false) on validating 'value'[Checking if value includes an '@]...
  if(action.type === 'USER_INPUT' || action.type === 'INPUT_BLUR')
  {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  return {value: '', isValid: null};
};

const passwordReducer = (state, action) =>{
  // value-- a string type property that holds the password passed from the password input field...
  // isValid -- a boolean type property that holds a conditional value(True or false) on validating 'value'[Checking if value includes an '@]...
  if(action.type === 'USER_INPUT' || action.type === 'INPUT_BLUR')
  {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  return {value: '', isValid: null};
};


const Login = () => {
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  //using useReducer to manage enteredEmail and emailIsValid...
  const[emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  //using useReducer to manage enteredPassword and passwordIsValid...
  const[passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null})
  //This would be ran anytime there is changes made to the value stored in enteredEmail and enteredPassword...
  useEffect(()=>{
    const identifier= setTimeout(()=>{
      console.log("Checking form validity");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);
    
    //Use effect cleanup function...
    return ()=>{
      console.log('Cleanup');
      clearTimeout(identifier);
    }
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    // console.log(emailState.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR', val: emailState.value});
  };


  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    // console.log(event);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR', val: passwordState.value});
  };


  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
         <Input 
        className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        labelContent={`Email`}
        inputType={`email`}
        inputId = {`email`}
        inputValue = {emailState.value}
        placeholder = {`Type in your email...`}
        onChange ={emailChangeHandler}
        onBlur ={validateEmailHandler}
        />
        <Input 
        className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}
        labelContent={`Password`}
        inputType={`password`}
        inputId = {`password`}
        inputValue = {passwordState.value}
        placeholder = {`Type in your password...`}
        onChange = {passwordChangeHandler}
        onBlur = {validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
