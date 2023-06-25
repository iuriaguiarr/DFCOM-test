import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "react-feather";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      placement="bottom"
      label={colorMode == "light" ? "Modo Escuro" : "Modo Claro"}
    >
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode == "light" ? <Moon size="1rem" /> : <Sun size="1rem" />}
        aria-label={colorMode == "light" ? "Modo Escuro" : "Modo Claro"}
      />
    </Tooltip>
  );
};

export default ToggleColorMode;
