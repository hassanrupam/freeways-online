import { WithChildren, WithClassName } from "@/types/commonPropTypes";
import RootMotion from "./RootMotion";

type FlyInMotionProps = WithChildren & WithClassName &{
    /**
     * Initial position of the fly in animation
     * @default {x:0,y:-10}
     */
    initialStart?: InitialFlyInPosition;
    /**
     * Delay before the animation starts
     * @default 0
     */
    delay?: number;
}

type InitialFlyInPosition = {
    /**
     * Initial x position of the fly in animation
     * @default 0
     */
    x?: number;
    /**
     * Initial y position of the fly in animation
     * @default -10
     */
    y?: number;
}

/**
 * FlyInMotion component that animates its children from a specified initial position to the center of the screen.
 * @param {FlyInMotionProps} props - The props for the FlyInMotion component.
 * @returns {JSX.Element} The animated component.
 */
const FlyInMotion: React.FC<FlyInMotionProps> = ({ children, className,initialStart = {x:0,y:-10},delay=0 }) => {
    return (
        <RootMotion
            className={className}
            initial={{ opacity: 0, y: initialStart.y, x:initialStart.x }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{duration:0.8,delay:delay}}
        >
            {children}
        </RootMotion>
    );
};

export default FlyInMotion;
