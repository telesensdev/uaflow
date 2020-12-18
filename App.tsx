import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Auth } from "./navigation/EntryPoint";

export default function App() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}
