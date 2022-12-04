// @ts-nocheck
import {ColorHelper} from "./index";
import {expect, it, describe} from "vitest";

const pink = "#EA05CA";
const grey = "777777";
const green = "4B2";
const darkBlue = "#148";

const colorUtils = new ColorHelper();

describe("hexadecimal is converted to decimal", () => {
    it("return the decimal values", () => {
        const rgb = colorUtils.hexToRgb(pink).getValueCollection();
        expect(rgb.red).toEqual(234);
        expect(rgb.green).toEqual(5);
        expect(rgb.blue).toEqual(202);
    });
});
describe("The color type stays the same if it is already the correct one", () => {
    it("return the RGB if it is already a RGB", () => {
        const color = {red: 23, green: 189, blue: 38};
        const rgb = colorUtils.hexToRgb(color).getValueCollection();
        expect(rgb).toEqual(color);
    });
});
describe("The hexa is converted to HSL", () => {
    it("return the HSL of a clear value", () => {
        expect(colorUtils.hexToHsl(pink).getValueCollection()).toEqual({
            light: 47,
            saturation: 96,
            hue: 308
        });
    });
    it("return the HSL of a 3 digit dark value", () => {
        expect(colorUtils.hexToHsl(darkBlue).getValueCollection()).toEqual({
            light: 30,
            saturation: 78,
            hue: 214
        });
    });
    it("return the HSL of a 3 digit value with no #", () => {
        expect(colorUtils.hexToHsl(green).getValueCollection()).toEqual({
            light: 43,
            saturation: 69,
            hue: 107
        });
    });
    it("return the HSL of achromatic color with no #", () => {
        expect(colorUtils.hexToHsl(grey).getValueCollection()).toEqual({
            light: 47,
            saturation: 0,
            hue: 0
        });
    });
});
describe("The HSL is converted to Hex", () => {
    it("return the hex of an hsl", () => {
        expect(
            colorUtils
                .hslToHex({
                    hue: 17,
                    saturation: 19,
                    light: 63
                })
                .getValueCollection()
        ).toEqual({
            hexred: "B3",
            hexgreen: "99",
            hexblue: "8F"
        });
    });
});
describe("The RGB is converted to Hsl", () => {
    it("converts RGB with +50% light", () => {
        expect(
            colorUtils
                .rgbToHsl({
                    red: 200,
                    green: 180,
                    blue: 210
                })
                .getValueCollection()
        ).toEqual({
            hue: 280,
            light: 76,
            saturation: 25
        });
    });
});
describe("The HSL is converted to RGB", () => {
    it("return the HSL of achromatic color with no #", () => {
        expect(
            colorUtils
                .hslToRgb({
                    hue: 17,
                    saturation: 19,
                    light: 63
                })
                .getValueCollection()
        ).toEqual({
            red: 179,
            green: 153,
            blue: 143
        });
    });
    it("return the HSL of achromatic color", () => {
        const gray = colorUtils
            .hslToRgb({
                hue: 0,
                saturation: 0,
                light: 47
            })
            .getValueCollection();
        expect(gray).toEqual({
            red: 120,
            green: 120,
            blue: 120
        });
    });
});
describe("Decimal is converted to hexa", () => {
    it("return the hexa values", () => {
        expect(
            colorUtils
                .rgbToHex({
                    red: 2,
                    green: 46,
                    blue: 148
                })
                .getString()
        ).toEqual("#022E94");
    });
    it("fails when the input format is wrong", () => {
        expect(function () {
            colorUtils.rgbToHex({
                ried: 2,
                green: 46,
                blue: 148
            });
        }).toThrow();
    });
    it("return the hexa values in an object", () => {
        expect(
            colorUtils
                .rgbToHex({
                    red: 2,
                    green: 46,
                    blue: 148
                })
                .getValueCollection()
        ).toEqual({hexred: "02", hexgreen: "2E", hexblue: "94"});
    });
});
describe("Converts string to object", () => {
    it("return the hsl", () => {
        expect(colorUtils.getValueCollection("hsl(100deg 20% 340%)")).toEqual({
            hue: 100,
            saturation: 20,
            light: 340
        });
    });
});
describe("Converts object to string", () => {
    it("returns the string if it is already a string", () => {
        expect(colorUtils.getString("hsl(100,20,340)")).toEqual("hsl(100,20,340)");
    });
    it("returns the string of an RGB object", () => {
        expect(colorUtils.getString({red: 233, green: 109, blue: 29})).toEqual(
            "rgb(233,109,29)"
        );
    });
    it("returns the string of an HSL object", () => {
        expect(
            colorUtils.getString({hue: 278, light: 90, saturation: 29})
        ).toEqual("hsl(278,29%,90%)");
    });
    it("returns the string of an Hex object", () => {
        expect(
            colorUtils.getString({hexred: "E3", hexgreen: "09", hexblue: "AA"})
        ).toEqual("#E309AA");
    });
});
