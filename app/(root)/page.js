"use client"

// Components
import Image from "next/image";
import Page from "@/components/Container/Page";
import Text from "@/components/Typography/Text";
import Content from "@/components/Container/Content";
import VerticalContent from "@/components/Container/VerticalContent";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { StatefulButton, StatelessButton } from "@/components/Button/Buttons";

// Other
import { ButtonStates } from "@/lib/contextControllers/ButtonController";
import { ButtonGroupStates } from "@/lib/contextControllers/ButtonGroupController";
import Providers, { ContextNames } from "@/components/Providers";
import { DropdownSelectionStates } from "@/lib/contextControllers/DropdownSelectionController";

// import { v4 as uuidv4 } from 'uuid';

/*
  Coming back:

    - Create a class hierarchy between contextControllers. There should be an absolute
      base class, probably an "Element" base class (for inheriting similar methods
      and eventData, etc), and then the specific classes like ButtonGroupController.
        - DONE

    - Test buttons and icons more with state updating/class compiling

    - Update all components to use 'useContextController()' hook at the beginning of the component
        - PROGRESS

    - Probably change $state field to use 'priority' values instead of positions in arrays.

*/


export default function Home() {

  return (
    <Page>
      <Content>
        {/* <Text>Hello, world!</Text> */}
      </Content>
      <ButtonGroup
      unselectLastChoice
      state={{
        [ButtonGroupStates.Selected]: true
      }}
      selectionLimit={1}
      onClick={e => console.log("main event: ", e)}
      // defaultSelect={["label"]}
      >
        {/* <StatelessButton
        onClick={(e) => {console.log("clicked: ", e)}}
        id={1}
        state={{[ButtonStates.Selected]: true}}
        className={{
          leftIcon: { src: "./icons/arrow_up_icon.svg" },
          $state: [
            [ButtonGroupStates.Selected, { self: "bg-red-500 hover:bg-red-600", leftIcon: { src: "./icons/arrow_down_icon.svg" }}],
          ]
        }}
        >Number 1</StatelessButton> */}

        {
          new Array(3).fill(1).map((_, i) => 
            <StatelessButton
            // ignoreContext
            onClick={(e) => {
              switch (e.contextEnum) {
                case ContextNames.Button:
                  console.log('button was clicked', e)
                  break
                
                case ContextNames.ButtonGroup:
                  console.log('button group was clicked', e)
                  break

                default: console.log('no context', e)
              }

             return true
            }}
            id={i}
            key={i}
            
            // state={{[ButtonStates.Selected]: true}}
            className={{
              leftIcon: { src: "./icons/arrow_up_icon.svg" },
              $state: [
                [ButtonGroupStates.Selected],
                // [ButtonStates.Selected, { self: "bg-red-500 ", leftIcon: { src: "./icons/arrow_down_icon.svg" }}],
                [ButtonGroupStates.Selected, { self: "bg-red-500 hover:bg-red-600", leftIcon: { src: "./icons/arrow_down_icon.svg" }}],
              ]
            }}
            >Number 1</StatelessButton>
          )
        }

        <Text 
        id="label"
        onClick={(e) => console.log("text: ", e)}
        contextGroups={[[ContextNames.ButtonGroup]]}
        className={{
          $state: [
            [ButtonGroupStates.Selected, { self: "text-red-500" }]
          ]
        }}
        >
          Hey there guys!
        </Text>

        {
          new Array(3).fill(1).map((_, i) => 
            <StatelessButton
            // ignoreContext
            id={i + 3}
            key={i}
            
            // state={{[ButtonStates.Selected]: true}}
            className={{
              leftIcon: { src: "./icons/arrow_up_icon.svg" },
              $state: [
                [ButtonGroupStates.Selected],
                // [ButtonStates.Selected, { self: "bg-red-500 ", leftIcon: { src: "./icons/arrow_down_icon.svg" }}],
                [ButtonGroupStates.Selected, { self: "bg-red-500 hover:bg-red-600", leftIcon: { src: "./icons/arrow_down_icon.svg" }}],
              ]
            }}
            >Number 1</StatelessButton>
          )
        }


      </ButtonGroup>

      <Content width="xl" className="mx-auto"> 
        <Text>Howdy</Text>
      </Content>

      <VerticalContent>
        <VerticalContent.Section>
          <Text>Hello, world!</Text>
        </VerticalContent.Section>
        <VerticalContent.Remaining className={{ inner: { self: "p-5" }}}>
          <ButtonGroup>
          {
            new Array(30).fill(1).map((_, i) => 
              <StatelessButton
              // ignoreContext
              id={i + 3}
              key={i}
              
              // state={{[ButtonStates.Selected]: true}}
              className={{
                leftIcon: { src: "./icons/arrow_up_icon.svg" },
                $state: [
                  [ButtonGroupStates.Selected],
                  // [ButtonStates.Selected, { self: "bg-red-500 ", leftIcon: { src: "./icons/arrow_down_icon.svg" }}],
                  [ButtonGroupStates.Selected, { self: "bg-red-500 hover:bg-red-600", leftIcon: { src: "./icons/arrow_down_icon.svg" }}],
                ]
              }}
              >Number 1</StatelessButton>
            )
          }
          </ButtonGroup>
        </VerticalContent.Remaining>
      </VerticalContent>

        {/* <StatelessButton
        id={3}
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
        >Number 1</StatelessButton> */}

      {/* {
        new Array(10).fill(1).map((_, i) => 
          <StatefulButton
          onClick={(e) => console.log(e)}
          id={i}
          key={i}
          // defaultSelected
          test={true}
          // state={{[ButtonStates.Selected]: true}}
          className={{
            leftIcon: { src: "./icons/arrow_up_icon.svg" },
            $state: [
              [ButtonStates.Selected, { self: "bg-red-500 hover:bg-red-600", leftIcon: { src: "./icons/arrow_down_icon.svg" }}],
            ]
          }}
          >Number 1</StatefulButton>
        )
      } */}

    </Page>
  );
}
