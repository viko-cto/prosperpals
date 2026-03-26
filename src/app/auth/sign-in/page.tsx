import {
  demoOperatorRoleCookieName,
  demoSessionCookieName,
  operatorRoles
} from "@/lib/auth/session";

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
            <label>
              <span className="eyebrow" style={{ marginBottom: 10 }}>Operator role preview</span>
              <select name="operatorRole" defaultValue="founder-operator">
                {operatorRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </label>
            <p className="muted-line" style={{ marginTop: 8 }}>
              Internal operator roles only stick when the email ends with <code>@prosperpals.local</code>.
              External emails are clamped to the normal user role.
            </p>
            <button className="primary" type="submit">
              Enter protected app shell
            </button>
          </form>

          <div className="panel">
            <h2>Current auth cookies</h2>
            <p>
              Protected routes look for <code>{demoSessionCookieName}</code> and now also keep the
              demo email plus operator-role preview in HTTP-only cookies. The current demo-only
              role cookie is still a bounded internal preview, not real hosted auth.
            </p>
            <p>
              Operator role cookie: <code>{demoOperatorRoleCookieName}</code>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
