import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { toFirstUppercase } from ".";
import { PickerMode } from "@/types";

dayjs.locale("pt-br");

export const formatDate = (
  date?: string | Date | Dayjs,
  format = "DD/MM/YYYY"
) => {
  if (!date) return "-";
  return dayjs(date).format(format);
};

export const formatFullDayAndMonth = (date?: string | Date | null) => {
  if (!date) return "-";
  return dayjs(date).format("dddd , DD [de] MMMM");
};

export const formatDateForPicker = (date: Date, picker: PickerMode) => {
  console.log(`formatDateForPicker: date: ${date}, picker: ${picker}`);

  if (picker === "year") return dayjs(date).format("YYYY");

  if (picker === "quarter")
    return `Q${Math.floor(dayjs(date).month() / 3) + 1} ${dayjs(date).year()}`;

  if (picker === "week") {
    const startOfWeek = dayjs(date).startOf("week").format("DD");
    const endOfWeek = dayjs(date).endOf("week").format("DD");

    return `${startOfWeek} á ${endOfWeek} de ${toFirstUppercase(
      dayjs(date).format("MMM")
    )}`;
  }

  return toFirstUppercase(dayjs(date).format("MMMM"));
};
