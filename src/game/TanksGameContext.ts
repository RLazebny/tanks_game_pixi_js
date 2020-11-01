// @ts-ignore
import {Ticker} from "pixi.js";
import {TanksGameDrawStartScreen} from "./controller/commands/TanksGameDrawStartScreen";
import {TanksGameLoadResources} from "./controller/commands/TanksGameLoadResources";
import {TanksGameController} from "./controller/TanksGameController";
import {ETanksGameCommandName} from "./enum/ETanksGameCommandName";
import {ITanksGameController} from "./interfaces/ITanksGameController";
import {ITanksGameModel} from "./interfaces/ITanksGameModel";
import {ITanksGameView} from "./interfaces/ITanksGameView";
import {TanksGameModel} from "./model/TanksGameModel";
import {TanksGameView} from "./view/TanksGameView";

export class TanksGameContext {

	protected _controller: ITanksGameController;
	protected _view: ITanksGameView;
	protected _model: ITanksGameModel;
	private _ticker: Ticker;

	constructor() {
		this.createModel();
		this.createView();
		this.createController();
		this.registerCommands();
		this.registerEventListeners();
		this.run();
	}

	public registerEventListeners(): void {
		this._model.onResourcesLoad.add(() => {
				this._controller.executeCommand(ETanksGameCommandName.DRAW_START_SCREEN);
		});
	}

	protected createModel(): void {
		this._model = new TanksGameModel();
	}

	protected createView(): void {
		this._view = new TanksGameView(this._model.width, this._model.height);
	}

	public get getModel(): TanksGameModel {
		return this._model;
	}

	public get getView(): TanksGameView {
		return this._view;
	}

	protected createController(): void {
		this._controller = new TanksGameController(this);
	}

	protected registerCommands(): void {
		this._controller.registerCommand(ETanksGameCommandName.LOAD_RESOURCES, TanksGameLoadResources);
		this._controller.registerCommand(ETanksGameCommandName.DRAW_START_SCREEN, TanksGameDrawStartScreen);
	}

	private run(): void {
		this._controller.executeCommand(ETanksGameCommandName.LOAD_RESOURCES);
	}
}

const tanksGameContext = new TanksGameContext();
