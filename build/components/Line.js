/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
/**
 * Line renders a horizontal or vertical line with the given border style and color.
 */
const Line = forwardRef(({ orientation, ...style }, ref) => {
    const transformedStyle = {
        ...style,
        marginLeft: style.marginLeft || style.marginX || style.margin || 0,
        marginRight: style.marginRight || style.marginX || style.margin || 0,
        marginTop: style.marginTop || style.marginY || style.margin || 0,
        marginBottom: style.marginBottom || style.marginY || style.margin || 0,
        width: orientation === 'horizontal' ? style.width : 1,
        height: orientation === 'vertical' ? style.height : 1
    };
    return (React.createElement("ink-line", { ref: ref, orientation: orientation, style: transformedStyle }));
});
Line.displayName = 'Line';
Line.defaultProps = {
    orientation: 'horizontal'
};
export default Line;
//# sourceMappingURL=Line.js.map