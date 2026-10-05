import type { Viewport } from "next";

// The rest of the site disables pinch-zoom; allow it here so the A4 sheet
// can be read closely on phones.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function ReportSheetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
