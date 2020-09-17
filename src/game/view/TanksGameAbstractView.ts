// import {Container, Renderer} from "pixi.js";
import * as PIXI from "pixi.js";
import {Signal} from "signals";

class IBasePixiWidgetScene {
}

export class TanksGameAbstractView {
	public onAssetsAddedToStage: Signal;
	public onViewInited: Signal;
	private _renderer: PIXI.Renderer;
	private _display: PIXI.Container;
	private _width: number;
	private _height: number;
	private _scenes: { [id: string]: IBasePixiWidgetScene };
	private _background: PIXI.Container;
	private _content: PIXI.Container;

	constructor() {

	}

}
