import { View, Text, ImageBackground, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FireBaseConfig";
import BookForm from "../Components/BookForm/form";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigation from "../Components/BarcodeScanner/BarcodeScanner";
const Stack = createNativeStackNavigator();

const ListNewBook = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#00592e" }}>
      <BookForm />
    </View>
  );
};

export default ListNewBook;
