import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { AuthContext } from "./context";
import Session from "supertokens-web-js/recipe/session";
import { useMutation } from "react-query";
import axios from "axios";
import { ITodo } from "../types";

interface ILoginState {
  isLoading: boolean;
  user: null | string;
}

enum LoginKind {
  SIGNIN = "SIGNIN",
  SIGNOUT = "SIGNOUT",
}

interface LoginAction {
  type: LoginKind;
  user: null | string;
}

const useStore = () => {
  const initialLoginState: ILoginState = {
    isLoading: true,
    user: null,
  };
  const [todos, setTodos] = useState<ITodo[]>([]);

  const loginReducer = (prevState: ILoginState, action: LoginAction) => {
    switch (action.type) {
      case LoginKind.SIGNIN:
        return {
          ...prevState,
          user: action.user,
          isLoading: false,
        };
      case LoginKind.SIGNOUT:
        return {
          ...prevState,
          user: null,
          isLoading: false,
        };
    }
  };

  const [authState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (user: string) => {
        dispatch({ type: LoginKind.SIGNIN, user: user });
      },
      signOut: async () => {
        try {
        } catch (e) {}
        dispatch({ type: LoginKind.SIGNOUT, user: null });
      },
    }),
    []
  );

  const addTodos = useCallback(
    (todo) => {
      const isArray = todo instanceof Array;
      if (isArray) {
        setTodos([...todo]);
      } else {
        setTodos([todo, ...todos]);
      }
    },
    [JSON.stringify(todos)]
  );

  async function doesSessionExist() {
    if (await Session.doesSessionExist()) {
      let userId = await Session.getUserId();
      authContext.signIn(userId);
    } else {
      authContext.signOut();
    }
  }

  useEffect(() => {
    doesSessionExist();
  }, []);

  return { authState, authContext, todos, addTodos };
};

export default useStore;
