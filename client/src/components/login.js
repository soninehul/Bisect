import React from 'react';
import '../styles/signup.css';
import  Header  from './Header';
export const Login = (props)=>{
    return(
        <div>
            <Header/>
        <div className = "container signup">
      
        <div className = "signup-logo">
      {/* <img  src={require("../images/logo.png")} alt="" /> */}
      </div>


      <div className = "signup-form">
        <h3>WELCOME TO BISECT</h3>
        <label htmlFor="">Email address</label>
        <input id = "email" onChange = {props.input} className = "form-control" type="text"/>

        <label htmlFor="">Password</label>
        <input id = "password" onChange = {props.input} className = "form-control" type="password"/>

      {props.sts && <p style = {{color: "red"}}><i class="fas fa-exclamation-circle"></i> Invalid Email or Password</p>}
       <button onClick = {props.login} className = "btn">Log In</button>
     </div>
     </div>
     </div>
    )
} 