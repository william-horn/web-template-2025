"use client"

// Components
import Image from "next/image";
import Page from "@/components/Container/Page";
import Text from "@/components/Typography/Text";
import Content from "@/components/Container/Content";
import VerticalContent from "@/components/Container/VerticalContent";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { StatelessButton } from "@/components/Button/Buttons";
import Providers, { useComponentContext } from "@/components/Providers";
import { ContextNames } from "@/enums/ContextNames";

// import { v4 as uuidv4 } from 'uuid';


export default function Home() {

  return (
    <Page>
      <Text state={{ selected: true }} className={{ self: "text-blue-400", $state: [["selected", { self: "text-white" }]] }}>LOL</Text>

      <Providers.DropdownSelection value={{key: "drop"}}>
        <ButtonGroup
        state={{ groupSelected: false }}
        defaultSelect={["3"]}
        className={{
          self: "p-4 bg-white",
          
        }}
        >
          <StatelessButton value={100} id="1" eventData={{thing: "lol"}} onClick={(e) => console.log("clicked it!: ", e)}>A BUTTON</StatelessButton>
          <StatelessButton id="2">B BUTTON</StatelessButton>
          <StatelessButton id="3">C BUTTON</StatelessButton>
        </ButtonGroup>
      </Providers.DropdownSelection>


      {/* <ButtonGroup
        defaultSelect={["test"]}
      >
        <StatelessButton id="test">Hello World</StatelessButton>
      </ButtonGroup> */}
    </Page>
  );
}
