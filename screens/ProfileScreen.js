import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../store";

const ProfileScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require("../assets/defprof.jpg")} // Replace with actual profile picture source
          style={styles.profilePicture}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.bio}>Movie ticket Booking App</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Tickets</Text>
        {/* Placeholder text for My Tickets */}
        <Text>No tickets available</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        {/* Placeholder text for Payment Methods */}
        <Text>No payment methods added</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
