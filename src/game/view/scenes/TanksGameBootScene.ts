import * as PIXI from "pixi.js";
import {Text} from "pixi.js";
import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {ETanksGameImgName} from "../../enum/resources/ETanksGameImgName";
import {ILayer} from "../../interfaces/ILayer";
import {TanksGameLoaderBarLayer} from "./layers/TanksGameLoaderBarLayer";
import {TanksGameBaseScene} from "./TanksGameBaseScene";
import TextStyle = PIXI.TextStyle;

export class TanksGameBootScene extends TanksGameBaseScene {

	constructor() {
		super();
		this.name = ETanksGameScenesName.BOOT;
		this.display.name = "[Boot Scene]";
		this.initLayers();

		const style = new TextStyle({
		  fontFamily: "Arial",
		  fontSize: 66,
		  fontWeight: "bold",
		  fill: ["#fff"],
		  wordWrap: true,
		  wordWrapWidth: 440
		});

		const loadingText: Text = new Text("Loading...", style);
		loadingText.anchor.set(0.5);
		loadingText.position.set(loadingText.position.x, loadingText.position.y - 120);
		this.display.addChild(loadingText);
	}

	private initLayers(): void {
		this.addLayer(
			ETanksGameImgName.LOADER_BAR,
			new TanksGameLoaderBarLayer()
		);
	}

	private addLayer(name: string, layer: ILayer): void {
		this.layers.push({ name: name, layer: layer});
		this.display.addChild(layer.display);
	}
}
