import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext.js"
import Logo from "../imgs/tennislogo.png"

const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className='navbar'>
          <div className = 'container'>
            <div className = 'logo'>
            <Link to="/">
            <img src={Logo} alt =""/>
            </Link>
            </div>
            <div className = 'links'>
              <Link className="link" to="/?cat=grandslams">
                <h6>GRAND SLAMS</h6>
                 </Link>
                 <Link className="link" to="/?cat=1000level">
                <h6>1000 LEVEL</h6>
                 </Link>
                <Link className="link" to="/?cat=500level">
                <h6>500 LEVEL</h6>
                 </Link>
                <Link className="link" to="/?cat=250level">
                <h6>250 LEVEL</h6>
                 </Link>
                 <Link className="link" to="/?cat=challengers">
                <h6>CHALLENGERS</h6>
              </Link>
                 <Link className="link" to="/?cat=itf">
                <h6>ITF TOURNAMENTS</h6>
              </Link>
                <Link className="link" to="/?cat=juniors">
                <h6>JUNIORS</h6>
              </Link>
              <span>{currentUser?.username}</span>
              {currentUser ? ( 
                <span onClick={logout}>Logout</span> 
                ) : ( <Link className="link" to="/login">Login</Link>)}
              <span className="write">
                <Link to="/write">Write</Link>
              </span>
            </div>
          </div>
        </div>
    )
}

export default Navbar