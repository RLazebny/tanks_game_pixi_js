import {Loader} from "pixi.js";
import {Sprite} from "pixi.js";
import {ETanksGameCommonName} from "../../../enum/ETanksGameCommonName";
import {ETanksGameLayerName} from "../../../enum/ETanksGameLayerName";
import {ETanksGameImgName} from "../../../enum/resources/ETanksGameImgName";
import {TanksGameBaseLayer} from "./TanksGameBaseLayer";

export class TanksGameMenuButtonsLayer extends TanksGameBaseLayer {

	public startButton: Sprite;
	public highScoreButton: Sprite;

	constructor() {
		super();
		this.display.name = ETanksGameLayerName.MENU_BUTTONS_LAYER;
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
		this.display.addChild(this.startButton, this.highScoreButton);
		console.log("TanksGameMenuButtonsLayer children: ", this.display.children);
	}

	private drawButtons(): void {
		this.startButton = new Sprite(Loader.shared.resources[ETanksGameImgName.START_BUTTON].texture);
		this.startButton.name = ETanksGameCommonName.START_BUTTON;
		this.startButton.anchor.set(0.5);
		this.startButton.interactive = true;
		this.startButton.buttonMode = true;
		this.startButton.position.set(0, -50);
		this.highScoreButton = new Sprite(Loader.shared.resources[ETanksGameImgName.SCORES_BUTTON].texture);
		this.highScoreButton.name = ETanksGameCommonName.HIGH_SCORE_BUTTON;
		this.highScoreButton.anchor.set(0.5);
		this.highScoreButton.interactive = true;
		this.highScoreButton.buttonMode = true;
		this.highScoreButton.position.set(0, 100);
	}
}
