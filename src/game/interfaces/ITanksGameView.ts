import {Application, Container, IResourceDictionary} from "pixi.js";
import {ITanksGameModel} from "./ITanksGameModel";

export interface ITanksGameView {
	app: Application;
	width: number;
	height: number;
	node: HTMLElement;
	background: Container;
	_backgroundContainer: Container;

	drawTemplate(): void;
	setBackground(resources: IResourceDictionary): void;
}
