import React from "react";
import { mount } from "enzyme";

import Signup from "../signup";

test("that login mounts with no errors", () => {
  const comp = mount(<Signup />);
  expect(comp).toBeTruthy();
});
