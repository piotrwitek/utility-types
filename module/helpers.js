/**
 * @export Action Creator helper factory function
 * @class ActionCreator
 * @template T - Generic Type
 * @template P - Generic Type
 */
var ActionCreator = (function () {
    function ActionCreator(type) {
        var _this = this;
        this.create = function (payload) { return ({ type: _this.type, payload: payload }); };
        this.type = type;
    }
    return ActionCreator;
}());
export { ActionCreator };
/**
 * @export createEmptyAction - empty action creator function
 * @template T - Generic Type
 * @param type: T
 * @returns () => EmptyAction<T>
 */
export function createEmptyAction(type) {
    return function () { return ({ type: type }); };
}
;
/**
 * @export createPayloadAction - FSA action creator function
 * @template T - Generic Type
 * @template P - Generic Type
 * @param type: T
 * @returns (payload: P) => PayloadAction<T, P>
 */
export function createPayloadAction(type) {
    return function (payload) { return ({ type: type, payload: payload }); };
}
//# sourceMappingURL=helpers.js.map