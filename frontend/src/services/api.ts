import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { signIn, signUp } from "supertokens-web-js/recipe/emailpassword";
import { IValues, ITodo } from "../types";

const BASE_URL = process.env.REACT_APP_API_URL;

const postTodo = (todo: object) => {
  return axios.post(`${BASE_URL}/todo`, todo);
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(postTodo, {
    onSuccess: async (newTodo) => {
      const { data } = newTodo;
      queryClient.setQueryData("todos", (old: any) => {
        return { ...old, data: [data?.data, ...old?.data] };
      });
    },
  });
};

export const fetchTodos = () => {
  return axios.get(`${BASE_URL}/todos`);
};

const postDeleteTodo = (_id: string) => {
  return axios.post(`${BASE_URL}/delete`, null, { params: { _id } });
};

const updateIsTodoCompleted = (todo: ITodo) => {
  return axios.post(`${BASE_URL}/completeTodo`, null, {
    params: { _id: todo?._id, isCompleted: todo?.isCompleted },
  });
};

export const useUpdateCompletedTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(updateIsTodoCompleted, {
    onMutate: async (todo) => {
      await queryClient.cancelQueries("todos");
      const previousTodos = queryClient.getQueryData("todo");
      queryClient.setQueryData("todos", (old: any) => {
        const data = old?.data as Array<ITodo>;
        const filteredData = data.map((item) => {
          if (item?._id == todo._id) {
            return { ...item, isCompleted: todo?.isCompleted };
          } else {
            return item;
          }
        });
        return { ...old, data: [...filteredData] };
      });
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData("todos", context?.previousTodos);
      toast.error("Something went wrong");
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(postDeleteTodo, {
    onMutate: async (_id) => {
      await queryClient.cancelQueries("todos");
      const previousTodos = queryClient.getQueryData("todos");
      queryClient.setQueryData("todos", (old: any) => {
        const data = old?.data;
        const filteredData = data.filter((item: ITodo) => item?._id != _id);

        return { ...old, data: [...filteredData] };
      });
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData("todos", context?.previousTodos);
      toast.error("Something went wrong. Could not delete");
    },
  });
};

const signInUser = (values: IValues) => {
  const { email, password } = values;
  return signIn({
    formFields: [
      {
        id: "email",
        value: email,
      },
      {
        id: "password",
        value: password,
      },
    ],
  });
};

export const useSignIn = () => {
  return useMutation(signInUser, {
    onSuccess: async (data, variables) => {
      const { status } = data;

      if (status === "FIELD_ERROR") {
        throw new Error("Please fill all the fields");
      } else if (status == "WRONG_CREDENTIALS_ERROR") {
        throw new Error("Email or password is invalid");
      } else if (status == "OK") {
        return data;
      }
    },
  });
};

const signUpUser = (values: IValues) => {
  const { email, password } = values;
  return signUp({
    formFields: [
      {
        id: "email",
        value: email,
      },
      {
        id: "password",
        value: password,
      },
    ],
  });
};

export const useSignUp = () => {
  return useMutation(signUpUser, {
    onSuccess: async (data) => {
      const { status } = data;

      if (status === "FIELD_ERROR") {
        throw new Error("Please fill all the fields");
      } else if (status == "OK") {
        return data;
      }
    },
  });
};
