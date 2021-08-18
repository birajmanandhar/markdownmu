import MomentUtils from '@date-io/moment';
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';


function CustomMuiDatePicker (props) {
    return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker value={props.currentDate} onChange={props.changed} inputVariant="outlined" format="DD-MM-YYYY" />
    </MuiPickersUtilsProvider>
    );
}

export default CustomMuiDatePicker;