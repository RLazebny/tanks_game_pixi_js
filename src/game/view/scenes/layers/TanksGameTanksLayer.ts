import {Container, Loader, Sprite} from "pixi.js";
import {ETanksGameCommonName} from "../../../enum/ETanksGameCommonName";
import {ETanksGameLayerName} from "../../../enum/ETanksGameLayerName";
import {ETanksGameStaticValues} from "../../../enum/ETanksGameStaticValues";
import {ETanksGameImgName} from "../../../enum/resources/ETanksGameImgName";
import {TanksGameSetStartPositionUtil} from "../../../utils/TanksGameSetStartPositionUtil";
import { TanksGameBaseLayer } from "./TanksGameBaseLayer";

export class TanksGameTanksLayer extends TanksGameBaseLayer {

	public _tanksField: Container;
	public usersTank: Sprite;
	public botTank1: Sprite;
	public botTank2: Sprite;
	public botTank3: Sprite;
	public bulletsContainer: Container;

	constructor() {
		super();
		this.display.name = ETanksGameLayerName.TANKS_LAYER;
		this._tanksField = new Container();
		this._tanksField.name = ETanksGameCommonName.TANKS_FIELD;
		this.bulletsContainer = new Container();
		this.bulletsContainer.name = ETanksGameCommonName.BULLETS_CONTAINER;
		this._tanksField.addChild(this.bulletsContainer);
	}

	public onAssetsLoaded(): void {
		this.drawPlayerTank();
		this.drawBotTanks();
		this.drawLayer();
	}

	public drawBullet(): Sprite {
		return new Sprite(Loader.shared.resources[ETanksGameImgName.BULLET].texture);
	}

	public drawEnemyBullet(): Sprite {
		return new Sprite(Loader.shared.resources[ETanksGameImgName.BULLET].texture);
	}

	public drawWhiteBotTank(): void {
		const startPosition1 = TanksGameSetStartPositionUtil.botStartPosition1Coord();
		this.botTank1 = new Sprite(Loader.shared.resources[ETanksGameImgName.TANK_WHITE].texture);
		this.botTank1.name = ETanksGameCommonName.BOT_TANK_WHITE;
		this.botTank1.anchor.set(0.5);
		this.botTank1.angle = ETanksGameStaticValues.ROTATION_DOWN;
		this.botTank1.position.set(startPosition1.x, startPosition1.y);
		this._tanksField.addChild(this.botTank1);
	}

	public drawBlueBotTank(): void {
		const startPosition2 = TanksGameSetStartPositionUtil.botStartPosition2Coord();
		this.botTank2 = new Sprite(Loader.shared.resources[ETanksGameImgName.TANK_BLUE].texture);
		this.botTank2.name = ETanksGameCommonName.BOT_TANK_BLUE;
		this.botTank2.anchor.set(0.5);
		this.botTank2.angle = ETanksGameStaticValues.ROTATION_DOWN;
		this.botTank2.position.set(startPosition2.x, startPosition2.y);
		this._tanksField.addChild(this.botTank2);
	}

	public drawRedBotTank(): void {
		const startPosition3 = TanksGameSetStartPositionUtil.botStartPosition3Coord();
		this.botTank3 = new Sprite(Loader.shared.resources[ETanksGameImgName.TANK_RED].texture);
		this.botTank3.name = ETanksGameCommonName.BOT_TANK_RED;
		this.botTank3.anchor.set(0.5);
		this.botTank3.angle = ETanksGameStaticValues.ROTATION_DOWN;
		this.botTank3.position.set(startPosition3.x, startPosition3.y);
		this._tanksField.addChild(this.botTank3);
	}

	protected drawLayer(): void {
		this._tanksField.position.set(-488, -360);
		this.display.addChild(this._tanksField);
	}

	private drawPlayerTank(): void {
		const startPosition = TanksGameSetStartPositionUtil.userStartPositionCoord();
		this.usersTank = new Sprite(Loader.shared.resources[ETanksGameImgName.USER_TANK].texture);
		this.usersTank.name = ETanksGameCommonName.USERS_TANK;
		this.usersTank.anchor.set(0.5);
		this.usersTank.position.set(startPosition.x, startPosition.y);
		this._tanksField.addChild(this.usersTank);
	}

	// draw 3 start tanks
	private drawBotTanks(): void {
		for (let i = 1; i < 4; i++) {
			switch (i) {
				case 1:
					this.drawWhiteBotTank();
					break;
				case 2:
					this.drawBlueBotTank();
					break;
				case 3:
					this.drawRedBotTank();
					break;
			}
		}
	}
}
