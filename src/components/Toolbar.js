import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Toolbar({ drawMode, setDrawMode, onSave, onLoad, onClear }) {
  const modes = ["zone", "stairs", "start", "end"];
  return (
    <View style={styles.toolbar}>
      {modes.map((mode) => (
        <TouchableOpacity key={mode} onPress={() => setDrawMode(mode)}>
          <Text style={[styles.button, drawMode === mode && styles.active]}>{mode}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={onSave}><Text style={styles.button}>Save</Text></TouchableOpacity>
      <TouchableOpacity onPress={onLoad}><Text style={styles.button}>Load</Text></TouchableOpacity>
      <TouchableOpacity onPress={onClear}><Text style={styles.button}>Clear</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  button: {
    padding: 8,
    backgroundColor: "#ddd",
    borderRadius: 5,
    margin: 4,
  },
  active: {
    backgroundColor: "#87ceeb",
  },
});