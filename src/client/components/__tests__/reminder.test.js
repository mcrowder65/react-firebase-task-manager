import React from "react";
import { render } from "react-testing-library";

import Reminder from "../reminder";

test("that it renders without errors", () => {
  render(<Reminder/>);
});