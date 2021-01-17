import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import {Ticker} from "pixi.js";
import {State} from "../state_machine/State";
import {TanksGameAddBulletToSceneCommand} from "./controller/commands/TanksGameAddBulletToSceneCommand";
import {TanksGameAddUIEventListenersCommand} from "./controller/commands/TanksGameAddUIEventListenersCommand";
import {TanksGameDrawStartScreenCommand} from "./controller/commands/TanksGameDrawStartScreenCommand";
import {TanksGameLoadBootSceneResourcesCommand} from "./controller/commands/TanksGameLoadBootSceneResourcesCommand";
import {TanksGameLoadImgesCommand} from "./controller/commands/TanksGameLoadImgesCommand";
import {TanksGameLoadSoundsCommand} from "./controller/commands/TanksGameLoadSoundsCommand";
import {TanksGameUpdateFrameCommand} from "./controller/commands/TanksGameUpdateFrameCommand";
import {TanksGameUpdateSceneCommand} from "./controller/commands/TanksGameUpdateSceneCommand";
import {TanksGameController} from "./controller/TanksGameController";
import {ETanksGameCommandName} from "./enum/ETanksGameCommandName";
import {ETanksGameScenesName} from "./enum/ETanksGameScenesName";
import {ETanksGameResourceGroupName} from "./enum/resources/ETanksGameResourceGroupName";
import {ITanksGameController} from "./interfaces/ITanksGameController";
import {ITanksGameModel} from "./interfaces/ITanksGameModel";
import {ITanksGameView} from "./interfaces/ITanksGameView";
import {TanksGameModel} from "./model/TanksGameModel";
import {TanksGameView} from "./view/TanksGameView";

export class TanksGameContext {

	protected _controller: ITanksGameController;
	protected _view: ITanksGameView;
	protected _model: ITanksGameModel;
	protected _ticker: Ticker;

	public get getModel(): TanksGameModel {
		return this._model;
	}

	public get getView(): TanksGameView {
		return this._view;
	}

	constructor() {
		this.createController();
		this.createModel();
		this.createView();
		this.registerCommands();
		this.registerEventListeners();
		this.loadBootSceneResources();
		this.registerStates();
		this.createTicker();
	}

	public registerEventListeners(): void {
		this._model.loader.onAssetsLoaded.add((alias: string) => {
			if (alias === ETanksGameResourceGroupName.LOADER_BAR) {
				this._controller.executeCommand(ETanksGameCommandName.LOAD_IMG);
				// this._controller.executeCommand(ETanksGameCommandName.LOAD_SOUNDS);
			} else if (alias === ETanksGameResourceGroupName.IMG) {
				this._view.onAssetsLoaded();
				this._controller.executeCommand(ETanksGameCommandName.ADD_MENU_UI_LISTENERS);
				this._model.stateMachine.changeState(ETanksGameScenesName.MENU);
			}
		});
		this._model.loader.onLoaderInProgress.add((progress: number) => {
			this._model._progressPercentage = progress;
		});
		this._model.stateMachine.onStateChanged.add(() => {
			this._controller.executeCommand(ETanksGameCommandName.UPDATE_SCENE);
		});
		this._model.onTankFired.add(() => {
			this._controller.executeCommand(ETanksGameCommandName.ADD_BULLET_TO_SCENE);
		});
	}
	
	public enterFrameUpdate(deltaTime: number): void {
		this._model.deltaTime = deltaTime;
		this._model.timeCounter++;
		this._controller.executeCommand(ETanksGameCommandName.FRAME_UPDATE);
	}

	protected createModel(): void {
		this._model = new TanksGameModel();
	}

	protected createView(): void {
		this._view = new TanksGameView(this._model.width, this._model.height);
	}

	protected createTicker(): void {
		this._ticker = Ticker.shared;
		this._ticker.add(this.enterFrameUpdate, this, PIXI.UPDATE_PRIORITY.LOW);
		this._ticker.start();
	}

	protected createController(): void {
		this._controller = new TanksGameController(this);
	}

	protected registerCommands(): void {
		this._controller.registerCommand(ETanksGameCommandName.LOAD_BOOT_RESOURCES, TanksGameLoadBootSceneResourcesCommand);
		this._controller.registerCommand(ETanksGameCommandName.LOAD_IMG, TanksGameLoadImgesCommand);
		this._controller.registerCommand(ETanksGameCommandName.LOAD_SOUNDS, TanksGameLoadSoundsCommand);
		this._controller.registerCommand(ETanksGameCommandName.DRAW_START_SCREEN, TanksGameDrawStartScreenCommand);
		this._controller.registerCommand(ETanksGameCommandName.UPDATE_SCENE, TanksGameUpdateSceneCommand);
		this._controller.registerCommand(ETanksGameCommandName.ADD_MENU_UI_LISTENERS, TanksGameAddUIEventListenersCommand);
		this._controller.registerCommand(ETanksGameCommandName.FRAME_UPDATE, TanksGameUpdateFrameCommand);
		this._controller.registerCommand(ETanksGameCommandName.ADD_BULLET_TO_SCENE, TanksGameAddBulletToSceneCommand);
	}

	private registerStates(): void {
		this._model.stateMachine.addState(new State(ETanksGameScenesName.BOOT));
		this._model.stateMachine.addState(new State(ETanksGameScenesName.MENU));
		this._model.stateMachine.addState(new State(ETanksGameScenesName.GAME));
		this._model.stateMachine.initialState = ETanksGameScenesName.BOOT;
	}

	private loadBootSceneResources(): void {
		this._controller.executeCommand(ETanksGameCommandName.LOAD_BOOT_RESOURCES);
	}
}

const tanksGameContext = new TanksGameContext();
