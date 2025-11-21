import { Suspense } from "react";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./ServicesList.module.scss";
import { getServices, getServicesTwo } from "@/services/ServicesService";
import effectsImage from "@/assets/images/effects.png";
import eventsImage from "@/assets/images/events.png";

interface ServicesListProps {
  current?: number;
  max?: number;
  maxPerView?: number;
  storeUrl: string;
  category?: string;
  isDefault?: boolean;
}

export default async function ServicesList({
  current = 1,
  max = 10,
  maxPerView = 6,
  storeUrl,
  category,
  isDefault = false,
}: ServicesListProps) {
  const services =
    category === "events" ? await getServicesTwo() : await getServices();

  return (
    <>
      <div className={styles.services}>
        {isDefault ? (
          <>
            <ServiceItem
              disableArrow
              item={{
                id: 1,
                title: "Спецэффекты",
                subtitle:
                  "Всё для вашего праздника: залпы конфетти, сброс шаров, криопушки и огненные шоу. Создадим для вас кульминацию!",
                slug: "special-effects",
                photo_path: effectsImage,
                icon_path: effectsImage.src,
                blocks: [],
              }}
              storeUrl={storeUrl}
            />
            <ServiceItem
              disableArrow
              item={{
                id: 1,
                title: "Мероприятия",
                subtitle:
                  "Подберём идеальные спецэффекты для любого события: от камерной свадьбы до масштабного фестиваля.",
                slug: "events",
                photo_path: eventsImage,
                icon_path: eventsImage.src,
                blocks: [],
              }}
              storeUrl={storeUrl}
            />
          </>
        ) : (
          services?.map((item, index) => (
            <ServiceItem
              disableArrow
              key={index}
              item={item}
              storeUrl={storeUrl}
              category={category}
            />
          ))
        )}
      </div>

      {services && services.length > maxPerView && (
        <div className={styles.pagination}>
          <Suspense>
            <Pagination current={current} max={max} maxPerView={maxPerView} />
          </Suspense>
        </div>
      )}
    </>
  );
}
