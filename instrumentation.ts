export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.info("[telemetry] ProsperPals instrumentation registered");
  }
}
