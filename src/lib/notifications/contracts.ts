import { z } from "zod";

export const safeNotificationTemplateSchema = z.enum([
  "coins-waiting",
  "portfolio-check-in",
  "family-progress"
]);

export type SafeNotificationTemplate = z.infer<typeof safeNotificationTemplateSchema>;

export const notificationPayloadSchema = z.object({
  title: z.string().min(1).max(80),
  body: z.string().min(1).max(160),
  deepLink: z.string().refine((value) => /^\/app(?:\/|$)/.test(value), {
    message: "Expected an internal /app route"
  })
});

const FORBIDDEN_PATTERNS = [
  /(?:\bDKK\b|\bUSD\b|\bEUR\b|kr\.?|€|\$)/i,
  /\b\d{1,3}(?:[.,]\d{2})\b/,
  /(?:merchant|groceries|rent|salary|transport|restaurant|budget shortfall|safe to spend|daily spending power)/i,
  /(?:netto|føtex|foetex|rema|mobilepay|orsted|novo)/i
];

function assertFinancialPrivacy(text: string) {
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(text)) {
      throw new Error(`Notification content violates the privacy boundary: ${text}`);
    }
  }
}

export function assertNotificationPayloadSafe(payload: z.infer<typeof notificationPayloadSchema>) {
  const parsed = notificationPayloadSchema.parse(payload);
  assertFinancialPrivacy(parsed.title);
  assertFinancialPrivacy(parsed.body);
  return parsed;
}

export function buildSafeNotificationPayload(template: SafeNotificationTemplate) {
  switch (template) {
    case "portfolio-check-in":
      return assertNotificationPayloadSafe({
        title: "Your portfolio moved today",
        body: "Fin has a short learning recap waiting whenever you want to check in.",
        deepLink: "/app/simulator"
      });
    case "family-progress":
      return assertNotificationPayloadSafe({
        title: "Your family learning recap is ready",
        body: "A new progress summary is waiting in ProsperPals without exposing private money details.",
        deepLink: "/app/onboarding?intent=family-preview"
      });
    default:
      return assertNotificationPayloadSafe({
        title: "Your ProsperCoins are waiting",
        body: "Goldie left a calm next step in the app when you are ready to continue.",
        deepLink: "/app"
      });
  }
}
