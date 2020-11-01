import {each} from "lodash";
import * as PIXI from "pixi.js";
import {Application, Container, IResourceDictionary, Sprite} from "pixi.js";
import {IScene} from "../interfaces/IScene";
import {ITanksGameView} from "../interfaces/ITanksGameView";
import {TanksGameBootScene} from "./scenes/TanksGameBootScene";

export class TanksGameView implements ITanksGameView {
	public app: Application;
	public width: number = 1024;
	public height: number = 768;
	public node: HTMLElement;
	public _backgroundContainer: Container = new Container();
	private _scenes: { [id: string]: IScene };
	private _content: Container;

	constructor(width, height) {
		this.app = new Application({
			width       : this.width,
			height      : this.height,
			transparent : true
		});
		this.app.stage.interactive = true;
	}

	public get background(): Container {
		return this._backgroundContainer;
	}

	public get content(): PIXI.Container {
		return this._content;
	}

	public addScene(scene: IScene): void {
		scene.display.visible = false;
		this._scenes[scene.name] = scene;
		this._content.addChild(scene.display);
	}

	public updateScene(name: string): void {
		each(this._scenes, (scene: IScene) => {
			scene.display.visible = false;
		});
		this._scenes[name].display.visible = true;
	}

	public setBackground(resources: IResourceDictionary): void {
		console.log("resources: ", resources);
		const bgSprite: Sprite = PIXI.Sprite.from(resources.startScreen.texture);
		this._backgroundContainer.addChild(bgSprite);
	}
/*	public drawTemplate(model: ITanksGameModel): void {
		this._app = new Application({
			width       : this.width,
			height      : this.height,
			transparent : true
		});
		this._node = document.createElement("div");
		this._node.appendChild(this._app.view);
	}*/

	public drawTemplate(): void {
		this.app.stage.addChild(this.background);
		this.node = document.getElementById("canvas");
		this.node.appendChild(this.app.view);
	}

	protected initScenes(): void {
		this.addScene(new TanksGameBootScene());
		this.addScene(new ElmStreetPreloaderScene());
		this.addScene(new ElmStreetGameScene());
	}
}
