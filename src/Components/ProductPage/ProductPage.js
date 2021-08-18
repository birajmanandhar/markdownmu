import Container from '@material-ui/core/Container';
import React, { useState, useEffect } from 'react';
import HighlightSearchBox from '../UI/Autocomplete/HighlightSearchBox';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CustomBadge from '../UI/CustomBadge/CustomBadge';
import CustomTable from '../UI/CustomTable/CustomTable';
import moment from 'moment';
import CustomMuiDatePicker from '../UI/DatePicker/CustomMuiDatePicker/CustomMuiDatePicker';
import Constants from '../../Constants/Constants';

const products = Constants.PRODUCT_LIST.map((product) => {
    return {'name': product.name};
});

const sortAllDataEntriesDates = (dataEntriesObject) => { // This function is not used yet but might be useful
    dataEntriesObject.forEach((dataEntry) => {
        //sort funtion for the dates
        dataEntry.dates.sort(function(a,b) {
            var dateObjectA = moment(a, "DD-MM-YYYY");
            var dateObjectB = moment(b, "DD-MM-YYYY"); 
            return dateObjectA - dateObjectB; // ascending order flip for descending order
        });
    });
    return dataEntriesObject;
}

let saveData = false;


const ProductPage = () => {
    let datesBall = "";
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [collectedDates, setCollectedDates] = useState([]);

    const [value, setValue] = useState('');
    const [dataEntries, setDataEntries] = useState(null);

    const handleSave = (event) => {
        if(value.name.length>0 && collectedDates.length>0) {
            let dataEntry = [];
            dataEntry = {'name': value.name, 'dates': collectedDates};
            saveData = true;
            updateDataEntry(dataEntry);
            handleClear();
        } else {
            alert('Please fill all data!');
        }
    }


    const handleClear = (event) => {
        setSelectedDate(null);
        setCollectedDates([]);
        setValue('');
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleInputChange = (event, newValue) => {
        setValue(newValue);
        //console.log(newValue);
    }



    const updateDataEntry = (dataEntry) => {
        let updateDataEntries = [...dataEntries, dataEntry ];
        updateDataEntries = sortAllDataEntriesDates(updateDataEntries);
        setDataEntries(updateDataEntries);
    }
    


    useEffect(() => {// similar to component did mount
        const dataEntriesObject = localStorage.getItem('dataEntries');
        dataEntriesObject ? setDataEntries(JSON.parse(dataEntriesObject)) : setDataEntries([]);
        //dataEntries.length>0 ? initialized = true : initialized = false;
      }, []);
    
    useEffect(() => {
        // console.log('save data function '+ JSON.stringify(dataEntries));
        if(dataEntries && saveData) {
            console.log('save the persistant data');
            localStorage.setItem('dataEntries', JSON.stringify(dataEntries));
            saveData = false;
        }
    }, [dataEntries]);

    useEffect(() => {
        if(selectedDate !== null){
            const dateString = moment(selectedDate).format('DD-MM-YYYY');
            if(collectedDates.includes(dateString)){ 
                alert('Date : '+dateString+' already exists!')
                return;
            }
            const updateDates = [
                ...collectedDates,
                dateString
            ];
            updateDates.sort((a, b) => {
                var dateObjectA = moment(a, "DD-MM-YYYY");
                var dateObjectB = moment(b, "DD-MM-YYYY"); 
                return dateObjectA - dateObjectB;
            });
            //console.log(updateDates);
            setCollectedDates(updateDates);
        }
        // eslint-disable-next-line
    }, [selectedDate]);

    if(collectedDates.length>0) {
        datesBall = collectedDates.map((collectedDate) => {
            const date = collectedDate.split('-');
            const day = date[0];
            const shortName = moment.monthsShort(date[1] - 1);
            return <CustomBadge day = {day} month={shortName}/>
        });
    }

    let table = <div>No Data Found</div>;
    if(dataEntries) {
        table = dataEntries.map((dataEntry) => {
            return (
                <div>{dataEntry.name}</div>
            );
        });
    }

    let data =  [
            { name: 'Mehmet', date1: 'Baran', birthYear: "1987", birthCity: "63" },
            { name: 'Zerya Betül', date1: 'Baran', birthYear: "2017", birthCity: "34" },
        ];

    if(dataEntries) {
        data = dataEntries.map((dataEntry) => {
            let dateObjects = dataEntry.dates.map((date, index) => {
                //const nameField = 'date'+index;
                var key = 'date'+(index+1);
                var obj = {};
                obj[key] = date;
                return obj;
            }) ;
            const allDates = Object.assign({}, ...dateObjects);
            //console.log(allDates);
            let myFinalObject;
            const nameObj = {name: dataEntry.name};
            myFinalObject = { ...nameObj, ...allDates};
            return myFinalObject;
        });
        console.log('transformed data is '+ JSON.stringify(data));
    }

    return (
        <Container maxWidth="md">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            > 
                <HighlightSearchBox
                    value = {value}
                    changed = {handleInputChange}
                    options = {products} /> 
                <CustomMuiDatePicker 
                    changed = {handleDateChange}
                    currentDate = {selectedDate} />
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick= {handleSave}>
                    Save
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={handleClear}>
                    Clear
                </Button>
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            > 
                { datesBall }
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <CustomTable data = {data} />
                {table}
            </Grid>
        </Container>
    )
}

export default ProductPage;

