import React,{useState, useEffect} from 'react';
import './App.css';

function App() {
   const initialValues = {email: "", password: "" };
   const [formValues, setFormValues] = useState(initialValues);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormValues({ ...formValues, [name]: value });
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
     setFormErrors(validate(formValues));
     setIsSubmit(true);
   };
 
   useEffect(() => {
     console.log(formErrors);
     if (Object.keys(formErrors).length === 0 && isSubmit) {
       console.log(formValues);
     }
   }, [formErrors]);
   const validate = (values) => {
     const errors = {};
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
     if (!values.email) {
       errors.email = "Email is required!";
     } else if (!regex.test(values.email)) {
       errors.email = "This is not a valid email format!";
     }
     if (!values.password) {
       errors.password = "Password is required";
     } else if (values.password.length < 4) {
       errors.password = "Password must be more than 4 characters";
     } else if (values.password.length > 10) {
       errors.password = "Password cannot exceed more than 10 characters";
     }
     return errors;


   };
 
  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ):(<div className="ui message"></div>)
     }

      <form onSubmit={handleSubmit}>
        <h1>Student Login</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
             type="text" 
             name="email" 
             placeholder="Enter Your Email" 
             value={formValues.email} 
             onChange={handleChange} />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input 
             type="password" 
             name="password" 
             placeholder="Enter Your Password" 
             value={formValues.password} 
             onChange={handleChange} />
          </div>
          <p>{formErrors.password}</p>
          <button className='form-input-btn' type='submit'>
          Sign up
        </button>
          <span className='form-input-Register'>  New Student?<a href='#'> Register Now</a></span>
        </div>
      </form>
    </div>
  );
}

export default App;
