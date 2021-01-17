import {each, find} from "lodash";
import {Container} from "pixi.js";
import {ETanksGameCommonName} from "../../enum/ETanksGameCommonName";
import {IScene} from "../../interfaces/IScene";
import {TTanksGameLayer} from "../../type/TTanksGameLayer";
import Graphics = PIXI.Graphics;

export class TanksGameBaseScene implements IScene {
	public display: Container;
	public layers: Array<TTanksGameLayer>;
	public name: string;

	constructor() {
		this.display = new Container();
		this.display.visible = false;
		this.layers = [];
		this.display.addChild(this.createBg());
	}

	public onAssetsLoaded(): void {
		each(this.layers, (e: TTanksGameLayer) => {
			e.layer.onAssetsLoaded();
		});
	}

	// todo: remove 'any'
	public getLayer(name: string): any {
		return find(this.layers, (layer: TTanksGameLayer) => {
			return layer.name === name;
		});
	}

	public dispose(): void {
		this.display.removeChildren();
		this.layers.length = 0;
	}

	private createBg(): Container {
		const bg = new Graphics();
		bg.beginFill(0x0C1621);
		bg.drawRect(-512, -384, 1024, 768);
		bg.endFill();
		bg.name = ETanksGameCommonName.BACKGROUND;
		return bg;
	}
}
