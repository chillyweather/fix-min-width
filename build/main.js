var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default,
  findMinSizeElement: () => findMinSizeElement
});
function main_default() {
  figma.skipInvisibleInstanceChildren = true;
  const selection = figma.currentPage.selection;
  const isSelected = selection.length > 0;
  const components = isSelected ? (
    //@ts-ignore
    selection[0].findAllWithCriteria({ types: ["COMPONENT"] })
  ) : figma.root.findAllWithCriteria({ types: ["COMPONENT"] });
  components.forEach((component) => {
    const minSizeElement = findMinSizeElement(component);
    if (!minSizeElement)
      return;
    if (component.counterAxisSizingMode === "AUTO") {
      component.minWidth = minSizeElement.width + component.paddingLeft + component.paddingRight;
    }
    minSizeElement.remove();
  });
  figma.closePlugin("Min.size emelents removed");
}
function findMinSizeElement(node) {
  const content = node.findChild(
    (node2) => node2.name.toLowerCase() === "content"
  );
  if (content && content.type === "FRAME") {
    const minSizeElement2 = content.findChild(
      (element) => isMinSize(element.name)
    );
    if (minSizeElement2) {
      return minSizeElement2;
    }
  }
  const minSizeElement = node.findChild((child) => isMinSize(child.name));
  return minSizeElement ? minSizeElement : null;
}
function isMinSize(string) {
  const lowerCaseString = string.toLowerCase();
  return lowerCaseString.includes("min") && (lowerCaseString.includes("size") || lowerCaseString.includes("width"));
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
