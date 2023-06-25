import { Flex, useMediaQuery, useToast } from "@chakra-ui/react";

import Head from "next/head";
import React from "react";
import ToggleColorMode from "@/components/ToggleColorMode";
import { useRouter } from "next/router";

export default function Index() {
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const toast = useToast();
  const router = useRouter();

  return (
    <>
      {/* Meta Tags */}
      <Head>
        <title>Home Page</title>
      </Head>
      {/* Meta Tags */}
      {/* Body */}
      <Flex w="full" minH="100vh">
        <ToggleColorMode />
      </Flex>
      {/* Body */}
    </>
  );
}
