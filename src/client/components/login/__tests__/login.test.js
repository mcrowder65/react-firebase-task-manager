import React from "react";
import { mount } from "enzyme";

import Login from "../index";

test("that login mounts with no errors", () => {
  const comp = mount(<Login />);
  expect(comp).toBeTruthy();
});
