"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(0);

  const scrollY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });

  const y = useTransform(smoothScrollY, (value) => -value);

  useEffect(() => {
    // Проверяем, мобильное ли это устройство
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // На мобильных устройствах отключаем кастомный скролл
    if (isMobile) {
      return;
    }

    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight;
        setBodyHeight(height);
        document.body.style.height = `${height}px`;
        return height;
      }
      return 0;
    };

    // Начальная установка высоты
    setTimeout(updateHeight, 100);

    const handleScroll = (newScrollValue: number) => {
      // Синхронизируем со стандартным скроллом браузера
      window.scrollTo(0, newScrollValue);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const currentHeight = updateHeight();
      const currentScroll = scrollY.get();
      const delta = e.deltaY * 0.8;
      const maxScroll = Math.max(0, currentHeight - window.innerHeight);
      const newScroll = Math.max(0, Math.min(currentScroll + delta, maxScroll));

      scrollY.set(newScroll);
      handleScroll(newScroll);
    };

    // Обработка тач-событий для планшетов
    let startY = 0;
    let currentY = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      isScrolling = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) return;

      e.preventDefault();
      currentY = e.touches[0].clientY;
      const deltaY = (startY - currentY) * 2; // Увеличиваем чувствительность

      const currentHeight = updateHeight();
      const currentScroll = scrollY.get();
      const maxScroll = Math.max(0, currentHeight - window.innerHeight);
      const newScroll = Math.max(
        0,
        Math.min(currentScroll + deltaY, maxScroll)
      );

      scrollY.set(newScroll);
      handleScroll(newScroll);
      startY = currentY;
    };

    const handleTouchEnd = () => {
      isScrolling = false;
    };

    const handleResize = () => {
      updateHeight();
    };

    // Наблюдаем за изменениями в DOM
    const observer = new MutationObserver(() => {
      setTimeout(updateHeight, 100);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    // Отключаем стандартный скролл только на десктопе
    document.body.style.overflow = "hidden";
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [scrollY]);

  return (
    <div style={{ height: bodyHeight }}>
      <motion.div
        ref={containerRef}
        style={{
          y: y,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SmoothScroll;
