import React from "react";
import { mount } from "enzyme";

import LoaderCard from "../loader-card";

test("that it mounts with no errors", () => {
  const comp = mount(<LoaderCard />);
  expect(comp).toBeTruthy();
});
