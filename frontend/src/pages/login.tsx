import { Button, Flex, useMediaQuery, useToast } from "@chakra-ui/react";
import { Lock, User } from "react-feather";

import Head from "next/head";
import Input from "@/components/Input";
import React from "react";
import TopBar from "@/components/TopBar";
import { useRouter } from "next/router";

export default function Index() {
  const [data, setData] = React.useState({ username: "", password: "" });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const toast = useToast();
  const router = useRouter();

  const goToHomePage = () => router.push("/");
  const goToProfilePage = () => router.push("/profile");

  return (
    <>
      {/* Meta Tags */}
      <Head>
        <title>DFCOM | Entrar</title>
      </Head>
      {/* Meta Tags */}
      {/* Body */}
      <Flex w="full" minH="100vh" flexDir="column">
        <TopBar pageTitle="Página de Login" />

        {/* Content */}
        <Flex
          w="full"
          p="8"
          flexDir="column"
          gap="8"
          align="center"
          justify="center"
          minH="calc(100vh - 5rem)"
          as="form"
          onSubmit={handleSubmit}
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
            <Input
              label="Usuário"
              icon={User}
              id="username"
              helperText="Padrão: admin"
              value={data.username}
              onChange={handleChangeInput}
              isInvalid={false}
            />
            <Input
              label="Senha"
              icon={Lock}
              id="password"
              type="password"
              helperText="Padrão: admin"
              value={data.password}
              onChange={handleChangeInput}
              isInvalid={false}
            />

            <Button type="submit" colorScheme="green">
              Entrar
            </Button>
            <Button onClick={goToHomePage} type="button">
              Voltar
            </Button>
          </Flex>
        </Flex>
        {/* Content */}
      </Flex>
      {/* Body */}
    </>
  );
}
