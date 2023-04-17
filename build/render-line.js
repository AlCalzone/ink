import cliBoxes from 'cli-boxes';
import colorize from './colorize.js';
const renderLine = (x, y, node, output) => {
    if (typeof node.style.borderStyle === 'string') {
        const width = Math.max(1, node.yogaNode.getComputedWidth());
        const height = Math.max(1, node.yogaNode.getComputedHeight());
        const color = node.style.borderColor;
        const box = cliBoxes[node.style.borderStyle];
        const border = node.attributes.orientation === 'vertical'
            ? // Vertical line
                (colorize(box.left, color, 'foreground') + '\n').repeat(height)
            : // Horizontal line
                colorize(box.top.repeat(width), color, 'foreground');
        output.write(x, y, border, { transformers: [] });
    }
};
export default renderLine;
//# sourceMappingURL=render-line.js.map