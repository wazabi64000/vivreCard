import { View, Text, Image } from 'react-native'
 
const Logo = () => {
  return (
 <View style={{ justifyContent: 'center', alignItems: 'center' ,padding: 30,}}>
  <Image 
    source={require("../assets/dreamTeam.png")} 
    style={{ width: 100, height: 100,  borderRadius: 5 }} 
  />
</View>
  )
}

export default Logo