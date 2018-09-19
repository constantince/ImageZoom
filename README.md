# **ImageZoom** Zoom your images:-)

This very simple tool, help you to create zoom-able canvas and images; It only have one api; Fork if you like it; Here it a example to show how use it; Send me the email (alberteinstein007@126.com) if you have problems;
```html
<div id="a"><div>
<div id="b"><div>
........
<!--import this tool-->
<script type="text/javascript" src="../zoom.js"></script>

```

```javascript
	Zoomer({
		originlPanel: document.getElementById('a'), //origin image box warpper
		targetPanel: document.getElementById('b'),// zoomed image box warpper
		imageHeight: 227,//image height
		imageWidth: 300,//image width
		imageUrl: 'https://mdn.mozillademos.org/files/5397/rhino.jpg', //your image source
		zoom: 3 //size
	});
```
