import {IDisposable} from "./IDisposable";

export interface IView extends IDisposable {
	/**
	 * Resize current application view
	 * @param w app canvas width
	 * @param h app canvas height
	 */
	resize(w: number, h: number): void;

	/**
	 * Redraw application view, it is executed 60 times per second
	 */
	onEnterFrameRedraw(deltaTime: number): void;

	/**
	 * Set enabled application view
	 * @param value
	 */
	setEnabled(value: boolean): void;

	/***
	 * Resize wrapper's container element
	 * @param w container width
	 * @param h container height
	 */
	resizeContainer?(w: number, h: number): void;
}
