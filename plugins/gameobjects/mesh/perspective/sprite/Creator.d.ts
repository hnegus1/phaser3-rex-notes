import Sprite from './Sprite';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        key?: string,
        frame?: string,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): Sprite;