import {
  Flex,
  Heading,
  Divider,
  Text,
  useMediaQuery,
  CloseButton,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { Button } from "react-day-picker";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IRootState } from "../redux/store";
import { PostTemplate } from "../utility/models";
import locateToken from "../utility/Token";
import { Link as ReactLink } from "react-router-dom";

const { REACT_APP_API_SERVER } = process.env;

export default function SinglePosts(props: PostTemplate) {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const dietitianInfo = useSelector((state: IRootState) => state.dietitian[0]);
  const urlRoute = dietitianInfo.id !== null ? "/dietitian" : "/dashboard";

  //API function
  async function deleteOnePost(pid: number) {
    axios
      .delete(`${REACT_APP_API_SERVER}/post/${pid}`, {
        headers: {
          Authorization: `Bearer ${locateToken()}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "成功移除",
        });
      });
  }
  return (
    <>
      <LinkBox
        as={"article"}
        w={"100%"}
        h={"150px"}
        flexDir={"column"}
        display={"flex"}
      >
        <Heading
          fontSize={isSmallerThan600 ? "sm" : "md"}
          overflow={"hidden"}
          display={"flex"}
        >
          <Text flex={1}>{props.author}</Text>

          {dietitianInfo.id !== null ? (
            <CloseButton
              size={"sm"}
              onClick={() => {
                deleteOnePost(props.id);
                props.refresh();
              }}
            />
          ) : (
            ""
          )}
        </Heading>

        <Heading
          fontSize={isSmallerThan600 ? "lg" : "2xl"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
        >
          <LinkOverlay as={ReactLink} to={`${urlRoute}/posts/${props.id}`}>
            {props.title}
          </LinkOverlay>
        </Heading>
        <Text fontSize={isSmallerThan600 ? "xs" : "sm"}>{props.time}</Text>
        <Text
          overflow={"hidden"}
          h={"30px"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          fontSize={isSmallerThan600 ? "sm" : "md"}
        >
          {props.content}
        </Text>
        <Divider my={4} />
      </LinkBox>
    </>
  );
}
