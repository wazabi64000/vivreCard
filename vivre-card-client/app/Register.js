import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../utils/validation";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { authService } from "../services/authService";

export default function Register({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      Alert.alert("Succès", "Compte créé");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error.response?.data || error);
      Alert.alert("Erreur", "Inscription impossible");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", padding: 20 }}
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            autoCapitalize="none" // ne met pas de majuscule automatiquement
            textContentType="emailAddress" // iOS : aide le remplissage automatique
            autoComplete="email" // Android : remplissage automatique
            keyboardType="email-address" // clavier adapté avec @ et .com
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Mot de passe"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
            autoCapitalize="none"
            textContentType="password"
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Confirmer mot de passe"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
            autoCapitalize="none"
            textContentType="password"
          />
        )}
      />

      <Button title="Créer un compte" onPress={handleSubmit(onSubmit)} />

      {/* Lien vers Login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#2db3bd", textAlign: "center", marginTop: 20 }}>
          J'ai déjà un compte ? Connectez-vous
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
