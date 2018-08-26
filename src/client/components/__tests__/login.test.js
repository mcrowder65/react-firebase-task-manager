import React from "react";
import { mount } from "enzyme";

import Login from "../login";
import { StateProvider } from "../state-utils";

test("that login mounts with no errors", () => {
  const comp = mount(
    <StateProvider>
      <Login />
    </StateProvider>
  );
  expect(comp).toBeTruthy();
});
