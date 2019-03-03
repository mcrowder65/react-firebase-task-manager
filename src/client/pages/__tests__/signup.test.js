import React from "react";
import { render } from "react-testing-library";

import Signup from "../signup";

test("that it renders without errors", () => {
  render(<Signup/>);
});