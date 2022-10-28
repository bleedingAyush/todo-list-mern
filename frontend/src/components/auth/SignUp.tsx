import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/context";
import { toast } from "react-toastify";
import { useSignUp } from "../../services/api";
import { IValues } from "../../types";

interface ISignUp {
  goToSignIn: () => void;
}

const SignUp = ({ goToSignIn }: ISignUp) => {
  const { signIn: signInContext } = useContext(AuthContext);
  const [values, setValues] = useState<IValues>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    mutate(values);
  };

  const { mutate, isLoading, isSuccess, data, isError, error }: any =
    useSignUp();

  useEffect(() => {
    if (isSuccess) signInContext(data.user?.id);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <span className="title">Sign Up</span>
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
        color="#fff"
        value={values.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit} className="sign-in-btn">
        {isLoading ? <span>Signing Up</span> : <span>Sign Up</span>}
      </button>
      <button name="signup" className="create-account" onClick={goToSignIn}>
        <span>Sign In</span>
      </button>
    </>
  );
};

export default SignUp;
