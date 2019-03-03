import React from "react";
import Loadable from "react-loadable";

function Loading() {
  return <div>Loading...</div>;
}

const withLoadable = (loader) =>
  Loadable({
    loader,
    loading: Loading,
  });

export const Login = withLoadable(() => import("./pages/login"));
export const Home = withLoadable(() => import("./pages/home"));
export const Signup = withLoadable(() => import("./pages/signup"));
export const Profile = withLoadable(() => import("./pages/profile"));
export const AddReminder = withLoadable(() => import("./pages/add-reminder"));
