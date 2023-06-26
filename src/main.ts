export default function () {
  figma.skipInvisibleInstanceChildren = true;
  const selection = figma.currentPage.selection;
  const isSelected = selection.length > 0;
  const components = isSelected
    ? //@ts-ignore
      selection[0].findAllWithCriteria({ types: ["COMPONENT"] })
    : figma.root.findAllWithCriteria({ types: ["COMPONENT"] });
  components.forEach((component: any) => {
    const minSizeElement = findMinSizeElement(component);
    if (!minSizeElement) return;
    if (component.counterAxisSizingMode === "AUTO") {
      //@ts-ignore
      component.minWidth =
        minSizeElement.width + component.paddingLeft + component.paddingRight;
    }
    minSizeElement.remove();
  });

  figma.closePlugin("Min.size emelents removed");
}

export function findMinSizeElement(node: ComponentNode) {
  const content = node.findChild(
    (node) => node.name.toLowerCase() === "content"
  );
  if (content && content.type === "FRAME") {
    const minSizeElement = content.findChild((element) =>
      isMinSize(element.name)
    );
    if (minSizeElement) {
      return minSizeElement;
    }
  }
  const minSizeElement = node.findChild((child) => isMinSize(child.name));
  return minSizeElement ? minSizeElement : null;
}

function isMinSize(string: string) {
  const lowerCaseString = string.toLowerCase();
  return (
    lowerCaseString.includes("min") &&
    (lowerCaseString.includes("size") || lowerCaseString.includes("width"))
  );
}
