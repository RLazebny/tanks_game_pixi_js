import {ETanksGameCommonName} from "../../enum/ETanksGameCommonName";
import {ETanksGameStaticValues} from "../../enum/ETanksGameStaticValues";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";
import Sprite = PIXI.Sprite;

export class TanksGameAddBulletToSceneCommand extends TanksGameBaseCommand {

	public execute(): void {
		this.addBulletToScene();
	}

	private addBulletToScene(): void {
		const bullet = this.model.bulletData.tankType === ETanksGameCommonName.USERS_TANK ?
			this.tanksLayer.drawBullet() : this.tanksLayer.drawEnemyBullet();
		bullet.name = `${this.model.bulletData.vector}`;
		this.setBulletPosition(bullet);
		this.tanksLayer.bulletsContainer.addChild(bullet);
	}

	// method below need be refactor
	private setBulletPosition(bullet: Sprite): void {
		bullet.position = this.model.bulletData.tankCoord;
		switch (this.model.bulletData.vector) {
			case ETanksGameStaticValues.ROTATION_LEFT:
			case ETanksGameStaticValues.ROTATION_RIGHT:
				bullet.position.y -= 5;
				break;
			case ETanksGameStaticValues.ROTATION_UP:
			case ETanksGameStaticValues.ROTATION_DOWN:
				bullet.position.x -= 5;
				break;
		}
	}
}
