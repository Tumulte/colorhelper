export function colorHelper() {
  const parseHex = function(hex) {
    return parseInt(hex, 16);
  };
  const toHex = function(number) {
    let hex = number.toString(16);
    if (hex.length === 1) {
      hex = `0${hex}`;
    }
    return hex.toUpperCase();
  };
  this.hexToRgb = function(color) {
    this.color = color;
    if (this.color.red !== undefined) {
      return this;
    }
    let hex = this.color.replace("#", "");
    if (hex.length === 3) {
      //if 3 digit hex : double each digit
      hex = hex
        .split("")
        .map(
          function(letter) {
            return `${letter + letter}`;
          }
        )
        .join("");
    }

    const red = parseHex(hex.substring(0, 2));
    const green = parseHex(hex.substring(2, 4));
    const blue = parseHex(hex.substring(4, 6));
    this.color = {
      red: red,
      green: green,
      blue: blue
    };
    return this;
  };
  this.rgbToHex = function(color) {
    this.color = color;

    if (typeof this.color.red !== "undefined") {
      this.color = `#${toHex(this.color.red)}${toHex(this.color.green)}${toHex(
        this.color.blue
      )}`;
    } else {
      throw new Error(
        'The rgbToHex method require a "{red: XXX, green: YYY, blue: ZZZ}" object as input value'
      );
    }
    return this;
  };

  this.rgbToHsl = function(color) {
    this.color = color;

    const rgbArray = [
      this.color.red / 255,
      this.color.green / 255,
      this.color.blue / 255
    ];
    rgbArray.sort(function(a, b) {
      return a - b;
    });
    const min = rgbArray[0];
    const mid = rgbArray[1];
    const max = rgbArray[2];

    const light = Math.round(((min + max) * 100) / 2);
    //In case on gray
    if (max === min && mid === min) {
      this.color = {
        light: light,
        saturation: 0,
        hue: 0
      };
      return this;
    }
    let saturation;
    if (light > 50) {
      saturation = (max - min) / (2 - max - min);
    } else {
      saturation = (max - min) / (max + min);
    }
    saturation = Math.round(saturation * 100);
    let hue;
    if (max === this.color.red / 255) {
      hue = (this.color.green - this.color.blue) / 255 / (max - min);
    } else if (max === this.color.green / 255) {
      hue = 2 + (this.color.blue - this.color.red) / 255 / (max - min);
    } else {
      hue = 4 + (this.color.red - this.color.green) / 255 / (max - min);
    }
    if (hue < 0) {
      hue = Math.round(hue * 60) + 360;
    } else {
      hue = Math.round(hue * 60);
    }

    this.color = {
      light: light,
      saturation: saturation,
      hue: hue
    };
    return this;
  };

  this.hslToRgb = function(color) {
    this.color = color;
    const light = this.color.light / 100;
    const sat = this.color.saturation / 100;
    const hue = this.color.hue / 360;
    if (this.color.saturation === 0) {
      const lightTo255 = Math.round(light * 255);
      this.color = {
        red: lightTo255,
        green: lightTo255,
        blue: lightTo255
      };
      return this;
    }

    let tempFormula; //I can't find what this is formula is supposed to be.
    if (light < 0.5) {
      tempFormula = light * (1 + sat);
    } else {
      tempFormula = light + sat - light * sat;
    }
    const tempFormula2 = 2 * light - tempFormula;
    const hueToRgb = function(tempFormula, tempFormula2, hue) {
      if (hue < 0) {
        hue += 1;
      } else if (hue > 1) {
        hue -= 1;
      }
      if (hue < 1 / 6) {
        return tempFormula + (tempFormula2 - tempFormula) * 6 * hue;
      } else if (hue < 1 / 2) {
        return tempFormula2;
      } else if (hue < 2 / 3) {
        return tempFormula + (tempFormula2 - tempFormula) * (2 / 3 - hue) * 6;
      } else {
        return tempFormula;
      }
    };
    const red = hueToRgb(tempFormula2, tempFormula, hue + 1 / 3);
    const green = hueToRgb(tempFormula2, tempFormula, hue);
    const blue = hueToRgb(tempFormula2, tempFormula, hue - 1 / 3);
    this.color = {
      red: Math.round(red * 255),
      green: Math.round(green * 255),
      blue: Math.round(blue * 255)
    };

    return this;
  };
  this.hexToHsl = function(color) {
    color = this.hexToRgb(color).getValueCollection();
    color = this.rgbToHsl(color).getValueCollection();
    this.color = color;
    return this;
  };
  this.hslToHex = function(color) {
    color = this.hslToRgb(color).getValueCollection();
    color = this.rgbToHex(color).getValueCollection();
    this.color = color;

    return this;
  };
  this.getString = function(color) {
    if (color) {
      this.color = color;
    }
    if (typeof this.color === "string") {
      return this.color;
    } else if (this.color.red !== undefined) {
      return `rgb(${this.color.red},${this.color.green},${this.color.blue})`;
    } else if (this.color.hue !== undefined) {
      return `hsl(${this.color.hue},${this.color.saturation}%,${this.color.light}%)`;
    } else if (this.color.hexred !== undefined) {
      return `#${this.color.hexred}${this.color.hexgreen}${this.color.hexblue}`;
    } else {
      throw new Error(
        'The getString method only takes Objects with the following keys : "hue, saturation, light" (with HSL values) - "hexblue, hexgreen, hexred" (with Hexadecimal RGB), "red, green, blue" (with base 256 RGB)'
      );
    }
  };
  this.getValueCollection = function(color) {
    if (typeof color !== "undefined") {
      this.color = color;
    }
    const re = new RegExp(/^#([0-9a-f]{3}){1,2}$/i);

    if (typeof this.color === "object") {
      return this.color;
    } else if (this.color.indexOf("rgb(") > -1) {
      let colorValues = this.color.split(")")[0].split(",");

      return {
        red: colorValues[0],
        green: colorValues[1],
        blue: colorValues[2]
      };
    } else if (this.color.indexOf("hsl(") > -1) {
      const colorValues = this.color
        .split("(")[1]
        .split(")")[0]
        .split(",");
      return {
        hue: parseInt(colorValues[0]),
        saturation: parseInt(colorValues[1]),
        light: parseInt(colorValues[2])
      };
    } else if (re.test(this.color)) {
      const hex = this.color;
      return {
        hexred: hex.substring(1, 3),
        hexgreen: hex.substring(3, 5),
        hexblue: hex.substring(5, 7)
      };
    }
  };
}
