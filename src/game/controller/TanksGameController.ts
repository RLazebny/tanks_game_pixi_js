import {AbstractController} from "../../core/mvc/implementations/AbstractController";
import {TanksGameContext} from "../TanksGameContext";
import {ITanksGameContext} from "../type/ITanksGameContext";

export class TanksGameController extends AbstractController<ITanksGameContext> {
	private _context: TanksGameContext;

	constructor(context: TanksGameContext) {
		super();
		this._context = context;
	}

	protected get context(): TanksGameContext {
		return this._context;
	}

	protected set context(value: TanksGameContext) {
		this._context = value;
	}
}
