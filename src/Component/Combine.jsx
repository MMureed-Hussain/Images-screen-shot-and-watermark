import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Modal, Button } from "react-bootstrap";

const Combine = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(
    "https://vixoemails.blob.core.windows.net/logos/Vixo_poweredby.png"
  );
  const [combinedImage, setCombinedImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  const handleImage1Upload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage1(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImage2Upload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage2(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const captureScreenshot = () => {
    const image1Element = image1Ref.current;
    const image2Element = image2Ref.current;

    if (image1Element && image2Element) {
      const img1 = new Image();
      img1.src = image1 || "";
alert(img1.src );
      img1.onload = () => {
        const combinedCanvas = document.createElement("canvas");
        const combinedCtx = combinedCanvas.getContext("2d");
        combinedCanvas.width = image1Element.width;
        combinedCanvas.height = image1Element.height;

        // Draw the first image onto the canvas
        combinedCtx.drawImage(
          img1,
          0,
          0,
          image1Element.width,
          image1Element.height
        );
        // Draw the second image as a watermark with opacity
        const opacity = 0.5; // Change the opacity as needed
        combinedCtx.globalAlpha = opacity;
        combinedCtx.drawImage(
          image2Element,
          0,
          0,
          image2Element.width,
          image2Element.height
        );
alert(image2Element);
        const combinedImageDataURL = combinedCanvas.toDataURL();
        setCombinedImage(combinedImageDataURL);
        setShowModal(true);
      };
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleImage1Upload} />
        {image1 && (
          <img
            src={image1}
            alt="Image 1"
            ref={image1Ref}
            style={{ display: "none" }}
          />
        )}
      </div>
      <div>
        <input type="file" onChange={handleImage2Upload} />
        {image2 && (
          <img
            src={image2}
            alt="Image 2"
            ref={image2Ref}
            style={{
              display: "none",
              maxWidth: "100px",
              maxHeight: "80px",
              marginTop: "-3pc",
              marginLeft: "18pc",
            }}
          />
        )}
      </div>
      <button onClick={captureScreenshot}>Combine Images</button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Combined Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {combinedImage && <img src={combinedImage} alt="Combined Image" width={500} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Combine;
