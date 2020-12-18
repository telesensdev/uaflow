import React, { FC, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import * as Yup from "yup";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/formik/FormikInput";
import { Col, Spacing } from "../../Config";
import { NavProps } from "../../components/interfaces";

const Validation = Yup.object().shape({
  verificationCode: Yup.number()
    .required()
    .min(5)
    .label("verification Code")
    .typeError("Code must be a number"),
  password: Yup.string().required().min(6).label("Reset Password"),
});

interface passProps {
  password: string;
  verificationCode: string;
}

const ChangePasswordScreen: FC<NavProps> = ({ navigation }) => {
  const [resend, setResend] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const changePassword = async (options: passProps) => {
    // we handle server here then send the user to the next screen
    console.log(options);
  };

  const handleResend = async () => {
    setResend(true);
    setTimeout(setResend(false), 60000);
    const sent = true; // we handle the server here
    if (sent) {
      Alert.alert(
        "Verification",
        "Please Check your Email for the Verification Code"
      );
    } else {
      Alert.alert(
        "Error",
        "Sorry!\nSomething went wrong while trying to get a new code, please try again later."
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.header}>Reset Password</Text>
        <Text style={styles.header}>
          Please Enter the verification code you recieved via email, then enter
          your new password.
        </Text>
        <Formik
          initialValues={{ password: "", verificationCode: "" }}
          validationSchema={Validation}
          onSubmit={(value) => changePassword(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput
                value="verificationCode"
                error={error}
                other={{ placeholder: "Verification Code", maxLength: 5 }}
              />
              <FormikInput
                value="password"
                other={{ placeholder: "Enter new password", maxLength: 50 }}
                error={error}
              />
              <ErrorMessage
                visible={error}
                error="Password reset was rejected"
                style={styles.errorContainer}
              />
              <Button
                clicked={clicked}
                onPress={handleSubmit}
                label="CHANGE PASSWORD"
              />
              <Button
                type="text"
                clicked={resend}
                onPress={handleResend}
                label="Resend me again"
                style={{ marginVertical: 0 }}
                labelStyle={{ color: Col.Ghost }}
              />
            </>
          )}
        </Formik>
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

export default ChangePasswordScreen;
