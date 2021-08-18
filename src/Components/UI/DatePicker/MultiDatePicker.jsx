import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePicker from "react-multi-date-picker";
import React, { useState, useEffect } from "react";
import moment from "moment";
import './MultiDatePicker.css';

export default function MultiDatePicker() {
    //const [value, setValue] = useState(new Date());

    const [dates, setDates] = useState([
    ])
  
    const handleOnChange = event => {
      //console.log(JSON.stringify(event));
      const stringOfDateObjects = JSON.stringify(event);
      const dateObjectArray = JSON.parse(stringOfDateObjects);
      let xtraDates = dateObjectArray.map((singleDateObject) => {
        var day = singleDateObject.day;
        var month = singleDateObject.month.number;
        var year = singleDateObject.year;
        const finalFormattedDateString = day +'-'+month+'-'+year;
        return finalFormattedDateString;
      })
      console.log(xtraDates);
      //console.log(dates);
      //console.log(dates);
    }
    return (
            <DatePicker
              inputClass = "custom-input"
              minDate={moment().add(1, 'days').toDate()}
              value={dates}
              onChange={handleOnChange} // setDates
              format="DD MM YYYY"
              sort
              plugins={[
                <DatePanel />
              ]}
            />
          )
    //return <DatePicker value={value} onChange={setValue} />;
}

