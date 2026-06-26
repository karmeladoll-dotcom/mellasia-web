import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motion Lab · Internal · Mellasia',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function MotionLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
