import React from "react";
import "./App.scss";
import useStore from "./context/useStore";
import { AuthContext } from "./context/context";
import Auth from "./components/auth/Auth";
import Home from "./components/Home";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import { QueryClientProvider, QueryClient } from "react-query";
import LoadingContainer from "./components/LoadingContainer";
import Toast from "./libs/Toast";

const BASE_URL = process.env.REACT_APP_API_URL;
SuperTokens.init({
  appInfo: {
    appName: "Todo-list",
    apiDomain: `${BASE_URL}`,
    apiBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

const queryClient = new QueryClient();

const App = () => {
  const { authContext, todos, authState, addTodos } = useStore();

  if (authState?.isLoading)
    return (
      <>
        <div className="App">
          <div className="card">
            <div className="center">
              <LoadingContainer />
            </div>
          </div>
        </div>
      </>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="card">
          {authState?.isLoading == false && (
            <AuthContext.Provider
              value={{
                signIn: authContext.signIn,
                signOut: authContext.signOut,
                todos,
                addTodos,
              }}
            >
              {authState?.user !== null ? <Home /> : <Auth />}
            </AuthContext.Provider>
          )}
        </div>
        <Toast limit={3} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
