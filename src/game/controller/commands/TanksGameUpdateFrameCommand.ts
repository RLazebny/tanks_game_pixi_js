import {forEach} from "lodash";
import {Sprite} from "pixi.js";
import {ETanksGameCommonName} from "../../enum/ETanksGameCommonName";
import {ETanksGameStaticValues} from "../../enum/ETanksGameStaticValues";
import {TanksGameCollisionUtil} from "../../utils/TanksGameCheckСollisionUtil";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameUpdateFrameCommand extends TanksGameBaseCommand {
	public execute(): void {
		this.updateBulletsPositions();
		this.updateBotsMovementVector();
		this.updateBotsPositions();
	}

	private updateBulletsPositions(): void {
		// if (this.model.timeCounter % 5 === 0) {
		forEach(this.tanksLayer.bulletsContainer.children, (bullet) => {
			const vector = -bullet.name;
			switch (vector) {
				case -ETanksGameStaticValues.ROTATION_LEFT:
					bullet.position.x -= 2;
					break;
				case -ETanksGameStaticValues.ROTATION_RIGHT:
					bullet.position.x += 2;
					break;
				case -ETanksGameStaticValues.ROTATION_UP:
					bullet.position.y -= 2;
					break;
				case -ETanksGameStaticValues.ROTATION_DOWN:
					bullet.position.y += 2;
					break;
			}
		});
		// }
	}

	private updateBotsMovementVector(): void {
		if (this.model.timeCounter % 300 === 0) {
			forEach(this.tanksLayer, (child) => {
				if (this.isBotName(child.name)) {
					// change bot vector
					const vectorType = Math.floor(Math.random() * Math.floor(4));
					switch (vectorType) {
						case 0:
							(child as Sprite).angle = ETanksGameStaticValues.ROTATION_LEFT;
							break;
						case 1:
							(child as Sprite).angle = ETanksGameStaticValues.ROTATION_RIGHT;
							break;
						case 2:
							(child as Sprite).angle = ETanksGameStaticValues.ROTATION_DOWN;
							break;
						case 3:
							(child as Sprite).angle = ETanksGameStaticValues.ROTATION_UP;
							break;
					}
				}
			});
		}
	}

	private updateBotsPositions(): void {
		if (this.model.timeCounter % 5 === 0) {
			forEach(this.tanksLayer, (child) => {
				if (this.isBotName(child.name)) {
					this.updatePosition(child as Sprite);
				}
			});
		}
	}

	private updatePosition(tank: Sprite): void {
		switch (tank.angle) {
			case ETanksGameStaticValues.ROTATION_LEFT:
				if (!this.checkCollisions(tank)) {
					tank.position.x -= 2;
				}
				break;
			case ETanksGameStaticValues.ROTATION_RIGHT:
				if (!this.checkCollisions(tank)) {
					tank.position.x += 2;
				}
				break;
			case ETanksGameStaticValues.ROTATION_UP:
				if (this.checkCollisions(tank)) {
					tank.position.y -= 2;
				}
				break;
			case ETanksGameStaticValues.ROTATION_DOWN:
				if (!this.checkCollisions(tank)) {
					tank.position.y += 2;
				}
				break;
		}
	}

	private checkCollisions(tank: Sprite): boolean {
		let isCollision: boolean = false;
		if (TanksGameCollisionUtil.checkTextureCollision(tank.angle, tank.position, this.textureLayer.textures)) {
			return isCollision = true;
		} else {
			if (TanksGameCollisionUtil.checkCollisionWithTanks(tank.angle, tank.position, this.tanksLayer._tanksField)) {
				return isCollision = true;
			}
		}
		return isCollision;
	}

	private isBotName(name: string): boolean {
		return name === ETanksGameCommonName.BOT_TANK_BLUE
			|| name === ETanksGameCommonName.BOT_TANK_WHITE
			|| name === ETanksGameCommonName.BOT_TANK_RED;
	}
}
