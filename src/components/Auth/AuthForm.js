import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLodding, setIsLodding] = useState(false);

  const enteredEmailRef = useRef()
  const enteredPasswordRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const submiSinuptHandler = async (event) => {
    
    try {
      const enteredEmail = enteredEmailRef.current.value;
      const enteredPassword = enteredPasswordRef.current.value;
      event.preventDefault()


      console.log(enteredEmail , enteredPassword)

      setIsLodding(true)

      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG525dQLh8AKxMmQHyiyUSkRG5YJkahPw', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setIsLodding(false)
      const data = await res.json();
      const msg = 'Account created'
      console.log('user', data.error.message);
      if (msg) {
        alert(msg)
      }
    } catch (error) {
      setIsLodding(false)
      alert(error.message);
      // Handle error cases, such as displaying an error message to the user
    }

  }

  const submiLogIntHandler = async(event) =>{
    event.preventDefault()
    console.log('login')

    try{
      const enteredEmail = enteredEmailRef.current.value;
      const enteredPassword = enteredPasswordRef.current.value;

      console.log('login' , enteredEmail , enteredPassword)
      setIsLodding(true)
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBG525dQLh8AKxMmQHyiyUSkRG5YJkahPw`, {
        method : 'POST',
        body : JSON.stringify({
          email : enteredEmail,
          password : enteredPassword,
          returnSecureToken: true
        }),
        headers :{
          'Content-Type' : 'application/json'
        }
      })

      setIsLodding(false)

      const data = await res.json()
      if(data.error){
        alert(data.error.message)
        console.log(data)
      }else{
        console.log(data.idToken)
      }
    }catch(error){
      console.log('error','here')
    }


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={isLogin ? submiLogIntHandler : submiSinuptHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={enteredEmailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={enteredPasswordRef}
            required
          />
        </div>

        {!isLodding && <button type='submit'>Submit</button>}
        {isLodding && <p>Loading...</p>}
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}

            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
