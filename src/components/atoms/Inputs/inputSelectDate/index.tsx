import React from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { PickerMode } from "@/types";
import { formatDateForPicker } from "@/utils/formaters/formatDate";

interface Props extends React.HTMLProps<HTMLDivElement> {
  date: Date;
  setDate: (d: Date) => void;
  picker?: PickerMode;
}

export const InputSelectDate: React.FC<Props> = ({
  date,
  setDate,
  picker = "month",
  className,
  ...rest
}) => {
  return (
    <div className={twMerge("max-w-fit", className)} {...rest}>
      <span className="relative flex flex-col text-primary">
        <label
          htmlFor="switch-date"
          className="z-10 flex items-center gap-2 hover:cursor-pointer"
        >
          {formatDateForPicker(date, picker)}
          <BiChevronDown size={20} />
        </label>

        <DatePicker
          id="switch-date"
          value={dayjs(date)}
          onChange={(e) => {
            e && setDate(e.toDate());
          }}
          picker={picker}
          style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}
        />
      </span>
    </div>
  );
};
