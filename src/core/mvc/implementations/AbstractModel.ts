import * as _ from "lodash";
import {IModel} from "../interfaces/IModel";

export abstract class AbstractModel implements IModel {
	/**
	 * @inheritDoc
	 */
	public isActive: boolean;
	public deltaTime: number;
	protected _width: number;
	protected _height: number;
	protected _htmlElement: HTMLElement;

	constructor() {
		this.init();
	}

	public abstract get htmlElementName(): string;

	public get width(): number {
		return this._width;
	}

	public get height(): number {
		return this._height;
	}

	public init(): void {
		this.isActive = false;
		this._htmlElement = document.getElementById(this.htmlElementName);
		if (!_.isNil(this._htmlElement)) {
			this._width = this._htmlElement.offsetWidth;
			this._height = this._htmlElement.offsetHeight;
		}
	}

	public onResize(width: number, height: number): void {
		this._width = width;
		this._height = height;
	}
}
