import React, {useState} from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  Picker
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function Home(props) {

  const [name, setName] = useState('')
  const [selectedValue, setSelectedValue] = useState("easy");

  const validate = () => {
    if (!name) {
      alert('name is required')
    } else {
      props.navigation.navigate("Game", {
        name,
        selectedValue
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        SUGOKU
      </Text>
      <TextInput
        style={styles.input}
        name={name}
        placeholder='Your Name'
        onChangeText={(val) => setName(val)}
      />
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 200, borderWidth: 1 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
        <Picker.Item label="easy" value="easy"  style={{ borderWidth: 10  }}/>
        <Picker.Item label="medium" value="medium" />
        <Picker.Item label="hard" value="hard" />
      </Picker>

      <View style={styles.button}>
        <Button 
          onPress={validate}
          title="Play" 
          color="#694fad" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "#444444"
  },
  logo: {
    fontSize:50,
    color:"white",
    backgroundColor:"#694fad",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10
  },
  button: {
    width: 200,
    height: 100,
    marginTop: 20,
    borderRadius: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 5
  },
  
})
