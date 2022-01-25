import IsPlainObject from '../../../../utils/object/IsPlainObject.js';
import {
    CreateCompositeHandlers,
    CreateActionHandlers,
    CreateDecoratorHandles
} from './Handlers.js';


var CreateNode = function (data, customNodeHandlers) {
    // SingleValue : data is not an object
    var handlerName = data.__handlerName__,
        isSingleValue = data.__isSingleValue__;
    var children, decorators;
    if (isSingleValue) {
        // Get origin data
        data = data[handlerName];
    } else {
        children = data.children;
        decorators = data.decorators;

        delete data.decorators;
    }

    // 1. Replace node data of child to node instance of child
    if (children) {
        if (Array.isArray(children)) {
            // Children is an array
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var childObj = children[i];
                if (childObj.node) {
                    // childObj.node is a node data
                    childObj.node = CreateChildNode(childObj.node, customNodeHandlers);
                } else {
                    // childObj is a node data
                    children[i] = CreateChildNode(childObj, customNodeHandlers);
                }

            }

        } else {
            // Children is a dictionary
            for (var key in children) {
                var childObj = children[key];
                if (childObj.node) {
                    // childObj.node is a node data
                    childObj.node = CreateChildNode(childObj.node, customNodeHandlers);
                } else {
                    // childObj is a node data
                    children[key] = CreateChildNode(childObj, customNodeHandlers);
                }

            }

        }
    }

    // 2. Create (composite/action) node instance
    var handler;
    if (handlerName in CreateCompositeHandlers) {
        handler = CreateCompositeHandlers[handlerName];
    } else if (handlerName in CreateActionHandlers) {
        handler = CreateActionHandlers[handlerName];
    } else if (handlerName in customNodeHandlers) {
        handler = customNodeHandlers[handlerName];
    } else {
        throw `Can't create '${handlerName}' composite/action node`
    }    
    var retNode = handler(data);

    // 3. Create decorator instance
    if (decorators) {
        var handlerNames = Object.keys(decorators);
        // Create decorators from last to first
        for (var i = handlerNames.length - 1; i >= 0; i--) {
            var handlerName = handlerNames[i];
            var handler;
            if (handlerName in CreateDecoratorHandles) {
                handler = CreateDecoratorHandles[handlerName];
            } else if (handlerName in customNodeHandlers) {
                handler = customNodeHandlers[handlerName];
            } else {
                throw `Can't create '${handlerName}' decorator node`
            }
            retNode = handler(decorators[handlerName], retNode);
        }
    }

    return retNode;
}

var CreateChildNode = function (childObj, customNodeHandlers) {
    var childData, key;
    // childData is at first key of childObj
    for (key in childObj) {
        childData = childObj[key];
        break;
    }
    if (!IsPlainObject(childData)) {
        // childData is a single value, wrap to an object
        childData = childObj;
        childData.__isSingleValue__ = true;
    }

    childData.__handlerName__ = key;
    return CreateNode(childData, customNodeHandlers);
}

export default CreateNode;