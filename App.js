import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from './cal';
import DateScreen from './date';
import YoutubeScreen from './you';
import GPTComponent from './gptcom';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Date" component={DateScreen} />
      <Stack.Screen name="GPT" component={GPTComponent} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="YouTube" component={YoutubeScreen} />
        <Tab.Screen name="GPT" component={GPTComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

//npm install @react-navigation/bottom-tabs @react-navigation/native
// npm install @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid 캘린더 로그인   사용불가
//npm install firebase 파이어 베이스
//npm install @mui/material @emotion/react @emotion/styled
//npm install @fullcalendar/interaction 추가
//npm install react-native-calendars
//npm install @react-navigation/stack
//npm install react-native-youtube
//npm install react-native-youtube-iframe
//npm install react-native-web-webview
//
// 