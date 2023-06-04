import { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';

const GPTComponent = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const generateText = async () => {
    const prompt = text;
    const apikey = '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' 
    const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apikey}`
    };

    const data = {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.7
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    });

    const resultData = await response.json();

    if (resultData.choices && resultData.choices.length > 0) {
      setResponse(resultData.choices[0].text);
    } else {
      setResponse("No response available.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OpenAI 계획 추천 받기!</Text>
      <TextInput
        placeholder=""
        value={text}
        onChangeText={(value) => setText(value)}
        style={styles.input}
      />
      <Button
        title="Generate Text"
        onPress={generateText}
        style={styles.button}
      />
      <Text style={styles.response}>{response}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GPTComponent;
