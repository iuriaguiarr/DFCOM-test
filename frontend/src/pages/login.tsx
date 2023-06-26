import { Button, Flex, useToast } from "@chakra-ui/react";
import { Lock, User } from "react-feather";

import Head from "next/head";
import Input from "@/components/Input";
import React from "react";
import TopBar from "@/components/TopBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function Index() {
  // Hooks
  const toast = useToast();
  const [data, setData] = React.useState({ username: "", password: "" });
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  // Hooks

  // Handlers
  const goToHomePage = () => router.push("/");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const loginResult = await axios.request({
        method: "POST",
        url: "http://localhost:3001/auth/login",
        data,
      });
      setCookie(
        "accessToken",
        JSON.stringify({
          value: loginResult.data.accessToken,
          expiresIn: loginResult.data.expiresIn,
        })
      );
      setCookie("refreshToken", loginResult.data.refreshToken);

      router.reload();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        position: "top",
        colorScheme: "red",
        duration: 3000,
        title: "Ocorreu um errro.",
        description: "Falha ao realizar login.",
      });
      setIsInvalid(true);
      setTimeout(() => {
        setIsInvalid(false);
      }, 3000);
    }
  };
  // Handlers

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
              isDisabled={isLoading}
              label="Usuário"
              icon={User}
              id="username"
              helperText="Padrão: admin"
              value={data.username}
              onChange={handleChangeInput}
              isInvalid={isInvalid}
              isRequired
            />
            <Input
              isDisabled={isLoading}
              label="Senha"
              icon={Lock}
              id="password"
              type="password"
              helperText="Padrão: admin"
              value={data.password}
              onChange={handleChangeInput}
              isInvalid={isInvalid}
              isRequired
            />

            <Button isLoading={isLoading} type="submit" colorScheme="green">
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
