import {some} from "lodash";
import {TanksGameBaseCommand} from "./TanksGameBaseCommand";
import Sprite = PIXI.Sprite;

export class TanksGameDrawTankCommand extends TanksGameBaseCommand {
	public execute(): void {
		this.drawTanks();
	}

	private drawTanks(): void {
		if (this.model.enemiesCounter === 0) {
			this.model.youWINSignal.dispatch();
			return;
		}
		if (this.model.enemiesCounter > 0 && this.model.drawnTanks.length <= 3) {
			for (let i = 1; i < 1e9; i++) {
				const enemyTank: Sprite = this.drawSomeTank();
				if (!some(this.model.drawnTanks, (name) => name === enemyTank.texture.textureCacheIds[0])) {
					this.model.drawnTanks.push(enemyTank.texture.textureCacheIds[0]);
					this.tanksLayer.tanksContainer.addChild(enemyTank);
					console.log(this.tanksLayer.tanksContainer);
					this.model.enemiesCounter--;
				}
				if (this.model.drawnTanks.length === 3) {
					return;
				}
			}
		}
	}

	private drawSomeTank(): Sprite {
		let tank: Sprite;
		switch (Math.floor(Math.random() * Math.floor(3))) {
			case 0:
				tank = this.tanksLayer.drawWhiteBotTank();
				break;
			case 1:
				tank = this.tanksLayer.drawBlueBotTank();
				break;
			case 2:
				tank = this.tanksLayer.drawRedBotTank();
				break;
		}
		return tank;
	}
}
