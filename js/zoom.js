(function (window, undefined) {
	var blockStyle = 'position: absolute; top:0; left: 0; z-index: 1';
	var width, height, originlPanel, targetPanel, url, zoomer, boxHeight, boxWidth;

	function createCanvas(id, width, height, style) {
		return '<canvas id='+id+' width='+width+' height='+height+' style="'+style+'"></canvas>';
	}

	//创建dom
	function domCreater() {
		var warpperStyle = 'position: relative; cursor: pointer; height: ' + boxHeight + 'px; width: ' +  boxWidth + 'px';
		var warpper = '<div id="canvas-warpper" style="' + warpperStyle + '">' + createCanvas('zoomer-image-canvas', boxWidth, boxHeight) + createCanvas('zoomer-block-canvas',boxWidth, boxHeight, blockStyle) + '</div>';
		originlPanel.innerHTML = warpper;
		var targetCanvas = createCanvas('zoomer-target-canvas', boxWidth, boxHeight);
		targetPanel.innerHTML = targetCanvas;
		zoomMaker();
	}

	function zoomMaker() {
		var img = new Image();
		img.src = url;
		img.onload = function() {
		  draw(img);
		};

		var warpper = document.getElementById('canvas-warpper');
		var canvas = document.getElementById('zoomer-image-canvas');
		var ctx = canvas.getContext('2d');
		var zoomctx = document.getElementById('zoomer-target-canvas').getContext('2d');
		var block = document.getElementById('zoomer-block-canvas');
		var blockctx = block.getContext('2d');

		var zoomWidth = boxWidth / zoomer;
		var zoomHeight = boxHeight / zoomer;


		function draw(img) {
		  ctx.drawImage(img, 0, 0, width, height, 0, 0, boxWidth, boxHeight);
		  img.style.display = 'none';
		}

		function drawRectTangle(x, y) {
		  blockctx.globalAlpha = '0.4';
		  blockctx.fillStyle = "red";
		  blockctx.fillRect(x, y, zoomWidth, zoomHeight);
		  blockctx.fill();
		}

		var zoom = function(event) {
		    var x = event.layerX;
		    var y = event.layerY;
		    zoomctx.clearRect(0,0, width,height);
		    zoomctx.drawImage(canvas, x - zoomWidth / 2,  y - zoomHeight / 2, zoomWidth, zoomHeight, 0, 0, width, height);
		};

		function moveTheRectTangle(e) {
		  blockctx.clearRect(0,0, width, height);
		  drawRectTangle(e.layerX - zoomWidth / 2, e.layerY - zoomHeight / 2);
		}

		function combination(e) {
		  moveTheRectTangle(e);
		  zoom(e);
		}

		function hideRectTangle() {
		  blockctx.clearRect(0, 0, width, height);
		  zoomctx.clearRect(0,0, width, height);
		}

		warpper.addEventListener('mousemove', combination);
		warpper.addEventListener('mouseout', hideRectTangle);
	}

	function start(options) {
		initialState(options);
		domCreater();
	}



	function initialState(options) {

		width = options.imageWidth;
		height = options.imageHeight;
		originlPanel = options.originlPanel;
		targetPanel = options.targetPanel;
		url = options.imageUrl;
		zoomer = options.zoom;

		boxHeight = options.boxHeight ? options.boxHeight : height;
		boxWidth = options.boxWidth ? options.imageWidth : width;

	}

	window.Zoomer = start;

})(window);
