"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createActionCreator(type, payloadSelector) {
    if (payloadSelector == null) {
        const actionCreator = () => ({ type });
        actionCreator.type = type;
        return actionCreator;
    }
    else {
        const actionCreator = (state, meta) => ({ type, payload: payloadSelector(state, meta) });
        actionCreator.type = type;
        return actionCreator;
    }
}
exports.createActionCreator = createActionCreator;
//# sourceMappingURL=create-action-creator.js.map