import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import RestoreScreen from "../screens/auth/RestoreScreen";
import ChangePasswordScreen from "../screens/auth/ChangePassword";

const AuthStack = createStackNavigator();

export const Auth = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="login" component={LoginScreen} />
    <AuthStack.Screen name="register" component={RegisterScreen} />
    <AuthStack.Screen name="restore" component={RestoreScreen} />
    <AuthStack.Screen name="reset" component={ChangePasswordScreen} />
  </AuthStack.Navigator>
);
