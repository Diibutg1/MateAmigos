import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {

  return (

    <Tabs
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:"#2E7D32",
        tabBarStyle:{
          backgroundColor:"#F8F5F0",
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title:"Inicio",
          tabBarIcon:()=>(
            <Text>🧉</Text>
          ),
        }}
      />


      <Tabs.Screen
        name="search"
        options={{
          title:"Buscar",
          tabBarIcon:()=>(
            <Text>🔎</Text>
          ),
        }}
      />


      <Tabs.Screen
        name="chat"
        options={{
          title:"Chats",
          tabBarIcon:()=>(
            <Text>💬</Text>
          ),
        }}
      />


      <Tabs.Screen
        name="profile"
        options={{
          title:"Perfil",
          tabBarIcon:()=>(
            <Text>👤</Text>
          ),
        }}
      />


    </Tabs>

  );

}