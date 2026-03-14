import React, { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { locationService } from "../services/locationService";
import { useAuthSore } from "../store/authStore";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";



export default function Map() {
  const [region, setRegion] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [myId, setMyId] = useState(null);
  const mapRef = useRef(null);
  const { token } = useAuthSore();

  useEffect(() => {
    let subscription;

    const initLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission refusée", "Autorisez la localisation pour utiliser la map");
        return;
      }

      // Watch position pour éviter les 429 et envoyer seulement si déplacement >3m
      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 3 },
        async (loc) => {
          const { latitude, longitude } = loc.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          try {
            await locationService.updateLocation(latitude, longitude);
          } catch (err) {
            if (err.response?.status === 429) console.log("Trop de requêtes, attendre");
          }
        }
      );
    };

    const fetchUsers = async () => {
      try {
        const users = await locationService.getActiveUsers();
        setActiveUsers(users);
      } catch (err) {
        console.log("Erreur fetch utilisateurs:", err);
      }
    };

    initLocation();
    fetchUsers();
    const interval = setInterval(fetchUsers, 30000); // 30s = moins de 429

    return () => {
      subscription?.remove();
      clearInterval(interval);
    };
  }, []);

  if (!region) return <ActivityIndicator size="large" style={{ flex: 1 }} />;


  const insets = useSafeAreaInsets(); 
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

{/* Ton bouton flottant */}
<View style={{ position: 'absolute', top: insets.top + 10, right: 20, zIndex: 10 }}>
        <Button 
          title="Profil" 
          onPress={() => navigation.navigate("Profile")} 
        />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {activeUsers.map((user) => {
          const lat = parseFloat(user.latitude);
          const lon = parseFloat(user.longitude);
          if (isNaN(lat) || isNaN(lon)) return null;

          const isMe = user.id === myId;

          return (
            <Marker
              key={`${user.id}-${isMe ? "red" : "green"}`}
              coordinate={{ latitude: lat, longitude: lon }}
              pinColor={isMe ? "red" : "green"}
            >
              <Callout tooltip>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: isMe ? "red" : "black" }}>
                    {isMe ? "Moi: " : ""}
                    {user.email}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});