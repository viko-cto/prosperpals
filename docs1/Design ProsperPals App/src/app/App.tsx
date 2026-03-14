import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";

export default function App() {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <RouterProvider router={router} />
      </AccessibilityProvider>
    </ThemeProvider>
  );
}