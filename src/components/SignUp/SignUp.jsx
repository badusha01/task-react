import './SignUp.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';




const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 4) {
    errors.username = "Must be 4 characters or more";
  }

 
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password?.length < 6) {
    errors.password = "Must be 6 characters or more";
  } else if (!/[a-zA-Z0-9]{3}/.test(values.password)) {
    errors.password = "Invalid password";
  }
 
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword?.length < 6) {
    errors.confirmPassword = "Must be 6 characters or more";
  } else if (!/[a-zA-Z0-9]{3}/.test(values.confirmPassword)) {
    errors.confirmPassword = "Invalid password";
  } else if(values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password and Password Confirm should match";
  }
 
  return errors;
};



function SignUp() {

  let location = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
           const res = await axios.post("http://localhost:4000/authenticate/sign-up", values);
          //  localStorage.setItem('token', res.data.token)
          console.log(res);
           location("/home");
      } catch (e) {
          console.log(e);
      }
    },
  });

  return (
 <div>
  <div className="signUp-form-container1">
    <h1 style={{textAlign :"center", marginTop :"20px"}}>Register Here</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="input-container1">
        <input
          id='email'
          name='email'

          type="text"
          placeholder="Enter Email Id"
          value={formik.values.email}
          onChange={formik.handleChange}
          
        />
        {formik.errors.email && formik.values.email.length >= 10 ? (
              <div className="signup-error-msg">{formik.errors.email}</div>
            ) : null}
            
      </div>
      <div className="input-container1">
          <input
            id='username'
            name='username'
            type="text"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
         
         {formik.errors.username && formik.values.username.length >= 10 ? (
              <div className="signup-error-msg">{formik.errors.username}</div>
            ) : null}

        </div>
      <div className="input-container1">
        <input
          id='password'
          name='password'
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.values.password.length >= 10 ? (
              <div className="signup-error-msg">{formik.errors.password}</div>
            ) : null}
     
      </div>
      <div className="input-container1">
          <input
            id='confirmPassword'
            name='confirmPassword'
            type="password"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
           {formik.errors.confirmPassword && formik.values.confirmPassword.length >= 10 ? (
              <div className="signup-error-msg">{formik.errors.confirmPassword}</div>
            ) : null}

        </div>

      <div className="input-container1">
        <button className={formik.isValid && formik.dirty ? "btn" : "btn"}
          type="submit"  
         >Sign Up</button>
        
        

        <div>Already have an account <Link to="/">Login Here</Link></div>
      </div>
    </form>
  </div>

    </div>
  )
}

export default SignUp