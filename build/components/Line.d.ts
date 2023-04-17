import React from 'react';
import { type Styles } from '../styles.js';
import { type DOMElement } from '../dom.js';
export type Props = Pick<Styles, 'position' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'borderStyle' | 'borderColor' | 'height' | 'width'> & {
    orientation?: 'horizontal' | 'vertical';
    /**
     * Margin on all sides. Equivalent to setting `marginTop`, `marginBottom`, `marginLeft` and `marginRight`.
     *
     * @default 0
     */
    readonly margin?: number;
    /**
     * Horizontal margin. Equivalent to setting `marginLeft` and `marginRight`.
     *
     * @default 0
     */
    readonly marginX?: number;
    /**
     * Vertical margin. Equivalent to setting `marginTop` and `marginBottom`.
     *
     * @default 0
     */
    readonly marginY?: number;
};
/**
 * Line renders a horizontal or vertical line with the given border style and color.
 */
declare const Line: React.ForwardRefExoticComponent<Pick<Styles, "position" | "marginLeft" | "marginRight" | "marginTop" | "marginBottom" | "width" | "height" | "borderStyle" | "borderColor"> & {
    orientation?: "vertical" | "horizontal" | undefined;
    /**
     * Margin on all sides. Equivalent to setting `marginTop`, `marginBottom`, `marginLeft` and `marginRight`.
     *
     * @default 0
     */
    readonly margin?: number | undefined;
    /**
     * Horizontal margin. Equivalent to setting `marginLeft` and `marginRight`.
     *
     * @default 0
     */
    readonly marginX?: number | undefined;
    /**
     * Vertical margin. Equivalent to setting `marginTop` and `marginBottom`.
     *
     * @default 0
     */
    readonly marginY?: number | undefined;
} & React.RefAttributes<DOMElement>>;
export default Line;
