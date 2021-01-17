import {ETanksGameLayerName} from "../../enum/ETanksGameLayerName";
import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {TanksGameMenuButtonsLayer} from "../../view/scenes/layers/TanksGameMenuButtonsLayer";
import {TanksGameTanksLayer} from "../../view/scenes/layers/TanksGameTanksLayer";
import {TanksGameTextureLayer} from "../../view/scenes/layers/TanksGameTextureLayer";
import {TanksGameGameScene} from "../../view/scenes/TanksGameGameScene";
import {TanksGameMenuScene} from "../../view/scenes/TanksGameMenuScene";
import {CoreBaseCommand} from "./CoreBaseCommand";

export class TanksGameBaseCommand extends CoreBaseCommand {
	protected gameScene: TanksGameGameScene = this.view.getScene(ETanksGameScenesName.GAME) as TanksGameGameScene;
	protected menuScene: TanksGameMenuScene = this.view.getScene(ETanksGameScenesName.MENU) as TanksGameMenuScene;
	protected textureLayer: TanksGameTextureLayer =
				  this.gameScene.getLayer(ETanksGameLayerName.TEXTURE_LAYER).layer as TanksGameTextureLayer;
	protected tanksLayer: TanksGameTanksLayer =
				  this.gameScene.getLayer(ETanksGameLayerName.TANKS_LAYER).layer as TanksGameTanksLayer;
	protected menuButtonsLayer: TanksGameMenuButtonsLayer =
				  this.menuScene.getLayer(ETanksGameLayerName.MENU_BUTTONS_LAYER).layer as TanksGameMenuButtonsLayer;
}
