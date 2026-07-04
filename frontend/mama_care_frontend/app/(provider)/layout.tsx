"use client";

import ProviderSidebar from "@/components/provider/ProviderSidebar";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <ProviderSidebar />
      <main
        style={{
          flex: 1,
          padding: "1.5rem",
          paddingBottom: "5rem", // padding for mobile bottom bar
          overflowY: "auto",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
