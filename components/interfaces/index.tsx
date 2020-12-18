import { NavigationProps } from "./navInterface";

export interface NavProps {
  navigation: NavigationProps;
  route: {
    params?: any;
  };
}

export interface AuthProps {
  name?: string;
  email: string;
  password: string;
}
