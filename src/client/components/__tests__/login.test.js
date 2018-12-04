import React from "react";
import { render } from "react-testing-library";

import Login from "../../pages/login";
import { StateProvider } from "../state-utils";

test("that login mounts with no errors", () => {
  const comp = render(
    <StateProvider>
      <Login />
    </StateProvider>
  );
  expect(comp).toBeTruthy();
});
