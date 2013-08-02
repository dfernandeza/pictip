jQuery PicTip
======

[jQuery PicTip](http://pictip.greenmandarine.net/) is a plugin that adds handy tooltips to your images, slideshows, sliders and more.

Features
--------

- Easy configuration and customization
- Easy integration with slideshows, sliders, 360 views, and more
- Support for captions and bubble tooltips
- Add any content type to tooltips/captions
- Event type options (hover/click)
- Change tooltip position relative to spot
- Create spots with your own HTML markup
- Very small (just 4kb minified)

Getting Started
---------------
1. Include the jQuery library and the PicTip plugin on your page.
2. Call the pictip() method on the jQuery element that contains your image(s). 
Let me show you an example:

### The HTML

```html
<div id="pictip-demo"> </div>
```

### The CSS

```css
#pictip-demo{
    position: relative;
}
.spot{
  /* make it look pretty */
}
.spot-tooltip{
  /* make it look pretty */
}
```

#### Use the following clases for customization:

| Class                | Description                                                                   |
| -------------------- |:----------------------------------------------------------------------------- |
| spot                 | Spot class                                                                    |
| spot-{index}         | Class containing the spot indetifier (spot-0, spot-1, etc)                    |
| spot-open            | Class assigned to the spot when the related tooltip is open                   |
| spot-tooltip         | Tooltip class                                                                 |
| spot-tooltip-{index} | Class containing the tooltip indetifier (spot-tooltip-0, spot-tooltip-1, etc) |
| spot-tooltip-close   | Class assigned to the tooltip close link                                      |
| spot-tooltip-content | Class assigned to the tooltip content container                               |

### The JavaScript
```javascript
$("#pictip-demo").pictip({
    spots: [
        { 
            top: '50px', 
            left: '20px', 
            content: 'Hello!', 
            tooltipPosition:'br' //bottom-right
        }
    ]
});
```

#### The complete set of options:

| Option                                                   | Description                                                                                    |
| -------------------------------------------------------- |:---------------------------------------------------------------------------------------------- |
| spots [ Array: [] ]                                      | Spots object array. Refer to the next table for more information.                              |
| spotClass [ String: '.spot' ]                            | Spots class.                                                                                   |
| spotTemplate [ String: '<a></a>' ]                       | HTML template to create the spots.                                                             |
| eventType [ String: 'click' ]                            | Event type to trigger the tooltip/caption display action (posible values are click and hover). |
| tooltip [ Boolean: true ]                                | Display tooltip or caption? (use caption for a better mobile experience).                      |
| onShowToolTip [ Function: function (spot, tooltip) {} ]  | Function executed after the tooltip has opened                                                 |
| onCloseToolTip [ Function: function (spot, tooltip) {} ] | Function executed after the tooltip has closed                                                 |

#### Spots set of options:

| Option                          | Description                                                         |
| ------------------------------- |:------------------------------------------------------------------- |
| top [ Number: 0 ]               | Spot top position                                                   |
| left [ Number: 0 ]              | Spot left position                                                  |
| content [ String: '' ]          | Tooltip content. Add any content type                               |
| tooltipPosition [ String: '' ]  | Tooltip position relative to spot. (tl, tr, tc, bl, br, bc, cl, cr) |
| tooltipId [ String: '' ]        | Tooltip ID                                                          |
| tooltipCss [ Object: {} ]       | CSS styling for the tooltip                                         |
| tooltipClose [ Boolean: false ] | Set this to true if you want the tooltip close link                 |

### The API
Accessing the PicTip instance.

```javascript
// You can access the instance with:
var pictip = $("#pictip-demo").data('pictip');
```

#### You can access the following methods of the instance:

| Method                                        | Description                    |
| --------------------------------------------- |:------------------------------ |
| init [ Function: function (options) {...} ]   | Initialize the plugin instance |
| closeToolTips [ Function: function () {...} ] | Close all open tooltips        |
| destroy [ Function: function () {...} ]       | Destroy the plugin instance    |

Yes I know this is easy!

## Changelog

#### v0.2.1 

- Initial version

#### v0.2.2

- Adding minor performance improvements (jQuery selectors)
- Fixed caption functionality (tooltip: false)

## Contributing

If you'd like to contribute to this project, create a branch and send a pull request for that branch.
Lint and test your code.

Any problems, please, let me know.

## License
Copyright (c) 2013 Daniel Fernández A.
Dual licensed under the MIT and GPL licenses.
