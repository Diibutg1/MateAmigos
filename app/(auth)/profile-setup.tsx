import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileSetup() {

  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);

const [name, setName] = useState("");
const [age, setAge] = useState("");
const [city, setCity] = useState("");
const [description, setDescription] = useState("");

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedMate, setSelectedMate] = useState("");

  const interests = [
    "⚽ Fútbol",
    "🎵 Música",
    "✈️ Viajes",
    "💬 Charlas",
    "🎮 Juegos",
    "📚 Libros",
  ];

  const mates = ["🧉 Amargo", "🍬 Dulce", "🌿 Ambos"];

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Debes permitir el acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  function toggleInterest(item: string) {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(
        selectedInterests.filter((i) => i !== item)
      );
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  }
function validateProfile() {

  if (!image) {
    alert("Debes agregar una foto de perfil 📷");
    return false;
  }

  if (name.trim() === "") {
    alert("Ingresa tu nombre 👤");
    return false;
  }

  if (age.trim() === "") {
  alert("Ingresa tu edad 🎂");
  return false;
}

const userAge = Number(age);

if (isNaN(userAge)) {
  alert("La edad debe ser un número.");
  return false;
}

if (userAge < 18) {
  alert("Debes tener al menos 18 años para usar MateAmigos.");
  return false;
}

  if (city.trim() === "") {
    alert("Ingresa tu ciudad 📍");
    return false;
  }

  if (description.trim() === "") {
    alert("Cuéntanos algo sobre ti 📝");
    return false;
  }

  if (selectedMate === "") {
    alert("Selecciona tu mate favorito 🧉");
    return false;
  }

  if (selectedInterests.length === 0) {
    alert("Selecciona al menos un interés ⭐");
    return false;
  }

  return true;
}
async function saveProfile(){

  const profile = {
    image,
    name,
    age,
    city,
    description,
    selectedMate,
    selectedInterests,
  };


  try {

    await AsyncStorage.setItem(
      "userProfile",
      JSON.stringify(profile)
    );


    alert("Perfil guardado correctamente 🧉");


    router.replace("/(tabs)");


  } catch(error){

    alert("Error guardando el perfil");

    console.log(error);

  }

}
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Completa tu perfil 🧉</Text>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.camera}>📷</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.changePhoto}>
          Toca para elegir una foto
        </Text>

        <TextInput
  placeholder="Nombre"
  value={name}
  onChangeText={setName}
  style={styles.input}
/>

        <TextInput
  placeholder="Edad"
  keyboardType="numeric"
  value={age}
  onChangeText={setAge}
  style={styles.input}
/>

        <TextInput
  placeholder="Ciudad"
  value={city}
  onChangeText={setCity}
  style={styles.input}
/>

        <TextInput
  placeholder="Cuéntanos sobre ti"
  multiline
  numberOfLines={4}
  value={description}
  onChangeText={setDescription}
  style={[styles.input, { height: 110 }]}
/>

        <Text style={styles.section}>
          Tu mate favorito
        </Text>

        <View style={styles.wrap}>
          {mates.map((mate) => (
            <TouchableOpacity
              key={mate}
              onPress={() => setSelectedMate(mate)}
              style={[
                styles.tag,
                selectedMate === mate && styles.tagSelected,
              ]}
            >
              <Text
                style={
                  selectedMate === mate
                    ? styles.tagTextSelected
                    : styles.tagText
                }
              >
                {mate}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.section}>
          ¿Qué te gusta?
        </Text>

        <View style={styles.wrap}>
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest}
              onPress={() => toggleInterest(interest)}
              style={[
                styles.tag,
                selectedInterests.includes(interest) &&
                  styles.tagSelected,
              ]}
            >
              <Text
                style={
                  selectedInterests.includes(interest)
                    ? styles.tagTextSelected
                    : styles.tagText
                }
              >
                {interest}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

                <TouchableOpacity
          style={styles.button}
          onPress={() => {

            if (!validateProfile()) {
              return;
            }

            saveProfile();

          }}
        >
          <Text style={styles.buttonText}>
            Guardar perfil
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F0",
  },

  scroll: {
    padding: 25,
    paddingBottom: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3D2C1E",
    marginBottom: 25,
  },

  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E7E7E7",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  profileImage: {
    width: "100%",
    height: "100%",
  },

  camera: {
    fontSize: 55,
  },

  changePhoto: {
    textAlign: "center",
    color: "#2E7D32",
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  section: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D2C1E",
    marginTop: 10,
    marginBottom: 15,
  },

  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 25,
  },

  tag: {
    borderWidth: 1,
    borderColor: "#2E7D32",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  tagSelected: {
    backgroundColor: "#2E7D32",
  },

  tagText: {
    color: "#2E7D32",
    fontWeight: "600",
  },

  tagTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 18,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});