import { call, put } from "redux-saga/effects";
import fetchMock from "fetch-mock";

import { setPing, } from "actions/index";
import { apiCall, pingServer } from "actions/sagas/ping-server";

describe("pingServer", () => {

  test("success", () => {
    const iter = pingServer();
    const ping = "hello";
    expect(iter.next().value).toEqual(call(apiCall));
    expect(iter.next(ping).value).toEqual(put(setPing(ping)));
    expect(iter.next().done).toEqual(true);
  });
  test("catch", () => {
    const iter = pingServer();
    const e = new Error("hello!");
    expect(iter.next().value).toEqual(call(apiCall));
    expect(iter.throw(e).value).toEqual(put(setPing(e.message)));
    expect(iter.next().done).toEqual(true);
  });
});
describe("apiCall", () => {
  test("api call", async () => {
    const response = "hello";
    fetchMock.mock("http://localhost:3000/ping", response);
    const result = await apiCall();
    expect(result).toEqual(response);

    fetchMock.restore();
  });
});