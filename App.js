import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button, ImageBackground, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [vicc, setVicc] = useState("abc")
  const [adatok, setAdatok] = useState([])
  const [szoveg, setSzoveg] = useState("")
  
  const tomb = [
    {
      "szoveg":" - Hogy jön ki a pap a templomból?\n - Mintha mise történt volna.",
      "tipus":"favicc"
    },
    {
      "szoveg":" - Chuck Norris már kétszer meghalt, csak a halál nem mert eljönni érte!",
      "tipus":"chuck norris vicc"
    },
    {
      "szoveg":" - Gyerekek, mi a bizonyíték arra, hogy a Szahara helyén régen tenger volt? Tessék Pistike!\n - Az, hogy az arabok most is fürdőköpenyben járnak. ",
      "tipus":"pistike vicc"
    },
    {
      "szoveg":" - Hogy hívják az indián ejtőernyőst?\n - Apacs",
      "tipus":"favicc"
    },
    {
      "szoveg":" - Melyik a legsárgább madár?\n - A citrom héja",
      "tipus":"favicc"
    }
  ]

  const sorsol = () => {
    let veletlen = Math.floor(Math.random()*tomb.length)
    //alert(veletlen)
    //Alert.alert(String(veletlen))
    setVicc(tomb[veletlen].szoveg)
  }

  useEffect(() => {sorsol(); letoltes()}, [])

  const letoltes = async () => {
    let x = await fetch("https://api.chucknorris.io/jokes/random")
    let y = await x.json()

    setAdatok(y)
  }

  function gombNyomas(){
    Alert.alert("Üdvözlet","Hello "+szoveg+" !!!")
  }

  return (
    <ImageBackground style={styles.hatterkep} source={require('./assets/icon.png')}>
      <View style={styles.container}>
        <View style={[styles.viccek, {flex: 3}]}>
          <Text style={styles.sor}>{vicc}</Text>
          <TouchableOpacity style={styles.gomb} onPress={sorsol}>
            <Text>Másik Vicc</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.viccek, {flex: 3}]}>
          <Text style={styles.sor}>{adatok.value}</Text>
          <Pressable style={styles.gomb} onPress={letoltes}>
            <Text>Másik Vicc</Text>
          </Pressable>
        </View>
        <View style={[styles.viccek, {flex: 2, flexDirection: "row"}]}>
          <TextInput style={styles.bemenet} onChangeText={setSzoveg} value={szoveg}/>
          <TouchableOpacity style={styles.gomb} onPress={gombNyomas}>
            <Text>Gomb</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  hatterkep: {
    resizeMode: "cover",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    paddingVertical: "5%",
  },
  viccek: {
    width: "90%",
    alignItems: "center",
    justifyContent: 'center',
    padding: "2%",
  },
  sor: {
    marginBottom: "10%",
  },
  gomb: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
  },
  bemenet: {
    height: 40,
    width: "70%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgray',
  }
});
