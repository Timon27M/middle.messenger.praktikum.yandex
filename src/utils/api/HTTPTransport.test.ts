import { expect } from "chai";
import sinon from "sinon";
import HTTPTransport from "./HTTPTransport";

describe("HTTPTransport", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should be a call to the get method", async () => {
    const httpTransport = new HTTPTransport();
    
    const requestStub = sinon.stub(httpTransport, "request").resolves();
    await httpTransport.get("/path");

    expect(
      requestStub.calledWithMatch(
        "https://ya-praktikum.tech/api/v2/path",
        { method: "GET" }
      )
    ).to.equal(true);
  });
  it("should be a call to the post method", async () => {
    const httpTransport = new HTTPTransport();
    
    const requestStub = sinon.stub(httpTransport, "request").resolves();
    const data = { test: "test" }

    await httpTransport.post("/path", { data });

    expect(
      requestStub.calledWithMatch(
        "https://ya-praktikum.tech/api/v2/path",
        { method: "POST" }
      )
    ).to.equal(true);
  });
  it("should be a call to the put method", async () => {
    const httpTransport = new HTTPTransport();
    
    const requestStub = sinon.stub(httpTransport, "request").resolves();
    const data = { test: "test" }

    await httpTransport.put("/path", { data });

    expect(
      requestStub.calledWithMatch(
        "https://ya-praktikum.tech/api/v2/path",
        { method: "PUT" }
      )
    ).to.equal(true);
  });
  it("should be a call to the delete method", async () => {
    const httpTransport = new HTTPTransport();
    
    const requestStub = sinon.stub(httpTransport, "request").resolves();
    const data = { test: "test" }

    await httpTransport.delete("/path", { data });

    expect(
      requestStub.calledWithMatch(
        "https://ya-praktikum.tech/api/v2/path",
        { method: "DELETE" }
      )
    ).to.equal(true);
  });
});
