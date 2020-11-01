import {Application, Container, IResourceDictionary, Sprite, Text} from "pixi.js";
import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {IScene} from "../../interfaces/IScene";
import TextStyle = PIXI.TextStyle;

export class TanksGameBootScene implements IScene {
	public display: Container;
	public layers: [];
	public name: string;

	constructor() {
		this.name = ETanksGameScenesName.BOOT;
		this.display = new Container();
		this.display.visible = false;
		this.display.name = "TanksGameBootScene";
		this.layers = [];

		const style = new TextStyle({
		  fontFamily: "Arial",
		  fontSize: 36,
		  fontStyle: "italic",
		  fontWeight: "bold",
		  fill: ["#ffffff"],
		  wordWrap: true,
		  wordWrapWidth: 440
		});
		const loadingText: Text = new Text("loading...", style);
		loadingText.anchor.set(0.5);
		this.display.addChild(loadingText);
	}

	public onAssetsLoaded(): void {
		// implement
	}

	public dispose(): void {
		this.display.removeChildren();
		this.layers.length = 0;
	}
}
