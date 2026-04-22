import Link from "next/link";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@clientpulse/ui";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,_#ecfeff_0%,_#f8fafc_100%)] px-6 py-16">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Welcome back to ClientPulse</CardTitle>
          <CardDescription>Continue with Google or request a magic link for passwordless access.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Button>Continue with Google</Button>
            <Button variant="outline">Send magic link</Button>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Work email
            </label>
            <Input id="email" placeholder="you@studio.com" type="email" />
          </div>
          <p className="text-sm text-slate-500">
            New here?{" "}
            <Link className="font-semibold text-slate-950" href="/onboarding">
              Start onboarding
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
