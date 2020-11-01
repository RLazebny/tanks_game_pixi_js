import {Container, Text} from "pixi.js";
import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {IScene} from "../../interfaces/IScene";
import TextStyle = PIXI.TextStyle;

export class TanksGameMenuScene implements IScene {
	public display: Container;
	public layers: [];
	public name: string;

	constructor() {
		this.name = ETanksGameScenesName.MENU;
		this.display = new Container();
		this.display.visible = false;
		this.display.name = "TanksGameMenuScene";
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
		const loadingText: Text = new Text("Tanks Game", style);
		loadingText.anchor.set(0.5);
		this.display.addChild(loadingText);
	}

	public dispose(): void {
		this.display.removeChildren();
		this.layers.length = 0;
	}
}
