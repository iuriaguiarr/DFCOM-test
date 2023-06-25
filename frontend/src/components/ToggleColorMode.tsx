import {
  Button,
  Flex,
  IconButton,
  useColorMode,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { Moon, Sun } from "react-feather";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode == "light" ? <Moon size="1rem" /> : <Sun size="1rem" />}
      aria-label={colorMode == "light" ? "Modo Escuro" : "Modo Claro"}
    />
  );
};

export default ToggleColorMode;
