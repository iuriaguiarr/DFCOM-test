import { Button, Flex, Text } from "@chakra-ui/react";

import Head from "next/head";
import React from "react";
import TopBar from "@/components/TopBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function Index() {
  // Hooks
  const [cookies, setCookie, removeCookie] = useCookies();
  const [data, setData] = React.useState({ name: "", username: "", job: "" });
  const router = useRouter();
  // Hooks

  const goToHomePage = () => router.push("/");

  // Logout
  const handleLogout = async () => {
    const accessToken = cookies["accessToken"].value;
    await axios.request({
      method: "POST",
      url: "http://localhost:3001/auth/logout",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    removeCookie("accessToken");
    removeCookie("refreshToken");
    router.reload();
  };
  // Logout

  // Buscando dados do usuário
  React.useEffect(() => {
    if (cookies["accessToken"]) {
      const accessToken = cookies["accessToken"].value;
      axios
        .request({
          method: "GET",
          url: "http://localhost:3001/auth/profile",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(({ data }) => {
          setData({ job: data.job, name: data.name, username: data.username });
        });
    }
  }, [cookies]);
  // Buscando dados do usuário

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
            <Text>Usuário: {data.username}</Text>
            <Text>Nome: {data.name}</Text>
            <Text>Ocupação: {data.job} </Text>
            <Button onClick={handleLogout} type="button">
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
