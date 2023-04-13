import { Flex , Text} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import Frame from "react-frame-component";
import ReactPlayer from "react-player";

const Tour = () => {
  const framered = useRef<HTMLIFrameElement>();
  //loading-header
  // useEffect(() => {
  //   // (framered as any).current.contentWindow?.document?.getElementsByTagName("H1").style.display = "none"

  //   var iframe = document.getElementById("tourid");
  //   var elmnt = (iframe as any)?.contentWindow?.document?.getElementsByTagName("H1")[0];
  //   elmnt.style.display = "none";
  // }, []);
  return (
    <Flex width={"100%"} height={"100%"} bg="white" borderRadius={"xl"} p="10" my="10" mx="20" maxW={"90%"} direction={"column"}>
      <Text textColor={"orange.500"} fontWeight={"semibold"} fontSize={"2xl"} mb="4">Restaurant Tour</Text>
      <iframe
        id="tourid"
        ref={framered as any}
        src={"https://mpembed.com/show/?m=yQ7wnvehy86"}
        width={"100%"}
        height={"700px"}
      />
      {/* <Frame
        src="https://mpembed.com/show/?m=yQ7wnvehy86"
        // style={{ width: "80%", height: "700px" }}
      ></Frame> */}
      {/* <ReactPlayer
        url="https://mpembed.com/show/?m=yQ7wnvehy86"
        width={"80%"}
        height={"700px"}
      /> */}
    </Flex>
  );
};

export default Tour;
