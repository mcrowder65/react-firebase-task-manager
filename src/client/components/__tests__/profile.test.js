import React from "react";
import { render } from "react-testing-library";

import Profile from "../profile";

test("that login mounts with no errors", () => {
  const comp = render(<Profile />);
  expect(comp).toBeTruthy();
});
