import React from "react";
import { render } from "react-testing-library";

import Index from "../../routes/add-reminder/add-reminder";

test("that home renders without errors", () => {
  render(<Index />);
});
