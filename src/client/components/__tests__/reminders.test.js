import React from "react";
import { render } from "react-testing-library";

import Reminders from "../reminders";

test("that it renders without errors", () => {
  render(<Reminders/>);
});