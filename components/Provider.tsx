"use client";

import React from "react";
// import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store_redux/store";

// const Provider = ({ children, session }: any) => {
const Provider = ({ children }: any) => {
  return (
    // <SessionProvider session={session}>
    <ReduxProvider store={store}>{children}</ReduxProvider>
    // </SessionProvider>
  );
};

export default Provider;
