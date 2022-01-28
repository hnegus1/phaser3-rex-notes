import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class If extends Decorator {

    constructor(
        {
            expression = 'true',
            child = null,
            title,
            name = 'If'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    expression,
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is not running
        if (!this.isChildRunning(tick)) {
            // Abort child if eval result is false
            if (!tick.evalExpression(this.expression)) {
                return FAILURE;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default If;