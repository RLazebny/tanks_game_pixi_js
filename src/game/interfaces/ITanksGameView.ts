import {Application, Container, IResourceDictionary} from "pixi.js";
import {IScene} from "./IScene";

export interface ITanksGameView {
	app: Application;
	width: number;
	height: number;
	node: HTMLElement;
	background: Container;
	_backgroundContainer: Container;
	_scenes: { [id: string]: IScene };
	_content: Container;
	content: Container;

	dispose(): void;
	drawTemplate(): void;
	addScene(scene: IScene): void;
	initContent(): void;
	initScenes(): void;
	onAssetsLoaded(): void;
	updateScene(name: string): void;
	setBackground(resources: IResourceDictionary): void;
}
