"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @export Action Creator helper factory function
 * @class ActionCreator
 * @template T - Generic Type
 * @template P - Generic Type
 */
class ActionCreator {
    constructor(type) {
        this.create = (payload) => ({ type: this.type, payload });
        this.type = type;
    }
}
exports.ActionCreator = ActionCreator;
/**
 * @export createEmptyAction - empty action creator function
 * @template T - Generic Type
 * @param type: T
 * @returns () => EmptyAction<T>
 */
function createEmptyAction(type) {
    return () => ({ type });
}
exports.createEmptyAction = createEmptyAction;
;
/**
 * @export createPayloadAction - FSA action creator function
 * @template T - Generic Type
 * @template P - Generic Type
 * @param type: T
 * @returns (payload: P) => PayloadAction<T, P>
 */
function createPayloadAction(type) {
    return (payload) => ({ type, payload });
}
exports.createPayloadAction = createPayloadAction;
//# sourceMappingURL=helpers.js.map