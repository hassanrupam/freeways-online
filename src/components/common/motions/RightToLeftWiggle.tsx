import { WithChildren, WithClassName } from "@/types/commonPropTypes";
import RootMotion from "./RootMotion";

type RightToLeftWiggleProps = WithChildren & WithClassName;

const RightToLeftWiggle: React.FC<RightToLeftWiggleProps> = ({ children,className }) => {
    return (
        <RootMotion
            className={className}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: [50, -30, 30, -10, 10, -3, 3, 0] }}
            transition={{ delay: 0.6 }}
        >
            {children}
        </RootMotion>
    );
};

export default RightToLeftWiggle;
