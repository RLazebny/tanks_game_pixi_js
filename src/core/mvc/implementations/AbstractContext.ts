import * as _ from "lodash";
import {ECommandName} from "../enum/ECommandName";
import {IContext} from "../interfaces/IContext";
import {IController} from "../interfaces/IController";
import {IModel} from "../interfaces/IModel";
import {IView} from "../interfaces/IView";
import {TFunctionMap} from "../type/TFunctionMap";
import {ActivatedCommand} from "./commands/ActivatedCommand";
import {DeactivatedCommand} from "./commands/DeactivatedCommand";
import {ResizeCommand} from "./commands/ResizeCommand";
import {ViewRedrawCommand} from "./commands/ViewRedrawCommand";

export abstract class AbstractContext<M extends IModel, V extends IView, C extends IController>
	implements IContext<M, V, C> {
	protected static replaceOrGetDefault(name: string, def: Function, replacementMap?: TFunctionMap): Function {
		return replacementMap && !_.isNil(replacementMap[name]) ? replacementMap[name] : def;
	}

	public enterFrameUpdate(deltaTime: number): void {
	}

	public initialize(): void {
	}

	public abstract getModel(): M;

	public abstract getView(): V;

	/**
	 * @inheritDoc
	 */
	public abstract getController(): C;

	/**
	 * Register core application commands.
	 */
	protected registerCoreCommands(replacementMap?: TFunctionMap): void {
		let controller: C = this.getController();
		// register commands
		controller.registerCommand(ECommandName.APP_RESIZE,
			AbstractContext.replaceOrGetDefault(ECommandName.APP_RESIZE,
				ResizeCommand, replacementMap));
		controller.registerCommand(ECommandName.APP_ACTIVATED,
			AbstractContext.replaceOrGetDefault(ECommandName.APP_ACTIVATED,
				ActivatedCommand, replacementMap));
		controller.registerCommand(ECommandName.APP_DEACTIVATED,
			AbstractContext.replaceOrGetDefault(ECommandName.APP_DEACTIVATED,
				DeactivatedCommand, replacementMap));
		controller.registerCommand(ECommandName.APP_VIEW_REDRAW,
			AbstractContext.replaceOrGetDefault(ECommandName.APP_VIEW_REDRAW,
				ViewRedrawCommand,
				replacementMap));
	}
}
