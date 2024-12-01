
import "../globals.css";

import Wireframe from "@/components/Wireframe";

export const metadata = {
  title: "Web Template",
  description: "Defaults",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Wireframe/>
      <body
      className={`antialiased theme-default`}
      >
        {children}
      </body>
    </html>
  );
}
