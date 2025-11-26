import React from "react";
import s from "./EmployeeItem.module.scss";
import Image from "next/image";
import { SvgMail, SvgPhone } from "@/assets/icons/svgs";
import clsx from "clsx";
import { EmployeeT } from "@/types/types";

const EmployeeItem = ({
  employee,
  active,
  storeUrl,
}: {
  employee: EmployeeT;
  active: boolean;
  storeUrl: string;
}) => {
  return (
    <div className={clsx(s.container)}>
      <Image src={`${storeUrl}/${employee.photo_path}`} fill alt="Employee" />
      <div className={s.overlay}></div>
      <div className={clsx(s.content, active && s.active)}>
        <div className={s.info}>
          <p className="body-6">{employee.position}</p>
          <p className="h5">{employee.full_name}</p>
        </div>
        <div className={s.contacts}>
          <p className="body-5">
            <SvgPhone />
            {employee.phone}
          </p>
          <p className="body-5">
            <SvgMail />
            {employee.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
