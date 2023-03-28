import React from "react";
interface ClientId {
  id: string;
}

export default function UpdateClient({ params }: ClientId | any) {
  console.log("client id: ", params.id);
  return <div>Update Client page</div>;
}
