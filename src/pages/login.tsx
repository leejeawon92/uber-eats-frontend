import React from "react";
import { FormError } from "../components/form-error";
import { gql, useMutation, ApolloError } from '@apollo/client';
import { useForm } from "react-hook-form";
import nuberLogo from "../images/logo.svg";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}


export const Login = () => {
  const { register, getValues, formState: { errors }, handleSubmit } = useForm<ILoginForm>();
  // const [loginMutation, { data }] = useMutation(LOGIN_MUTATION, {variables:{email:'asd', password: '1234'}});
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const [loginMutation, { data: loginMutationResult }, loading] = useMutation(LOGIN_MUTATION, {onCompleted,});
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full"
        >
          <input
            {...register("email", { required: "This is required"})}
            name="email"
            required
            className="input"
            type="email"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("email", { required: "This is required" })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <button className="btn">{loading ? "Loading..." : "Log In"}</button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};