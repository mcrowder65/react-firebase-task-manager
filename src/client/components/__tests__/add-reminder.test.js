import React from "react";
import { render } from "react-testing-library";

import AddReminder from "../../pages/add-reminder";

test("that home renders without errors", () => {
  render(<AddReminder />);
});
