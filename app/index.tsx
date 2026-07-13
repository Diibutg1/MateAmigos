import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";


const { width, height } = Dimensions.get("window");


const slides = [
  {
    id: "1",
    image: require("../assets/images/bienvenida1.jpg"),
    text: "Conecta con personas que disfrutan compartir un mate 🧉",
  },
  {
    id: "2",
    image: require("../assets/images/bienvenida2.jpg"),
    text: "Encuentra nuevos amigos cerca de ti",
  },
  {
    id: "3",
    image: require("../assets/images/bienvenida3.jpg"),
    text: "Un mate puede ser el comienzo de una gran amistad",
  },
];


export default function Index() {

  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [showButton, setShowButton] = useState(false);

const [checkingUser, setCheckingUser] = useState(true);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {

  async function checkUser(){

    const user = await AsyncStorage.getItem("userProfile");

    if(user){

      router.replace("/(tabs)");

    } else {

      setCheckingUser(false);

    }

  }


  checkUser();

}, []);

useEffect(() => {

  const buttonTimer = setTimeout(() => {
    setShowButton(true);
  }, 10000);

  return () => clearTimeout(buttonTimer);

}, []);
  useEffect(() => {

    const timer = setInterval(() => {

      let nextIndex = currentIndex + 1;

      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);

    }, 4000);


    return () => clearInterval(timer);

  }, [currentIndex]);

if (checkingUser) {
  return (
    <View style={styles.loading}>
      <Text style={styles.loadingLogo}>
        🧉
      </Text>

      <Text style={styles.loadingText}>
        Preparando tu mate...
      </Text>
    </View>
  );
}
  return (

    <View style={styles.container}>


      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}

        onMomentumScrollEnd={(event)=>{

          const index =
          Math.round(
            event.nativeEvent.contentOffset.x / width
          );

          setCurrentIndex(index);

        }}

        renderItem={({item})=>(

          <View style={styles.slide}>


            <Image
              source={item.image}
              style={styles.image}
            />


            <View style={styles.overlay}/>


            <Text style={styles.text}>
              {item.text}
            </Text>


          </View>

        )}

      />
<TouchableOpacity
  style={styles.skip}
  onPress={() => setShowButton(true)}
>
<Text style={styles.skipText}>
Saltar
</Text>
</TouchableOpacity>

      <View style={styles.dots}>

        {slides.map((_,index)=>(

          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index &&
              styles.activeDot
            ]}
          />

        ))}

      </View>



      {showButton && (

<TouchableOpacity
  style={styles.button}
  onPress={() =>
    router.push("/welcome")
  }
>

  <Text style={styles.buttonText}>
    Conocer MateAmigos 🧉
  </Text>

</TouchableOpacity>
)}

    </View>

  );
}



const styles = StyleSheet.create({

container:{
  flex:1,
},


slide:{
 width,
 height,
 justifyContent:"center",
 alignItems:"center",
},

loading:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#F8F5F0",
},

loadingLogo:{
  fontSize:80,
},

loadingText:{
  marginTop:20,
  fontSize:20,
  color:"#3D2C1E",
  fontWeight:"bold",
},

image:{
 width:"100%",
 height:"100%",
 position:"absolute",
},


overlay:{
 position:"absolute",
 width:"100%",
 height:"100%",
 backgroundColor:"rgba(0,0,0,0.35)",
},


text:{
 color:"#FFFFFF",
 fontSize:30,
 fontWeight:"bold",
 textAlign:"center",
 paddingHorizontal:30,
},


dots:{
 position:"absolute",
 bottom:150,
 flexDirection:"row",
},


dot:{
 width:10,
 height:10,
 borderRadius:10,
 backgroundColor:"#FFFFFF",
 margin:5,
 opacity:0.5,
},


activeDot:{
 opacity:1,
},


button:{
 position:"absolute",
 bottom:50,
 backgroundColor:"#2E7D32",
 paddingVertical:18,
 paddingHorizontal:50,
 borderRadius:40,
 alignSelf:"center",
},


buttonText:{
 color:"#FFFFFF",
 fontSize:18,
 fontWeight:"bold",
},


});