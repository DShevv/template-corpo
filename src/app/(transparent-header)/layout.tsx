import ImageViewer from "@/components/ImageViewer/ImageViewer";
import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderMobile />

      <main>{children}</main>
      <ImageViewer />

      <FeedbackPopup />
    </>
  );
}
