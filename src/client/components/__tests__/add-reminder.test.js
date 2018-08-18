import React from "react";
import { mount } from "enzyme";

import AddReminder from "../add-reminder";

test("that home renders without errors", () => {
  const comp = mount(<AddReminder />);
  expect(comp).toBeTruthy();
});
