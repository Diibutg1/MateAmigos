import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useRouter } from "expo-router";


export default function Welcome(){

  const router = useRouter();


  return(

    <View style={styles.container}>


      <View style={styles.imageContainer}>

        <Image
          source={require("../assets/images/mate-bienvenida.jpg")}
          style={styles.image}
        />

      </View>



      <View style={styles.content}>


        <Text style={styles.logo}>
          🧉
        </Text>


        <Text style={styles.title}>
          MateAmigos
        </Text>


        <Text style={styles.subtitle}>
          Un mate puede iniciar una amistad
        </Text>


        <TouchableOpacity
  style={styles.button}
  onPress={() =>
    router.push("/(auth)/login")
  }
>

<Text style={styles.buttonText}>
  🧉 Dale un mate
</Text>

</TouchableOpacity>


        <TouchableOpacity
          style={styles.secondary}
          onPress={() =>
            router.push("/(auth)/login")
          }
        >

          <Text style={styles.secondaryText}>
            Ya tengo mate
          </Text>

        </TouchableOpacity>


      </View>


    </View>

  );

}



const styles = StyleSheet.create({

container:{
  flex:1,
  flexDirection:"row",
  backgroundColor:"#F8F5F0",
},


imageContainer:{
  flex:1,
},


image:{
  width:"100%",
  height:"100%",
  resizeMode:"cover",
},


content:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  padding:25,
},


logo:{
  fontSize:70,
},


title:{
  fontSize:35,
  fontWeight:"bold",
  color:"#3D2C1E",
  textAlign:"center",
  marginTop:10,
},


subtitle:{
  fontSize:18,
  color:"#6D4C41",
  textAlign:"center",
  marginVertical:25,
},


button:{
  backgroundColor:"#2E7D32",
  paddingVertical:16,
  borderRadius:40,
  width:"100%",
},


buttonText:{
  color:"#FFFFFF",
  fontSize:18,
  fontWeight:"bold",
  textAlign:"center",
},


secondary:{
  marginTop:20,
  padding:15,
},


secondaryText:{
  color:"#2E7D32",
  fontSize:17,
  fontWeight:"bold",
},

});