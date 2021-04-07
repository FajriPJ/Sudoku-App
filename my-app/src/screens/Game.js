import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setSudokuBoardsAsync, setInputBoards, setSudokuBoards } from '../store/action/sudokuAction'
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  Dimensions

} from 'react-native';
import { TextInput } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width  

export default function Game(props) {

  const dispatch = useDispatch()
  const sudokuBoards = useSelector(state => state.sudokuBoards)
  const inputBoards = useSelector(state => state.inputBoards)
  
  const [statusValidate, setStatusValidate] = useState(false)

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

  const handleValidate = () => {
    const data = {board: sudokuBoards}
    
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.status);
        if ( response.status === 'unsolved'){
          setStatusValidate(false)
          alert(response.status)
        } else {
          setStatusValidate(true)
          alert(response.status)
        }
      })
      .catch(console.warn)
  }

  const handleSolved = () => {
    const data = sudokuBoards
    
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setSudokuBoards(response.solution))
      })
      .catch(console.warn)
  }

  useEffect(() => {
    const payload = {difficulty: props.route.params.selectedValue}
    dispatch(setSudokuBoardsAsync(payload))
  }, [])

  const toFinish = () => {
    if (!statusValidate){
      alert('sudoku board still wrong')
    } else {
      props.navigation.replace("Finish", {
        name: props.route.params.name,
      })
    }
  }

  const changeData = (text, indexRow, indexCol) => {
    let newBoard = JSON.parse(JSON.stringify(sudokuBoards))
    newBoard [indexRow][indexCol] = Number(text)
    dispatch(setSudokuBoards(newBoard))
  }

  return (
    <View style={styles.container}>
      <View style={styles.textCard}>
        <Text style={styles.text}>
          Name: {props.route.params.name}
        </Text>
        <Text style={styles.text}>
          Difficulty: {props.route.params.selectedValue}
        </Text>
      </View>
      <View style={styles.board}>
        {
          sudokuBoards.map((row, indexRow) => {
            return (
              <View key={indexRow}>
                {
                  row.map((col, indexCol) => {
                    return (
                      <View 
                        key={indexCol}  
                        style={[
                          styles.box,
                          ((indexRow>=3 && indexRow<=5 && (indexCol<3 || indexCol>5)) || (indexCol>=3 &&indexCol <= 5 && (indexRow<3 || indexRow>5))) ? styles.lightBox : styles.darkBox
                        ]} 
                      >
                        <TextInput 
                          keyboardType="numeric"
                          style={styles.text}
                          value={col.toString() === '0' ? '' : col.toString()}
                          editable={inputBoards[indexRow][indexCol] === 0 ? true : false}
                          max={1} 
                          color="white"
                          onChangeText={(text) => changeData(text, indexRow, indexCol)}
                        /> 
                      </View>
                    )
                  })
                }
              </View>
            )
          })
        }
        <StatusBar style="auto" />
      </View>
      <View style={styles.button}>
        <Button style={styles.buttonItem}
          onPress={handleValidate}
          title="Validate" 
          color="#694fad" />
        <Button
        style={styles.buttonItem}
          onPress={handleSolved}
          title="Solved" 
          color="#694fad" />
        <Button
        style={styles.buttonItem}
          onPress={toFinish}
          title="Finish" 
          color="#694fad" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignSelf: "center",
    justifyContent: "center", 
    backgroundColor: "white",

  },
  board: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  textCard: {
    flexDirection: "row",
    marginBottom:20,
    marginTop: 20,
    margin: 10,
    fontSize: 20,
    justifyContent: "space-around",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    backgroundColor: "#694fad",
    padding: 5,
    borderRadius: 5
  },
  text: {
    color:"white",
  },  
  column: {
    flexDirection: "column",
    borderColor: "red",
    borderWidth: 2,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    alignItems:"center",
    justifyContent: "space-around",
  },
  buttonItem: {
    borderRadius: 30,
  },
  box: {
    width: (windowWidth - 30) / 9,
    height: (windowWidth - 30) / 9,
    flexDirection: "row",
    alignSelf: "center",
    borderWidth:1,
    justifyContent: "center", 
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "#694fad"
  },
  lightBox: {
    backgroundColor: "#a488eb",
    color: "black"

  },
  darkBox: {
    backgroundColor: "#694fad",
    color: "black"
  }
});
