import { WithChildren, WithClassName } from "@/types/commonPropTypes";
import RootMotion from "./RootMotion";

type ScaleMotionProps = WithChildren & WithClassName & {
    /**
     * Initial scale of the animation
     * @default 0.5
     */
    initialScale?: number;
    /**
     * Delay before the animation starts
     * @default 0
     */
    delay?: number;
}

/**
 * ScaleMotion component that animates its children from a specified initial scale to the final scale.
 * @param {ScaleMotionProps} props - The props for the ScaleMotion component.
 * @returns {JSX.Element} The animated component.
 */
const ScaleMotion: React.FC<ScaleMotionProps> = ({ children,className, initialScale = 0.5,delay=0 }) => {
    return (
        <RootMotion
            className={className}
            initial={{ opacity: 0, scale: initialScale }}
            animate={{ opacity: 1, scale:[initialScale,1.1,1] }}
            transition={{
                duration: 1,
                delay:delay,
                stiffness: 260,
                damping: 20}}
        >
            {children}
        </RootMotion>
    );
};

export default ScaleMotion;
