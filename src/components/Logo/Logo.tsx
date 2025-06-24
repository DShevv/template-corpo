"use client";
import Image from "next/image";
import styles from "./Logo.module.scss";
import logo from "@/assets/images/Logo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const Logo = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (isMainPage) {
    return (
      <Link href="/" className={clsx(styles.logo, className)}>
        <Image src={logo} alt="logo" width={150} height={60} />
      </Link>
    );
  }

  return (
    <Link href="/" className={clsx(styles.logo, className)}>
      <Image src={logo} alt="logo" width={150} height={60} />
    </Link>
  );
};

export default Logo;
