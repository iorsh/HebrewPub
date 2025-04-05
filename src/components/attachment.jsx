import { useState } from "react";
import { Text, Box, Image, Video, Button, Layer } from "grommet";
import { Blurhash } from "react-blurhash";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

import "./designFix.scss";

const Attachments = ({ attachments, contentWarning }) => {
  const single = (attachments.length == 1);
  const slides = attachments.map((attachment) => (
        <Attachment
          key={`attachment_${attachment.id}`}
          attachment={attachment}
          contentWarning={contentWarning}
        />
      ));
  return (
    <Box dir="ltr" direction="row" justify="center">
      <Carousel
        children={slides}
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
      />
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
      <div className="carousel_div" >
        <video className="carousel_img" controls>
          <source src={attachment.url} />
        </video> 
      </div>
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
