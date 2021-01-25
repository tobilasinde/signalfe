// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import { Image, Transformation } from 'cloudinary-react';

export function ImageColumnFormatter(cellContent, row) {
  return (
    <span className="symbol symbol-50 symbol-light mt-1">
      <Image
          cloudName="tobilasinde"
          publicId={row.public_id}
          className="thumbnail inline"
      >
          <Transformation quality="auto" fetchFormat="auto" />
      </Image>
    </span>
  );
}
