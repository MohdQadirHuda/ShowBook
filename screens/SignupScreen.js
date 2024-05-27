import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { logIN, logOUT } from "../loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { resetCityState } from "../cityReducer";
import { app } from "../store";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  const navigator = useNavigation();

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isLogin ? "Sign In" : "Sign Up"}
          onPress={handleAuthentication}
          color="#3498db"
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </View>
    </View>
  );
};

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};
export default App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.login);

  const filterTickets = (tickets) => {
    return tickets.filter((ticket) => ticket.userID == state.authKey);
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const [ticketsList, setTicketsList] = useState([]);
  useEffect(() => {
    const fetchTickets = () => {
      const db = getFirestore(app);
      getDocs(collection(db, "bookedCTickets"))
        .then((ticketsCollection) => {
          const tickets = ticketsCollection.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTicketsList(tickets);
        })
        .catch((error) => {
          console.error("Error fetching tickets:", error);
        });
    };
    fetchTickets();

    console.log("filter", filterTickets(ticketsList));
  }, []);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const makeLoginCall = (ID) => {
    dispatch(logIN(ID));
  };

  const makeLogoutCall = () => {
    dispatch(resetCityState());
    dispatch(logOUT());
  };

  const handleAuthentication = async () => {
    try {
      if (user) {
        console.log("User logged out successfully!");
        await signOut(auth);
        makeLogoutCall();
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          let result = await signInWithEmailAndPassword(auth, email, password);
          // console.log("Auth login: ",result?.user?.uid);
          let ID = result?.user?.uid;
          makeLoginCall(ID);
          console.log("User signed in successfully!");
        } else {
          // Sign up
          const data = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          // console.log("Auth login: ",data?.user?.uid);
          let ID = data?.user?.uid;
          makeLoginCall(ID);
          console.log(data);
          console.log("User created successfully!");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen
          user={user}
          handleAuthentication={handleAuthentication}
        />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
