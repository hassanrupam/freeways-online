import { WithChildren, WithClassName } from '@/types/commonPropTypes';
import { motion, MotionProps } from 'framer-motion';

type RootMotionProps = MotionProps & WithChildren & WithClassName;

const RootMotion: React.FC<RootMotionProps> = ({
  children,
  className,
  initial = { opacity: 0, scale: 0.95 },
  animate = { opacity: 1, scale: 1 },
  transition = {},
  ...rest
}) => {
  const baseTransition = {
    duration: 1,
    ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
  };

  const mergedTransition = {
    ...baseTransition,
    ...transition,
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={mergedTransition}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default RootMotion;
