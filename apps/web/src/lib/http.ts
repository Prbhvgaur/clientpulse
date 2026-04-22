import { NextResponse } from "next/server";
import { z } from "zod";

import { ApiError } from "./errors";

export async function parseJson<T>(request: Request, schema: z.ZodSchema<T>) {
  const json = await request.json().catch(() => {
    throw new ApiError(400, "invalid_json", "Request body must be valid JSON.");
  });

  const result = schema.safeParse(json);
  if (!result.success) {
    throw new ApiError(400, "validation_error", result.error.issues[0]?.message ?? "Validation failed.");
  }

  return result.data;
}

export function ok(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init);
}
