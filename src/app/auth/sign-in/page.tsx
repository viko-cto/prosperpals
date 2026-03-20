import { demoSessionCookieName } from "@/lib/auth/session";

type SignInPageProps = {
  searchParams?: Promise<{ next?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolved = (await searchParams) ?? {};
  const next = resolved.next ?? "/app";

  return (
    <main>
      <div className="shell">
        <section className="hero" style={{ maxWidth: 680, margin: "0 auto" }}>
          <span className="eyebrow">Authenticated shell</span>
          <div className="grid" style={{ gap: 12 }}>
            <h1>Demo sign in for the starter loop</h1>
            <p>
              Full Supabase auth wiring still comes later. For the current prototype, the goal is
              proving route separation, request tracing, and trusted server boundaries without
              blocking the Goldie → reward → Fin simulator flow on external auth setup.
            </p>
          </div>

          <form action="/auth/demo" method="post">
            <input type="hidden" name="next" value={next} />
            <label>
              <span className="eyebrow" style={{ marginBottom: 10 }}>Demo email</span>
              <input type="text" name="email" defaultValue="nikolas@prosperpals.local" />
            </label>
            <button className="primary" type="submit">
              Enter protected app shell
            </button>
          </form>

          <div className="panel">
            <h2>Current auth cookie</h2>
            <p>
              Protected routes look for <code>{demoSessionCookieName}</code>. Replace the demo
              session provider with Supabase once Sprint 1 starts wiring real onboarding flows.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
