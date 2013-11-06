#Interactive 3D by Pete R.
Create a 3D interactive object using images and one simple JS call
Created by [Pete R.](http://www.thepetedesign.com), Founder of [BucketListly](http://www.bucketlistly.com)

[![Interactive 3D](http://www.thepetedesign.com/images/interactive_3d.png "Interactive 3D")](http://www.thepetedesign.com/demos/interactive_3d.html)

## Demo
[View demo](http://www.thepetedesign.com/demos/interactive_3d.html)

## Compatibility
Modern browsers such as Chrome, Firefox, and Safari on both desktop and smartphones have been tested. Not tested on IE.

## Basic Usage
jQuery Interactive 3D let you create a 3D interactive object using several images as frames allowing the user to drag around and manipulate the image. This plugin is perfect for showcasing your product on the web.

To add this to your website, simply include the latest jQuery library together with `jquery.interactive_3d.js` into your document's `<head>`, create a markup and call the function as follows:

````html
<body>
  ...
  <div id="interactive_3d">
    <img src="images/frame_1.png">
  </div>
  ...
</body>
````
Note: Make sure that the images that will be used as frames have a file name that ends with `_frame-number`. For example, your first frame should be named: `anything_1.jpg` and your second should be `anything_2.jpg` etc.

Now call the function and that should be it.
 
````javascript
  $("#interactive_3d").interactive_3d({
    frames: 10, // The total number of images to be used as frames. The higher, the smoother your interaction will be. The default value is 10 frames.
    cursor: "move", // The CSS style to indicate what cursor will show when the user hover the object. The default value is "move"
    speed: 0, // The speed of the rotation in milliseconds delay. If you have small number of frames and the rotation seems too fast and not smooth, increase this value to 50 - 100 milliseconds delay. The default value is 0.
    entrance: true, // Entrance Animation. Toggle this to false to turn it off. The default value is true.
    preloadImages: true, // Let the script preload all the frames on initial load. Toggle this to false to turn it off. The default value is true.
    touchSupport: true, // The script support touch events for mobile phones. If this interferes with your website behaviour, you can toggle this to false. The default value is true.
    loading: "Loading.." // This only applies if preloadImages is true. This option let you show a loading indicator while the script is preloading the images. The option accepts HTML. Toggle this to false to turn this off. The default value is "Loading.."
  });
````

With one JS call, you will now have an awesome 3D interactive images on your website. Pretty neat huh? A big shout out to [Chris Coyier](http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/) for providing a lean solution for drag and drop without using jQuery UI and thanks to the owner of touchHandler script (not sure who the author was. The original post was on a lost Posterous server) to add touch support to the drag and drop script.

If you want to see more of my plugins, visit [The Pete Design](http://www.thepetedesign.com/#design), or follow me on [Twitter](http://www.twitter.com/peachananr) and [Github](http://www.github.com/peachananr).

## Other Resources
- [Chris Coyier's drag and drop script](http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/)
- [TouchHandler script](http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices)
