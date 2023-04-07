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
    trigger: '15',
  },
  {
    id: '15',
    options: [
      { value: 'Appetizers', label: 'Appetizers', trigger: '16' },
      { value: 'Soups', label: 'Soups', trigger: '17' },
      { value: 'Biryani', label: 'Biryani', trigger: '18' },
      { value: 'Main Course', label: 'Main Course', trigger: '19' },
      { value: 'Indo Chineese', label: 'Indo Chineese', trigger: '20' },
      { value: 'Beverages', label: 'Beverages', trigger: '26'}
    ],
  },
  {
    id: '16',
    message: 'Which Appetizers do you want to order?',
    trigger: '21',
  },
  {
    id: '21', 
    options: [
      { value: 'Chilli Chicken', label: 'Chilli Chicken', trigger: '8' },
      { value: 'Chicken 65', label: 'Chicken 65', trigger: '8' },
      { value: 'Apollo Fish', label: 'Apollo Fish', trigger: '8' },
      { value: 'Gobi Manchuria', label: 'Gobi Manchuria', trigger: '8' },
      { value: 'Chilli Paneer', label: 'Chilli Paneer', trigger: '8' },
    ],
  },
  {
    id: '17',
    message: 'Which Soup do you want to order?',
    trigger: '22',
  },
  {
    id: '22', 
    options: [
      { value: 'Tomato Soup', label: 'Tomato Soup', trigger: '8' },
      { value: 'Veg Corn Soup', label: 'Veg Corn Soup', trigger: '8' },
      { value: 'Chicken Corn Soup', label: 'Chicken Corn Soup', trigger: '8' },
    ],
  },
  {
    id: '18',
    message: 'Which Biryani do you want to order?',
    trigger: '23',
  },
  {
    id: '23', 
    options: [
      { value: 'Chicken Biryani', label: 'Chicken Biryani', trigger: '8' },
      { value: 'Lamb Biryani', label: 'Lamb Biryani', trigger: '8' },
      { value: 'Fish Biryani', label: 'Fish Biryani', trigger: '8' },
      { value: 'Goat Biryani', label: 'Goat Biryani', trigger: '8' },
      { value: 'Vegetable Dum Biryani', label: 'Vegetable Dum Biryani', trigger: '8' },
    ],
  },
  {
    id: '19',
    message: 'Which Main Course do you want to order?',
    trigger: '24',
  },
  {
    id: '24', 
    options: [
      { value: 'Kadai Chicken', label: 'Kadai Chicken', trigger: '8' },
      { value: 'Butter Chicken', label: 'Butter Chicken', trigger: '8' },
      { value: 'Egg Masala', label: 'Egg Masala', trigger: '8' },
      { value: 'Goat Curry', label: 'Goat Curry', trigger: '8' },
      { value: 'Shrimp Masala', label: 'Shrimp Masala', trigger: '8' },
      { value: 'Palak Paneer', label: 'Palak Paneer', trigger: '8' },
      { value: 'Mixed Veg Masala', label: 'Mixed Veg Masala', trigger: '8' },
    ],
  },
  {
    id: '20',
    message: 'Which Indo Chineese dish do you want to order?',
    trigger: '25',
  },
  {
    id: '25', 
    options: [
      { value: 'Fried Rice', label: 'Fried Rice', trigger: '8' },
      { value: 'Hakka Noodles', label: 'Hakka Noodles', trigger: '8' },
      { value: 'Chicken Manchuria', label: 'Chicken Manchuria', trigger: '8' },
    ],
  },
  {
    id: '26',
    message: 'Which Beverage do you want to order?',
    trigger: '27',
  },
  {
    id: '27', 
    options: [
      { value: 'Tea', label: 'Tea', trigger: '8' },
      { value: 'Coffee', label: 'Coffee', trigger: '8' },
      { value: 'Butter Milk', label: 'Butter Milk', trigger: '8' },
      { value: 'Mango Shake', label: 'Mango Shake', trigger: '8' },
    ],
  },
   {
    id: '4',
    message: 'May I know your email?',
    trigger: '5',
  },
  {
    id: '5',
    user: true,
    
    metadata: {
      email: 'email',
      value: '{{{raw}}}'
    },
    validator: (value) => {
      if (emailValidator.validate(value)) {
        return true;
      } else {
        return 'Please enter a valid email address.';
      }
    },
    trigger: '6',
  },
  {
    id: '6',
    message: 'Would you like to order your previous-order?',
    trigger: '7',
  },
  {
    id: '7',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '8' },
      { value: 'No', label: 'No', trigger: '14' },
    ],
  },
  {
    id: '8',
    message: 'Are you sure? Do you want to order?',
    trigger: '10',
  },
  
  {
     id: '8',
    message: 'Do you want to order more ?',
      trigger: '10',
    },

    {
         id: '10',
         options: [
          { value: 'Yes', label: 'Yes', trigger: '11' },
         { value: 'No', label: 'No', trigger: '14' },
        ],
      },


  {
    id: '10',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '11' },
      { value: 'No', label: 'No', trigger: '14' },
    ],
  },
  {
    id: '11',
    message: 'Your order is added to cart. Please proceed for the payment',
    end:true,
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