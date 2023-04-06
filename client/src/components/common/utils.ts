import React, { useState } from 'react';
import './App.css';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import botAvatar from './pics/nosh.png';

const theme = {
  background: 'white',
  headerBgColor: '#ed872d',
  headerFontSize: '20px',
  botBubbleColor: '#F5F5F5',
  headerFontColor: 'white',
  botFontColor: 'black',
  userBubbleColor: '#ed872d',
  userFontColor: 'white',
  headerImage: 'none',
};

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
          botAvatar={botAvatar}
          headerAvatar={botAvatar}
          handleEnd={handleEnd}
          handleReset={handleReset}

        />
      </ThemeProvider>
    </div>
  );
}

export default App;