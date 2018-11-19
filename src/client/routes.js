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

export const Login = withLoadable(() => import("./routes/login"));
export const Home = withLoadable(() => import("./routes/home"));
export const Signup = withLoadable(() => import("./routes/signup"));
export const Profile = withLoadable(() => import("./routes/profile"));
export const AddReminder = withLoadable(() =>
  import("./routes/add-reminder/index")
);
