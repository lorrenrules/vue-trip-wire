# Vue Trip Wire
A [Vue.js](https://vuejs.org) plugin for firing functions when an element reaches a designated position in the viewport.

Great for animations!

## Setup
Install via NPM:
```
npm install vue-trip-wire --save-dev
```
Add Vue Trip Wire to root Vue instance:
```javascript
import Vue from 'vue'
import vueTripWire from 'vue-trip-wire'

Vue.use(vueTripWire)
```

You may optionally add a module/object containing functions you would like to use globally:
```javascript
import Vue from 'vue'
import vueTripWire from 'vue-trip-wire'
import functionsModule from 'path/to/module'

Vue.use(vueTripWire, functionsModule)
```

## Usage

Trip Wire uses a custom directive `v-trip-wire`, which accepts an object as its value.

The object should include a `pos` property of numeric value between 0 and 1, representing the position trigger, which is the percentage from the top of the viewport to fire the method; i.e. 0.25 would be 25% down the viewport. Defaults to 0.5 if no position added.

The object should also contain a `func` property with the value of the desired local component method, or if you included a module with custom functions, the string name of the function you wish to fire upon reaching the position trigger.

```html
<h1 v-trip-wire="{ pos: 0.5, func: yourComponentMethod }">
```
or
```html
<h1 v-trip-wire="{ pos: 0.5, func: 'stringValueOfGlobalFunction' }">
```

Parameters may be passed to the function via the `params` property. Your function will determine the format of your parameter(s).

*For example, here is a function which destructures a context object parameter.*
```javascript
const yourFunction = ({param1, param2}) => {
  // logic
}
```
```html
<h1 v-trip-wire="{ pos: 0.5, func: 'yourFunction', params: { param1: 'value1', param2: 'value2' } }">
```

For testing purposes, you may add an indicator property with optional 'text' and 'color' properties to the value object, which will display a visual representation of the positional trigger.

An empty object passed will default to values 'trigger' for text, and 'green' for color.
*Note: Because accidents happen, indicators will not be displayed if NODE_ENV is set to 'production'*
```html
<h1 v-trip-wire="{ pos: 0.5, func: yourComponentMethod, indicator: { text: 'Your trip wire', color: 'red' } }">
```

## License
MIT License

Copyright (c) 2019 Lorren Gordon lorrenrules@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
