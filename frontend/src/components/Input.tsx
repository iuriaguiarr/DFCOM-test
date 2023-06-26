import {
  Input as ChakraInput,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Icon } from "react-feather";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  icon: Icon;
}

const Input = (props: IProps) => {
  return (
    <FormControl
      isDisabled={props.isDisabled || false}
      isRequired={props.isRequired || false}
      isInvalid={props.isInvalid || false}
    >
      <FormLabel>{props.label}:</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <props.icon size="1rem" />
        </InputLeftElement>
        <ChakraInput
          id={props.id}
          onChange={props.onChange}
          value={props.value}
          placeholder="Digite aqui..."
          type={props.type}
        />
      </InputGroup>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default Input;
