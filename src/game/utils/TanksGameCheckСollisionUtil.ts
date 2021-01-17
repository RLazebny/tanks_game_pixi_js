import {forEach} from "lodash";
import {Container, Point, Sprite} from "pixi.js";
import {ETanksGameCommonName} from "../enum/ETanksGameCommonName";
import {ETanksGameStaticValues} from "../enum/ETanksGameStaticValues";
import {TanksGameTanksLayer} from "../view/scenes/layers/TanksGameTanksLayer";

export class TanksGameCollisionUtil {
	public static checkTextureCollision(
		tankRotationAngle: number,
		tankCoord: Point,
		textureField: Container
	): boolean {
		let isCollision: boolean;
		forEach(textureField.children, (texture: any) => {
			switch (tankRotationAngle) {
				case ETanksGameStaticValues.ROTATION_LEFT :
					if (texture.position.x <= tankCoord.x - 18 &&
						texture.position.x >= tankCoord.x - 54 &&
						texture.position.y >= tankCoord.y - 17 &&
						texture.position.y <= tankCoord.y + 17) {
						console.log("Collision on left");
						return isCollision = true;
					}
					break;
				case ETanksGameStaticValues.ROTATION_RIGHT :
					if (
						texture.position.x === tankCoord.x + 18 &&
						texture.position.y >= tankCoord.y - 17 &&
						texture.position.y <= tankCoord.y + 17) {
						console.log("Collision on right");
						return isCollision = true;
					}
					break;
				case ETanksGameStaticValues.ROTATION_DOWN :
					if (
						texture.position.y === tankCoord.y + 18 &&
						texture.position.x >= tankCoord.x - 18 &&
						texture.position.x <= tankCoord.x + 18) {
						console.log("Collision on down");
						return isCollision = true;
					}
					break;
				case ETanksGameStaticValues.ROTATION_UP :
					if (texture.position.y <= tankCoord.y - 18 &&
						texture.position.y >= tankCoord.y - 54 &&
						texture.position.x >= tankCoord.x - 17 &&
						texture.position.x <= tankCoord.x + 17) {
						console.log("Collision on up");
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

	public static checkCollisionWithTanks(tankCoord: Point, tanksArr: Container): boolean {
		let isCollision: boolean;
		forEach(tanksArr.children, (anotherTank: any) => {
			if (anotherTank.name !== ETanksGameCommonName.BULLETS_CONTAINER) {
				if (anotherTank.position.x <= tankCoord.x - 18 &&
					anotherTank.position.x >= tankCoord.x - 54 &&
					anotherTank.position.y >= tankCoord.y - 17 &&
					anotherTank.position.y <= tankCoord.y + 17) {
					console.log("Collision with tank on left");
					return isCollision = true;
				} else if (
					anotherTank.position.x === tankCoord.x + 18 &&
					anotherTank.position.y >= tankCoord.y - 17 &&
					anotherTank.position.y <= tankCoord.y + 17) {
					console.log("Collision with tank on right");
					return isCollision = true;
				} else if (
					anotherTank.position.y === tankCoord.y + 18 &&
					anotherTank.position.x >= tankCoord.x - 18 &&
					anotherTank.position.x <= tankCoord.x + 18) {
					console.log("Collision with tank on down");
					return isCollision = true;
				} else if (
					anotherTank.position.y <= tankCoord.y - 18 &&
					anotherTank.position.y >= tankCoord.y - 54 &&
					anotherTank.position.x >= tankCoord.x - 17 &&
					anotherTank.position.x <= tankCoord.x + 17) {
					console.log("Collision with tank on up");
					return isCollision = true;
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
