// "use client"

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
import Icon from "@/components/Image/Icon";

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
    <Page className="bg-red-400">
      <Content width="xs" className="mx-auto mt-10">
        <Text>Hello</Text>
          <StatelessButton 
          id="one"
          className={{
            self: "p-0 bg-purple-500",
            inner: { self: "p-0" },
            rightIcon: { src: "./icons/checkbox_unselected.svg" },
            $state: [
              [ButtonGroupStates.Selected, { rightIcon: { src: "./icons/checkbox_selected.svg" }}]
            ]
          }}
          />
        <ButtonGroup>
          {/* <StatelessButton 
          id="one"
          className={{
            self: "p-0 bg-purple-500",
            inner: { self: "p-0" },
            rightIcon: { src: "./icons/checkbox_unselected.svg" },
            $state: [
              [ButtonGroupStates.Selected, { rightIcon: { src: "./icons/checkbox_selected.svg" }}]
            ]
          }}
          /> */}
        </ButtonGroup>

        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>
        <StatelessButton>Testing Something</StatelessButton>

        <VerticalContent>
          <VerticalContent.Section>Hello</VerticalContent.Section>
          <VerticalContent.Remaining>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
            <StatelessButton>Testing Something</StatelessButton>
          </VerticalContent.Remaining>
        </VerticalContent>
      </Content>
    </Page>
  );
}
