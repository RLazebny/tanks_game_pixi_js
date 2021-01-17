import {Loader} from "pixi.js";
import {Sprite} from "pixi.js";
import {ETanksGameLayerName} from "../../../enum/ETanksGameLayerName";
import {ETanksGameImgName} from "../../../enum/resources/ETanksGameImgName";
import {TanksGameBaseLayer} from "./TanksGameBaseLayer";

export class TanksGameLoaderBarLayer extends TanksGameBaseLayer {

	constructor() {
		super();
		this.display.name = ETanksGameLayerName.LOADER_BAR_LAYER;
	}

	public onAssetsLoaded(): void {
		this.drawLayer();
	}

	protected drawLayer(): void {
		const bg: Sprite = new Sprite(Loader.shared.resources[ETanksGameImgName.LOADER_BG].texture);
		const progressBar: Sprite = new Sprite(Loader.shared.resources[ETanksGameImgName.LOADER_BAR].texture);
		bg.anchor.set(0.5);
		progressBar.anchor.set(0.5);
		progressBar.scale.set(0.95);
		this.display.addChildAt(progressBar, 0);
		this.display.addChildAt(bg, 0);
		console.log("TanksGameLoaderBarLayer children: ", this.display.children);
	}
}
