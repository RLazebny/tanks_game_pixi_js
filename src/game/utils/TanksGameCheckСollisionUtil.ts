import {forEach} from "lodash";
import {Container, Point} from "pixi.js";
import {ETanksGameCommonName} from "../enum/ETanksGameCommonName";
import {ETanksGameStaticValues} from "../enum/ETanksGameStaticValues";

export class TanksGameCollisionUtil {

	// todo: collision calculation needs to be refactored to make it clearer
	public static checkTextureCollision(tankRotationAngle: number, tankCoord: Point, textureField: Container): boolean {
		let isCollision: boolean;
		forEach(textureField.children, (texture: any) => {
			switch (tankRotationAngle) {
				case ETanksGameStaticValues.ROTATION_LEFT :
					if (texture.position.x <= tankCoord.x - 18 &&
						texture.position.x >= tankCoord.x - 53 &&
						texture.position.y >= tankCoord.y - 18 &&
						texture.position.y <= tankCoord.y + 17) {
						// console.log("Collision on left");
						return isCollision = true;
					}
					break;
				case ETanksGameStaticValues.ROTATION_RIGHT :
					if (
						texture.position.x === tankCoord.x + 18 &&
						texture.position.y >= tankCoord.y - 18 &&
						texture.position.y <= tankCoord.y + 17) {
						// console.log("Collision on right");
						return isCollision = true;
					}
					break;
				case ETanksGameStaticValues.ROTATION_DOWN :
					if (
						texture.position.y === tankCoord.y + 18 &&
						texture.position.x >= tankCoord.x - 18 &&
						texture.position.x <= tankCoord.x + 17) {
						// console.log("Collision on down");
						return isCollision = true;
					}
					break;
				case ETanksGameStaticValues.ROTATION_UP :
					if (texture.position.y <= tankCoord.y - 17 &&
						texture.position.y >= tankCoord.y - 53 &&
						texture.position.x >= tankCoord.x - 18 &&
						texture.position.x <= tankCoord.x + 17) {
						// console.log("Collision on up");
						return isCollision = true;
					}
					break;
				default :
					isCollision = true;
			}
		});
		if (isCollision) {
			return isCollision;
		} else {
			return false;
		}
	}

	public static checkCollisionWithTanks(tankRotationAngle: number, tankCoord: Point, tanksArr: Container): boolean {
		let isCollision: boolean;
		forEach(tanksArr.children, (anotherTank: any) => {
			if (anotherTank.name !== ETanksGameCommonName.BULLETS_CONTAINER) {
				switch (tankRotationAngle) {
					case ETanksGameStaticValues.ROTATION_LEFT:
						if (anotherTank.position.x <= tankCoord.x - 18 &&
							anotherTank.position.x >= tankCoord.x - 35 &&
							anotherTank.position.y >= tankCoord.y - 36 &&
							anotherTank.position.y <= tankCoord.y + 35) {
							console.log("Collision with tank on left");
							return isCollision = true;
						}
						break;
					case ETanksGameStaticValues.ROTATION_RIGHT:
						if (anotherTank.position.x >= tankCoord.x + 18 &&
							anotherTank.position.x <= tankCoord.x + 35 &&
							anotherTank.position.y >= tankCoord.y - 36 &&
							anotherTank.position.y <= tankCoord.y + 35) {
							console.log("Collision with tank on right");
							return isCollision = true;
						}
						break;
					case ETanksGameStaticValues.ROTATION_DOWN:
						if (anotherTank.position.y >= tankCoord.y + 18 &&
							anotherTank.position.y <= tankCoord.y + 35 &&
							anotherTank.position.x >= tankCoord.x - 36 &&
							anotherTank.position.x <= tankCoord.x + 35) {
							console.log("Collision with tank on down");
							return isCollision = true;
						}
						break;
					case ETanksGameStaticValues.ROTATION_UP:
						if (
							anotherTank.position.y >= tankCoord.y - 36 &&
							anotherTank.position.y <= tankCoord.y - 17 &&
							anotherTank.position.x >= tankCoord.x - 36 &&
							anotherTank.position.x <= tankCoord.x + 35) {
							console.log("Collision with tank on up");
							return isCollision = true;
						}
				}
			}
		});
		if (isCollision) {
			return isCollision;
		} else {
			return false;
		}
	}
}
