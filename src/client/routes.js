import React from "react";
import Loadable from "react-loadable";

function Loading() {
  return <div>Loading...</div>;
}
export const Login = Loadable({
  loader: () => import("./components/login"),
  loading: Loading
});

export const Home = Loadable({
  loader: () => import("./components/home"),
  loading: Loading
});
