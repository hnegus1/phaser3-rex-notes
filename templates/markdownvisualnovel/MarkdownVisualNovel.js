import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import CreateCommandExecutor from './commandexecutor/CreateCommandExecutor.js';

class MarkdownVisualNovel extends MarkedEventSheets {
    constructor(scene, config = {}) {
        config.commandExecutor = CreateCommandExecutor(scene, config);
        super(scene, config);
    }
}

export default MarkdownVisualNovel;