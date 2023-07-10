import AddBarrelProperties from './AddBarrelProperties';
import AddBloomProperties from './AddBloomProperties';
import AddGlowProperties from './AddGlowProperties';
import AddGrayscaleProperties from './AddGrayscaleProperties';
import AddShineProperties from './AddShineProperties';

export default AddEffectProperties;

declare namespace AddEffectProperties {
    interface IConfig {
        barrel?: boolean,
        bloom?: boolean,
        glow?: boolean,
        grayscale?: boolean,
        shine?: boolean,
    }
    interface EffectPropertiesGameObject extends
        AddBarrelProperties.BarrelGameObject,
        AddBloomProperties.BloomGameObject,
        AddGlowProperties.GlowGameObject,
        AddGrayscaleProperties.GrayscaleGameObject,
        AddShineProperties.ShineGameObject { }

}

declare function AddEffectProperties(
    gameObject: Phaser.GameObjects.GameObject,
    config?: true | AddEffectProperties.IConfig
): AddEffectProperties.EffectPropertiesGameObject;
