export default function () {
  figma.skipInvisibleInstanceChildren = true;
  const components = figma.root.findAllWithCriteria({ types: ["COMPONENT"] });
  figma.closePlugin("Hello, World!");
}
