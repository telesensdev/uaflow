import React, { FC, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/formik/FormikInput";
import { Col, Spacing } from "../../Config";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { AuthProps, NavProps } from "../../components/interfaces";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const RegisterScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);

  const signUp = async (value: AuthProps) => {
    // we handle the server method here
    console.log(value);
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.header}>Create account</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Validation}
            onSubmit={(value) => signUp(value)}
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
                  error={`this email is already registered`}
                  style={styles.errorContainer}
                />
                <Button
                  clicked={clicked}
                  onPress={handleSubmit}
                  label="REGISTER"
                />
              </>
            )}
          </Formik>
          <View style={styles.footer}>
            <Text>
              Already have an account?
              <Text
                style={styles.txtBtn}
                onPress={() => navigation.navigate("login")}
              >
                {"  Sign in"}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
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
  errorContainer: {
    marginTop: Spacing.small,
  },
});
export default RegisterScreen;
