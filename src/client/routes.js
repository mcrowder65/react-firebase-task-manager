import React from "react";
import Loadable from "react-loadable";

function Loading() {
  return <div>Loading...</div>;
}
const withLoadable = loader =>
  Loadable({
    loader,
    loading: Loading
  });
export const Login = withLoadable(() => import("./components/login"));
export const Home = withLoadable(() => import("./components/home"));
export const Signup = withLoadable(() => import("./components/signup"));
