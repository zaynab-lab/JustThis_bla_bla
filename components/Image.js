import { useState } from "react";

export default function Image({ name, img, id, setFile }) {
  const [filesrc, setFilesrc] = useState(`/img/png/${img ? id : name}.png`);

  const handleChange = (e) => {
    var file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      reader.readyState === 2
        ? setFilesrc(reader.result)
        : setFilesrc(`/${id}.png`);
    };

    if (file && file.type.match("image.png")) {
      reader.readAsDataURL(file);
      var blob = file.slice(0, file.size, "image/png");
      var newFile = new File([blob], id, { type: "image/png" });
      // setFile(newFile);
    }
  };

  return (
    <>
      <div>
        <label id="imglabel" htmlFor="imgInput">
          <img id="img" src={filesrc} alt="" />
        </label>

        <input
          type="file"
          id="imgInput"
          name="img"
          onChange={(e) => handleChange(e)}
          accept="image/x-png"
        />
      </div>
      <style jsx>{`
        #imgInput {
          opacity: 0;
          position: absolute;
          z-index: -1;
        }

        #imglabel,
        #img {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px var(--grey-dark-2) solid;
          font-size: 2rem;
          height: 10rem;
          width: 10rem;
          border-radius: 10rem;
          -webkit-border-radius: 10rem;
          -moz-border-radius: 10rem;
          -ms-border-radius: 10rem;
          -o-border-radius: 10rem;
          margin: auto;
        }
      `}</style>
    </>
  );
}
