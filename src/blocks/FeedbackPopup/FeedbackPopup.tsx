"use client";
import clsx from "clsx";
import styles from "./FeedbackPopup.module.scss";
import Image from "next/image";
import feedbackImage from "@/assets/images/feedback-popup.png";
import { Formik, Form } from "formik";
import MainInput from "@/components/Inputs/MainInput/MainInput";
import CommentInput from "@/components/Inputs/CommentInput/CommentInput";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { useEffect } from "react";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { SvgClose } from "@/assets/icons/svgs";

const FeedbackPopup = observer(() => {
  const { popupStore } = globalStore;
  const { feedback, closePopup } = popupStore;

  useEffect(() => {
    if (feedback) {
      const scrollPosition = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.overflowY = "scroll";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.overflowY = "auto";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [feedback]);

  return (
    <div
      className={clsx(styles.wrapper, { [styles.active]: feedback })}
      onClick={() => closePopup("feedback")}
    >
      <div className={styles.container}>
        <IconButton
          className={styles.close}
          onClick={() => closePopup("feedback")}
          icon={<SvgClose />}
        />

        <Image src={feedbackImage} alt="feedback" className={styles.image} />

        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            comment: "",
            isAgree: false,
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className={styles.form}>
              <h2 className={clsx("h3", styles.title)}>Обратный звонок</h2>
              <p className={clsx("body-2", styles.description)}>
                Для связи заполните форму ниже, и наш специалист позвонит вам
                в ближайшее время
              </p>
              <div className={styles.line}>
                <MainInput
                  name="name"
                  placeholder="Имя"
                  type="text"
                  title="Ваше имя"
                  required
                  value={values.name}
                  onChange={(value) => setFieldValue("name", value)}
                />
                <MainInput
                  name="phone"
                  placeholder="Телефон"
                  type="tel"
                  title="Ваш телефон"
                  required
                  mask="+375 (99) 999-99-99"
                  value={values.phone}
                  onChange={(value) => setFieldValue("phone", value)}
                />
              </div>
              <MainInput
                name="email"
                placeholder="Email"
                type="email"
                title="Ваш email"
                required
                value={values.email}
                onChange={(value) => setFieldValue("email", value)}
              />
              <CommentInput
                name="comment"
                placeholder="Комментарий"
                title="Ваш комментарий"
                className={styles.comment}
                value={values.comment}
                onChange={(value) => setFieldValue("comment", value)}
              />
              <div className={styles.buttons}>
                <MainButton
                  type="submit"
                  className={styles.button}
                  disabled={!values.isAgree}
                >
                  Отправить
                </MainButton>
                <Checkbox
                  name="isAgree"
                  className={styles.checkbox}
                  checked={values.isAgree}
                  onChange={() => setFieldValue("isAgree", !values.isAgree)}
                >
                  <Link href="/privacy-policy" className={styles.link}>
                    Согласие на обработку персональных данных
                  </Link>
                </Checkbox>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});

export default FeedbackPopup;
