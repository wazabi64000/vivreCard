import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useAuthSore } from "../store/authStore";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import Logo from "../components/Logo";

const Profile = () => {
  const { token, logout } = useAuthSore();
  const navigation = useNavigation();

  const userEmail = "user@example.com"; // récupérer depuis ton store ou backend

  const handleLogout = () => {
    // On affiche l'alerte de confirmation
    Alert.alert(
      "Confirmer la déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Non", style: "cancel" },
        { 
          text: "Oui", 
          style: "destructive", 
          onPress: async () => {
            try {
              await logout(); // supprime token et met isAuthenticated à false
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }], // retour à l'écran Login
              });
            } catch (error) {
              Alert.alert("Erreur", "Impossible de se déconnecter");
            }
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>

    {<Logo /> ? <Logo /> :  <Loading />}
      <Text style={styles.title}>Profil utilisateur</Text>

      <Text style={styles.label}>Email :</Text>
      <Text style={styles.info}>{userEmail}</Text>

      <Text style={styles.label}>Token :</Text>
      <Text style={styles.info}>{token || "Aucun token trouvé"}</Text>

      <View style={styles.button}>
        <Button title="Voir la Map" onPress={() => navigation.navigate("Map")} />
      </View>

      <View style={styles.button}>
        <Button title="Se déconnecter" color="#e74c3c" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  info: { fontSize: 16, color: "gray" },
  button: { marginTop: 20, width: "100%" },
});