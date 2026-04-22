import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailShellProps {
  preview: string;
  accentColor?: string;
  title: string;
  children: React.ReactNode;
}

export function EmailShell({ preview, accentColor = "#0f766e", title, children }: EmailShellProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Arial, sans-serif", margin: 0, padding: "24px 0" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: "24px", maxWidth: "560px", padding: "32px" }}>
          <Text style={{ color: accentColor, fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", margin: 0 }}>
            CLIENTPULSE
          </Text>
          <Heading style={{ color: "#0f172a", fontSize: "28px", marginBottom: "12px" }}>{title}</Heading>
          <Section>{children}</Section>
          <Hr style={{ margin: "28px 0", borderColor: "#e2e8f0" }} />
          <Text style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Sent by ClientPulse. Keep your clients aligned without the update chase.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
