import React from "react";
import { mount } from "enzyme";

import Home from "../home";

test("that home renders without errors", () => {
  const comp = mount(<Home />);
  expect(comp).toBeTruthy();
});
