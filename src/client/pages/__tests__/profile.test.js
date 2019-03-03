import React from "react";
import { render } from "react-testing-library";

import Profile from "../profile";

test("that it renders without errors", () => {
  render(<Profile/>);
});