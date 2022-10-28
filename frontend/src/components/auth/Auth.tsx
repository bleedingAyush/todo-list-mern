import React, { useState, useContext, useEffect, useCallback } from "react";
import "./Auth.scss";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = () => {
  const [form, setForm] = useState("signIn");

  const goToSignIn = useCallback(() => {
    setForm("signIn");
  }, [form]);

  const goToSignUp = useCallback(() => {
    setForm("signUp");
  }, [form]);

  return (
    <div className="auth-container">
      {form == "signIn" ? (
        <SignIn goToSignUp={goToSignUp} />
      ) : (
        <SignUp goToSignIn={goToSignIn} />
      )}
    </div>
  );
};

export default Auth;
