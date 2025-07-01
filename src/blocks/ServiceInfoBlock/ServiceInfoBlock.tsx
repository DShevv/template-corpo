"use client";
import React from "react";
import s from "./ServiceInfoBlock.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Image from "next/image";
import FirstServiceImage from "@/assets/images/service-image-1.jpg";
import SecondServiceImage from "@/assets/images/service-image-2.jpg";
import ThirdServiceImage from "@/assets/images/service-image-3.jpg";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";

const ServiceInfoBlock = observer(() => {
  const { popupStore } = globalStore;
  const { openPopup } = popupStore;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div>
          <p className="body-2">
            Наша компания предлагает комплексное решение для возведения
            коттеджей в Минске и Минской области. Мы берём на себя все этапы
            работ: от проектирования участка и подготовки фундамента до финишной
            отделки.
          </p>
          <p className="body-2">
            Полный цикл строительства без необходимости поиска субподрядчиков —
            в штате присутствуют специалисты всех профилей.
          </p>
        </div>
        <div>
          <p className="body-3">
            Оставьте заботы о координации работ, логистике и приёмке этапов
            нам — сосредоточьтесь на своих планах, зная, что ваш дом строится
            надёжно и в согласованные сроки.
          </p>
          <MainButton onClick={() => openPopup("feedback")}>
            Оставить заявку
          </MainButton>
        </div>
      </div>
      <div className={s.imagesContainer}>
        <div>
          <Image src={FirstServiceImage} fill alt="service" />
        </div>
        <div>
          <Image src={SecondServiceImage} fill alt="service" />
        </div>
        <div>
          <Image src={ThirdServiceImage} fill alt="service" />
        </div>
      </div>
    </div>
  );
});

export default ServiceInfoBlock;
