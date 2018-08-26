import React from "react";
import { mount } from "enzyme";

import LoaderCard from "../loader-card";
import { StateProvider } from "../../state-utils";

test("that it mounts with no errors", () => {
  const comp = mount(
    <StateProvider>
      <LoaderCard />
    </StateProvider>
  );
  expect(comp).toBeTruthy();
});
