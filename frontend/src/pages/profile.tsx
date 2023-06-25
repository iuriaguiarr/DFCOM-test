import { Button, Flex, Text, useMediaQuery, useToast } from "@chakra-ui/react";

import Head from "next/head";
import React from "react";
import TopBar from "@/components/TopBar";
import { useRouter } from "next/router";

export default function Index() {
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const toast = useToast();
  const router = useRouter();

  const goToHomePage = () => router.push("/");
  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <>
      {/* Meta Tags */}
      <Head>
        <title>DFCOM | Perfil</title>
      </Head>
      {/* Meta Tags */}
      {/* Body */}
      <Flex w="full" minH="100vh" flexDir="column">
        <TopBar pageTitle="Perfil">
          <Button onClick={goToHomePage}>Início</Button>
          <Button onClick={handleLogout}>Sair</Button>
        </TopBar>

        {/* Content */}
        <Flex
          w="full"
          p="8"
          flexDir="column"
          gap="8"
          align="center"
          justify="center"
          minH="calc(100vh - 5rem)"
        >
          <Flex
            minW="80vw"
            borderRadius="md"
            boxShadow="md"
            p="8"
            border="1px solid"
            borderColor="gray"
            flexDir="column"
            gap="4"
          >
            <Text>Usuário: </Text>
            <Text>Nome: </Text>
            <Text>Ocupação: </Text>
            <Button onClick={goToHomePage} type="button">
              Sair
            </Button>
          </Flex>
        </Flex>
        {/* Content */}
      </Flex>
      {/* Body */}
    </>
  );
}
