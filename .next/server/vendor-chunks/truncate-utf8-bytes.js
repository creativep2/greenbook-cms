"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/truncate-utf8-bytes";
exports.ids = ["vendor-chunks/truncate-utf8-bytes"];
exports.modules = {

/***/ "(rsc)/./node_modules/truncate-utf8-bytes/index.js":
/*!***************************************************!*\
  !*** ./node_modules/truncate-utf8-bytes/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar truncate = __webpack_require__(/*! ./lib/truncate */ \"(rsc)/./node_modules/truncate-utf8-bytes/lib/truncate.js\");\nvar getLength = Buffer.byteLength.bind(Buffer);\nmodule.exports = truncate.bind(null, getLength);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdHJ1bmNhdGUtdXRmOC1ieXRlcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsZ0ZBQWdCO0FBQ3ZDO0FBQ0EiLCJzb3VyY2VzIjpbIkQ6XFxHaXRodWJcXGdyZWVuYm9vay1jbXNcXG5vZGVfbW9kdWxlc1xcdHJ1bmNhdGUtdXRmOC1ieXRlc1xcaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJ1bmNhdGUgPSByZXF1aXJlKFwiLi9saWIvdHJ1bmNhdGVcIik7XG52YXIgZ2V0TGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGguYmluZChCdWZmZXIpO1xubW9kdWxlLmV4cG9ydHMgPSB0cnVuY2F0ZS5iaW5kKG51bGwsIGdldExlbmd0aCk7XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/truncate-utf8-bytes/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/truncate-utf8-bytes/lib/truncate.js":
/*!**********************************************************!*\
  !*** ./node_modules/truncate-utf8-bytes/lib/truncate.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("\n\nfunction isHighSurrogate(codePoint) {\n  return codePoint >= 0xd800 && codePoint <= 0xdbff;\n}\n\nfunction isLowSurrogate(codePoint) {\n  return codePoint >= 0xdc00 && codePoint <= 0xdfff;\n}\n\n// Truncate string by size in bytes\nmodule.exports = function truncate(getLength, string, byteLength) {\n  if (typeof string !== \"string\") {\n    throw new Error(\"Input must be string\");\n  }\n\n  var charLength = string.length;\n  var curByteLength = 0;\n  var codePoint;\n  var segment;\n\n  for (var i = 0; i < charLength; i += 1) {\n    codePoint = string.charCodeAt(i);\n    segment = string[i];\n\n    if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {\n      i += 1;\n      segment += string[i];\n    }\n\n    curByteLength += getLength(segment);\n\n    if (curByteLength === byteLength) {\n      return string.slice(0, i + 1);\n    }\n    else if (curByteLength > byteLength) {\n      return string.slice(0, i - segment.length + 1);\n    }\n  }\n\n  return string;\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdHJ1bmNhdGUtdXRmOC1ieXRlcy9saWIvdHJ1bmNhdGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJEOlxcR2l0aHViXFxncmVlbmJvb2stY21zXFxub2RlX21vZHVsZXNcXHRydW5jYXRlLXV0ZjgtYnl0ZXNcXGxpYlxcdHJ1bmNhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc0hpZ2hTdXJyb2dhdGUoY29kZVBvaW50KSB7XG4gIHJldHVybiBjb2RlUG9pbnQgPj0gMHhkODAwICYmIGNvZGVQb2ludCA8PSAweGRiZmY7XG59XG5cbmZ1bmN0aW9uIGlzTG93U3Vycm9nYXRlKGNvZGVQb2ludCkge1xuICByZXR1cm4gY29kZVBvaW50ID49IDB4ZGMwMCAmJiBjb2RlUG9pbnQgPD0gMHhkZmZmO1xufVxuXG4vLyBUcnVuY2F0ZSBzdHJpbmcgYnkgc2l6ZSBpbiBieXRlc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cnVuY2F0ZShnZXRMZW5ndGgsIHN0cmluZywgYnl0ZUxlbmd0aCkge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIklucHV0IG11c3QgYmUgc3RyaW5nXCIpO1xuICB9XG5cbiAgdmFyIGNoYXJMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICB2YXIgY3VyQnl0ZUxlbmd0aCA9IDA7XG4gIHZhciBjb2RlUG9pbnQ7XG4gIHZhciBzZWdtZW50O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhckxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgc2VnbWVudCA9IHN0cmluZ1tpXTtcblxuICAgIGlmIChpc0hpZ2hTdXJyb2dhdGUoY29kZVBvaW50KSAmJiBpc0xvd1N1cnJvZ2F0ZShzdHJpbmcuY2hhckNvZGVBdChpICsgMSkpKSB7XG4gICAgICBpICs9IDE7XG4gICAgICBzZWdtZW50ICs9IHN0cmluZ1tpXTtcbiAgICB9XG5cbiAgICBjdXJCeXRlTGVuZ3RoICs9IGdldExlbmd0aChzZWdtZW50KTtcblxuICAgIGlmIChjdXJCeXRlTGVuZ3RoID09PSBieXRlTGVuZ3RoKSB7XG4gICAgICByZXR1cm4gc3RyaW5nLnNsaWNlKDAsIGkgKyAxKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VyQnl0ZUxlbmd0aCA+IGJ5dGVMZW5ndGgpIHtcbiAgICAgIHJldHVybiBzdHJpbmcuc2xpY2UoMCwgaSAtIHNlZ21lbnQubGVuZ3RoICsgMSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cmluZztcbn07XG5cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/truncate-utf8-bytes/lib/truncate.js\n");

/***/ })

};
;