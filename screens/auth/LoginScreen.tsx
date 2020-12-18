import React, { FC, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/formik/FormikInput";
import * as Yup from "yup";
import { Col, Spacing } from "../../Config";
import { AuthProps, NavProps } from "../../components/interfaces";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoginScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const signIn = async (value: AuthProps) => {
    // we handle the server method here
    console.log(value);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.header}>Login</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Validation}
          onSubmit={(value) => signIn(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput
                value="email"
                error={error}
                other={{ placeholder: "Email" }}
              />
              <FormikInput
                value="password"
                error={error}
                other={{ placeholder: "Password", maxLength: 50 }}
              />
              <ErrorMessage
                visible={error}
                error="Login or password are not registered"
                style={styles.errorContainer}
              />
              <Button
                clicked={clicked}
                onPress={handleSubmit}
                label="SIGN IN"
              />
            </>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text>
            Don't have an account?
            <Text
              style={styles.txtBtn}
              onPress={() => navigation.navigate("register")}
            >
              {"  Sign up"}
            </Text>
          </Text>
          <Text
            style={styles.forgot}
            onPress={() => navigation.navigate("restore")}
          >
            Forgot password?
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "25%",
    alignItems: "center",
    backgroundColor: Col.Main,
    padding: Spacing.large,
  },
  header: {
    marginBottom: Spacing.medium,
  },
  footer: {
    alignItems: "center",
    marginVertical: Spacing.small,
  },
  orContainer: {
    marginTop: "20%",
    width: "60%",
    alignItems: "center",
  },
  boxContainer: {
    padding: Spacing.large,
    backgroundColor: Col.White,
    borderRadius: 8,
    width: "100%",
    elevation: 12,
  },
  txtBtn: {
    color: Col.Main,
  },
  forgot: {
    color: Col.Main,
    padding: Spacing.medium,
    paddingBottom: 0,
  },
  errorContainer: {
    marginTop: Spacing.small,
  },
});

export default LoginScreen;
