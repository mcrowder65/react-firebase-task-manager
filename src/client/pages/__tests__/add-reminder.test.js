import React from "react";
import { render } from "react-testing-library";

import AddReminder from "../add-reminder";

test("that it renders without errors", () => {
  render(<AddReminder/>);
});