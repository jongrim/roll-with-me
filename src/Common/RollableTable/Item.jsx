import * as React from 'react';
import { motion } from 'framer-motion';

export const useMeasurePosition = (update) => {
  // We'll use a `ref` to access the DOM element that the `motion.div` produces.
  // This will allow us to measure its width and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = React.useRef(null);

  // Update the measured position of the item so we can calculate when we should rearrange.
  React.useEffect(() => {
    update({
      height: ref.current.offsetHeight,
      width: ref.current.offsetWidth,
      left: ref.current.offsetLeft,
      top: ref.current.offsetTop,
    });
  });

  return ref;
};

export default function Item({ i, updatePosition, updateOrder, children }) {
  const [isDragging, setDragging] = React.useState(false);

  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  return (
    <motion.div
      ref={ref}
      layout
      initial={false}
      style={{
        zIndex: isDragging ? 3 : 1,
        width: '100%',
        listStyle: 'none',
      }}
      whileHover={{
        scale: 1.01,
      }}
      whileTap={{
        scale: 1.05,
      }}
      drag="y"
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onViewportBoxUpdate={(viewportBox, _) => {
        console.log(viewportBox.y.min);
        isDragging && updateOrder(i, viewportBox);
      }}
    >
      {children}
    </motion.div>
  );
}
