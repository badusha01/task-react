
import React from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Field, useFormik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const validate = (values) => {
  const errors = {};
  if(!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email Address'
  }
  
  if(!values.password){
    errors.password = 'Required';
  } 
  else if (!/[a-zA-Z0-9]{3}/.test(values.password)){
    errors.password = 'Invalid Password';
  }

  return errors;
}


function Login() {
  
  let location = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async(values) => {
      // console.log(values);
      try{
      const res = await axios.post("http://localhost:4000/authenticate/login", values);
      console.log(res)
      // localStorage.setItem('token', res.data.token);
      location('/home');

      } catch(e) {
        console.log(e);
        if(e.response.data.error)
        alert('Invalid Email or Password')
      }

      

    },
  })

  return (
      <div>
        <div className="login-form-container">
          <h1 className="heading">Login</h1>
    
          
            <form onSubmit={formik.handleSubmit}>
              <div className="input-container">
                <input id="email" name='email' type="text" placeholder="Enter Email" label="email" onChange={formik.handleChange} value={formik.values.email} />
                {formik.errors.email ? <div className='error-msg'>{formik.errors.email}</div> : null}
              </div>
              <div className="input-container">
                <input id='password' name='password' type="password" placeholder="Password" label="password" onChange={formik.handleChange} value={formik.values.password}/>
                {formik.errors.password ? <div className='error-msg'>{formik.errors.password}</div> : null }
             
              </div>
    
              <div className="input-container">
                <button  type="submit">
                  Login
                </button>
    
                <div>
                  Don't have an account <Link to="/signup">Sign Up Here</Link> here
                </div>
              </div>
            </form>
          
        </div>
   </div>
  
  )
}

export default Login;








