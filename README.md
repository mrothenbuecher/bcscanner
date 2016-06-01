# bcscanner
jquery plugin for HID barcode scanner

## usage

```js
// with default values
$('#bcscanner').bcscanner();

// with custom options
$('#bcscanner').bcscanner({
  hidden: true,
  interval: 300,
  onChar: [{
    charCode: 13,
    func: function() {
      alert("enter was hit");
    }
  }, {
      charCode: 32,
      func: function() {
        alert("space was hit");
      }
    }]
  });
```

## options
### hidden (boolean)
- true, input field will be moved out of visible area
- false, input field stays in position

default is true

### interval (int)
the interval (in ms) in which the field requests the focus.
If interval < 0 the focus will not be requested.

default is 50

### onChar (array of objects)
Defines functions depending of a charCode
```
{
  charCode: 13,
  func: function(input, event) {
    alert("enter was hit");
  }
}
```


## methods

### start([interval])

### stop()

### destroy()
