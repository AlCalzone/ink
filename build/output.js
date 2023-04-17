import sliceAnsi from 'slice-ansi';
import stringWidth from 'string-width';
import widestLine from 'widest-line';
import { styledCharsFromTokens, styledCharsToString, tokenize } from '@alcalzone/ansi-tokenize';
export default class Output {
    constructor(options) {
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "operations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        const { width, height } = options;
        this.width = width;
        this.height = height;
    }
    write(x, y, text, options) {
        const { transformers } = options;
        if (!text) {
            return;
        }
        this.operations.push({
            type: 'write',
            x,
            y,
            text,
            transformers
        });
    }
    clip(clip) {
        this.operations.push({
            type: 'clip',
            clip
        });
    }
    unclip() {
        this.operations.push({
            type: 'unclip'
        });
    }
    get() {
        // Initialize output array with a specific set of rows, so that margin/padding at the bottom is preserved
        const output = [];
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push({
                    type: 'char',
                    value: ' ',
                    fullWidth: false,
                    styles: []
                });
            }
            output.push(row);
        }
        const clips = [];
        for (const operation of this.operations) {
            if (operation.type === 'clip') {
                clips.push(operation.clip);
            }
            if (operation.type === 'unclip') {
                clips.pop();
            }
            if (operation.type === 'write') {
                const { text, transformers } = operation;
                let { x, y } = operation;
                let lines = text.split('\n');
                const clip = clips[clips.length - 1];
                if (clip) {
                    const clipHorizontally = typeof clip?.x1 === 'number' && typeof clip?.x2 === 'number';
                    const clipVertically = typeof clip?.y1 === 'number' && typeof clip?.y2 === 'number';
                    // If text is positioned outside of clipping area altogether,
                    // skip to the next operation to avoid unnecessary calculations
                    if (clipHorizontally) {
                        const width = widestLine(text);
                        if (x + width < clip.x1 || x > clip.x2) {
                            continue;
                        }
                    }
                    if (clipVertically) {
                        const height = lines.length;
                        if (y + height < clip.y1 || y > clip.y2) {
                            continue;
                        }
                    }
                    if (clipHorizontally) {
                        lines = lines.map(line => {
                            const from = x < clip.x1 ? clip.x1 - x : 0;
                            const width = stringWidth(line);
                            const to = x + width > clip.x2 ? clip.x2 - x : width;
                            return sliceAnsi(line, from, to);
                        });
                        if (x < clip.x1) {
                            x = clip.x1;
                        }
                    }
                    if (clipVertically) {
                        const from = y < clip.y1 ? clip.y1 - y : 0;
                        const height = lines.length;
                        const to = y + height > clip.y2 ? clip.y2 - y : height;
                        lines = lines.slice(from, to);
                        if (y < clip.y1) {
                            y = clip.y1;
                        }
                    }
                }
                let offsetY = 0;
                for (let line of lines) {
                    const currentLine = output[y + offsetY];
                    // Line can be missing if `text` is taller than height of pre-initialized `this.output`
                    if (!currentLine)
                        continue;
                    for (const transformer of transformers) {
                        line = transformer(line);
                    }
                    const chars = styledCharsFromTokens(tokenize(line));
                    let offsetX = x;
                    for (const char of chars) {
                        if (offsetX >= this.width)
                            break;
                        currentLine[offsetX] = char;
                        // Some characters take up more than one column. In that case, the following
                        // pixels need to be cleared to avoid printing extra characters
                        const isWideChar = char.fullWidth || char.value.length > 1;
                        if (isWideChar) {
                            if (offsetX + 1 >= this.width)
                                break;
                            currentLine[offsetX + 1] = {
                                type: 'char',
                                value: '',
                                fullWidth: false,
                                styles: char.styles
                            };
                        }
                        offsetX += isWideChar ? 2 : 1;
                    }
                    offsetY++;
                }
            }
        }
        const generatedOutput = output
            .map(line => styledCharsToString(line).trimEnd())
            .join('\n');
        return {
            output: generatedOutput,
            height: output.length
        };
    }
}
//# sourceMappingURL=output.js.map