import React, { useState } from 'react';
import './App.css';
import ChatBot from 'react-simple-chatbot';
const steps = [
  {
    id: '0',
    message: 'Welcome Order & Enjoy the food in NOSH! Is this your first order?',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Is this your first order',
    trigger: '2',
  },
  
];

const config = {
  floating: true,
};

const App = () => {

  

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Nosh-Bot"
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;