import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

const CountdownApp = () => {
  const [minutes, setMinutes] = useState("");
  const [initialMinutes, setInitialMinutes] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const handleStartCountdown = () => {
    const totalSeconds = parseInt(minutes) * 60;
    setTimeLeft(totalSeconds);
    setInitialMinutes(minutes);
  };

  const handleRestartCountdown = () => {
    setMinutes(initialMinutes);
    setTimeLeft(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerchild}>
        <TextInput
          style={styles.input}
          placeholder="Nhập số phút"
          keyboardType="numeric"
          value={minutes}
          onChangeText={(text) => setMinutes(text)}
        />
        <Text style={styles.time}>{formatTime(timeLeft)}</Text>
        <TouchableOpacity style={styles.button} onPress={handleStartCountdown}>
          <Text style={styles.buttonText}>Bắt đầu đếm ngược</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRestartCountdown}
        >
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerchild: {
    borderWidth: 0.5,
    borderColor: "black",
    borderStyle: "solid",
    padding: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  time: {
    marginLeft: 40,
    fontSize: 48,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CountdownApp;
