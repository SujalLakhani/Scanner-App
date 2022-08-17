import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login({ navigation }) {
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = () => {
    handleLogin();
  };
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigation.navigate("Scanner");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigation.navigate("Scanner");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Log-in Form</Text>
      <Text style={styles.description}>
        You can log-in if you already have an account.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your E-mail address</Text>
        <TextInput
          placeholder="Enter your E-mail here"
          style={styles.inputStyle}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(data) => setEmail(data)}
        />
        <Text style={styles.label}>Enter your Password</Text>
        <TextInput
          placeholder="Enter your Password here"
          style={styles.inputStyle}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(data) => {
            setPassword(data);
          }}
        />
      </View>
      <View style={styles.wrapper}>
        <Checkbox
          value={agree}
          onValueChange={() => {
            agree == false ? setAgree(true) : setAgree(false);
          }}
          color="blue"
        />

        <Text style={styles.wrapperText}>Remember me</Text>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={submit}>
        <Text style={styles.buttonText}>Log-in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: "30%",
    backgroundColor: "#fff",
  },
  mainHeader: {
    fontSize: 32,
    color: "#344055",
    fontWeight: "500",
    paddingTop: 20,
    paddingBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 20,
    lineHeight: 25,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontSize: 18,
    borderRadius: 5,
  },
  wrapper: {
    flexDirection: "row",
    paddingTop: 7,
    paddingBottom: 20,
  },
  wrapperText: {
    paddingHorizontal: 7,
  },
  buttonStyle: {
    backgroundColor: "blue",
    borderRadius: 7,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
