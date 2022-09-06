import { Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Banner from "../Banner";
import UserNav from "./User_Nav";

export default function DashBoard() {
  return (
    <>
      <Banner />
      <Container maxW="100%" p="0" display="flex" flexDirection="row">
        <UserNav />
        <Flex direction="column" height="90vh" flex="8" p="2">
          <Flex boxShadow="3px 3px 10px" borderRadius="2xl" flex="1" p="4">
            <Outlet />
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
