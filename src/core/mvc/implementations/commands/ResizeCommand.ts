import * as _ from "lodash";
import {BaseCommand} from "./BaseCommand";

export class ResizeCommand extends BaseCommand {

	public execute() {
		let element: HTMLElement = document.getElementById(this.model.htmlElementName);
		if (!_.isNil(element)) {
			// Do resize, calculate scales and etc.
			this.model.onResize(element.offsetWidth, element.offsetHeight);
			// Resize app view
			this.view.resize(this.model.width, this.model.height);
		}
	}
}
