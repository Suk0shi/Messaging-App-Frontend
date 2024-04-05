import Head from "../components/Head";
import { Link } from "react-router-dom";
import '../styles/Login.css'
import { useState } from "react";


function Login() {

  const [message, setmessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      fetch(`https://sukoshichat.adaptable.app/log-in`, {
        method: 'Post', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        let token = response.token;
        localStorage.setItem("SavedToken", 'Bearer ' + token);
        console.log(response);
        window.location.href = '/chat';
      })
      .catch((err) => {
        console.log(err.toString());
        setmessage("Incorrect Login Details")
      });
    }


    return (
        <>
            <Head></Head>
            <div className="loginBody">
                <h1>Login</h1>
                <p>{message}</p>
                <div className="login">
                    <form method="POST" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input name="username" placeholder="username" type="text" required/>
                        <label htmlFor="password">Password</label>
                        <input name="password" placeholder="password" type="password" required/>
                        <button>Login</button>
                    </form>
                    <div className="flex">
                        <p>Don't have an account?</p>
                        <Link to="/SignUp">
                            Sign Up here
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login