"use client"

// Components
import Image from "next/image";
import Page from "@/components/Container/Page";
import Text from "@/components/Typography/Text";
import Content from "@/components/Container/Content";
import VerticalContent from "@/components/Container/VerticalContent";
import ButtonGroup from "@/components/Button/ButtonGroup";

// Other
import { StatelessButton, ButtonStates } from "@/components/Button/Buttons";
import { ButtonGroupStates } from "@/lib/contextControllers/ButtonGroupController";

// import { v4 as uuidv4 } from 'uuid';


export default function Home() {
  return (
    <Page>
      <ButtonGroup>
        <StatelessButton
        id={1}
        state={{[ButtonStates.Selected]: true}}
        leftIcon="./icons/arrow_down_icon.svg"
        leftIconSelected="./icons/arrow_up_icon.svg"
        className={{
          $state: [
            [ButtonGroupStates.Selected],
            [ButtonStates.Selected, { self: "bg-blue-500 hover:bg-black" }],
          ]
        }}
        >Number 1</StatelessButton>
      </ButtonGroup>
    </Page>
  );
}
