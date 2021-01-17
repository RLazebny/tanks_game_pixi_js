import {ETanksGameStaticValues} from "../enum/ETanksGameStaticValues";

export type Coord = {
	x: number;
	y: number;
};
export class TanksGameSetStartPositionUtil {
	// gameMap consists of blocks, 20 lines of 25 elements, but blocks of gameMap don't have anchor, and tanks have anchor 0,5

	public static userStartPositionCoord(): Coord {
		return {
			x: (ETanksGameStaticValues.BLOCK_SIZE * 13) - (ETanksGameStaticValues.BLOCK_SIZE / 2),
			y: (ETanksGameStaticValues.BLOCK_SIZE * 17) - (ETanksGameStaticValues.BLOCK_SIZE / 2)
		};
	}

	public static botStartPosition1Coord(): Coord {
		return {
			x: (ETanksGameStaticValues.BLOCK_SIZE * 2) - (ETanksGameStaticValues.BLOCK_SIZE / 2),
			y: (ETanksGameStaticValues.BLOCK_SIZE * 2) - (ETanksGameStaticValues.BLOCK_SIZE / 2)
		};
	}

	public static botStartPosition2Coord(): Coord {
		return {
			x: (ETanksGameStaticValues.BLOCK_SIZE * 13) - (ETanksGameStaticValues.BLOCK_SIZE / 2),
			y: (ETanksGameStaticValues.BLOCK_SIZE * 2) - (ETanksGameStaticValues.BLOCK_SIZE / 2)
		};
	}

	public static botStartPosition3Coord(): Coord {
		return {
			x: (ETanksGameStaticValues.BLOCK_SIZE * 24) - (ETanksGameStaticValues.BLOCK_SIZE / 2),
			y: (ETanksGameStaticValues.BLOCK_SIZE * 2) - (ETanksGameStaticValues.BLOCK_SIZE / 2)
		};
	}
}
