import React from "react";
import { render } from "react-testing-library";

import Home from "../../pages/home";

test("that home renders without errors", () => {
  const comp = render(<Home />);
  expect(comp).toBeTruthy();
});
