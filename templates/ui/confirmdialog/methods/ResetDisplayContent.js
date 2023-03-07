import CreateLabel from '../../utils/build/CreateLabel.js';

var ResetDisplayContent = function (config) {
    if (config === undefined) {
        config = {};
    }

    var title = this.childrenMap.title;
    title.resetDisplayContent(config.title);

    var content = this.childrenMap.content;
    if (content.resetDisplayContent) {
        // Label
        content.resetDisplayContent(config.content);
    } else {
        // TextArea
        var text = config.content || '';
        content.setText(text)
    }

    var actionButtons = this.childrenMap.actions;
    if (Array.isArray(actionButtons)) {
        var buttonContentArray = config.buttons;
        if (!buttonContentArray) {
            var buttonA = actionButtons[0];
            if (buttonA) {
                buttonA.resetDisplayContent(config.buttonA);
            }

            var buttonB = actionButtons[1];
            if (buttonB) {
                buttonB.resetDisplayContent(config.buttonB);
            }

        } else {
            var scene = this.scene;
            var defaultActionConfig = this.defaultActionConfig;
            var defaultActionButtonCreator = this.defaultActionButtonCreator;
            for (var i = 0, cnt = buttonContentArray.length; i < cnt; i++) {
                var buttonContent = buttonContentArray[i];
                var button = actionButtons[i];
                if (!button) {
                    button = CreateLabel(scene, defaultActionConfig, defaultActionButtonCreator);
                    this.addAction(button);
                }
                button.show().resetDisplayContent(buttonContent);
            }

            this.buttonMode = buttonContentArray.length;

            for (var i = buttonContentArray.length - 1, cnt = actionButtons.length; i < cnt; i++) {
                actionButtons[i].hide();
            }
        }
    }

    var defaultChoiceConfig = this.defaultChoiceConfig;
    var buttonContentArray = config.choiceButtons;
    if (defaultChoiceConfig && buttonContentArray) {
        var scene = this.scene;
        var choiceButtons = this.childrenMap.choices;
        var defaultActionButtonCreator = this.defaultActionButtonCreator;
        for (var i = 0, cnt = buttonContentArray.length; i < cnt; i++) {
            var buttonContent = buttonContentArray[i];
            var button = choiceButtons[i];
            if (!button) {
                button = CreateLabel(scene, defaultChoiceConfig, defaultActionButtonCreator);
                this.addChoice(button);
            }
            button.show().resetDisplayContent(buttonContent);
        }

        for (var i = buttonContentArray.length - 1, cnt = choiceButtons.length; i < cnt; i++) {
            choiceButtons[i].hide();
        }
    }

    return this;
}

export default ResetDisplayContent;