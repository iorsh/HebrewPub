import { useState } from "react";
import { Text, Box, Image, Video, Button, Layer } from "grommet";
import { Blurhash } from "react-blurhash";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const is_carousel = (media_attachments) => {
  return (media_attachments.length > 1) && media_attachments.every(att => (att.type === "image" || att.type === "gifv"))
};

const ImageCarousel = ({ media_attachments }) => {
  return (
    <Carousel useKeyboardArrows>
    {media_attachments.map((image, idx) => (
      <div key={idx}><img src={image.preview_url} alt={image.description} /></div>
    ))}
    </Carousel>
  );
};
    
const Attachments = ({ media_attachments, contentWarning }) => {
  if (is_carousel(media_attachments)) {
    return <ImageCarousel media_attachments={media_attachments} />;
  }

  return (
    media_attachments.map((attachment) => (
      <Attachment
        key={`attachment_${attachment.id}`}
        attachment={attachment}
        contentWarning={contentWarning}
      />
    ))
  );
};

const Attachment = ({ attachment, contentWarning }) => {
  const [showModal, setShowModal] = useState(false);

  if (attachment.type === "image") {
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
          onClick={() => {
            setShowModal(true);
          }}
        >
          {contentWarning ? (
            <Blurhash
              hash={attachment.blurhash}
              width={
                "small" in attachment.meta
                  ? attachment.meta.small.width
                  : attachment.meta.original.width
              }
              height={
                "small" in attachment.meta
                  ? attachment.meta.small.height
                  : attachment.meta.original.height
              }
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          ) : (
            <Image src={attachment.preview_url} fill={true} />
          )}
        </Button>

        {showModal && (
          <Layer
            onEsc={() => setShowModal(false)}
            onClickOutside={() => setShowModal(false)}
          >
            <Button onClick={() => setShowModal(false)}>
              <Box height={{ max: "90vh" }} width={{ max: "90vw" }}>
                <Image fit="contain" src={attachment.url} />
              </Box>
            </Button>
          </Layer>
        )}
      </Box>
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
          onClick={() => {
            setShowModal(true);
          }}
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

        {showModal && (
          <Layer
            onEsc={() => setShowModal(false)}
            onClickOutside={() => setShowModal(false)}
          >
            <Button onClick={() => setShowModal(false)}>
              <Box height={{ max: "90vh" }} width={{ max: "90vw" }}>
                <Video
                  fit="contain"
                  src={attachment.url}
                  autoPlay
                  controls={false}
                  loop
                />
              </Box>
            </Button>
          </Layer>
        )}
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
