import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Logo from '../components/Logo'
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("ayush@dhawan.com");
  const [password, setPassword] = useState("qwerty");
  const {login, isAuthenticated} = useAuth() 
  const navigate = useNavigate() 

  useEffect(function(){
    console.log(isAuthenticated)
    if(isAuthenticated) navigate('/app', {replace: true})
  }, [isAuthenticated, navigate])

  function handleLogin(e){
    e.preventDefault()
    if(email && password)login(email, password)

  }

  return (
    <>
    <main className={styles.login}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Logo />
    <PageNav />
    </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
        {/* <button onClick={handleLogin}>Login</button>
         */}
         <Button type='primary'>Login</Button>

        </div>
      </form>
    </main>
    </>
  );
}