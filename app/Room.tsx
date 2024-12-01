"use client";
import React, { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";
import Loading from "@/components/Loading";


const Room = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_W7tH9sHPBHkNXbiclSKpTmINGRcpub7Hk0SAnDb-a587mrmXVpdYIPhHTN7bgpKP"
      }
    >
      <RoomProvider
        id="my-room"
        initialPresence={{
          isTyping: false,
        }}
        initialStorage={{ todos: new LiveList([]) }}
      >
        <ClientSideSuspense
          fallback={
            <div className="text-center h-screen justify-center items-center flex">
              <Loading />
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
