import React, { FC, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useFormikContext } from "formik";
import { Ionicons as Icon } from "@expo/vector-icons";
import { ErrorMessage } from "../MyComponents";
import { Col, Spacing } from "../../Config";

interface InputProps {
  value: string;
  error: boolean;
  other?: TextInputProps;
}

const FormikInput: FC<InputProps> = ({ value, error, other }) => {
  const {
    values,
    handleChange,
    setFieldTouched,
    touched,
    errors,
  } = useFormikContext();
  const [hide, setHide] = useState(true);
  const [focus, setFocus] = useState(false);
  const secure =
    value === "password" && hide
      ? { secureTextEntry: true, ...other }
      : { ...other };
  return (
    <>
      <View
        style={[
          styles.container,
          focus && styles.focus,
          error && styles.borderEr,
        ]}
      >
        <TextInput
          value={values[value]}
          style={styles.input}
          onChangeText={handleChange(value)}
          onBlur={() => {
            setFieldTouched(value);
            setFocus(false);
          }}
          onFocus={() => setFocus(true)}
          {...secure}
        />
        {value === "password" ? (
          <Icon
            name={hide ? "md-eye-off" : "md-eye"}
            size={24}
            color={Col.Grey}
            onPress={() => setHide(!hide)}
          />
        ) : (
          <View />
        )}
      </View>
      <ErrorMessage visible={touched[value]} error={errors[value]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: "row",
    padding: Spacing.r_small,
    borderColor: Col.Sub,
    marginVertical: Spacing.tiny,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: Col.Text,
  },
  borderEr: {
    borderColor: Col.Error,
  },
  focus: {
    borderColor: Col.Main,
  },
});

export default FormikInput;
