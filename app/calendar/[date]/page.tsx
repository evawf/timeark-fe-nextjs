import React from "react";

export default function PickedDate(selectedDate: Date) {
  return (
    <div>
      <p>PickedDate page:</p>
      <div>{selectedDate && <>Date: {selectedDate}</>}</div>
    </div>
  );
}
