import server from "../server.ts";
import request from "supertest";

describe("GET /api", () => {
  it("should send back a json response", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Desde la API");
  });
});
