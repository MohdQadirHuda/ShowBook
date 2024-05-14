import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={{ marginBottom: 50 }}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/ruslaan-et00343222-1712663298.jpg",
          }}
        />
        <Pressable
          styles={{
            height: 90,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            width: "90%",
            top: 160,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <View>
              <Text style={{fontSize:15,fontWeight:"500"}}>Releasing in 1 Day</Text>
              <Text style={{marginVertical:5,fontSize:16,fontWeight:"700"}}>RUSLAAN</Text>
              <Text style={{fontSize:15,color:"gray",fontWeight:"500"}}>U/A-HINDI</Text>
            </View>
            <Pressable style={{backgroundColor:"#ffc40c",padding:10,borderRadius:6,marginRight:10}}>
              <Text>BOOK</Text>
            </Pressable>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  pressableContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 30,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Header;
