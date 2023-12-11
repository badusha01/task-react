import React, { useEffect, useState } from "react";
import "./UpdateUser.css";
import { useFormik } from "formik";

import { Form, Link, useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";


const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username?.length < 4) {
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

  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Required";
  } else if (values.passwordConfirm?.length < 6) {
    errors.passwordConfirm = "Must be 6 characters or more";
  } else if (!/[a-zA-Z0-9]{3}/.test(values.passwordConfirm)) {
    errors.passwordConfirm = "Invalid password";
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Password and Password Confirm should match";
  }

  return errors;
};

const validateFn = (values) => {
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

  if (!values.role) {
    errors.role = "Required";
  }

  return errors;
};

function UpdateUser() {
  
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [passwordChange, setPasswordChange] = useState(false);

  const fetchUsers = async() => {
    try {
      // const token = localStorage.getItem('token');
      // const authToken = `Bearer ${token}`;
      const result = await axios.get(`http://localhost:4000/authenticate/get-user/${id}`, 
      // {
      //   headers: {
      //     Authorization: authToken,
      //   }
      // }
      );
      console.log(result.data.user);
      setUser(result.data.user);


    } catch(e) {
     console.log(e);
    }
    
  }

  const formik = useFormik({
    initialValues: {
      username: user.username ? user.username : "",
      email: user.email ? user.email : "",
      curPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    enableReinitialize: true,
    validate: passwordChange ? validate : validateFn,
    onSubmit: async (values) => {
      const DbData = JSON.stringify({
        username: user.name,
        email: user.email,
        role: user.role,
      })
      const dataFromForm = JSON.stringify({
        username: values.username,
        email: values.email,
        role: values.role,
      })

      if(!passwordChange && DbData === dataFromForm)
      return alert('No Details were changed');

      let FormData = {};
      if(!passwordChange) {
        FormData.username = values.username;
        FormData.email = values.email;
        FormData.role = values.role;
      } else {
        FormData = {...values};
      }
      console.log(FormData);

      try {
        await axiosInstance().patch(`/update-user/${id}`, FormData);
        navigate('/home');

      } catch(e) {
           console.log(e);
           if(e.response.data.error.code === 11000)
           alert('Email already in use');

           if(e.response.data.error === 'Incorrect password')
           alert('Incorrect password'); 
      }
    },
  });

  // const fetchUsers = async () => {
  //   try {
  //       const user = await axiosInstance().get(`/get-user/${id}`);
  //       const userData = user.data.data;
  //       setUser(userData);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="update-user-form-container">
        <h1 className="update-user-heading">Update User</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-container">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="user@gmail.com"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.values.email?.length >= 10 ? (
              <div className="update-user-error-msg">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input-container">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            ></input>
            {formik.errors.username && formik.values.username?.length >= 2 ? (
              <div className="update-user-error-msg">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="input-container">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.values.password?.length > 3 ? (
              <div className="update-user-error-msg">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="input-container">
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="Password Confirm"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            />
            {formik.errors.passwordConfirm &&
            formik.values.passwordConfirm?.length > 3 ? (
              <div className="update-user-error-msg">
                {formik.errors.passwordConfirm}
              </div>
            ) : null}
          </div>

          <div className="input-container">
            {
              <button
                type="submit"
                className={
                  formik.isValid && formik.dirty ? "" : "update-user-btn-active"
                }
              >
                Update
              </button>
            }

          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;