import {IContext} from "../../core/mvc/interfaces/IContext";
import {ITanksGameController} from "../interfaces/ITanksGameController";
import {ITanksGameModel} from "../interfaces/ITanksGameModel";
import {ITanksGameView} from "../interfaces/ITanksGameView";

export type ITanksGameContext = IContext<ITanksGameModel, ITanksGameView, ITanksGameController>;
