import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        Confirmpassword: ""
    })

    const history = useNavigate();

    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: credentials.name,email : credentials.email,password: credentials.password})
      });
      const json = await response.json()
      console.log(json)
        localStorage.setItem('token' , json.AuthToken)
        history("/")
    }

    const onChange = (e) => {

        setcredentials({ ...credentials, [e.target.name]: e.target.value })
      }

  return (
    <div>
      <div className='container'>
            <form onSubmit={handlesubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">UserName</label>
                    <input type="text" onChange={onChange} className="form-control" id="name" name='name' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Create Password</label>
                    <input type="password" onChange={onChange} className="form-control" name='password' id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" onChange={onChange} name='Confirmpassword' className="form-control" id="exampleInputConfirmPassword1"/>
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    </div>
  )
}

export default Signup
