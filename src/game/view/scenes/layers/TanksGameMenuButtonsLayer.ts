import {Loader} from "pixi.js";
import {Container, Sprite} from "pixi.js";
import {ETanksGameImgName} from "../../../enum/resources/ETanksGameImgName";
import {ILayer} from "../../../interfaces/ILayer";

export class TanksGameMenuButtonsLayer implements ILayer {

	public display: Container;
	private _startButton: Container;
	private _highScoreButton: Container;

	constructor() {
		this.display = new Container();
		this._startButton = new Container();
		this._startButton.name = "Start Button";
		this._highScoreButton = new Container();
		this._highScoreButton.name = "High score Button";
		this.display.name = "MenuButtonsLayer";
	}

	public dispose(): void {
		this.display.visible = false;
		this.display.removeChildren();
	}

	public onAssetsLoaded(): void {
		this.drawButtons();
		this.drawLayer();
	}

	protected drawLayer(): void {
		this.display.addChild(this._startButton, this._highScoreButton);
		console.log("TanksGameMenuButtonsLayer children: ", this.display.children);
	}

	private drawButtons(): void {
		const startBtn: Sprite = new Sprite(Loader.shared.resources[ETanksGameImgName.START_BUTTON].texture);
		startBtn.anchor.set(0.5);
		this._startButton.addChild(startBtn);
		this._startButton.interactive = true;
		this._startButton.buttonMode = true;
		this._startButton.position.set(0, -50);
		const highScoreBtn: Sprite = new Sprite(Loader.shared.resources[ETanksGameImgName.SCORES_BUTTON].texture);
		highScoreBtn.anchor.set(0.5);
		this._highScoreButton.addChild(highScoreBtn);
		this._highScoreButton.interactive = true;
		this._highScoreButton.buttonMode = true;
		this._highScoreButton.position.set(0, 100);
	}
}
