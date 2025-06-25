import React, { useState } from "react";
import img1 from "/src/images/img1.jpg";
import dummyqr from "/src/images/dummyqr.jpg";
const Qrcode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrcode] = useState("nandhu");
  const [qrsize, setQrsize] = useState(150);

  // functon for generating qr
  async function generateqr() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${qrdata}`;
      setImg(url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // function for downloading qr
  function downloadQr() {
    fetch(img)
      .then((response) => {
        return response.blob(); // here the img is converted to blob to make it as a downloadable link
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // the blob img nis converted to href link
        link.download = "qrcode.png"; // the image is downloaded in this name
        document.body.appendChild(link);
        link.click(); // this link is executed automatically when the download  is clicked
        document.body.removeChild(link);
      })
      .catch((error) => console.error("error in dwonloading...", error));
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait buddy...</p>}
      {img && (
        <img
          src={img}
          // style={{ width: "200px", height: "200px" }}
          className="qr-image"
          alt="img"
        />
      )}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for Qr code:
        </label>
        <input
          type="text"
          id="dataInput"
          placeholder="Enter the data for Qr code"
          onChange={(e) => setQrcode(e.target.value)}
          // e is used to take the value that is typed in the text box
        />

        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g.,150):
        </label>
        <input
          type="text"
          id="sizeInput"
          value={qrsize}
          onChange={(e) => setQrsize(e.target.value)}
          placeholder="Enter image size"
        />
        <button
          className="generate-button"
          disabled={loading}
          onClick={() => generateqr()}>
          Generate Qr code
        </button>
        <button className="download-button" onClick={() => downloadQr()}>
          Download Qr code
        </button>
      </div>
    </div>
  );
};

export default Qrcode;
