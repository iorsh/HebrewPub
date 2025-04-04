import { useState } from "react";
import { Text, Box, Image, Video, Button, Layer } from "grommet";
import { Blurhash } from "react-blurhash";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

import "./designFix.scss";

const Attachments = ({ attachments, contentWarning }) => {
  const single = (attachments.length == 1);
  return (
    <Box dir="ltr" direction="row" justify="center">
      <Carousel
        style={{ "background-color": "inherit",
                 "max-height": "70vh",
                 width: "90%",
                 borderRadius: 10,
                 overflow: 'hidden' }}
        hasThumbnails={!single}
        hasLeftButton={!single}
        hasRightButton={!single}
        shouldMaximizeOnClick
        shouldMinimizeOnClick
        hasThumbnailsAtMax={false}
        hasMediaButton={false}
        hasSizeButton={false}
        hasIndexBoard={false}
      >
      {attachments.map((attachment) => (
        <Attachment
          key={`attachment_${attachment.id}`}
          attachment={attachment}
          contentWarning={contentWarning}
        />
      ))}
      </Carousel>
    </Box>
  )
};

const Attachment = ({ key, attachment, contentWarning }) => {
  if (attachment.type === "image") {
    return (
      <div className="carousel_div" >
        <img className="carousel_img" src={attachment.url} alt={attachment.description} />
      </div>
    );
  } else if (attachment.type === "video" || attachment.type === "gifv") {
    return (
      <Box
        overflow="hidden"
        margin="xsmall"
        flex="shrink"
        round="5px"
        height={{ min: "small", max: "medium" }}
      >
        <Button
          secondary
          alignSelf="center"
        >
          {contentWarning ? (
            <Blurhash
              hash={attachment.blurhash}
              width={attachment.meta.small.width}
              height={attachment.meta.small.height}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          ) : (
            <Image fit="cover" src={attachment.preview_url} />
          )}
        </Button>
      </Box>
    );
  } else {
    return (
      <Text
        key={`${attachment.type}_${attachment.id}`}
      >{`${attachment.type}_${attachment.id}`}</Text>
    );
  }
};

export default Attachments;
