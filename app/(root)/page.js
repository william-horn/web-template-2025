"use client";

import Image from "next/image";

import Page from "@/components/Container/Page";
import Text from "@/components/Typography/Text";

import { mergeClasses, compileClass } from "@/lib/util/merge-classes-v2";

// import { v4 as uuidv4 } from 'uuid';

export default function Home() {


  return (
    <Page>
      <Text>tHello, world!</Text>
    </Page>
  );
}
