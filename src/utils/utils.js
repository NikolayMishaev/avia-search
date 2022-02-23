export function convertMinutesToHours(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${+hours ? `${hours} ч ` : ""}${+minutes ? `${minutes} мин` : ""}`;
}

function convertMonthRUS(month) {
  switch (month) {
    case "01":
      return "янв";
    case "02":
      return "фев";
    case "03":
      return "мар";
    case "04":
      return "апр";
    case "05":
      return "май";
    case "06":
      return "июн";
    case "07":
      return "июл";
    case "08":
      return "авг";
    case "09":
      return "сен";
    case "10":
      return "окт";
    case "11":
      return "ноя";
    case "12":
      return "дек";
    default:
      return "";
  }
}

function convertDayWeekRUS(day) {
  switch (day) {
    case "Mo":
      return "пн";
    case "Tu":
      return "вт";
    case "We":
      return "ср";
    case "Th":
      return "чт";
    case "Fr":
      return "пт";
    case "Sa":
      return "сб";
    case "Su":
      return "вс";
    default:
      return "";
  }
}

export function convertDateRUS(date) {
  const arrDate = date.split(".");
  return `${arrDate[0]} ${convertMonthRUS(arrDate[1])}.${convertDayWeekRUS(
    arrDate[2]
  )}`;
}
