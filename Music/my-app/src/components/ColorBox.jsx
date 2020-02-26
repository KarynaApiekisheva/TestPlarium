import React, { useState } from "react";

const ColorBox = props => {
  const { setResultColor } = props;

  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const colorRGB = "rgb(" + red + "," + green + "," + blue + ")";

  const updateRed = e => {
    setRed(e.target.value);
  };

  const updateGreen = e => {
    setGreen(e.target.value);
  };

  const updateBlue = e => {
    setBlue(e.target.value);
  };

  function RGBToHex(colorRGB) {
    // Choose correct separator
    let sep = colorRGB.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    colorRGB = colorRGB
      .substr(4)
      .split(")")[0]
      .split(sep);

    let r = (+colorRGB[0]).toString(16),
      g = (+colorRGB[1]).toString(16),
      b = (+colorRGB[2]).toString(16);

    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;

    setResultColor("#" + r + g + b);

    return "#" + r + g + b;
  }
 
  RGBToHex(colorRGB);

  //   function hexToRgb(hex) {
  //     const hex2 = hex.replace("#", "");
  //     const r = parseInt(hex2.substring(0, 2), 16);
  //     const g = parseInt(hex2.substring(2, 4), 16);
  //     const b = parseInt(hex2.substring(4, 6), 16);

  //     return "rgb(" + r + ", " + g + ", " + b + ")";
  //   }

  return (
    <div className="container">
      <div className="sliders">
        <div className="red">
          <input
            id="red"
            type="range"
            min="0"
            max="255"
            steps="1"
            value={red}
            onChange={updateRed}
          />
          <label>Red: {red}</label>
        </div>
        <div className="green">
          <input
            id="green"
            type="range"
            min="0"
            max="255"
            steps="1"
            value={green}
            onChange={updateGreen}
          />
          <label>Green: {green}</label>
        </div>
        <div className="blue">
          <input
            id="blue"
            type="range"
            min="0"
            max="255"
            steps="1"
            value={blue}
            onChange={updateBlue}
          />
          <label>Blue: {blue}</label>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;
