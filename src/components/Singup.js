import React, { useRef } from "react";
import { auth } from "../firebase";
import {useHistory} from 'react-router-dom'

const Singup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory()
console.log(emailRef)

  const signUp = e => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
      history.push("/Home")
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });

  };
  return (
    <div className="signin">
      <h1>Sign up</h1>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                required
                ref={emailRef}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="password"
                className="validate"
                required
                ref={passwordRef}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="waves-effect waves-light btn" onClick={signUp}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Singup;
