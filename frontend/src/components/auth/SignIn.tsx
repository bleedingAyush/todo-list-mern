import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/context";
import { useSignIn } from "../../services/api";
import { toast } from "react-toastify";
import { IValues } from "../../types";

interface ISignIn {
  goToSignUp: () => void;
}

const SignIn = ({ goToSignUp }: ISignIn) => {
  const { signIn: signInContext } = useContext(AuthContext);
  const [values, setValues] = useState<IValues>({
    email: "",
    password: "",
  });

  const { mutate, isLoading, isSuccess, data, isError, error }: any =
    useSignIn();

  useEffect(() => {
    if (isSuccess) signInContext(data.user?.id);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const { message } = error;
      if (message) {
        toast.error(message);
      }
    }
  }, [isError]);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    mutate(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <span className="title">Sign In</span>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit} className="sign-in-btn">
        {isLoading ? <span>Signing In</span> : <span>Sign in</span>}
      </button>
      <button name="signup" className="create-account" onClick={goToSignUp}>
        <span>Sign Up</span>
      </button>
    </>
  );
};

export default SignIn;
