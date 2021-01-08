import {Container} from "pixi.js";
import {IDisposable} from "./IDisposable";

export interface ILayer extends IDisposable {
  display: Container;
  onAssetsLoaded?(): void;
}
