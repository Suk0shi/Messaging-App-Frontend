import Head from "../components/Head";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css'

function SignUp() {

    const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      fetch(`https://sukoshichat.adaptable.app/signUp`, {
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
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err.toString());
      });
    }


    return (
        <>
            <Head></Head>
            <div className="signUpBody">
                <h1>Sign Up</h1>
                <div className="signUp">
                    <form method="POST" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input name="username" placeholder="username" type="text" required/>
                        <label htmlFor="email">Email</label>
                        <input name="email" placeholder="email" type="email" required/>
                        <label htmlFor="password">Password</label>
                        <input name="password" placeholder="password" type="password" required/>
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input name="passwordConfirm" placeholder="password" type="password" required/>
                        <button>Sign Up</button>
                    </form>
                    <div className="flex">
                        <p>Already have an account?</p>
                        <Link to="/">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp