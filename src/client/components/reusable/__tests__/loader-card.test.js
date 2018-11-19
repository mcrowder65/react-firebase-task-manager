import React from "react";
import { render } from "react-testing-library";

import LoaderCard from "../loader-card";
import { StateProvider } from "../../state-utils";

test("that it mounts with no errors", () => {
  const comp = render(
    <StateProvider>
      <LoaderCard />
    </StateProvider>
  );
  expect(comp).toBeTruthy();
});
