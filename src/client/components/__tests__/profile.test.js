import React from "react";
import { mount } from "enzyme";

import Profile from "../profile";

test("that login mounts with no errors", () => {
  const comp = mount(<Profile />);
  expect(comp).toBeTruthy();
});
