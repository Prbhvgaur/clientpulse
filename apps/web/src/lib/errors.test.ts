import { describe, expect, it } from "vitest";

import { ApiError, withApiHandler } from "./errors";

describe("ApiError", () => {
  it("exposes status and code", () => {
    const error = new ApiError(404, "missing", "Not found");
    expect(error.status).toBe(404);
    expect(error.code).toBe("missing");
  });

  it("wraps thrown errors into structured json", async () => {
    const response = await withApiHandler(new Request("https://clientpulse.app"), async () => {
      throw new ApiError(400, "bad_request", "Broken input");
    });

    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.error.code).toBe("bad_request");
  });
});
