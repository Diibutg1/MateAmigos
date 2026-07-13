import { Link } from "expo-router";

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function Register(){

  return(

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >


      <View>


        <Text style={styles.logo}>
          🧉
        </Text>


        <Text style={styles.title}>
          Preparar mi mate
        </Text>


        <Text style={styles.subtitle}>
          Comencemos a conocerte
        </Text>



        <TextInput
          placeholder="Nombre"
          style={styles.input}
        />



        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />



        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
        />



        <Link href="/(auth)/profile-setup" asChild>

          <TouchableOpacity style={styles.button}>


            <Text style={styles.buttonText}>
              🧉 Preparar mi mate
            </Text>


          </TouchableOpacity>


        </Link>



        <Link href="/(auth)/login" asChild>

          <TouchableOpacity>


            <Text style={styles.link}>
              ¿Ya tienes mate? Volver al mate
            </Text>


          </TouchableOpacity>


        </Link>



      </View>


    </KeyboardAvoidingView>

  );

}



const styles = StyleSheet.create({

container:{
  flex:1,
  justifyContent:"center",
  padding:25,
  backgroundColor:"#F8F5F0",
},


logo:{
  fontSize:70,
  textAlign:"center",
  marginBottom:10,
},


title:{
  fontSize:32,
  fontWeight:"bold",
  textAlign:"center",
  color:"#3D2C1E",
},


subtitle:{
  textAlign:"center",
  fontSize:18,
  color:"#6D4C41",
  marginTop:10,
  marginBottom:35,
},


input:{
  backgroundColor:"#FFFFFF",
  padding:16,
  borderRadius:12,
  marginBottom:15,
},


button:{
  backgroundColor:"#2E7D32",
  padding:18,
  borderRadius:30,
  marginTop:10,
},


buttonText:{
  color:"#FFFFFF",
  textAlign:"center",
  fontSize:18,
  fontWeight:"bold",
},


link:{
  marginTop:25,
  textAlign:"center",
  color:"#2E7D32",
  fontSize:16,
  fontWeight:"bold",
},


});