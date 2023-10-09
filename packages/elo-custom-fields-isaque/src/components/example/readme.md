# elo-example



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                        | Type                  | Default     |
| ----------- | ------------ | ------------------------------------------------------------------ | --------------------- | ----------- |
| `field`     | `field`      | Field configuration. This attribute must be decorated as a @Prop() | `any`                 | `undefined` |
| `value`     | `value`      | Field value. This attribute must be decorated as a @Prop()         | `any`                 | `undefined` |
| `valuePath` | `value-path` | Path of field value in the reference eObject.                      | `string \| undefined` | `undefined` |


## Events

| Event                          | Description                                    | Type                                                                                                                                                                      |
| ------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `syOneFormFieldDidChangeValue` | Event emited when the field changes its value. | `CustomEvent<{ value: any; options?: BaseOptions<never> \| AddOptions \| MoveOptions \| RemoveOptions \| undefined; targetFieldElement?: FieldComponent \| undefined; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
