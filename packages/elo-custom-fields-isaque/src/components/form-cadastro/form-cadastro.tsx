// import { Prop, State, Component, h, Host, Event, EventEmitter, Listen, Watch } from '@stencil/core';
// import { getEmbeddedFieldAttributes, OneApi } from '@sydle/sydle-one-components';
// import type {
//   FieldComponent,
//   FormFieldDidChangeValueDetail,
// } from '@sydle/sydle-one-components/dist/types/components/forms/one-form/one-field/one-field.interface';
// import '../../assets/polyfills.2960fb68898cf424.js';
// import '../../assets/runtime.dc378bf1fd07472e.js';
// import '../../assets/main.b5566eb63baf5645.js';

// @Component({
//   tag: 'elo-form-cadastro',
//   styleUrl: 'scss/index.scss',
//   shadow: true,
// })

// export class FormCadastro implements FieldComponent {
// 	@Function() getData?: () => void;
// 	@Prop() field: any;
// 	@Prop() value: any;
// 	@Prop() valuePath?: string;
// 	@Event() syOneFormFieldDidChangeValue?: EventEmitter<FormFieldDidChangeValueDetail>;
// 	@State() selectedTab: string = '';
// 	@State() paramsMapViewer: any = {
// 		"mapId": "",
// 		"title": "Mapa report 6",
// 		"baseMap": {
// 			"title": "titulo da camada",
// 			"type": "bing",
// 			"zIndex": 0,
// 			"key": "AsQMFShoIU3hEnknwia7vT_d3fL8X2dO6V3HZX57-Tfzp_jBdFvizuyqjTahBhkC",
// 			"imagerySet": "Aerial",
// 			"viewParams": []
// 		},
// 		"centerCoords": [
// 			-56.9447,
// 			-1.313
// 		],
// 		"projection": "EPSG:4674",
// 		"extent": [
// 			-58.8955,
// 			-9.8412,
// 			-46.07,
// 			4.4707
// 		],
// 		"defaultZoom": 1,
// 		"maxZoom": 19,
// 		"controls": {
// 			"fullScreen": true,
// 			"zoomInOut": true,
// 			"currentLocation": true,
// 			"zoomExtent": true,
// 			"scale": true,
// 			"scaleLine": true,
// 			"basemap": true,
// 			"rotate": true
// 		},
// 		"layers": {
// 			"sources": [
// 				{
// 					"title": "Municípios",
// 					"layerUrl": "https://geoserver.apps.geoapplications.net/geoserver/wms",
// 					"layerIdentifier": [
// 						"semas_car2_hom:vw_camada_municipios"
// 					],
// 					"permissions": [
// 						"view",
// 						"hide",
// 						"..."
// 					],
// 					"primary": false,
// 					"type": "geoserver",
// 					"zIndex": 5,
// 					"boundingBox": [],
// 					"sourceType": "wms",
// 					"descriptionFields": [
// 						{
// 							"displayName": "Município",
// 							"key": "tx_nome_municipio"
// 						},
// 						{
// 							"displayName": "Sigla do Estado",
// 							"key": "tx_sigla_municipio"
// 						},
// 						{
// 							"displayName": "Área",
// 							"key": "area_km2"
// 						}
// 					],
// 					"viewParams": []
// 				},
// 				// {
// 				//     "title": "Unidades da federação",
// 				//     "layerUrl": "https://geoserver.apps.geoapplications.net/geoserver/wms",
// 				//     "layerIdentifier": [
// 				//         "semas_car2_hom:vw_camada_ufs"
// 				//     ],
// 				//     "permissions": [
// 				//         "view",
// 				//         "hide",
// 				//         "..."
// 				//     ],
// 				//     "primary": false,
// 				//     "type": "geoserver",
// 				//     "zIndex": 10,
// 				//     "boundingBox": [],
// 				//     "sourceType": "wms",
// 				//     "descriptionFields": [
// 				//         {
// 				//             "displayName": "Nome da UF",
// 				//             "key": "tx_nome_uf"
// 				//         },
// 				//         {
// 				//             "displayName": "Sigla",
// 				//             "key": "tx_sigla_uf"
// 				//         },
// 				//         {
// 				//             "displayName": "Região",
// 				//             "key": "nm_regiao"
// 				//         }
// 				//     ],
// 				//     "viewParams": []
// 				// },
// 				// {
// 				//     "title": "Imóveis",
// 				//     "layerUrl": "https://geoserver.apps.geoapplications.net/geoserver/wms",
// 				//     "layerIdentifier": [
// 				//         "semas_car2_hom:geo_vw_imoveis"
// 				//     ],
// 				//     "permissions": [
// 				//         "view",
// 				//         "hide",
// 				//         "..."
// 				//     ],
// 				//     "visible": true,
// 				//     "zoomOnInit": true,
// 				//     "primary": false,
// 				//     "type": "geoserver",
// 				//     "zIndex": 9,
// 				//     "boundingBox": [
// 				//         -56.9447,
// 				//         -1.313,
// 				//         -56.9013,
// 				//         -1.2805
// 				//     ],
// 				//     "sourceType": "wms",
// 				//     "descriptionFields": [
// 				//         {
// 				//             "displayName": "Nome do Imóvel",
// 				//             "key": "tx_nome_imovel"
// 				//         },
// 				//         {
// 				//             "displayName": "Código do Imóvel",
// 				//             "key": "tx_cod_imovel"
// 				//         },
// 				//         {
// 				//             "displayName": "Status",
// 				//             "key": "tx_status_imovel"
// 				//         },
// 				//         {
// 				//             "displayName": "Tipo",
// 				//             "key": "tx_tipo_imovel"
// 				//         },
// 				//         {
// 				//             "displayName": "Número módulo fiscal",
// 				//             "key": "num_modulo_fiscal"
// 				//         },
// 				//         {
// 				//             "displayName": "Condição",
// 				//             "key": "tx_des_condicao"
// 				//         },
// 				//         {
// 				//             "displayName": "Área",
// 				//             "key": "area_calc_ir"
// 				//         }
// 				//     ],
// 				//     "viewParams": [
// 				//         "id_imovel:122161"
// 				//     ]
// 				// },
// 				// {
// 				//     "title": "Imóvel fora município de cadastro",
// 				//     "layerUrl": "https://geoserver.apps.geoapplications.net/geoserver/wms",
// 				//     "visible": true,
// 				//     "layerIdentifier": [
// 				//         "semas_car2_hom:geo_vw_detalhe_imovel_fora_municipio"
// 				//     ],
// 				//     "permissions": [
// 				//         "view",
// 				//         "hide",
// 				//         "..."
// 				//     ],
// 				//     "primary": false,
// 				//     "type": "geoserver",
// 				//     "zIndex": 8,
// 				//     "boundingBox": [
// 				//         -57.218,
// 				//         -1.4919,
// 				//         -56.8463,
// 				//         -1.1668
// 				//     ],
// 				//     "sourceType": "wms",
// 				//     "descriptionFields": [
// 				//         {
// 				//             "displayName": "Cod. Imovel Vizinho",
// 				//             "key": "cod_imovel_vizinho"
// 				//         },
// 				//         {
// 				//             "displayName": "Orgão Responsável",
// 				//             "key": "tx_orgao_resp"
// 				//         },
// 				//         {
// 				//             "displayName": "Data da última análise",
// 				//             "key": "data_ultima_analise"
// 				//         }
// 				//     ],
// 				//     "viewParams": [
// 				//         "id_imovel:122161"
// 				//     ]
// 				// }
// 			]
// 		}
// 	};

	
// 	radioSelected = (e) => {
// 		let tab = e.composedPath()[0].getInnerHTML()
// 		this.selectedTab = tab;
// 		console.log(this.valuePath)
// 	};




//   render() {
//     return (
//       <Host>
//         <sy-button-group>
// 			<sy-button
// 				onClick={(e) => {
// 					// e.preventDefault();
// 					this.radioSelected(e);
// 					// console.log(group)
// 				}}
// 				ref={(el) => {
// 					// this.groupsRef[group._id] = el;
// 				}}
// 				button-type="radio"
// 				label="Analisar Ficha do Imóvel"
// 				name='group'
// 				key={101}
// 				type="default"
// 				// data-id={group._id}
// 			></sy-button>
// 			<sy-button
// 				onClick={(e) => {
// 					// e.preventDefault();
// 					this.radioSelected(e);
// 					// console.log(group)
// 				}}
// 				ref={(el) => {
// 					// this.groupsRef[group._id] = el;
// 				}}
// 				button-type="radio"
// 				label="Sobreposição - Terra Indígena"
// 				name='group'
// 				key={102}
// 				type="default"
// 				// data-id={group._id}
// 			></sy-button>
// 			<sy-button
// 				onClick={(e) => {
// 					// e.preventDefault();
// 					this.radioSelected(e);
// 					// console.log(group)
// 				}}
// 				ref={(el) => {
// 					// this.groupsRef[group._id] = el;
// 				}}
// 				button-type="radio"
// 				label="Sobreposição - Unidade de Conservação"
// 				name='group'
// 				key={103}
// 				type="default"
// 				// data-id={group._id}
// 			></sy-button>
// 		</sy-button-group>

// 		<web-map-viewer 
// 			// parsedFiles={this.shapeFile} 
// 			params={this.paramsMapViewer}
// 		/>
// 		<br></br>
// 		<br></br>
// 		<br></br>
// 		<br></br>
// 		{/* <br></br>
// 		<br></br>
// 		<br></br>
// 		<br></br>
// 		<br></br>
// 		<br></br>
// 		<br></br> */}
//       </Host>
//     );
//   }
// }
