import React , { useEffect , useRef} from 'react'
import { Link , useLocation } from 'react-router-dom'
import Alert from './Alert'

const Navbar = () => {

  const location = useLocation()

  const form = useRef(null)
  const logout = useRef(null)

    const handleonlogout = async() => {
    await localStorage.removeItem('token');
  }
    

  

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">i-NoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form ref={form} className="d-flex " role="search">
      <Link to="/login" className="mx-3 btn btn-outline-primary" role="button" aria-disabled="true">Login</Link>
      <Link to="/signup" className=" mx-3 btn btn-outline-primary" role="button" aria-disabled="true">Signup</Link>
      </form> :<button onClick={handleonlogout} ref={logout}  type="submit" className="btn btn-primary">Logout</button>
}
    </div>
  </div>
</nav>
<div >
<Alert/>
</div>
    </div>
  )
}

export default Navbar
