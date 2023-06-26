import { Button, Flex, Heading, Text } from "@chakra-ui/react";

import Head from "next/head";
import React from "react";
import TopBar from "@/components/TopBar";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  const goToLoginPage = () => router.push("/login");
  const goToProfilePage = () => router.push("/profile");

  return (
    <>
      {/* Meta Tags */}
      <Head>
        <title>DFCOM | Início</title>
      </Head>
      {/* Meta Tags */}
      {/* Body */}
      <Flex w="full" minH="100vh" flexDir="column">
        <TopBar pageTitle="Página Inicial">
          <Button onClick={goToLoginPage}>Entrar</Button>
        </TopBar>

        {/* Content */}
        <Flex w="full" p="8" flexDir="column" gap="8">
          <Heading>DFCOM Test</Heading>

          <Flex gap="4" flexDir="column">
            <Text textAlign="justify">
              Desenvolva um processo de autenticação usando NodeJS + NextJS.
            </Text>

            <Text textAlign="justify">
              O processo deve ser feito baseado na autenticação com refresh
              token, onde, os dados de autenticação precisam ser armazenados em
              um banco de dados ( seja relacional ou não relacional ), e
              renovado em cada expiração baseado no refresh token com base nas
              normas da RFC-7519.
            </Text>

            <Text textAlign="justify">
              O framework de uso no nodejs precisa ser NestJS. Já no NextJS(
              front ), o usuário deve conseguir efetuar um login, gerar um token
              e fazer qualquer ação.
            </Text>

            <Text textAlign="justify">
              Devemos ter também páginas de usuário autenticado e não
              autenticado.
            </Text>

            <Text textAlign="justify">
              Deve ser utilizado a ferramenta git para versionamento.
            </Text>
          </Flex>

          <Flex flexDir="column" w="full" gap="4">
            <Flex w="full" justify="space-between" align="center">
              <Heading fontSize="lg">Páginas:</Heading>
              <Text>
                {cookies["accessToken"] && cookies["refreshToken"]
                  ? "Você está autenticado"
                  : "Você não está autenticado"}
              </Text>
            </Flex>
            <Flex w="full" align="center" justify="space-between" gap="4">
              <Button onClick={goToLoginPage} width="full">
                Página de Login
              </Button>
              <Button onClick={goToProfilePage} width="full">
                Página de Perfil
              </Button>
            </Flex>
          </Flex>
        </Flex>
        {/* Content */}
      </Flex>
      {/* Body */}
    </>
  );
}
