import {IInteractionManager} from "../../mvc/interfaces/IInteractionManager";
import {CoreInteractionEventNames} from "./enum/CoreInteractionEventNames";

export class CoreInteractionManager implements IInteractionManager {

	private _supportsTouchEvents: boolean = ("ontouchstart" in window);

	private _supportsPointerEvents: boolean = !!window.PointerEvent;

	public get supportsPointerEvents(): boolean {
		return this._supportsPointerEvents;
	}

	public get supportsTouchEvents(): boolean {
		return this._supportsTouchEvents;
	}

	public get UP(): string {
		let name: string;
		if (this.supportsPointerEvents) {
			name = CoreInteractionEventNames.POINTER_UP;
		} else if (this.supportsTouchEvents) {
			name = CoreInteractionEventNames.TOUCH_END;
		} else {
			name = CoreInteractionEventNames.MOUSE_UP;
		}
		return name;
	}

	public get DOWN(): string {
		let name: string;
		if (this.supportsPointerEvents) {
			name = CoreInteractionEventNames.POINTER_DOWN;
		} else if (this.supportsTouchEvents) {
			name = CoreInteractionEventNames.TOUCH_START;
		} else {
			name = CoreInteractionEventNames.MOUSE_DOWN;
		}
		return name;
	}

	public get MOVE(): string {
		let name: string;
		if (this.supportsPointerEvents) {
			name = CoreInteractionEventNames.POINTER_MOVE;
		} else if (this.supportsTouchEvents) {
			name = CoreInteractionEventNames.TOUCH_MOVE;
		} else {
			name = CoreInteractionEventNames.MOUSE_MOVE;
		}
		return name;
	}

	public get OVER(): string {
		let name: string;
		if (this.supportsPointerEvents) {
			name = CoreInteractionEventNames.POINTER_OVER;
		} else {
			name = CoreInteractionEventNames.MOUSE_OVER;
		}
		return name;
	}

	public get OUT(): string {
		let name: string;
		if (this.supportsPointerEvents) {
			name = CoreInteractionEventNames.POINTER_OUT;
		} else {
			name = CoreInteractionEventNames.MOUSE_OUT;
		}
		return name;
	}
}
