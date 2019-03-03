import React from "react";
import { render } from "react-testing-library";

import EditReminder from "../edit-reminder";

test("that it renders without errors", () => {
  render(<EditReminder/>);
});