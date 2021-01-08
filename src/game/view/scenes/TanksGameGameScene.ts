import * as PIXI from "pixi.js";
import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {ILayer} from "../../interfaces/ILayer";
import {TanksGameTanksLayer} from "./layers/TanksGameTanksLayer";
import {TanksGameTextureLayer} from "./layers/TanksGameTextureLayer";
import {TanksGameBaseScene} from "./TanksGameBaseScene";

export class TanksGameGameScene extends TanksGameBaseScene {

	constructor() {
		super();
		this.name = ETanksGameScenesName.GAME;
		this.display.name = "[Game Scene]";
		this.initLayers();
	}

	private initLayers(): void {
		this.addLayer(
			"Textures layer",
			new TanksGameTextureLayer()
		);
		this.addLayer(
			"Tanks layer",
			new TanksGameTanksLayer()
		);
	}

	private addLayer(name: string, layer: ILayer): void {
		this.layers.push({ name: name, layer: layer});
		this.display.addChild(layer.display);
	}
}
