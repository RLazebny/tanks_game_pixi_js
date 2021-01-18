import {Container, Loader, Sprite} from "pixi.js";
import {ETanksGameCommonName} from "../../../enum/ETanksGameCommonName";
import {ETanksGameLayerName} from "../../../enum/ETanksGameLayerName";
import {ETanksGameStaticValues} from "../../../enum/ETanksGameStaticValues";
import {ETanksGameImgName} from "../../../enum/resources/ETanksGameImgName";
import {TanksGameSetStartPositionUtil} from "../../../utils/TanksGameSetStartPositionUtil";
import { TanksGameBaseLayer } from "./TanksGameBaseLayer";

export class TanksGameTanksLayer extends TanksGameBaseLayer {

	public tanksContainer: Container;
	public usersTank: Sprite;
	public botTank1: Sprite;
	public botTank2: Sprite;
	public botTank3: Sprite;
	public bulletsContainer: Container;

	constructor() {
		super();
		this.display.name = ETanksGameLayerName.TANKS_LAYER;
		this.tanksContainer = new Container();
		this.tanksContainer.name = ETanksGameCommonName.TANKS_FIELD;
		this.bulletsContainer = new Container();
		this.bulletsContainer.name = ETanksGameCommonName.BULLETS_CONTAINER;
		this.tanksContainer.addChild(this.bulletsContainer);
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
		return new Sprite(Loader.shared.resources[ETanksGameImgName.ENEMY_BULLET].texture);
	}

	public drawWhiteBotTank(): Sprite {
		const startPosition1 = TanksGameSetStartPositionUtil.botStartPosition1Coord();
		const tank = new Sprite(Loader.shared.resources[ETanksGameImgName.TANK_WHITE].texture);
		tank.name = ETanksGameCommonName.BOT_TANK_WHITE;
		tank.anchor.set(0.5);
		tank.angle = ETanksGameStaticValues.ROTATION_DOWN;
		tank.position.set(startPosition1.x, startPosition1.y);
		return tank;
		// this.tanksContainer.addChild(this.botTank1);
	}

	public drawBlueBotTank(): Sprite {
		const startPosition2 = TanksGameSetStartPositionUtil.botStartPosition2Coord();
		const tank = new Sprite(Loader.shared.resources[ETanksGameImgName.TANK_BLUE].texture);
		tank.name = ETanksGameCommonName.BOT_TANK_BLUE;
		tank.anchor.set(0.5);
		tank.angle = ETanksGameStaticValues.ROTATION_DOWN;
		tank.position.set(startPosition2.x, startPosition2.y);
		return tank;
		// this.tanksContainer.addChild(this.botTank2);
	}

	public drawRedBotTank(): Sprite {
		const startPosition3 = TanksGameSetStartPositionUtil.botStartPosition3Coord();
		const tank = new Sprite(Loader.shared.resources[ETanksGameImgName.TANK_RED].texture);
		tank.name = ETanksGameCommonName.BOT_TANK_RED;
		tank.anchor.set(0.5);
		tank.angle = ETanksGameStaticValues.ROTATION_DOWN;
		tank.position.set(startPosition3.x, startPosition3.y);
		return tank;
		// this.tanksContainer.addChild(this.botTank3);
	}

	protected drawLayer(): void {
		this.tanksContainer.position.set(-488, -360);
		this.display.addChild(this.tanksContainer);
	}

	private drawPlayerTank(): void {
		const startPosition = TanksGameSetStartPositionUtil.userStartPositionCoord();
		this.usersTank = new Sprite(Loader.shared.resources[ETanksGameImgName.USER_TANK].texture);
		this.usersTank.name = ETanksGameCommonName.USERS_TANK;
		this.usersTank.anchor.set(0.5);
		this.usersTank.position.set(startPosition.x, startPosition.y);
		this.tanksContainer.addChild(this.usersTank);
	}

	// todo: this part not finished, final logic for draw tanks can be changed,
	//  make sense do tanks draw in separate command

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
