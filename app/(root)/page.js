"use client";

import Image from "next/image";

import Page from "@/components/Container/Page";
import Text from "@/components/Typography/Text";

import { mergeClasses, compileClass } from "@/lib/util/merge-classes-v2";

// import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const finalClass = compileClass({
    className: mergeClasses(
      {
        self: "bg-blue-500 flex underline",
        $print: "oh", 
        $state: [
          ["selected", { self: "bg-green-500" }]
        ]
      },

      {
        self: "text-red-500 px-5",
        $print: "lol hi there", 
        $state: [
          ["selected", { self: "bg-purple-500" }]
        ]
      },

      {
        print: (output, key, baseVal, importedVal) => {
          output[key] = baseVal + " > " + importedVal
        }
      }
    ),

    state: {
      selected: true,
    }
  });

  console.log("merged: ", finalClass)

  return (
    <Page>
      <Text>tHello, world!</Text>
    </Page>
  );
}
