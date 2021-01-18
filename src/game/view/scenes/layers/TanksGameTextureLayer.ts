import {forEach} from "lodash";
import {Loader} from "pixi.js";
import {Container, Sprite} from "pixi.js";
import gameMap from "../../../../../resources/gameMap";
import {ETanksGameCommonName} from "../../../enum/ETanksGameCommonName";
import {ETanksGameLayerName} from "../../../enum/ETanksGameLayerName";
import {ETanksGameImgName} from "../../../enum/resources/ETanksGameImgName";
import {TanksGameBaseLayer} from "./TanksGameBaseLayer";

export class TanksGameTextureLayer extends TanksGameBaseLayer {

	public textures: Container;

	constructor() {
		super();
		this.display.name = ETanksGameLayerName.TEXTURE_LAYER;
		this.textures = new Container();
		this.textures.name = ETanksGameCommonName.TEXTURES_CONTAINER;
	}

	public onAssetsLoaded(): void {
		this.drawMap();
		this.drawLayer();
	}

	protected drawLayer(): void {
		this.textures.position.set(-488, -360);
		this.display.addChild(this.textures);
	}

	private drawMap(): void {
		let spriteCoord = {
			x: 0,
			y: 0
		};
		// todo: will be better change game map to JSON format
		forEach(gameMap, (mapString, stringCount: number) => {
			forEach(mapString, (textureElem, elemCount: number) => {
				spriteCoord.y = 36 * stringCount;
				spriteCoord.x = 36 * elemCount;
				this.addTextureToContainer(textureElem, spriteCoord);
			});
		});
	}

	private addTextureToContainer(textureName: string, coord: {x: number, y: number}): void {
		let textureEl: Sprite | Container;
		switch (textureName) {
			case "wall":
				textureEl = new Sprite(Loader.shared.resources[ETanksGameImgName.WALL].texture);
				textureEl.name = ETanksGameCommonName.WALL;
				break;
			case "eagle":
				textureEl = new Sprite(Loader.shared.resources[ETanksGameImgName.EAGLE].texture);
				textureEl.name = ETanksGameCommonName.EAGLE;
				break;
			case "small_wall":
				textureEl = new Container();
				textureEl.name = ETanksGameCommonName.SMALL_WALL;
				const smallWall1 = new Sprite(Loader.shared.resources[ETanksGameImgName.SMALL_WALL_1].texture);
				const smallWall2 = new Sprite(Loader.shared.resources[ETanksGameImgName.SMALL_WALL_2].texture);
				const smallWall3 = new Sprite(Loader.shared.resources[ETanksGameImgName.SMALL_WALL_3].texture);
				const smallWall4 = new Sprite(Loader.shared.resources[ETanksGameImgName.SMALL_WALL_4].texture);
				smallWall1.x = 0;
				smallWall1.y = 0;
				smallWall2.x = 18;
				smallWall2.y = 0;
				smallWall3.x = 0;
				smallWall3.y = 18;
				smallWall4.x = 18;
				smallWall4.y = 18;
				textureEl.addChild(smallWall1, smallWall2, smallWall3, smallWall4);
				break;
			default:
				return;
		}
		textureEl.x = coord.x;
		textureEl.y = coord.y;
		this.textures.addChild(textureEl);
	}
}
