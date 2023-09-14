import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"

export default function Login() {
  const [credential, setcredential] = useState({email:"",password:""})
  let nagivate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginUser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:credential.email, password:credential.password} )
    });
    const json = await response.json()
    console.log(json);
    if(!json.success) {
      alert("Enter valid Credentials")
    }
    if(json.success) {
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      nagivate("/")
    }

  }

  const onChange = (event)=>{
    setcredential({...credential, [event.target.name]:event.target.value})
  }
  return (
    <div >
    
    <div className="container" style={{display:"flex", justifyContent:"center", alignContent:"center", marginTop:"12rem"}}>
      <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} onChange={onChange} />
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>

        <Link to="/creatuser" className="m-3 btn btn-danger"> Create user</Link>
      </form>
      </div>
      </div>
    
    </div>
  )
}
