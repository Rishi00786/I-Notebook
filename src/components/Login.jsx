import React , {useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    })

    const log = useRef(null)

    const history = useNavigate();

    const handleonlogin=()=>{
        if (localStorage.getItem('token')) {
            history('/')
        }
        else{
            setcredentials({
                email: "",
                password: ""
            })
        }
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email : credentials.email,password: credentials.password})
      });
      const json = await response.json()
      console.log(json.AuthToken)
      if (json) {
        localStorage.setItem('token' , json.AuthToken)
        history("/")
      }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
      }

    return (
        <div className='container '>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} name='email' value={credentials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onChange} name='password' value={credentials.password} className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className='form-check' >
                <button onClick={handleonlogin}  type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>    
        </div>
    )
}

export default Login
