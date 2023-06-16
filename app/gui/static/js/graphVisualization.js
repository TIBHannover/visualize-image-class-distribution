//"use strict";
var graphVisualization=(function (){
	var xml ="";
	var network;
    var allNodes;
    var highlightActive = false;
    var itemDialog= false;
    var gridDialog= false;
    var clickTime= 0;
    var entries= [];
    var Colors = [
      '#F44336', '#2196F3', '#8BC34A', '#FF5722', '#E91E63',
      '#03A9F4', '#CDDC39', '#795548', '#9C27B0', '#00BCD4',
      '#FFEB3B', '#607D8B', '#673AB7', '#009688', '#FFC107',
      '#9E9E9E', '#3F51B5', '#4CAF50', '#FF9800', '#000000',
    ];
    var data = [ { "id": "4e0463747c783f0e908aee10234b1123", "meta": [ { "name": "location", "value_str": "Rijksmuseum" }, { "name": "title", "value_str": "Architectuurstudie, mogelijk van een kerk" }, { "name": "year_min", "value_int": 1828, "value_str": "1828" } ], "origin": [ { "name": "name", "value_str": "rijksmuseum" } ], "classifier": [ { "plugin": "image_net_resnet_classifier", "annotations": [] }, { "plugin": "i_met2020_resnet_classifier", "annotations": [ { "name": "large", "value": 0.333321750164032 }, { "name": "medium", "value": 0.38472482562065127 }, { "name": "small", "value": 0.2896242141723633 }, { "name": "graphite", "value": 0.3760744333267212 } ] } ], "feature": [], "coordinates": [ 0.7104527354240418, 0.7579843997955322 ], "distance": 0.2867443859577179, "cluster": 0, "padded": false, "collection": { "id": "aa51afededa94c64b41c421df478f123", "name": "rijksmuseum", "is_public": true, "user": false }, "path": "/static/images/1.jpg", "preview": "/static/images/1_m.jpg" }, { "id": "4e0463747c783f0e908aee10234b1124", "meta": [ { "name": "location", "value_str": "Rijksmuseum" }, { "name": "title", "value_str": "Architectuurstudie, mogelijk van een kerk" }, { "name": "year_min", "value_int": 1828, "value_str": "1828" } ], "origin": [ { "name": "name", "value_str": "rijksmuseum" } ], "classifier": [ { "plugin": "image_net_resnet_classifier", "annotations": [] }, { "plugin": "i_met2020_resnet_classifier", "annotations": [ { "name": "large", "value": 0.333321750164032 }, { "name": "medium", "value": 0.38472482562065127 }, { "name": "small", "value": 0.2896242141723633 }, { "name": "graphite", "value": 0.3760744333267212 } ] } ], "feature": [], "coordinates": [ 0.6504527354240418, 0.7079843997955322 ], "distance": 0.2867443859577179, "cluster": 0, "padded": false, "collection": { "id": "aa51afededa94c64b41c421df478f123", "name": "rijksmuseum", "is_public": true, "user": false }, "path": "/static/images/1.jpg", "preview": "/static/images/1_m.jpg" }, { "id": "4e0463747c783f0e908aee10234b1125", "meta": [ { "name": "location", "value_str": "Rijksmuseum" }, { "name": "title", "value_str": "Architectuurstudie, mogelijk van een kerk" }, { "name": "year_min", "value_int": 1828, "value_str": "1828" } ], "origin": [ { "name": "name", "value_str": "rijksmuseum" } ], "classifier": [ { "plugin": "image_net_resnet_classifier", "annotations": [] }, { "plugin": "i_met2020_resnet_classifier", "annotations": [ { "name": "large", "value": 0.333321750164032 }, { "name": "medium", "value": 0.38472482562065127 }, { "name": "small", "value": 0.2896242141723633 }, { "name": "graphite", "value": 0.3760744333267212 } ] } ], "feature": [], "coordinates": [ 0.6104527354240418, 0.6179843997955322 ], "distance": 0.2867443859577179, "cluster": 0, "padded": false, "collection": { "id": "aa51afededa94c64b41c421df478f123", "name": "rijksmuseum", "is_public": true, "user": false }, "path": "/static/images/1.jpg", "preview": "/static/images/1_m.jpg" }, { "id": "4e0463747c783f0e908aee10234b1131", "meta": [ { "name": "location", "value_str": "Rijksmuseum" }, { "name": "title", "value_str": "Architectuurstudie, mogelijk van een kerk" }, { "name": "year_min", "value_int": 1828, "value_str": "1828" } ], "origin": [ { "name": "name", "value_str": "rijksmuseum" } ], "classifier": [ { "plugin": "image_net_resnet_classifier", "annotations": [] }, { "plugin": "i_met2020_resnet_classifier", "annotations": [ { "name": "large", "value": 0.333321750164032 }, { "name": "medium", "value": 0.38472482562065127 }, { "name": "small", "value": 0.2896242141723633 }, { "name": "graphite", "value": 0.3760744333267212 } ] } ], "feature": [], "coordinates": [ 0.6504527354240418, 0.7079843997955322 ], "distance": 0.2867443859577179, "cluster": 0, "padded": false, "collection": { "id": "aa51afededa94c64b41c421df478f123", "name": "rijksmuseum", "is_public": true, "user": false }, "path": "/static/images/2.jpg", "preview": "/static/images/2_m.jpg" }, { "id": "4e0463747c783f0e908aee10234b1126", "meta": [ { "name": "location", "value_str": "Rijksmuseum" }, { "name": "title", "value_str": "Architectuurstudie, mogelijk van een kerk" }, { "name": "year_min", "value_int": 1828, "value_str": "1828" } ], "origin": [ { "name": "name", "value_str": "rijksmuseum" } ], "classifier": [ { "plugin": "image_net_resnet_classifier", "annotations": [] }, { "plugin": "i_met2020_resnet_classifier", "annotations": [ { "name": "large", "value": 0.333321750164032 }, { "name": "medium", "value": 0.38472482562065127 }, { "name": "small", "value": 0.2896242141723633 }, { "name": "graphite", "value": 0.3760744333267212 } ] } ], "feature": [], "coordinates": [ 0.4104527354240418, 0.4179843997955322 ], "distance": 0.2867443859577179, "cluster": 1, "padded": false, "collection": { "id": "aa51afededa94c64b41c421df478f123", "name": "rijksmuseum", "is_public": true, "user": false }, "path": "/static/images/2.jpg", "preview": "/static/images/2_m.jpg" }, { "id": "4e0463747c783f0e908aee10234b1127", "meta": [ { "name": "location", "value_str": "Rijksmuseum" }, { "name": "title", "value_str": "Architectuurstudie, mogelijk van een kerk" }, { "name": "year_min", "value_int": 1828, "value_str": "1828" } ], "origin": [ { "name": "name", "value_str": "rijksmuseum" } ], "classifier": [ { "plugin": "image_net_resnet_classifier", "annotations": [] }, { "plugin": "i_met2020_resnet_classifier", "annotations": [ { "name": "large", "value": 0.333321750164032 }, { "name": "medium", "value": 0.38472482562065127 }, { "name": "small", "value": 0.2896242141723633 }, { "name": "graphite", "value": 0.3760744333267212 } ] } ], "feature": [], "coordinates": [ 0.4404527354240418, 0.4679843997955322 ], "distance": 0.2867443859577179, "cluster": 1, "padded": false, "collection": { "id": "aa51afededa94c64b41c421df478f123", "name": "rijksmuseum", "is_public": true, "user": false }, "path": "/static/images/1.jpg", "preview": "/static/images/1_m.jpg" } ];
    var state= {
        highlight: true,
        drag: true,
        grid: false,
      };
    var options= {
        physics: false,
        interaction: {
          navigationButtons: true,
          multiselect: true,
          dragNodes: false,
          hover: true,
        },
      };
    var focusOptions= {
        scale: 25,
        animation: {
          easingFunction: 'easeInOutQuad',
          duration: 1000,
        },
      };
    var nodesDataset = []; // these come from WorldCup2014.js
    var edgesDataset = [];
    var container;
	var init=function(){
		graphVisualization.bindpageEvents();
    if(false){
      nodesDataset = new vis.DataSet(nodes);
      edgesDataset = new vis.DataSet(edges);
      graphVisualization.redrawAll;
    }
    if(true){//true//false
      container = document.querySelector('#network .canvas');
      container.oncontextmenu = function () { return false; };
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('mouseup', onMouseUp);
      network = new vis.Network(container);
      network.setOptions(options);
      canvas = network.canvas.frame.canvas;
      ctx = canvas.getContext('2d');
      network.on('hoverNode', function () {
        canvas.body.container.style.cursor = 'pointer';
      });
      network.on('blurNode', function () {
        canvas.body.container.style.cursor = 'default';
      });
      network.on('afterDrawing', () => {
        if (state.drag) {
          drawSelection();
        }
        if (state.highlight) {
          //drawHulls();
        }
      });
      network.on('click', onClick);
      network.on('doubleClick', onDoubleClick);
      window.addEventListener('resize', onResize);
      //const rObs = new ResizeObserver(drawNodes);
      drawNodes();
      rObs.observe(container);
    } 
	};
	
    var getSize=function(){
        const network = document.querySelector('#network .canvas');
        if (network) {
          const { bottom } = network.getBoundingClientRect();
          let { clientHeight } = network;
          const { clientWidth } = network;
          if (bottom >= window.innerHeight) {
            clientHeight -= (bottom - window.innerHeight + 6);
          }
          return [clientWidth, clientHeight - 1];
        }
        return [0, 0];
      };
    var onClick=function({ nodes }) {
        const t0 = new Date();
        if (t0 - clickTime > 250) {
          setTimeout(() => {
            if (t0 - clickTime > 250) {
              if (nodes && nodes.length === 1) {
                const item = nodes.find(
                  ({ id }) => nodes.includes(id),
                );
                entries = [item.entry];
                itemDialog = true;
              }
            }
          }, 250);
        }
      };
    var onDoubleClick=function({ nodes }) {
        clickTime = new Date();
        if (nodes && nodes.length === 1) {
          network.focus(nodes[0], focusOptions);
        }
      };
    var  onResize=function() {
        if (network) {
          network.setOptions({
            height: `${getSize()[1]}px`,
          });
        }
      };
    var onMouseDown=function({ button, pageX, pageY }) {
        if (network && button === 2) {
          const offset = container.getBoundingClientRect();
          rect = {
            startX: pageX - offset.left,
            startY: pageY - offset.top,
            endX: pageX - offset.left,
            endY: pageY - offset.top,
          };
          container.style.cursor = 'crosshair';
          state.drag = true;
        }
      };
    var onMouseUp=function({ button }) {
        if (network && button === 2) {
          container.style.cursor = 'default';
          state.drag = false;
          network.redraw();
          selectNodes();
        }
      };
    var onMouseMove=function({ pageX, pageY }) {
        if (network && state.drag) {
          const offset = container.getBoundingClientRect();
          rect.endX = pageX - offset.left;
          rect.endY = pageY - offset.top;
          network.redraw();
        }
      };
    var drawSelection=function(){
        const start = toCanvas(rect.startX, rect.startY);
        const end = toCanvas(rect.endX, rect.endY);
        const w = end.x - start.x;
        const h = end.y - start.y;
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(29, 53, 87, 0.25)';
        ctx.fillRect(start.x, start.y, w, h);
      };
    
    var drawNodes=function() {
        const minSize = Math.min(...getSize());
        let boxSize = 0;
        const { grid } = state;
        if (grid) {
          const x = data.map(
            ({ coordinates }) => coordinates[0],
          );
          const nX = [...new Set(x)].length;
          const y = data.map(
            ({ coordinates }) => coordinates[1],
          );
          const nY = [...new Set(y)].length;
          boxSize = minSize / Math.max(nX, nY);
        } else {
          //const { settings } = $store.state.api;
          settings = {layout:[]};
          settings.layout = { itemSize: 0 };
          //if (!settings) settings.layout = { itemSize: 0 };
          boxSize = (settings.layout.itemSize + 8) * 2;
        }
        nodes = data.map((entry) => {
          return {
            id: entry.id,
            shape: 'custom',
            image: entry.preview,
            group: entry.cluster,
            x: entry.coordinates[0] * minSize,
            y: entry.coordinates[1] * minSize,
            entry,
            ctxRenderer: ({ ctx, x, y }) => {
              const img = new Image();
              img.src = entry.preview;
              let minImgSize = img.width;
              let maxImgSize = img.height;
              if (img.width > img.height) {
                minImgSize = img.height;
                maxImgSize = img.width;
              }
              return {
                drawNode() {
                  if (grid) {
                    ctx.drawImage(
                      img,
                      (img.width - minImgSize) / 2,
                      (img.height - minImgSize) / 2,
                      minImgSize,
                      minImgSize,
                      x - boxSize / 2,
                      y - boxSize / 2,
                      boxSize,
                      boxSize,
                    );
                    if (entry.cluster > 0 || entry.distance > 0) {
                      ctx.fillStyle = Colors[entry.cluster];
                      ctx.beginPath();
                      ctx.arc(
                        x + boxSize / 2 - boxSize / 5,
                        y - boxSize / 2 + boxSize / 5,
                        boxSize / 7,
                        0,
                        2 * Math.PI,
                      );
                      ctx.fill();
                    }
                  } else {
                    const width = img.width / maxImgSize;
                    const height = img.height / maxImgSize;
                    ctx.drawImage(
                      img,
                      x - (width * boxSize) / 2,
                      y - (height * boxSize) / 2,
                      width * boxSize,
                      height * boxSize,
                    );
                    if (entry.cluster > 0 || entry.distance > 0) {
                      ctx.fillStyle = Colors[entry.cluster];
                      ctx.beginPath();
                      ctx.arc(
                        x + (width * boxSize) / 2 - boxSize / 5,
                        y - (height * boxSize) / 2 + boxSize / 5,
                        boxSize / 7,
                        0,
                        2 * Math.PI,
                      );
                      ctx.fill();
                    }
                  }
                },
                nodeDimensions: {
                  width: boxSize,
                  height: boxSize,
                },
              };
            },
          };
        });
        network.setData({ nodes: nodes });
        //createHulls();
        onResize();
      };
    var selectNodes=function() {
        const start = toCanvas(rect.startX, rect.startY);
        const end = toCanvas(rect.endX, rect.endY);
        const [startX, endX] = correctRange(start.x, end.x);
        const [startY, endY] = correctRange(start.y, end.y);
        const selected = nodes.filter(({ x, y }) => {
          return x >= startX && x <= endX && y >= startY && y <= endY;
        });
        entries = selected.map(({ entry }) => entry);
        gridDialog = true;
      };
    var toCanvas=function(domX, domY) {
        const values = { x: domX, y: domY };
        return network.DOMtoCanvas(values);
      };
    var correctRange=function(x, y) {
        return x < y ? [x, y] : [y, x];
      };

	var bindpageEvents=function(){	
	};
	var redrawAll=function(){	
        var options = {
            nodes: {
              shape: "custom",
              image:"",
              scaling: {
                min: 10,
                max: 30,
                label: {
                  min: 8,
                  max: 30,
                  drawThreshold: 12,
                  maxVisible: 20,
                },
              },
              font: {
                size: 12,
                face: "Tahoma",
              },
            },
            edges: {
              width: 0.15,
              color: { inherit: "from" },
              smooth: {
                type: "continuous",
              },
            },
            physics: false,
            interaction: {
              tooltipDelay: 200,
              hideEdgesOnDrag: true,
              hideEdgesOnZoom: true,
            },
          };
          var data = { nodes: nodesDataset, edges: edgesDataset }; // Note: data is coming from ./datasources/WorldCup2014.js
        
          network = new vis.Network(container, data, options);
        
          // get a JSON object
          allNodes = nodesDataset.get({ returnType: "Object" });
        
          network.on("click", neighbourhoodHighlight);
	};
    var neighbourhoodHighlight=function(params){
		// if something is selected:
        if (params.nodes.length > 0) {
            highlightActive = true;
            var i, j;
            var selectedNode = params.nodes[0];
            var degrees = 2;
        
            // mark all nodes as hard to read.
            for (var nodeId in allNodes) {
              allNodes[nodeId].color = "rgba(200,200,200,0.5)";
              if (allNodes[nodeId].hiddenLabel === undefined) {
                allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
                allNodes[nodeId].label = undefined;
              }
            }
            var connectedNodes = network.getConnectedNodes(selectedNode);
            var allConnectedNodes = [];
        
            // get the second degree nodes
            for (i = 1; i < degrees; i++) {
              for (j = 0; j < connectedNodes.length; j++) {
                allConnectedNodes = allConnectedNodes.concat(
                  network.getConnectedNodes(connectedNodes[j])
                );
              }
            }
        
            // all second degree nodes get a different color and their label back
            for (i = 0; i < allConnectedNodes.length; i++) {
              allNodes[allConnectedNodes[i]].color = "rgba(150,150,150,0.75)";
              if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
                allNodes[allConnectedNodes[i]].label =
                  allNodes[allConnectedNodes[i]].hiddenLabel;
                allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
              }
            }
        
            // all first degree nodes get their own color and their label back
            for (i = 0; i < connectedNodes.length; i++) {
              allNodes[connectedNodes[i]].color = undefined;
              if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
                allNodes[connectedNodes[i]].label =
                  allNodes[connectedNodes[i]].hiddenLabel;
                allNodes[connectedNodes[i]].hiddenLabel = undefined;
              }
            }
        
            // the main node gets its own color and its label back.
            allNodes[selectedNode].color = undefined;
            if (allNodes[selectedNode].hiddenLabel !== undefined) {
              allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
              allNodes[selectedNode].hiddenLabel = undefined;
            }
          } else if (highlightActive === true) {
            // reset all nodes
            for (var nodeId in allNodes) {
              allNodes[nodeId].color = undefined;
              if (allNodes[nodeId].hiddenLabel !== undefined) {
                allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
                allNodes[nodeId].hiddenLabel = undefined;
              }
            }
            highlightActive = false;
          }
        
          // transform the object into an array
          var updateArray = [];
          for (nodeId in allNodes) {
            if (allNodes.hasOwnProperty(nodeId)) {
              updateArray.push(allNodes[nodeId]);
            }
          }
          nodesDataset.update(updateArray);
	};
	var doSomething=function(arg1){
		// functionality of this function and can be called like //common.doSomething(arg1);
	};
	return{
		init:init,
		bindpageEvents:bindpageEvents,
        redrawAll:redrawAll,
		doSomething:doSomething
	}
})();

$(document).ready(function(){
	graphVisualization.init()
	});