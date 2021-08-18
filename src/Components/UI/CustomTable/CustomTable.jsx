import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';
//import {Save} from '@material-ui/icons';

import { useState } from 'react';
import { useEffect } from 'react';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import { green, red } from '@material-ui/core/colors';

import CloseIcon from '@material-ui/icons/Close';


import CustomDialog from '../CustomDialog/CustomDialog';
import './CustomTable.css';

function CustomTable(props) {

  const [editingProductDates, setEditingProductDates] = useState(false);

  const editProductDate = () => {
    setEditingProductDates(editingProductDates ? false : true);
    // console.log('editing was set by the use of hook');
    // console.log('true or false');
    // console.log(editingProductDates);
  }

  useEffect(() => {
    console.log(editingProductDates);
}, [editingProductDates]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const styleField = (field) => {
    switch(field.fieldType) {
      case "date":
        return styleDate(field.name);
        // break;
        default:
          return field.name
    }
  }

  const styleDate = (date) => {
    return <div style={{ color: "#E87722", fontWeight: "bold" }}>{date}<span class="close"><CloseIcon  /></span></div>;
  }
    return (
      <fieldset style={{padding: '0px', border: 'none'}}>

        <CustomDialog open = {editingProductDates} switchOpenClose = {editProductDate}/>
        <MaterialTable
          icons =  {tableIcons}
          title="Product expiry dates"//Action Overriding Preview
          columns={[
            { title: 'Name', field: 'name', width: "40%" },
            {
              title: 'Date1', 
              field: 'date1', 
              width:"10%",
              render: rowData => {
                // console.log('row data');
                // console.log(rowData.date1);
                return styleField({fieldType: 'date', name: rowData.date1});
                // return rowData.status == "Pending" ? <p style={{ color: "#E87722", fontWeight: "bold" }}>{rowData.status}</p> :
                //       rowData.status == "SUCCESS" ? <p style={{ color: "#008240", fontWeight: "bold" }}>{rowData.status}</p> :
                //           <p style={{ color: "#B0B700", fontWeight: "bold" }}>{rowData.status}</p>
              }
            },
            { title: 'Date2', field: 'date2', width: "10%" },
            { title: 'Date3', field: 'date3', width: "10%" },
            { title: 'Date4', field: 'date4', width: "10%"},
            { title: 'Date5', field: 'date5', width: "10%"}
          ]}
          data={ props.data }
          actions={[
            {
              // icon: Save,
              icon: () => <Edit style={{ color: green[500] }} />,
              tooltip: 'Edit Product Dates',
              onClick: (event, rowData) => {
                editProductDate();
              }
              
            },
            {
              // icon: Save,
              icon: () => <Delete style={{ color: red[800] }} />,
              tooltip: 'Delete Product',
              onClick: (event, rowData) => alert("You clicked delete " + rowData.name),
              
            }
          ]}
          options={{
            rowStyle: rowData => ({
              // backgroundColor:
              //   selectedRow === rowData.tableData.id ? "#EEE" : "#FFF"
            }),
            tableLayout: "auto"
          }}
          style={{maxWidth: '97vw', overflow: 'scroll'}}
          // Biraj Note add the following component for cutom buttom as defined below
          // components={{
          //   Action: props => (
          //     <Button
          //       onClick={(event) => props.action.onClick(event, props.data)}
          //       color="primary"
          //       variant="contained"
          //       style={{textTransform: 'none'}}
          //       size="small"
          //     >
          //       My Button
          //     </Button>
          //   ),
          // }}
        />
              </fieldset>
    )
  }
  export default CustomTable;