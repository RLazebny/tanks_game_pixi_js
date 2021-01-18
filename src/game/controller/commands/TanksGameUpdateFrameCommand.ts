import {forEach} from "lodash";
import {Container, Sprite} from "pixi.js";
import {ETanksGameCommonName} from "../../enum/ETanksGameCommonName";
import {ETanksGameStaticValues} from "../../enum/ETanksGameStaticValues";
import {ETanksGameImgName} from "../../enum/resources/ETanksGameImgName";
import {TanksGameCollisionUtil} from "../../utils/TanksGameCheckСollisionUtil";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";

export class TanksGameUpdateFrameCommand extends TanksGameBaseCommand {
	public execute(): void {
		this.drawTanks();
		this.addBotHits();
		this.updateBulletsPositions();
		this.checkBulletCollisions();
		this.updateBotsMovementVector();
		this.updateBotsPositions();
	}

	private drawTanks(): void {
		if (this.model.timeCounter % 360 === 0) {
			this.model.drawTanksSignal.dispatch();
		}
	}

	private addBotHits(): void {
		forEach(this.tanksLayer.tanksContainer.children, (child) => {
			if (this.isTankBotName((child as Sprite).name)) {
				const rate = Math.floor(Math.random() * Math.floor(5));
				if (this.model.timeCounter % 100 + rate * 25 === 0) {
					this.model.bulletData = {
						vector    : (child as Sprite).angle,
						tankCoord : (child as Sprite).position,
						tankType  : child.name
					};
					this.model.onTankAttack.dispatch();
				}
			}
		});
	}

	private updateBulletsPositions(): void {
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
	}

	private updateBotsMovementVector(): void {
		if (this.model.timeCounter % 300 === 0) {
			forEach(this.tanksLayer.tanksContainer.children, (child) => {
				if (this.isTankBotName(child.name)) {
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
			forEach(this.tanksLayer.tanksContainer.children, (child) => {
				if (this.isTankBotName(child.name)) {
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
		} else if (TanksGameCollisionUtil.checkCollisionWithTanks(tank.angle, tank.position,
			this.tanksLayer.tanksContainer)) {
			return isCollision = true;

		}
		return isCollision;
	}

	private checkBulletCollisions(): void {
		const bulletContainer = this.tanksLayer.tanksContainer.getChildByName(
			ETanksGameCommonName.BULLETS_CONTAINER) as Container;
		forEach(bulletContainer.children, (bullet, index) => {
			if (bullet) {
				this.checkBulletHitCollision(bullet as Sprite, index);
			}
		});
	}

	// todo: collision calculation needs to be refactored to make it clearer
	private checkBulletHitCollision(bullet: Sprite, bulletArrIndex: number): void {
		// check collision with tanks
		forEach(this.tanksLayer.tanksContainer.children, (tank: any, index) => {
			if (tank && tank.name !== ETanksGameCommonName.BULLETS_CONTAINER) {
				if (tank.position.x + 18 >= bullet.position.x &&
					tank.position.x - 18 <= bullet.position.x &&
					tank.position.y + 18 >= bullet.position.y &&
					tank.position.y - 18 <= bullet.position.y) {
					this.doBulletHitEvent(bullet, bulletArrIndex, ETanksGameCommonName.TANK, tank, index);
					return;
				}
			}
		});
		// check collision with textures
		forEach(this.textureLayer.textures.children, (texture: any, index) => {
			if (texture) {
				if (texture.position.x + 21 >= bullet.position.x &&
					texture.position.x - 5 <= bullet.position.x &&
					texture.position.y + 21 >= bullet.position.y &&
					texture.position.y - 5 <= bullet.position.y) {
					// console.log("Collision with tank on left");
					this.doBulletHitEvent(bullet, bulletArrIndex, texture.name, texture, index);
					return;
				}
			}
		});
	}

	private doBulletHitEvent(bullet: Sprite, bulletArrIndex: number, hitType: string,
		hitObject: Sprite | Container, hitObjectIndex: number): void {
		const bulletsContainer = this.tanksLayer.tanksContainer.getChildByName(
			ETanksGameCommonName.BULLETS_CONTAINER) as Container;
		const texturesContainer = this.textureLayer.textures;
		switch (hitType) {
			case ETanksGameCommonName.TANK:
				console.log(bullet.name);
				if (bullet.texture.textureCacheIds[0] === ETanksGameImgName.BULLET &&
					this.isTankBotName(hitObject.name)) {
					this.tanksLayer.tanksContainer.children.splice(hitObjectIndex, 1);
					this.model.drawnTanks.splice(this.model.drawnTanks.indexOf((hitObject as Sprite).texture.textureCacheIds[0]), 1);
					bulletsContainer.children.splice(bulletArrIndex, 1);
				} else if (bullet.name === ETanksGameImgName.ENEMY_BULLET && hitObject.name ===
					ETanksGameCommonName.USERS_TANK) {
					this.tanksLayer.tanksContainer.children.splice(hitObjectIndex, 1);
					this.model.drawnTanks.splice(this.model.drawnTanks.indexOf((hitObject as Sprite).texture.textureCacheIds[0]), 1);
					bulletsContainer.children.splice(bulletArrIndex, 1);
				}
				break;
			case ETanksGameCommonName.SMALL_WALL:
				texturesContainer.children.splice(hitObjectIndex, 1);
				bulletsContainer.children.splice(bulletArrIndex, 1);
				break;
			case ETanksGameCommonName.WALL:
				bulletsContainer.children.splice(bulletArrIndex, 1);
				break;
			case ETanksGameCommonName.EAGLE:
				texturesContainer.children.splice(hitObjectIndex, 1);
				bulletsContainer.children.splice(bulletArrIndex, 1);
				break;
		}
	}

	private isTankBotName(name: string): boolean {
		return name === ETanksGameCommonName.BOT_TANK_BLUE
			|| name === ETanksGameCommonName.BOT_TANK_WHITE
			|| name === ETanksGameCommonName.BOT_TANK_RED;
	}
}
