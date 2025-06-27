import React from "react";
import s from "./EmployeeItem.module.scss";
import Image, { StaticImageData } from "next/image";
import { SvgMail, SvgPhone } from "@/assets/icons/svgs";
import clsx from "clsx";

export type Employee = {
  id: number;
  image: StaticImageData | "string";
  name: string;
  phone: string;
  email: string;
  position: string;
};

const EmployeeItem = ({
  employee,
  active,
}: {
  employee: Employee;
  active: boolean;
}) => {
  return (
    <div className={clsx(s.container)}>
      <Image src={employee.image} fill alt="Employee" />
      <div className={clsx(s.content, active && s.active)}>
        <div className={s.info}>
          <p className="body-6">{employee.position}</p>
          <p className="h5">{employee.name}</p>
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
