import { WithChildren } from "@/types/commonPropTypes";
import { Tooltip, TooltipProps } from "antd";

type AppTooltipProps = WithChildren & TooltipProps;

const AppTooltip: React.FC<AppTooltipProps> = ({ children, ...props }) => {
    return (
        <Tooltip {...props} color="var(--theme)"
            overlayInnerStyle={{
                backgroundColor: "var(--theme)",
                color: "var(--theme-text)",
                fontSize: "12px",
            }}

        >
            <div>
                {children}
            </div>
        </Tooltip>
    );
};

export default AppTooltip;
