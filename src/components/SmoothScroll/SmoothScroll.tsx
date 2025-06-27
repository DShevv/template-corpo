"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Инициализируем Lenis с минимальными настройками
    const lenis = new Lenis({
      duration: 1.2, // Продолжительность анимации скролла
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавная кривая
    });

    // Функция для обновления скролла
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Обработчик для ссылок с анкорами
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")?.slice(1);
        const element = document.getElementById(id || "");
        if (element) {
          lenis.scrollTo(element, {
            duration: 1.5,
          });
        }
      }
    };

    // Добавляем обработчик для всех ссылок
    document.addEventListener("click", handleAnchorClick);

    // Очистка при размонтировании
    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}
