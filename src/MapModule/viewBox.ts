export interface ViewBox {
  x: number;
  width: number;
  y: number;
  height: number;
  toString: () => string;
  zoomIn: () => ViewBox;
  zoomOut: () => ViewBox;
  panLeft: () => ViewBox;
  panRight: () => ViewBox;
  panDown: () => ViewBox;
  panUp: () => ViewBox;
  centerOnPoint: ({
    centerX,
    centerY,
    newWidth,
    newHeight,
  }: {
    centerX: number;
    centerY: number;
    newWidth?: number;
    newHeight?: number;
  }) => ViewBox;
}

export function makeViewBox({
  x,
  y,
  width,
  height,
}: {
  x: number;
  width: number;
  y: number;
  height: number;
}): ViewBox {
  return {
    x,
    width,
    y,
    height,
    toString: () => `${x} ${y} ${width} ${height}`,
    zoomIn: () => {
      const centerX = width / 2 + x;
      const centerY = height / 2 + y;
      const newWidth = width * 0.75;
      const newHeight = height * 0.75;
      return makeViewBox({
        x: centerX - newWidth / 2,
        width: newWidth,
        y: centerY - newHeight / 2,
        height: newHeight,
      });
    },
    zoomOut: () => {
      const centerX = width / 2 + x;
      const centerY = height / 2 + y;
      const newWidth = Math.round(width * 1.333333);
      const newHeight = Math.round(height * 1.333333);
      return makeViewBox({
        x: centerX - newWidth / 2,
        width: newWidth,
        y: centerY - newHeight / 2,
        height: newHeight,
      });
    },
    panLeft: () => makeViewBox({ x: x - width * 0.45, y, width, height }),
    panRight: () => makeViewBox({ x: x + width * 0.45, y, width, height }),
    panUp: () => makeViewBox({ x, y: y - height * 0.45, width, height }),
    panDown: () => makeViewBox({ x, y: y + height * 0.45, width, height }),
    centerOnPoint: ({
      centerX,
      centerY,
      newWidth = width,
      newHeight = height,
    }) =>
      makeViewBox({
        x: centerX - newWidth / 2,
        y: centerY - newHeight / 2,
        width: newWidth,
        height: newHeight,
      }),
  };
}
