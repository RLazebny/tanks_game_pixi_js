import {Ticker} from "pixi.js";
import {AbstractContext} from "../core/mvc/implementations/AbstractContext";
import {IController} from "../core/mvc/interfaces/IController";
import {TFunctionMap} from "../core/mvc/type/TFunctionMap";
import {TanksGameController} from "./controller/TanksGameController";
import {ITanksGameController} from "./interfaces/ITanksGameController";
import {ITanksGameModel} from "./interfaces/ITanksGameModel";
import {ITanksGameView} from "./interfaces/ITanksGameView";
import {TanksGameModel} from "./model/TanksGameModel";
import {TanksGameView} from "./view/TanksGameView";

export class TanksGameContext<IM extends ITanksGameModel = ITanksGameModel,
	IV extends ITanksGameView = ITanksGameView,
	IC extends IController = IController> extends AbstractContext<IM, IV, IC> {

	protected _controller: ITanksGameController;
	protected _view: ITanksGameView;
	protected _model: ITanksGameModel;
	private _ticker: Ticker;

	constructor() {
		super();
		this.createController();
		this.createModel();
		this.createView();
		this.registerCommands();
		this.registerEventListeners();
	}

	public addEventListeners(): void {

	}

	protected createModel(): void {
		this._model = new TanksGameModel();
	}

	protected createView(): void {
		this._view = new TanksGameView(this._model.width, this._model.height);
	}

	// public get getModel(): TanksGameModel {
	// 	return this._model;
	// };
	//
	// public get getView(): TanksGameView {
	// 	return this._view;
	// };

	protected createController(): void {
		this._controller = new TanksGameController(this);
	}

	protected registerCommands(replacementMap?: TFunctionMap): void {
		// Register core commands
		this.registerCoreCommands(replacementMap);
	}
}
