import { NextResponse } from "next/server";

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export async function withApiHandler(
  request: Request,
  handler: (requestId: string) => Promise<Response>,
) {
  const requestId = crypto.randomUUID();

  try {
    const response = await handler(requestId);
    response.headers.set("X-Request-Id", requestId);
    return response;
  } catch (error) {
    const apiError =
      error instanceof ApiError ? error : new ApiError(500, "internal_error", "Something went wrong.");

    if (process.env.NODE_ENV !== "production") {
      console.error(JSON.stringify({ level: "error", requestId, code: apiError.code, message: apiError.message }));
    }

    return NextResponse.json(
      { error: { code: apiError.code, message: apiError.message, requestId } },
      { status: apiError.status, headers: { "X-Request-Id": requestId } },
    );
  }
}
