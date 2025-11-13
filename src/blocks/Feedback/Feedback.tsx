"use client";
import clsx from "clsx";
import styles from "./Feedback.module.scss";
import Image from "next/image";
import { Formik, Form } from "formik";
import MainInput from "@/components/Inputs/MainInput/MainInput";
import CommentInput from "@/components/Inputs/CommentInput/CommentInput";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import Link from "next/link";
import { SettingsT } from "@/types/types";
import { feedbackValidationSchema } from "@/utils/validationSchemas";
import { sendFeedback } from "@/services/FeedbackService";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { use, useEffect, useState } from "react";

const Feedback = observer(
  ({
    settings,
    storeUrl,
  }: {
    settings: Promise<SettingsT | null>;
    storeUrl: string;
  }) => {
    const { notificationStore } = globalStore;
    const { setNotification } = notificationStore;
    const settingsData = use(settings);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
      <section className={styles.container}>
        <div className={styles.image}>
          <Image
            src={`${storeUrl}/${settingsData?.feedback_image}`}
            alt="feedback"
            width={592}
            height={646}
          />
        </div>

        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            comment: "",
            isAgree: false,
          }}
          validationSchema={feedbackValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, { resetForm }) => {
            const isSuccess = await sendFeedback(values);
            if (isSuccess) {
              setNotification("success");
              resetForm();
            } else {
              setNotification("error");
            }
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className={styles.form}>
              <h2 className={clsx("h3", styles.title)}>Свяжитесь с нами</h2>
              <p className={clsx("body-2", styles.description)}>
                Для связи заполните форму ниже, и наш специалист позвонит вам в
                ближайшее время
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
                  error={touched.name && errors.name ? errors.name : undefined}
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
                  error={
                    touched.phone && errors.phone ? errors.phone : undefined
                  }
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
                error={touched.email && errors.email ? errors.email : undefined}
              />
              <CommentInput
                name="comment"
                placeholder="Комментарий"
                title="Ваш комментарий"
                className={styles.comment}
                value={values.comment}
                onChange={(value) => setFieldValue("comment", value)}
                error={
                  touched.comment && errors.comment ? errors.comment : undefined
                }
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
  }
);

export default Feedback;
