import React, { useEffect, useState } from "react";


const futureDate = new Date(2050, 0, 1);


const getDateDiff = (date1, date2) => {
  const diff = new Date(date2.getTime() - date1.getTime());
  //console.log(diff.getTime())
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

var dasher = undefined;
var stasher = undefined;



export default function Timer() {

 
  const preventdef = (e) => {
    e.preventDefault()
    let dateinp = dasher.split('-')
    if (dateinp[1].charAt(0)=='0'){
      dateinp[1] = dateinp[1].charAt(1)
    }
    if (dateinp[2].charAt(0)=='0'){
      dateinp[2] = dateinp[2].charAt(1)
    }
    dasher = dateinp.join("-")
    stasher = new Date(dasher)
    console.log( dasher, stasher)
    dasher = ''
  }
  const uptodash = (e) => {
    //console.log(e)
    dasher = e.target.value
  }
  const [diff, setDiff] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      stasher && setDiff(getDateDiff(new Date(), stasher));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="BApp">
      <form onSubmit={(e) => {preventdef(e)}}>
        <label>Enter a Future Date (YYYY-MM-DD) To Start the Countdown!</label>
        <input type="text" onChange={(e)=> uptodash(e)} name="dateinput"  value={dasher}/>
      </form>
       { !diff['second'] == '' ? <p style={{padding:'0px'}}>
         <span style={{border:'2pt solid blue', 'border-radius':'10pt', padding:'2pt', paddingTop:'0pt'}}>{diff && diff.year} years, {diff && diff.month} months, {diff && diff.day} days,
        {diff && diff.hour} hours, {diff && diff.minute} minute, {diff && diff.second} seconds until{" "}
        {stasher && formatDate(stasher)}
      </span></p> : <p>Waiting For Input...</p>}
    </div>
  );
}