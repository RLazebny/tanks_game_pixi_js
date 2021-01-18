import {each} from "lodash";
import * as PIXI from "pixi.js";
import {Application, Container, IResourceDictionary, Sprite} from "pixi.js";
import {ETanksGameCommonName} from "../enum/ETanksGameCommonName";
import {ETanksGameImgName} from "../enum/resources/ETanksGameImgName";
import {IScene} from "../interfaces/IScene";
import {ITanksGameView} from "../interfaces/ITanksGameView";
import {TanksGameBootScene} from "./scenes/TanksGameBootScene";
import {TanksGameGameScene} from "./scenes/TanksGameGameScene";
import {TanksGameMenuScene} from "./scenes/TanksGameMenuScene";

export class TanksGameView implements ITanksGameView {
	public app: Application;
	public width: number;
	public height: number;
	public node: HTMLElement;
	public _backgroundContainer: Container = new Container();
	public _scenes: { [id: string]: IScene } = {};
	public _content: Container;

	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.app = new Application({
			width       : width,
			height      : height,
			transparent : true
		});
		this.app.stage.interactive = true;
		TanksGameView.addToHtmlNode(this.app);
		this.initContent();
		this.initScenes();
	}

	public get background(): Container {
		return this._backgroundContainer;
	}

	public get content(): Container {
		return this._content;
	}

	public addScene(scene: IScene): void {
		console.log("scene: ", scene);
		scene.display.visible = false;
		this._scenes[scene.name] = scene;
		this._content.addChild(scene.display);
	}

	public dispose(): void {
		this.app.stage.removeChildren();
	}

	public onAssetsLoaded(): void {
		each(this._scenes, (scene: IScene) => {
			scene.onAssetsLoaded();
		});
	}

	public updateScene(name: string): void {
		each(this._scenes, (scene: IScene) => {
			scene.display.visible = false;
		});
		this._scenes[name].display.visible = true;
	}

	public getScene(name: string): IScene {
		return this._scenes[name];
	}

	public setBackground(resources: IResourceDictionary): void {
		console.log("resources: ", resources);
		const bgSprite: Sprite = Sprite.from(resources[ETanksGameImgName.TANK_RED].texture);
		this._backgroundContainer.addChild(bgSprite);
	}

	public drawTemplate(): void {
		this.app.stage.addChild(this.background);
		this.node = document.getElementById("canvas");
		this.node.appendChild(this.app.view);
	}
	
	public initContent(): void {
		this._content = new Container();
		this._content.name = "TankGameView:_content";
		this._content.x = this.width / 2;
		this._content.y = this.height / 2;
		this.app.stage.addChild(this._content);
	}

	public initScenes(): void {
		this.addScene(new TanksGameBootScene());
		this.addScene(new TanksGameMenuScene());
		this.addScene(new TanksGameGameScene());
	}

	private static addToHtmlNode(app: Application): void {
		const wrapperNode: HTMLElement = document.getElementById(ETanksGameCommonName.CANVAS);
		wrapperNode.appendChild(app.view);
	}
}
