import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  Image
} from 'react-native';


export default function Finish(props) {

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Terima kasih telah bermain, {props.route.params.name}
      </Text>
      <Image
        style={styles.image}
        source={{
          uri: 'https://media.tenor.com/images/bf76235f3fecbfb22bb7640766777884/tenor.png',
        }}
      />
      <View style={styles.button}>

        <Button 
          onPress={() => props.navigation.replace("Home")}
          title="Home" 
          color="#694fad" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignSelf: "center",
    justifyContent: "center", 
    backgroundColor: "white",
    marginBottom: 20
  },
  logo: {
    fontSize:20,
    color:"white",
    backgroundColor:"#694fad",
    padding: 5,
    borderRadius: 5,
    marginBottom: 20
  },
  button:{
    marginTop: 30
  },
  image: {
    width: 300,
    height: 200
  }
})