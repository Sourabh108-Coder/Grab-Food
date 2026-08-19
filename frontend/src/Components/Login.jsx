import React, { useEffect, useState } from 'react'
import { SlClose } from "react-icons/sl";
import axios from "axios";
import { useContext } from 'react';
import { Storecontext } from '../Context/Storecontext';

const Login = ({showlogin}) => {

    const url="http://localhost:4000";
    const{settoken}=useContext(Storecontext);

    const[loginstate,setloginstate]=useState("signup");

    const[formdata,setform]=useState(
        {
            name:"",
            email:"",
            password:"",
        }
    )

    const onchangehandler=(event)=>
    {
        const{name,value}=event.target;

        setform((prev)=>{
            return{
                ...prev,
                [name]:value,
            }
        })
    }

    const onlogin=async(event)=>
    {
        event.preventDefault();
        
        let newurl=url;

        if(loginstate=="login")
        {
            newurl+="/api/v1/grabfood/login";
        }

        else
        {
            newurl+="/api/v1/grabfood/register";
        }

        const res=await axios.post(newurl,formdata);

        if(res.data.success)
        {
            settoken(res.data.data);
            localStorage.setItem("token",res.data.data);
            console.log(res.data.data)
            showlogin(false);
            console.log("bruhh !!!");
        }

        else
        {
            alert(res.data.message);
        }
    }

  return (
    <div className={loginstate=="login"?'entry-point':'entry-point2'}>
     <form className='form1' onSubmit={onlogin}>

        {
            loginstate=="login"?
            <div className='heading'>
                <h1>Log In</h1>
                <div><SlClose className='icon' onClick={()=>showlogin(false)}/></div>
            </div>:
            <div className='heading'>
                <h1>Sign Up</h1>
                <div><SlClose className='icon' onClick={()=>showlogin(false)}/></div>
            </div>
        }
        <br/>

        {
            loginstate=="signup"?
            <div>
                 <label htmlFor="inp1">USERNAME</label>
                 <br/>
                <input type="text" id="inp1" required placeholder='Enter your First Name' value={formdata.name} onChange={onchangehandler} name="name" className='input2-field'/>
                 <br/><br/>
            </div>:

            <></>
        }
        
       

        <label htmlFor="inp2">EMAIL</label>
        <br/>
        <input type="email" id="inp2" required placeholder='Enter your Email Address' name="email" onChange={onchangehandler} value={formdata.email} className='input1-field'/>

        <br/><br/>

        <label htmlFor="inp3">PASSWORD</label>
        <br/>
        <input type="password" id="inp3" required  placeholder='Enter your Password' name="password" onChange={onchangehandler} value={formdata.password} className='input1-field'/>

        <br/><br/>

        {
            loginstate=="login"? <button className="custom-btn2 btn-78 buttons"><span onClick={()=>setloginstate("signup")}>Don't have any Account? Register</span></button>:
                                 <button className="custom-btn2 btn-78 buttons"><span onClick={()=>setloginstate("login")}>Already have an Account? Sign In</span></button>
        }

        <br/><br/>

        {
            loginstate=="login"? <button type="submit" className='button'>Sign In</button>:<button type="submit" className='button'>Create Account</button>
        }

     </form>
    </div>
  )
}

export default Login
