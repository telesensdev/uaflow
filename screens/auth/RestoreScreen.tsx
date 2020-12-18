import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/formik/FormikInput";
import * as Yup from "yup";
import { Col, Spacing } from "../../Config";
import { NavProps } from "../../components/interfaces";
import { useIsFocused } from "@react-navigation/native";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

interface AuthProps {
  email: string;
}

const RestoreScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const sendRequest = async (value: AuthProps) => {
    //we handle server here
    navigation.navigate("changePassword", value);
  };

  const focus = useIsFocused();
  useEffect(() => {
    if (!focus) {
      setClicked(false);
      setError(false);
    }
  }, [focus]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.header}>Forgot your password?</Text>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Validation}
          onSubmit={(value) => sendRequest(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput
                value="email"
                other={{ placeholder: "Enter your e-mail", maxLength: 50 }}
                error={error}
              />
              <ErrorMessage
                visible={error}
                error="This Email is not registered"
                style={styles.errorContainer}
              />
              <Button
                clicked={clicked}
                onPress={handleSubmit}
                label="SEND ME INSTRUCTIONS"
              />
            </>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text
            style={styles.txtBtn}
            onPress={() => navigation.navigate("login")}
          >
            Log in
          </Text>
          <Text>|</Text>
          <Text
            style={styles.txtBtn}
            onPress={() => navigation.navigate("register")}
          >
            Sign up
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
    flexDirection: "row",
    justifyContent: "center",
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
    paddingHorizontal: Spacing.large,
  },
  forgot: {
    color: Col.Main,
    padding: Spacing.medium,
    paddingBottom: 0,
  },
  logoContainer: {
    marginTop: 80,
    marginBottom: 50,
  },
  errorContainer: {
    marginTop: Spacing.small,
  },
});

export default RestoreScreen;
