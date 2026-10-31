import { ImageSource } from "expo-image";

export interface UniversityListItemProps {
  name: string;
  location: string;
  logo: ImageSource | string | number;
  onPress: () => void;
  isActive?: boolean;
}
