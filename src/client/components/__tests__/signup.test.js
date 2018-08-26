import React from "react";
import { mount } from "enzyme";

import Signup from "../signup";
import { StateProvider } from "../state-utils";

test("that login mounts with no errors", () => {
  const comp = mount(
    <StateProvider>
      <Signup />
    </StateProvider>
  );
  expect(comp).toBeTruthy();
});
