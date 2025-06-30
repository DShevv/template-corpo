"use client";
import Image, { StaticImageData } from "next/image";
import styles from "./Logo.module.scss";
import logo from "@/assets/images/Logo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const Logo = ({
  className,
  image,
}: {
  className?: string;
  image?: string | StaticImageData;
}) => {
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (isMainPage) {
    return (
      <Link href="/" className={clsx(styles.logo, className)}>
        <Image src={image || logo} alt="logo" width={150} height={60} />
      </Link>
    );
  }

  return (
    <Link href="/" className={clsx(styles.logo, className)}>
      <Image src={image || logo} alt="logo" width={150} height={60} />
    </Link>
  );
};

export default Logo;
