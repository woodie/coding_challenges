#!/usr/bin/env node

"use strict";

var board = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]];

function coordinates_naive(img) {
  var x, y, w, h;
  for (var r = 0; r < img.length; r++) {
    var row = img[r];
    for (var c = 0; c < row.length; c++) {
      var pix = row[c];
      if (pix === 1) {
        if (typeof x === "undefined") {
          x = c;
        }  
        if (typeof y === "undefined") {
          y = r;
        }
        w = c - x + 1;
        h = r - y + 1;
      }
    }
  }
  return {x:x, y:y, w:w, h:h}
}

function coordinates_smart(img) {
  for (var r = 0; r < img.length; r++) {
    var row = img[r];
    if (row.indexOf(1) !== -1) {
      for (var c = 0; c < row.length; c++) {
        var pix = row[c];
        if (pix === 1) {
          var x = c;
          var y = r;
          var w = row.lastIndexOf(1) - x + 1;
          for (var z = y; z < img.length + 1; z++) { 
            if (z === img.length || (img[z].indexOf(1) == -1)) {
              var h = z - r;
              return {x:x, y:y, w:w, h:h};
            }
          }
        }
      }
    }
  }
  return null;
}

console.log(coordinates_naive(board));
console.log(coordinates_smart(board));
