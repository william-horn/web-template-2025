
// Components
import Image from "next/image";
import Page from "@/components/Container/Page";
import Text from "@/components/Typography/Text";
import Content from "@/components/Container/Content";
import VerticalContent from "@/components/Container/VerticalContent";

// import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  return (
    <Page>
      <Text state={{ selected: true }} className={{ self: "text-blue-400", $state: [["selected", { self: "text-white" }]] }}>LOL</Text>
      
      <VerticalContent
      className=""
      >
        <VerticalContent.Chunk 
        state={{hover: true, selected: true}} 
        className=""
        >Hello</VerticalContent.Chunk>
        
        <VerticalContent.Remaining
        >
          <Text textSize="xl" className="text-black">derp</Text>
          <Text textSize="xl" className="text-black">derp</Text>
          <Text textSize="xl" className="text-black">derp</Text>
          <Text textSize="xl" className="text-black">derp</Text>
          <Text textSize="xl" className="text-black">derp</Text>
          <Text textSize="xl" className="text-black">derp</Text>
          <Text textSize="xl" className="text-black">derp</Text>
          <Text textSize="xl" className="text-black">derp</Text>
        </VerticalContent.Remaining>
      </VerticalContent>
    </Page>
  );
}
