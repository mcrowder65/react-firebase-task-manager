import React from "react";
import { render } from "react-testing-library";

import Signup from "../../pages/signup";
import { StateProvider } from "../state-utils";

test("that login mounts with no errors", () => {
  const comp = render(
    <StateProvider>
      <Signup />
    </StateProvider>
  );
  expect(comp).toBeTruthy();
});
