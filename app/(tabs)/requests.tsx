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



export default function RequestsScreen(){


  const [requests,setRequests] = useState<any[]>([]);

  const [accepted,setAccepted] = useState<number[]>([]);



  useEffect(()=>{


    loadRequests();


  },[]);




  async function loadRequests(){


    try{


      const data = await AsyncStorage.getItem(
        "mateRequests"
      );


      console.log(
        "DATOS RECIBIDOS:",
        data
      );



      if(data){


        const savedRequests = JSON.parse(data);


        setRequests(savedRequests);


      }



    }catch(error){


      console.log(
        "Error leyendo solicitudes:",
        error
      );


    }


  }





  async function acceptMate(id:number){


    const newAccepted = [
      ...accepted,
      id
    ];


    setAccepted(newAccepted);



    await AsyncStorage.setItem(
      "acceptedMates",
      JSON.stringify(newAccepted)
    );


  }





  async function rejectMate(id:number){


    const filtered = requests.filter(
      user=>user.id !== id
    );


    setRequests(filtered);



    await AsyncStorage.setItem(
      "mateRequests",
      JSON.stringify(filtered)
    );


  }





  return(


    <ScrollView
      style={styles.container}
    >



      <Text style={styles.title}>
        🧉 Solicitudes
      </Text>




      {
        requests.length === 0 ?


        <Text style={styles.text}>
          Todavía no tienes solicitudes
        </Text>



        :



        requests.map((user)=>(


          <View
            key={user.id}
            style={styles.card}
          >



            {
              user.image && (

                <Image
                  source={{
                    uri:user.image
                  }}
                  style={styles.avatar}
                />

              )
            }



            <Text style={styles.name}>
              {user.name} {user.age}
            </Text>



            <Text style={styles.text}>
              📍 {user.city}
            </Text>



            <Text style={styles.text}>
              {user.mate}
            </Text>




            <TouchableOpacity
              style={styles.acceptButton}
              onPress={()=>acceptMate(user.id)}
            >

              <Text style={styles.buttonText}>
                {
                  accepted.includes(user.id)
                  ?
                  "✅ Mate aceptado"
                  :
                  "🧉 Aceptar mate"
                }
              </Text>

            </TouchableOpacity>




            <TouchableOpacity
              style={styles.rejectButton}
              onPress={()=>rejectMate(user.id)}
            >

              <Text style={styles.buttonText}>
                ❌ Rechazar
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


title:{
 marginTop:40,
 textAlign:"center",
 fontSize:30,
 fontWeight:"bold",
 color:"#3D2C1E",
},


text:{
 marginTop:15,
 textAlign:"center",
 fontSize:18,
 color:"#6D4C41",
},


card:{
 marginTop:25,
 backgroundColor:"#FFFFFF",
 padding:20,
 borderRadius:20,
 alignItems:"center",
},


avatar:{
 width:90,
 height:90,
 borderRadius:45,
},


name:{
 marginTop:10,
 fontSize:22,
 fontWeight:"bold",
 color:"#2E7D32",
},


acceptButton:{
 marginTop:20,
 backgroundColor:"#2E7D32",
 padding:12,
 borderRadius:30,
},


rejectButton:{
 marginTop:10,
 backgroundColor:"#B71C1C",
 padding:12,
 borderRadius:30,
},


buttonText:{
 color:"#FFFFFF",
 fontSize:17,
 fontWeight:"bold",
},


});