import React from "react";
import Loadable from "react-loadable";

function Loading() {
  return <div>Loading...</div>;
}

const LoadableComponent = Loadable({
  loader: () => import("./login"),
  loading: () => <div>Loading...</div>
});
export default LoadableComponent;
