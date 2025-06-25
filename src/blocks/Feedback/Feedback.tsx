"use client";
import clsx from "clsx";
import styles from "./Feedback.module.scss";
import Image from "next/image";
import feedbackImage from "@/assets/images/feedback.png";
import { Formik, Form } from "formik";
import MainInput from "@/components/Inputs/MainInput/MainInput";
import CommentInput from "@/components/Inputs/CommentInput/CommentInput";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import Link from "next/link";

const Feedback = () => {
  return (
    <section className={styles.container}>
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
            <h2 className={clsx("h3", styles.title)}>Свяжитесь с нами</h2>
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
    </section>
  );
};

export default Feedback;
