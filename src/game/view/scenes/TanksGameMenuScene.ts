import * as PIXI from "pixi.js";
import {Text, TextStyle} from "pixi.js";
import {ETanksGameLayerName} from "../../enum/ETanksGameLayerName";
import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {ILayer} from "../../interfaces/ILayer";
import {TanksGameMenuButtonsLayer} from "./layers/TanksGameMenuButtonsLayer";
import {TanksGameBaseScene} from "./TanksGameBaseScene";

export class TanksGameMenuScene extends TanksGameBaseScene {

	constructor() {
		super();
		this.name = ETanksGameScenesName.MENU;
		this.display.name = "[Menu Scene]";
		this.initLayers();

		const style = new TextStyle({
		  fontFamily: "Times new Roman",
		  fontSize: 56,
		  fill: "#fff",
		  wordWrap: true,
		  wordWrapWidth: 440
		});
		const loadingText: Text = new Text("Tank Game", style);
		loadingText.anchor.set(0.5);
		loadingText.position.y = -200;
		this.display.addChild(loadingText);
	}

	private initLayers(): void {
		this.addLayer(
			ETanksGameLayerName.MENU_BUTTONS_LAYER,
			new TanksGameMenuButtonsLayer()
		);
	}

	private addLayer(name: string, layer: ILayer): void {
		this.layers.push({ name: name, layer: layer});
		this.display.addChild(layer.display);
	}
}
