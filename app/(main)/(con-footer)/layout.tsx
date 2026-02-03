// app/(main)/layout.tsx
import Footer from "@/app/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>

      <Footer />
    </>
  );
}