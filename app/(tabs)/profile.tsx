import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";


export default function ProfileScreen() {


  const [profile, setProfile] = useState<any>(null);


  useEffect(() => {

    async function loadProfile(){

      const data = await AsyncStorage.getItem(
        "userProfile"
      );


      if(data){

        setProfile(JSON.parse(data));

      }

    }


    loadProfile();

  }, []);



  if(!profile){

    return(

      <View style={styles.container}>

        <Text style={styles.title}>
          Cargando perfil... 🧉
        </Text>

      </View>

    );

  }



  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >


      <Text style={styles.title}>
        Mi Perfil 🧉
      </Text>



      <Image
        source={{
          uri:profile.image
        }}
        style={styles.photo}
      />



      <Text style={styles.name}>
        {profile.name}
      </Text>


      <Text style={styles.info}>
        🎂 {profile.age} años
      </Text>


      <Text style={styles.info}>
        📍 {profile.city}
      </Text>



      <Text style={styles.description}>
        "{profile.description}"
      </Text>



      <View style={styles.card}>

        <Text style={styles.section}>
          Mi mate favorito 🧉
        </Text>

        <Text style={styles.value}>
          {profile.selectedMate}
        </Text>

      </View>



      <View style={styles.card}>

        <Text style={styles.section}>
          Mis intereses ⭐
        </Text>


        {profile.selectedInterests.map(
          (item:string)=>(
            
            <Text
              key={item}
              style={styles.value}
            >
              {item}
            </Text>

          )
        )}


      </View>



    </ScrollView>

  );

}



const styles = StyleSheet.create({


container:{
  flexGrow:1,
  alignItems:"center",
  backgroundColor:"#F8F5F0",
  padding:25,
},


title:{
  fontSize:30,
  fontWeight:"bold",
  color:"#3D2C1E",
  marginBottom:25,
},


photo:{
  width:150,
  height:150,
  borderRadius:75,
  marginBottom:20,
},


name:{
  fontSize:28,
  fontWeight:"bold",
  color:"#2E7D32",
},


info:{
  fontSize:18,
  marginTop:8,
  color:"#5D4037",
},


description:{
  fontSize:18,
  textAlign:"center",
  marginVertical:25,
  color:"#3D2C1E",
},


card:{
  width:"100%",
  backgroundColor:"#FFFFFF",
  borderRadius:15,
  padding:20,
  marginTop:15,
},


section:{
  fontSize:20,
  fontWeight:"bold",
  color:"#3D2C1E",
  marginBottom:10,
},


value:{
  fontSize:17,
  color:"#2E7D32",
  marginTop:5,
},


});