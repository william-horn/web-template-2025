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

      <VerticalContent>
        <VerticalContent.Remaining className={{ inner: { self: "p-3" } }}>
          <ButtonGroup>
            {new Array(10).fill('a').map((thing, i) => <StatelessButton id={i} key={i}>Number {i}</StatelessButton>)}
          </ButtonGroup>
        </VerticalContent.Remaining>
      </VerticalContent>

      <ButtonGroup className={{ self: "flex-row" }}>
        {new Array(5).fill('a').map((thing, i) => <StatelessButton id={i} key={i}>Number {i}</StatelessButton>)}
      </ButtonGroup>


      {/* <ButtonGroup
        defaultSelect={["test"]}
      >
        <StatelessButton id="test">Hello World</StatelessButton>
      </ButtonGroup> */}
    </Page>
  );
}
