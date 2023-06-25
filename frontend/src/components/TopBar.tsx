import { Flex, Heading } from "@chakra-ui/react";

import ToggleColorMode from "./ToggleColorMode";

interface IProps {
  pageTitle: string;
  children?: React.ReactNode;
}

const TopBar = (props: IProps) => {
  return (
    <Flex
      p="4"
      px="8"
      w="full"
      h="20"
      boxShadow="md"
      align="center"
      justify="space-between"
    >
      <Heading fontSize="xl">{props.pageTitle}</Heading>
      <Flex gap="2">
        <ToggleColorMode />

        {/* Another items */}
        {props.children}
        {/* Another items */}
      </Flex>
    </Flex>
  );
};

export default TopBar;
