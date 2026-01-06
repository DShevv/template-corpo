import clsx from "clsx";
import styles from "./DepartmentContactsBlock.module.scss";
import { SvgMail, SvgPhone } from "@/assets/icons/svgs";
import Link from "next/link";
import { getSettings } from "@/services/SettingsService";

const DepartmentContactsBlock = async () => {
  const settingsData = await getSettings();
  const departments = settingsData?.department_contacts;

  if (!departments || departments.length === 0) return null;

  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>Контакты отделов</h2>

      <div className={styles.list}>
        {departments.map((department, index) => (
          <div key={index} className={styles.department}>
            <div className={styles.header}>
              <span className={clsx("body-4", styles.position)}>
                {department.position}
              </span>
              <span className={clsx("body-2", styles.name)}>
                {department.full_name}
              </span>
            </div>

            <div className={styles.contacts}>
              {department.phones && department.phones.length > 0 && (
                <div className={styles.contactItem}>
                  <div className={styles.icon}>
                    <SvgPhone />
                  </div>
                  <div className={styles.contactLinks}>
                    {department.phones.map((phone, phoneIndex) => (
                      <Link
                        key={phoneIndex}
                        href={`tel:${phone}`}
                        className={clsx("body-2", styles.link)}
                      >
                        {phone}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {department.emails && department.emails.length > 0 && (
                <div className={styles.contactItem}>
                  <div className={styles.icon}>
                    <SvgMail />
                  </div>
                  <div className={styles.contactLinks}>
                    {department.emails.map((email, emailIndex) => (
                      <Link
                        key={emailIndex}
                        href={`mailto:${email}`}
                        className={clsx("body-2", styles.link)}
                      >
                        {email}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DepartmentContactsBlock;
