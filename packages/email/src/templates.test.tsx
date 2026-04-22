import { render } from "@react-email/render";
import { describe, expect, it } from "vitest";

import { MagicLinkEmail, PaymentFailedEmail } from "./templates";

describe("email templates", () => {
  it("renders the magic link email", async () => {
    const html = await render(MagicLinkEmail({ loginUrl: "https://clientpulse.app/login" }));
    expect(html).toContain("Sign in to ClientPulse");
  });

  it("renders the payment failed email", async () => {
    const html = await render(PaymentFailedEmail({ billingUrl: "https://clientpulse.app/billing" }));
    expect(html).toContain("Update your billing method");
  });
});
