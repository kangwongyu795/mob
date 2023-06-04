import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import db from "./db";

function DateScreen({ route }) {
  const { selectedDate } = route.params;
  const [textInputValue, setTextInputValue] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const q = query(collection(db, 'plan'), where('selectedDate', '==', selectedDate.dateString));
    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(newData);
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleSaveButton = async () => {
    try {
      const docRef = await addDoc(collection(db, 'plan'), {
        selectedDate: selectedDate.dateString,
        textInputValue: textInputValue,
      });
      console.log("Document written with ID: ", docRef.id);
      setTextInputValue(''); 
      fetchData(); 
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      await deleteDoc(doc(db, 'plan', id));
      console.log("Document deleted with ID: ", id);
      fetchData();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{selectedDate.dateString}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={textInputValue}
        onChangeText={setTextInputValue}
      />
      <Button title="Save" onPress={handleSaveButton} />

      <View style={styles.dataContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.textInputValue}</Text>
            <Button
              title="Delete"
              onPress={() => handleDeleteButton(item.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
  dataContainer: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
});

export default DateScreen;

// apiKey: "AIzaSyBCdAMO5VBmk5wBtIUAM7Dbg6RDnSqBaos",
// authDomain: "to-do-list-3672e.firebaseapp.com",
// projectId: "to-do-list-3672e",
// storageBucket: "to-do-list-3672e.appspot.com",
// messagingSenderId: "323038475736",
// appId: "1:323038475736:web:c038aa3b92fe03442a2ead",
// measurementId: "G-MBJ62GTN2C"