import { Component,

  // Host, h, Prop, Event, EventEmitter
} from '@stencil/core';

// import type { FieldComponent } from '@sydle/sydle-one-components';

// // import '../../assets/polyfills.2960fb68898cf424.js';
// // import '../../assets/runtime.dc378bf1fd07472e.js';
// import '../../assets/main.90742e1f8caa98c4.js';
// import { getEmbeddedFieldAttributes,
// 	 OneApi,
// 	 FormFieldDidChangeValueDetail
// 	 } from '@sydle/sydle-one-components';

@Component({
  tag: 'elo-map-viewer-component',
  styleUrl: 'scss/index.scss',
  shadow: true,
})
export class MapViewerComponent {
  // 	@Prop() field: any;
  // 	@Prop() value: any;
  // 	@Prop() valuePath?: string;
  // 	@Event() syOneFormFieldDidChangeValue?: EventEmitter<FormFieldDidChangeValueDetail>;
  // 	teste: any;
  // 	async componentWillLoad() {
  // 		let res = await OneApi.objectAPI.get({'_classId': '5ccc9901afbd9f7db6695f28' ,'_id': '622b71f3cc08e97305681ea3'})
  // 		console.log(this.field)
  // 		// await this.getThemes(this.defaultChecked);
  // 	}
  // 	componentWillRender(){
  // 	}
  // 	patchItem(id, fieldName, area){
  // 		// Using: id;
  // 		// Finds: index of the theme to be patched;
  // 		// Where: one-field input list (themeField.value);
  // 		let idx = '';
  // 		// fieldName == 'anexos' ? idx = id : idx = this.areasField.value.findIndex(t => t.tema._id == id)
  // 		let event = this.syOneFormFieldDidChangeValue?.emit({
  // 			value: area,
  // 			options: { customPath: this.valuePath + `.${fieldName}.${idx}.area` },
  // 		});
  // 		console.log(event)
  // 	}
  // 	genericPatch(fieldName: String, value: String): Boolean | undefined {
  // 		// fieldName = identificador do campo que eu quero dar o patch
  // 		// value = valor a ser colocado no campo de destino
  // 		let event = this.syOneFormFieldDidChangeValue?.emit({
  // 			value: value,
  // 			options: { customPath: this.valuePath + `.${fieldName}` },
  // 		});
  // 		return event?.returnValue;
  // 	}
  // 	render() {
  // 		return (
  // 		<Host>
  // 			<sy-one-field
  // 				{...getEmbeddedFieldAttributes(this.field, this.value, String(this.valuePath), 'teste')}
  // 				ref={(el) => (this.teste = el)}
  // 			></sy-one-field>
  // 			<sy-input></sy-input>
  // 		</Host>
  // 		);
  // 	}
}
