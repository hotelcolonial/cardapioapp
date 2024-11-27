import MenuWrapper from "./MenuWrapper";

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MenuWrapper>{children}</MenuWrapper>;
}
