import { describe, expect, it } from "vitest";

import { clientSchema, organizationSchema, projectSchema } from "./validation";

describe("validation schemas", () => {
  it("accepts a valid organization payload", () => {
    expect(
      organizationSchema.safeParse({
        name: "Northstar Studio",
        slug: "northstar-studio",
        brandColor: "#0f766e",
      }).success,
    ).toBe(true);
  });

  it("rejects an invalid client email", () => {
    expect(clientSchema.safeParse({ name: "Test", email: "nope" }).success).toBe(false);
  });

  it("requires a project name", () => {
    expect(projectSchema.safeParse({ slug: "demo-project" }).success).toBe(false);
  });
});
