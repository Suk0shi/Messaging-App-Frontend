import { Link, redirect, useNavigate } from "react-router-dom";
import '../styles/Head.css'

function Header({logout}) {
  const navigate = useNavigate();

  function logoutFunction() {
    localStorage.removeItem('SavedToken');
    navigate('/');
    
  }

  return (
    <>
      <header>
        <div className="title">
            <h1>Chat</h1>
        </div>
        <div className="pageLinks">
            {logout? <a href="#" onClick={logoutFunction}>Logout</a> : null}
        </div>
      </header>
    </>
  )
}

export default Header