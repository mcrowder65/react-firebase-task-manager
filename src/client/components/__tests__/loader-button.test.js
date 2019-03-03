import React from "react";
import { render } from "react-testing-library";

import LoaderButton from "../loader-button";

test("that it renders without errors", () => {
  render(<LoaderButton/>);
});