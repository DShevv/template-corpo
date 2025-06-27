import Header from "@/blocks/Header/Header";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import Footer from "@/blocks/Footer/Footer";
import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";
import MobileMenu from "@/blocks/MobileMenu/MobileMenu";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <HeaderMobile />
      <div className="wrapper">
        <main className={"white"}>{children}</main>
        <Footer />
      </div>
      <ImageViewer />

      <FeedbackPopup />
      <MobileMenu />
    </>
  );
}
