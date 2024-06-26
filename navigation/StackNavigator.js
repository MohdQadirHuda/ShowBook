import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import PlacesScreen from "../screens/PlacesScreen";
import MovieScreen from "../screens/MovieScreen";
import TheatreScreen from "../screens/TheatreScreen";
import FoodScreen from "../screens/FoodScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import TicketScreen from "../screens/TicketScreen";
import SignupScreen from "../screens/SignupScreen";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";





const ProfileStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function HomeStackScreens() {

    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{title:""}}/>
        <HomeStack.Screen name="Places" component={PlacesScreen} />
        <HomeStack.Screen name="Movie" component={MovieScreen} />
        <HomeStack.Screen name="Theatre" component={TheatreScreen} />
        <HomeStack.Screen name="Food" component={FoodScreen} />
        <HomeStack.Screen name="Confirmation" component={ConfirmationScreen} />
        <HomeStack.Screen name="Ticket" component={TicketScreen} />
        <HomeStack.Screen name="Signup" component={SignupScreen} />
        <HomeStack.Screen name="Profile" component={ProfileScreen} />
      </HomeStack.Navigator>
    );
}

function ProfileStackScreens() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      </ProfileStack.Navigator>
    );
}
function AuthStackScreens() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Navigation() {

  const [isAuthenticated, setAuthenticated] = useState(false);
  const isLOGIN = useSelector((state) => state.login);

  useEffect(()=>{
    setAuthenticated(isLOGIN.data);
  },[isLOGIN?.data]);

    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStackScreens}
            options={{
              tabBarLabel: "Home",
              tabBarLabelStyle: { color: "black" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Entypo name="home" size={24} color="black" />
                ) : (
                  <AntDesign name="home" size={24} color="black" />
                ),
            }}
          />
           <Tab.Screen
            name="SignupScreen"
            component={AuthStackScreens}
            options={{
              tabBarLabel: isAuthenticated ? "Profile" : "Login",
              tabBarLabelStyle: { color: "black" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="person" size={24} color="black" />
                ) : (
                  <Ionicons name="person-outline" size={24} color="black" />
                ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }


  export default Navigation