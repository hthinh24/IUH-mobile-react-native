import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { getErrorMessage } from "../api/client";
import { register } from "../services/authService"; // register(name, email, password) → { user, token }
import { RootScreenProps } from "../navigation/types";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";

type RegisterErrors = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirm?: string | null;
};

const validateName = validateRequired("họ tên");

const validateConfirmPassword = (confirm: string, password: string): string | null => {
  if (!confirm) return "Vui lòng nhập lại mật khẩu";
  return confirm === password ? null : "Mật khẩu nhập lại không khớp";
};

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setSubmitError(null);
    setErrors((current) =>
      current.name ? { ...current, name: validateName(value) } : current
    );
  };

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
    setErrors((current) => ({
      ...current,
      ...(current.password ? { password: validatePassword(value) } : {}),
      ...(current.confirm ? { confirm: validateConfirmPassword(confirm, value) } : {}),
    }));
  };

  const handleConfirmChange = (value: string) => {
    setConfirm(value);
    setSubmitError(null);
    setErrors((current) =>
      current.confirm
        ? { ...current, confirm: validateConfirmPassword(value, password) }
        : current
    );
  };

  const handleSubmit = async () => {
    if (loading) return;

    setSubmitError(null);

    const nextErrors: RegisterErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: validateConfirmPassword(confirm, password),
    };
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const { user, token } = await register(name, email, password);
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
        <Text style={styles.title}>Tạo tài khoản mới</Text>

        <FormField
          label="Họ tên"
          value={name}
          onChangeText={handleNameChange}
          placeholder="Nhập họ tên"
          autoCapitalize="words"
          textContentType="name"
          error={errors.name}
        />

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
          placeholder="Tối thiểu 6 ký tự"
          secureTextEntry
          textContentType="newPassword"
          error={errors.password}
        />

        <FormField
          label="Nhập lại mật khẩu"
          value={confirm}
          onChangeText={handleConfirmChange}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          textContentType="newPassword"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          error={errors.confirm}
        />

        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

        <PrimaryButton title="Đăng ký" onPress={handleSubmit} loading={loading} disabled={loading} />

        <Pressable onPress={() => navigation.replace("Login", route.params)} disabled={loading}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
});
