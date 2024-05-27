import {
  Alert,
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import { client } from "../showbook-movies/sanity";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { app } from "../store";
import { err } from "react-native-svg";

const ConfirmationScreen = () => {
  const authKey = useSelector((state) => state.login.authKey);

  const route = useRoute();
  const navigation = useNavigation();
  console.log(route.params);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const ticketPrice = route.params.selectedSeats.length * 200;
  const fee = 53;
  const grandTotal = ticketPrice + fee + total;
  console.log(grandTotal);
  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      gestureDirection: "horizontal",
    });
  }, []);
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Want to end Session",
        "Go back to main screen",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () =>
              navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] }),
          },
        ],
        { cancelable: false }
      );

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    };
  }, []);
  const pay = () => {
    const options = {
      description: "Adding To Wallet",
      currency: "INR",
      name: "SHOWBOOK",
      key: "rzp_test_vvNplPXKnwBu2h",
      amount: grandTotal * 100,
      prefill: {
        email: "Mqh4862@gmail.com",
        contact: "7298632786",
        name: "RazorPay Software",
      },
      theme: { color: "#F37254" },
    };
    RazorpayCheckout.open(options).then((data) => {
      console.log(data);
      const updatedRows = [...route.params.rows];

      route.params.selectedSeats.forEach((seat) => {
        const rowIndex = updatedRows.findIndex((row) => row.row === seat.row);
        console.log("row Index", rowIndex);
        const seatIndex = updatedRows[rowIndex].seats.findIndex(
          (s) => s.number === seat.seat
        );
        console.log("seat Index", seatIndex);
        const docId = route.params.docId;
        client
          .patch(docId)
          .set({
            [`row[${rowIndex}].seats[${seatIndex}].bookingStatus`]: "disabled",
          })
          .commit()
          .then((updatedDoc) => {
            console.log("updated doc: ", updatedDoc);
          })
          .catch((err) => {
            console.log("update failed", err);
          });
        updatedRows[rowIndex].seats[seatIndex].bookingStatus = "disabled";
      });

      const seatNumbers = route.params.selectedSeats.map(
        (seat) => seat.row + seat.seat
      );

      const result = seatNumbers.join(" ");
      console.log("res", result);
      const db = getFirestore(app);

      console.log(route.params.mall,
        route.params.showtime,
        route.params.selectedDate,
        route.params.selectedSeats,)

      // Add a new document with a generated id.
      addDoc(collection(db, "bookedCTickets"), {
        mall: route.params.mall,
        showtime: route.params.showtime,
        date: route.params.selectedDate,
        seats: route.params.selectedSeats,
      }).then((docRef) => console.log("Document written with ID: ", docRef.id));

      navigation.navigate("Ticket", {
        selectedSeats: result,
        mall: route.params.mall,
        showtime: route.params.showtime,
        date: route.params.selectedDate,
        seats: route.params.selectedSeats,
      });
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <View style={{ backgroundColor: "white", padding: 10, borderRadius: 6 }}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {route.params.name}
          </Text>
          <Text style={{ marginVertical: 4, color: "gray" }}>
            U • A English
          </Text>
          <Text>{route.params.selectedDate}</Text>
        </View>

        <View
          style={{
            height: 1,
            borderColor: "#E0E0E0",
            borderWidth: 1,
            marginTop: 6,
          }}
        />

        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {route.params.mall}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginTop: 4,
              color: "gray",
            }}
          >
            AUDI 02 • CLASSIC
          </Text>
          <Text style={{ color: "red", marginTop: 4, fontWeight: "500" }}>
            {route.params.seats} | {route.params.showtime}
          </Text>
        </View>

        <View
          style={{
            height: 1,
            borderColor: "#E0E0E0",
            borderWidth: 1,
            marginTop: 6,
          }}
        />

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>TOTAL</Text>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            ₹{grandTotal}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            TICKETS {route.params.selectedSeats.length}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            ₹{route.params.selectedSeats.length * 200}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Food & Beverages
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>₹{total}</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          {cart.map((item, index) => (
            <View key={index} style={{ gap: 6 }}>
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Convenience Fee
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>₹53</Text>
        </View>
      </View>

      <Pressable
        onPress={pay}
        style={{
          marginTop: 10,
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500" }}>PAY</Text>
      </Pressable>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
