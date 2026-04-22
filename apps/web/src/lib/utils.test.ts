import { describe, expect, it } from "vitest";

import { formatDate, milestoneStatusMeta, percentElapsed, projectStatusMeta, slugify } from "./utils";

describe("utils", () => {
  it("slugifies safely", () => {
    expect(slugify("Northstar Studio Launch")).toBe("northstar-studio-launch");
  });

  it("formats dates", () => {
    expect(formatDate("2026-04-23T00:00:00.000Z")).toContain("2026");
  });

  it("calculates elapsed percentage", () => {
    expect(percentElapsed("2026-04-01T00:00:00.000Z", "2026-05-01T00:00:00.000Z")).toBeGreaterThanOrEqual(0);
  });

  it("returns status metadata", () => {
    expect(projectStatusMeta("IN_PROGRESS").label).toBe("In Progress");
    expect(milestoneStatusMeta("BLOCKED").label).toBe("Blocked");
  });
});
