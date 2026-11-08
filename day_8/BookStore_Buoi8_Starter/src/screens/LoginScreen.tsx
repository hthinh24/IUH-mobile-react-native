import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { getErrorMessage } from "../api/client";
import { login } from "../services/authService"; // login(email, password) → { user, token }
import { RootScreenProps } from "../navigation/types";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";
import { validateEmail, validatePassword } from "../utils/validators";

type LoginErrors = {
  email?: string | null;
  password?: string | null;
};

export function LoginScreen({ navigation, route }: RootScreenProps<"Login">) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setSubmitError(null);
    setErrors((current) =>
      current.email ? { ...current, email: validateEmail(value) } : current
    );
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setSubmitError(null);
    setErrors((current) =>
      current.password ? { ...current, password: validatePassword(value) } : current
    );
  };

  const handleSubmit = async () => {
    if (loading) return;

    setSubmitError(null);

    const nextErrors: LoginErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) return;

    setLoading(true);
    try {
      const { user, token } = await login(email, password);
      signIn(user, token);

      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>📚</Text>
        <Text style={styles.title}>Đăng nhập BookStore</Text>

        <FormField
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          placeholder="name@example.com"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.email}
        />

        <FormField
          label="Mật khẩu"
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          textContentType="password"
          returnKeyType="done"
          error={errors.password}
        />

        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

        <PrimaryButton title="Đăng nhập" onPress={handleSubmit} loading={loading} disabled={loading} />

        <Pressable onPress={() => navigation.replace("Register", route.params)} disabled={loading}>
          <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
        </Pressable>

        <View style={styles.hint}>
          <Text style={styles.hintText}>Tài khoản demo: demo@bookstore.vn / 123456</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  logo: { fontSize: 56, textAlign: "center" },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
  hint: { backgroundColor: "#E0F2FE", padding: 10, borderRadius: 10 },
  hintText: { color: colors.navy, textAlign: "center", fontSize: 12 },
});
