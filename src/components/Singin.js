import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Singin.css";
const Singin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const singIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {

        console.log(err);
      });
  };
  return (
    <div className="signin">
      <h1>Sign in</h1>
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
              <label htmlFor="first_name">Email</label>
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
          <button className="waves-effect waves-light btn" onClick={singIn}>
            Sign in
          </button>

          <p className="text">
            Not yet register?{" "}
            <Link to="/singup">
              <span className="signin__in">Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Singin;
