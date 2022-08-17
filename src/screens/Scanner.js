import React, { useState, useEffect } from "react";
import { Linking } from "react-native";
import * as FileSystem from "expo-file-system";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import xlsx from "xlsx";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let document = data.split("|");
    setText(document[1]);
    let store = [
      {
        name: document[1],
        email: document[0],
      },
    ];
    let wb = xlsx.utils.book_new();
    let ws = xlsx.utils.json_to_sheet(store);
    xlsx.utils.book_append_sheet(wb, ws, "Participants");
    const wbout = xlsx.write(wb, { type: "base64", bookType: "csv" });
    const uri = `${FileSystem.documentDirectory} participants.csv`;
    alert("Data of participant is saved successfully!!");
    FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      <View style={styles.scan}>
        <Button
          title={"Scan"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //paddingTop: "30%",
    height: "100%",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  scan: {
    width: "50%",
  },
});
