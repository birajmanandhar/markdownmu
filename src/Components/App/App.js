// import logo from '../../logo.svg';
import React from 'react';

import './App.css';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import { Button, Paper } from '@material-ui/core';
// import HighlightSearchBox from '../UI/Autocomplete/HighlightSearchBox';
// import MultiDatePicker from '../UI/DatePicker/MultiDatePicker';
import ProductPage from '../ProductPage/ProductPage';


// import MatDatePicker from '../UI/DatePicker/MatDatePicker/MatDatePicker';

function App() {
  return (
    // <Container maxWidth="sm" className="App">
    //   <Paper>
    //     <HighlightSearchBox />
    //     <MultiDatePicker />
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Create React App + Material-UI
    //     </Typography>
    //     <Button variant="contained" color="primary">
    //       Primary Button
    //     </Button>
    //     <Button variant="contained" color="secondary">
    //       Secondary Button
    //     </Button>
    //   </Paper>
    // </Container>
        // <ProductPage />
        <div>
          <ProductPage />
        </div>
        
      
  );
}

export default App;
