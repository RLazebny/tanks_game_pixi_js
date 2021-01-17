import * as PIXI from "pixi.js";
import {ETanksGameLayerName} from "../../enum/ETanksGameLayerName";
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
			ETanksGameLayerName.TEXTURE_LAYER,
			new TanksGameTextureLayer()
		);
		this.addLayer(
			ETanksGameLayerName.TANKS_LAYER,
			new TanksGameTanksLayer()
		);
	}

	private addLayer(name: string, layer: ILayer): void {
		this.layers.push({ name: name, layer: layer});
		this.display.addChild(layer.display);
	}
}
