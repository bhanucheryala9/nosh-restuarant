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
const emailValidator = require('email-validator');
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
  {
    id: '2',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '3' },
      { value: 'No', label: 'No', trigger: '4' },
    ],
  },
  {
    id: '3',
    message: 'May I know your email?',
    trigger: '13',
  },
  {
    id: '13',
    user: true,
    validator: (value) => {
      if (emailValidator.validate(value)) {
        return true;
      } else {
        return 'Please enter a valid email address.';
      }
    },
    metadata: {
      email: 'email',
      value: '{{{raw}}}'
    },
    trigger: '14',
  },
  {
    id: '14',
    message: 'So, Which type of food do you want to order?',
    trigger: 'end',
  },


];

const config = {
  floating: true,
};

const App = () => {
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleEnd = ({ steps, values }) => {
    if (!conversationHistory.length) {
      const newConversationHistory = [
        {
          type: 'user',
          message: values.name,
        },
      ];
      steps.forEach((step) => {
        if (step.message) {
          newConversationHistory.push({
            type: 'bot',
            message: step.message,
          });
        }
      });
      setConversationHistory(newConversationHistory);
    }
  }
  const handleReset = () => {
    setConversationHistory([]);
    window.location.reload();
  }
  

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
        <div className="conversation-container">
          {conversationHistory.map((message, index) => {
            if (message.type === 'user') {
              return (
                <div key={index} className="user-message">
                  <span>{message.message}</span>
                </div>
              );
            } else {
              return (
                <div key={index} className="bot-message">
                  <span>{message.message}</span>
                </div>
              );
            }
          })}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;