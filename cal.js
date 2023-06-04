import React, { useEffect, useState } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import dbfire from './db'; // 파이어베이스 구성 파일 경로

const Stack = createStackNavigator();

function CalendarScreen() {
  const [events, setEvents] = useState({});
  const navigation = useNavigation();
  

  const fetchEvents = async () => {
    try {
      const datesCollection = collection(dbfire, 'plan');
      const querySnapshot = await getDocs(datesCollection);
      const datesData = querySnapshot.docs.map((doc) => doc.data());

      const marke = {};
      datesData.forEach((date) => {
        const { selectedDate } = date;
        console.log(selectedDate)
        marke[selectedDate] = { marked: true };
      });

      setEvents(marke);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDatePress = (date) => {
    navigation.navigate('Date', { selectedDate: date }); //  data로 이동하고 선택한 날짜를 전달.
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDatePress}
        markedDates={events}
        
        style={styles.calendar} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    width: 1300,
    height: 400,
  },
});

export default CalendarScreen;
