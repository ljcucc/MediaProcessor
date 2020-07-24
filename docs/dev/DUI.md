# DUI
 DUI is an UI system that have the similar code style of flutter and swiftUI, allows you to quick build your UI.

 script location:
 * `/src/dialog.js`

## Reference

### `window.dui`
The API of DUI, in this reference, we'll called `window.dui` as `dui` instead, * meaning optional.

### Element generators

|function|description|
|-|-|
|`+ dui.Text(String text, {*style: styleFormat})`|Generate a Text element|
|`+ dui.Button(String text, {*onPressed: callback})`|Generate button|
|`+ dui.Column({child:elements[]})`| A Column layout|
|`+ dui.Center(child: element)`|Make child element center|
|`+ dui.TextField({*hint:String})`|Generate input box|
|`+ dui.Padding({child: element, *top: (int)pixel_length, *bottom: (int)pixel_length, *left: (int)pixel_length, *right: (int)pixel_length,})`| Make child element padding, parameter top, bottom, left, right is optional, defualt is 0|
|`+ dui.Selector(*default: String = "(default)",*list:[ [item_id, item_title] ])`|Make a dropdown selector. *default:String is the default value of the selector. default is `"(Default)"`|
|`+ dui.Canvas({onStart: callback, onDraw: callback})`|duiCanvas element, more about duiCanvas see [here](./canvas.md)|

Example:
```js
var element = showDialog({
    title: "About",
    layout: dui.Center({
        child:dui.Column({child:[
        dui.Text("This app is made by @ljcucc\n you can find more things about him on github."),
        dui.Button("Github", {
            onPressed: ()=> window.open("https://ljcucc.github.io/MediaProcessor/")
        }),
        dui.Button("Blog", {
            onPressed: ()=> window.open("https://ljcucc.blogspot.com")
        }) // Button
    ]})// Column
}); // Center, showDialog()
```