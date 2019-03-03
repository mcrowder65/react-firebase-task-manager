import React from "react";
import { render } from "react-testing-library";

import SetReminder from "../set-reminder";

test("that it renders without errors", () => {
  render(<SetReminder/>);
});