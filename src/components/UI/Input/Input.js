import React from "react";

export const Input = (props)=>{
    const onChangeHandler = (event)=>{
        props.onChange(event);
    }
    const onBlurHandler=()=>{
        props.onBlur();
    }
    return(
        <div className={props.className}>
            <label htmlFor={`${props.inputType}`}>{props.labelContent}</label>
            <input type={`${props.inputType}`} id={`${props.inputId}`}
            value={props.value} 
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            placeholder={props.placeholder}
            />
        </div>
    );
}
