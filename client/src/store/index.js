import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // middleware nos permite retornar funciones no solo acciones. permite trabajar con acciones atrasadas y promesas 
import rootReducer from "../reducer"; 

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))