"use client"

// Components
import Image from "next/image";
import Page from "@/components/Container/Page";
import Text from "@/components/Typography/Text";
import Content from "@/components/Container/Content";
import VerticalContent from "@/components/Container/VerticalContent";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { StatelessButton } from "@/components/Button/Buttons";

// Other
import { ButtonStates } from "@/lib/contextControllers/ButtonController";
import { ButtonGroupStates } from "@/lib/contextControllers/ButtonGroupController";
import Providers, { ContextNames } from "@/components/Providers";

// import { v4 as uuidv4 } from 'uuid';


export default function Home() {
  return (
    <Page>
      <Providers.DropdownSelection value={{con: "dropdown"}}>
        <ButtonGroup>
          <StatelessButton
          onClick={(e) => {console.log("clicked: ", e)}}
          id={1}
          state={{[ButtonStates.Selected]: true}}
          leftIcon="./icons/arrow_down_icon.svg"
          leftIconSelected="./icons/arrow_up_icon.svg"
          contextGroups={[
            ContextNames.ButtonGroup, 
            ContextNames.DropdownSelection,
            ContextNames.Button
          ]}
          className={{
            $state: [
              [ButtonGroupStates.Selected],
              [ButtonStates.Selected, { self: "bg-blue-500 hover:bg-black" }],
            ]
          }}
          >Number 1</StatelessButton>
        </ButtonGroup>
      </Providers.DropdownSelection>

        <StatelessButton
        // onClick={() => {console.log('lol')}}
        id={3}
        // state={{[ButtonStates.Selected]: true}}
        leftIcon="./icons/arrow_down_icon.svg"
        leftIconSelected="./icons/arrow_up_icon.svg"
        className={{
          $state: [
            [ButtonGroupStates.Selected],
            [ButtonStates.Selected, { self: "bg-blue-500 hover:bg-black" }],
          ]
        }}
        >Number 1</StatelessButton>

        <StatelessButton
        eventData={{x: true}}
        onClick={(e) => {console.log("data: ", e)}}
        id={2}
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

    </Page>
  );
}
