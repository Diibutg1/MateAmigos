import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";



const users = [

  {
    id: 1,
    name: "Sofía",
    age: 26,
    city: "Hurlingam, Buenos Aires",
    mate: "🧉 Amargo",
    image: "https://i.pravatar.cc/300",
    interests:[
      "⚽ Fútbol",
      "🎵 Música"
    ],
  },


  {
    id: 2,
    name: "Martin",
    age: 24,
    city: "Carlos Paz, Córdoba",
    mate: "🍬 Dulce",
    image: "https://i.pravatar.cc/301",
    interests:[
      "✈️ Viajes",
      "💬 Charlas"
    ],
  },

];





export default function HomeScreen(){



  const [profile,setProfile] = useState<any>(null);


  const [mates,setMates] = useState(users);


  const [sentRequests,setSentRequests] = useState<any[]>([]);






  useEffect(()=>{


    async function loadProfile(){


      try{


        const data = await AsyncStorage.getItem(
          "userProfile"
        );


        if(data){

          setProfile(
            JSON.parse(data)
          );

        }


      }catch(error){

        console.log(
          "Error cargando perfil:",
          error
        );

      }


    }



    loadProfile();



  },[]);







  useEffect(()=>{


    async function loadRequests(){


      try{


        const data = await AsyncStorage.getItem(
          "mateRequests"
        );



        if(data){


          setSentRequests(
            JSON.parse(data)
          );


        }



      }catch(error){


        console.log(
          "Error cargando solicitudes:",
          error
        );


      }



    }



    loadRequests();



  },[]);









  async function sendMateRequest(user:any){



    const exists = sentRequests.some(
      (item)=>item.id === user.id
    );



    if(exists){

      return;

    }




    const newRequests = [

      ...sentRequests,
      user

    ];




    setSentRequests(
      newRequests
    );





    await AsyncStorage.setItem(

      "mateRequests",

      JSON.stringify(newRequests)

    );





    console.log(
      "Solicitud guardada:",
      newRequests
    );



  }








  return(



    <ScrollView

      style={styles.container}

      showsVerticalScrollIndicator={false}

    >






      <View style={styles.header}>



        <Text style={styles.logo}>
          🧉
        </Text>




        <Text style={styles.title}>
          MateAmigos
        </Text>




        <Text style={styles.welcome}>
          Hola {profile?.name || "mateador"} 👋
        </Text>




        <Text style={styles.subtitle}>
          ¿Con quién compartimos un mate hoy?
        </Text>



      </View>









      <View style={styles.card}>




        {
          profile?.image && (

            <Image

              source={{
                uri:profile.image
              }}

              style={styles.avatar}

            />

          )
        }





        <Text style={styles.cardTitle}>
          Tu perfil está listo 🧉
        </Text>




        <Text style={styles.info}>
          📍 {profile?.city}
        </Text>




        <Text style={styles.info}>
          {profile?.selectedMate}
        </Text>



      </View>









      <Text style={styles.sectionTitle}>
        Personas para compartir un mate 🧉
      </Text>









      {
        mates.map((user)=>(



          <View

            key={user.id}

            style={styles.userCard}

          >





            <Image

              source={{
                uri:user.image
              }}

              style={styles.avatar}

            />





            <Text style={styles.userName}>
              {user.name}, {user.age}
            </Text>





            <Text style={styles.info}>
              📍 {user.city}
            </Text>





            <Text style={styles.info}>
              {user.mate}
            </Text>





            <Text style={styles.info}>

              {
                user.interests.join(" ")
              }

            </Text>








            <TouchableOpacity

              style={styles.mateButton}

              onPress={()=>sendMateRequest(user)}

            >



              <Text style={styles.buttonText}>


                {
                  sentRequests.some(
                    (item)=>item.id===user.id
                  )

                  ?

                  "✅ Solicitud enviada"

                  :

                  "🧉 Dale un mate"

                }


              </Text>



            </TouchableOpacity>





          </View>



        ))
      }







    </ScrollView>



  );

}









const styles = StyleSheet.create({



container:{
  flex:1,
  backgroundColor:"#F8F5F0",
  padding:25,
},



header:{
  alignItems:"center",
  marginTop:30,
},



logo:{
  fontSize:70,
},



title:{
  fontSize:36,
  fontWeight:"bold",
  color:"#3D2C1E",
},



welcome:{
  marginTop:20,
  fontSize:24,
  fontWeight:"bold",
  color:"#2E7D32",
},



subtitle:{
  marginTop:10,
  fontSize:18,
  color:"#6D4C41",
  textAlign:"center",
},



card:{
  marginTop:30,
  backgroundColor:"#FFFFFF",
  borderRadius:20,
  padding:25,
  alignItems:"center",
},



avatar:{
  width:100,
  height:100,
  borderRadius:50,
},



cardTitle:{
  fontSize:20,
  fontWeight:"bold",
  marginTop:15,
  color:"#3D2C1E",
},



info:{
  marginTop:8,
  fontSize:16,
  color:"#6D4C41",
},



sectionTitle:{
  marginTop:30,
  marginBottom:15,
  fontSize:22,
  fontWeight:"bold",
  color:"#3D2C1E",
},



userCard:{
  backgroundColor:"#FFFFFF",
  borderRadius:20,
  padding:20,
  marginBottom:20,
  alignItems:"center",
},



userName:{
  fontSize:22,
  fontWeight:"bold",
  color:"#2E7D32",
  marginTop:10,
},



mateButton:{
  marginTop:15,
  backgroundColor:"#2E7D32",
  paddingVertical:12,
  paddingHorizontal:30,
  borderRadius:30,
},



buttonText:{
  color:"#FFFFFF",
  fontSize:18,
  fontWeight:"bold",
},



});