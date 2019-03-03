import React from "react";
import { render } from "react-testing-library";

import Home from "../home";

test("that it renders without errors", () => {
  render(<Home/>);
});