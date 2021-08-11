import React, { useEffect, useState } from "react";


const futureDate = new Date(2050, 0, 1);
const getDateDiff = (date1, date2) => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    year: diff.getUTCFullYear() - 1970,
    month: diff.getUTCMonth(),
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes(),
    second: diff.getUTCSeconds()
  };
};
const formatDate = (date) => {
  let d = new Date(date),
    month = (d.getMonth() + 1).toString(),
    day = d.getDate().toString(),
    year = d.getFullYear().toString();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};


export default function Timer() {
  const [diff, setDiff] = useState({});
  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(getDateDiff(new Date(), futureDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="App">
      <p style={{padding:'0px'}}>
        <span style={{border:'2pt solid blue', 'border-radius':'10pt', padding:'2pt', paddingTop:'0pt'}}>{diff.year} years, {diff.month} months, {diff.day} days,
        {diff.hour} hours, {diff.minute} minute, {diff.second} seconds until{" "}
        {formatDate(futureDate)}
      </span></p>
    </div>
  );
}