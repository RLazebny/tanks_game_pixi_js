import {ETanksGameScenesName} from "../../enum/ETanksGameScenesName";
import {ETanksGameStaticValues} from "../../enum/ETanksGameStaticValues";
import {ETanksGameUIEventName} from "../../enum/ETanksGameUIEventName";
import {TanksGameCollisionUtil} from "../../utils/TanksGameCheckСollisionUtil";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";
import Sprite = PIXI.Sprite;

// todo: it makes sense to split the event listeners for game items and for menu items (buttons, etc.) into 2 separate commands
export class TanksGameAddUIEventListenersCommand extends TanksGameBaseCommand {

	public execute(): void {
		super.execute();
		this.addMenuButtonsListeners();
		this.addUserTankListeners();
	}

	private addUserTankListeners(): void {
		window.onkeydown = (event) => {
			if (event.code === ETanksGameStaticValues.KEY_A) {
				// Move ('left');
				this.tanksLayer.usersTank.angle = ETanksGameStaticValues.ROTATION_LEFT;
				if (!this.checkCollisions(this.tanksLayer.usersTank)) {
						this.tanksLayer.usersTank.position.x -= 2;
				}
			} else if (event.code === ETanksGameStaticValues.KEY_D) {
				// Move ('right');
				this.tanksLayer.usersTank.angle = ETanksGameStaticValues.ROTATION_RIGHT;
				if (!this.checkCollisions(this.tanksLayer.usersTank)) {
					this.tanksLayer.usersTank.position.x += 2;
				}
			} else if (event.code === ETanksGameStaticValues.KEY_W) {
				// Move ('up');
				this.tanksLayer.usersTank.angle = ETanksGameStaticValues.ROTATION_UP;
				if (!this.checkCollisions(this.tanksLayer.usersTank)) {
					this.tanksLayer.usersTank.position.y -= 2;
				}
			} else if (event.code === ETanksGameStaticValues.KEY_S) {
				// Move ('down');
				this.tanksLayer.usersTank.angle = ETanksGameStaticValues.ROTATION_DOWN;
				if (!this.checkCollisions(this.tanksLayer.usersTank)) {
					this.tanksLayer.usersTank.position.y += 2;
				}
			} else if (event.code === ETanksGameStaticValues.SPACE) {
				// attack
				this.model.bulletData = {
					vector: this.tanksLayer.usersTank.angle,
					tankCoord: this.tanksLayer.usersTank.position,
					tankType: this.tanksLayer.usersTank.name
				};
				this.model.onTankAttack.dispatch();
			}
		};
	}

	private checkCollisions(tank: Sprite): boolean {
		let isCollision: boolean = false;
		if (TanksGameCollisionUtil.checkTextureCollision(tank.angle, tank.position, this.textureLayer.textures)) {
			return isCollision = true;
		} else {
			if (TanksGameCollisionUtil.checkCollisionWithTanks(tank.angle, tank.position, this.tanksLayer.tanksContainer)) {
				return isCollision = true;
			}
		}
		return isCollision;
	}

	private addMenuButtonsListeners(): void {
		this.menuButtonsLayer.startButton.on(ETanksGameUIEventName.POINTER_UP, this.goToGameState.bind(this));
		this.menuButtonsLayer.startButton.on(ETanksGameUIEventName.POINTER_OVER, this.scaleUp.bind(this, this.menuButtonsLayer.startButton));
		this.menuButtonsLayer.startButton.on(ETanksGameUIEventName.POINTER_OUT, this.scaleDown.bind(this, this.menuButtonsLayer.startButton));
		this.menuButtonsLayer.highScoreButton.on(ETanksGameUIEventName.POINTER_UP, this.goToHighScoreState.bind(this));
		this.menuButtonsLayer.highScoreButton.on(ETanksGameUIEventName.POINTER_OVER, this.scaleUp.bind(this, this.menuButtonsLayer.highScoreButton));
		this.menuButtonsLayer.highScoreButton.on(ETanksGameUIEventName.POINTER_OUT, this.scaleDown.bind(this, this.menuButtonsLayer.highScoreButton));
	}

	private goToGameState(): void {
		this.model.stateMachine.changeState(ETanksGameScenesName.GAME);
	}

	private scaleUp(el: Sprite): void {
		el.scale.set(1.05);
	}

	private scaleDown(el: Sprite): void {
		el.scale.set(1);
	}

	private goToHighScoreState(): void {
		this.model.stateMachine.changeState(ETanksGameScenesName.GAME);
	}
}
