import React from "react";
import { render } from "react-testing-library";

import Login from "../login";

test("that it renders without errors", () => {
  render(<Login/>);
});