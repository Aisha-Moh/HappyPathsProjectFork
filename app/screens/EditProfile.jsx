import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FireBaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { collection, getDocs } from "firebase/firestore";

const EditProfile = ({ route }) => {
  // do a use effect to set the current user and update in dependencies after submit is made?
  // console.log(route.params.user, "<-- user from route params?");
  // const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState(route.params.user);
  console.log(currUser, "<-- set current user");
  const [selectedImage, setSelectedImage] = useState(
    route.params.user.photoURL
  );
  console.log(selectedImage, "<-- set selected image?");
  // const fetchUsersFromFirestore = async () => {
  //   try {
  //     const collectionRef = collection(FIREBASE_DB, "users");
  //     const snapshot = await getDocs(collectionRef);
  //     const fetchedUsers = [];
  //     snapshot.forEach((user) => {
  //       fetchedUsers.push({
  //         id: user.id,
  //         ...user.data(),
  //       });
  //     });
  //     setUsers(fetchedUsers);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsersFromFirestore();
  // }, []);
  const handleSubmitChanges = () => {
    console.log("add submit function here");
    console.log(FIREBASE_AUTH.currentUser.photoURL);
  };
  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].url);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleImageSelection}>
          <Image
            source={{
              uri: selectedImage,
            }}
            style={styles.avatar}
          />
          <View style={styles.photoButton}>
            <MaterialIcons name="photo-camera" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Display Name: </Text>
        <TextInput
          style={styles.infoValue}
          placeholder={FIREBASE_AUTH.currentUser.displayName}
        ></TextInput>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email: </Text>
        <TextInput
          style={styles.infoValue}
          placeholder={FIREBASE_AUTH.currentUser.email}
        ></TextInput>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location: </Text>
        <TextInput style={styles.infoValue}></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmitChanges} title="Submit Changes" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "black",
  },
  photoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 9999,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
  },
});

export default EditProfile;
