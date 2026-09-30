import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: LayoutProps<"/[locale]/portal">) {
  return children;
}
