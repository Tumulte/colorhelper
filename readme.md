## Installation

`npm i @rougefw/colorhelper`

## Usage

`import {rfColorhelper} from '@rougefw/colorhelper'` 
or 
`const {rfColorHelper} = require('@rougefw/colorhelper')`

**Instantiation** :

`const colorHelper = new rfColorHelper()
`

**Conversion methods** : 

Input the color as a string or as an object (see the comments for the expected values)

```javascript
colorHelper.hslToRgb(color) // color = 'hsl(xdeg y% z% )' || {hue: xx, light: yy, saturation: zz}
colorHelper.hslToHex(color) // color = 'hsl(xdeg y% z% )' || {hue: xx, light: yy, saturation: zz}
colorHelper.hexToRgb(color ) // color = #XXYYZZ (hexadecimal)
colorHelper.hexToHsl(color) // color = #XXYYZZ (hexadecimal)
colorHelper.rgbToHex(color) // color = 'rgb(xxx yyy zzz)' || {red: xx, green: yy, blue: zz}
colorHelper.rgbToHsl(color) // color = 'rgb(xxx yyy zzz)' || {red: xx, green: yy, blue: zz}
```
**Getter methods**

Output the converted color as a css parameter (string) or as an object

```javascript
colorHelper.xxxToYyy(color).getString() // outputs a css ready string
colorHelper.xxxToYyy(color).getValueCollection() // outputs a js object
```

**Utility methods**

takes a css color string and outputs a JS object

```javascript
colorHelper.getValueCollection(color) 
```

### Examples 
```javascript
const colorHelper = new rfColorHelper()

colorHelper.hslToHex('hsl(34deg 34% 45%)').getString() // #F0E5D6
colorHelper.rgbToHsl({red: 23, green: 34, blue: 27}).getValueCollection() // {"hue": 142, "light": 11, "saturation": 19}

```

## Limitations 

* No support for Alpha channel yet
* JS being not too great with math, the conversion might result in a couple of 1/255th variation that should be unnoticeable
