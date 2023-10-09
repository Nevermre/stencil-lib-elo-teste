import { Prop, State, Component, h, Host, Event, EventEmitter, Listen, Element } from '@stencil/core';
import { getEmbeddedFieldAttributes, OneApi } from '@sydle/sydle-one-components';
import type {
  FieldComponent,
  FormFieldDidChangeValueDetail,
} from '@sydle/sydle-one-components/dist/types/components/forms/one-form/one-field/one-field.interface';
import * as zip from '@zip.js/zip.js';
import '../../assets/polyfills.2960fb68898cf424.js';
import '../../assets/runtime.dc378bf1fd07472e.js';
import '../../assets/main.bd81318f8ac9a2b6.js';
import shp from 'shpjs';
import * as turf from '@turf/turf';
import { geomReduce } from '@turf/meta';
import { Coord, MultiPolygon, Polygon } from '@turf/turf';
import createGenerator from 'golden-number';

import * as geodesic from 'geographiclib-geodesic';
const geod = geodesic.Geodesic.WGS84;

@Component({
  tag: 'elo-example',
  styleUrl: 'scss/index.scss',
  shadow: true,
})

// TODO: check if every state needs to be state (it reloads the component when changes)
export class Example implements FieldComponent {
  generator = createGenerator(0.42);
  @Element() el;
  @State() area: any;
  @State() remanescente: any;
  @State() groupField: any;
  @State() themeField: any;
  @State() temas: any;
  @State() filesField: any;
  @State() extensions: any[];
  @State() paramsMapViewer: any = {
    mapId: '',
    title: 'Mapa report 6',
    controlSize: 'large',
    fontSize: 'large',
    markerIcon: 'default',
    baseMap: [
      {
        title: 'titulo da camada',
        type: 'bing',
        zIndex: 0,
        key: 'AsQMFShoIU3hEnknwia7vT_d3fL8X2dO6V3HZX57-Tfzp_jBdFvizuyqjTahBhkC',
        imagerySet: 'Aerial',
        viewParams: [],
      },
      {
        title: 'titulo da camada',
        type: 'OSM',
        zIndex: 0,
        key: 'AsQMFShoIU3hEnknwia7vT_d3fL8X2dO6V3HZX57-Tfzp_jBdFvizuyqjTahBhkC',
        imagerySet: 'Aerial',
        viewParams: [],
      },
    ],
    rasters: [
      {
        title: 'Uso do Solo - Mapbiomas',
        layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
        layerIdentifier: [
          { description: '2021', identifier: 'workspace_mit:Uso do Solo - 2021 - Mapbiomas' },
          { description: '2022', identifier: 'workspace_mit:Pastagem - 2021 - Mapbiomas	' },
          { description: '2023', identifier: 'workspace_mit:Estrutura Florestal' },
        ],
        geoserverType: 'raster',
        permissions: ['view', 'hide', '...'],
        primary: false,
        type: 'geoserver',
        visible: false,
        zIndex: 1,
        boundingBox: [],
        sourceType: 'wms',
        descriptionFields: [
          {
            displayName: 'Nome da UF',
            key: 'tx_nome_uf',
          },
          {
            displayName: 'Sigla',
            key: 'tx_sigla_uf',
          },
          {
            displayName: 'Região',
            key: 'nm_regiao',
          },
        ],
        viewParams: [],
      },
      {
        title: 'Pastagem - Mapbiomas',
        layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
        layerIdentifier: [{ description: '2021', identifier: 'workspace_mit:Pastagem - 2021 - Mapbiomas	' }],
        geoserverType: 'raster',
        permissions: ['view', 'hide', '...'],
        visible: true,
        zoomOnInit: false,
        primary: false,
        type: 'geoserver',
        zIndex: 2,
        boundingBox: [-56.9447, -1.313, -56.9013, -1.2805],
        sourceType: 'wms',
        descriptionFields: [
          {
            displayName: 'Nome do Imóvel',
            key: 'tx_nome_imovel',
          },
          {
            displayName: 'Código do Imóvel',
            key: 'tx_cod_imovel',
          },
          {
            displayName: 'Status',
            key: 'tx_status_imovel',
          },
          {
            displayName: 'Tipo',
            key: 'tx_tipo_imovel',
          },
          {
            displayName: 'Número módulo fiscal',
            key: 'num_modulo_fiscal',
          },
          {
            displayName: 'Condição',
            key: 'tx_des_condicao',
          },
          {
            displayName: 'Área',
            key: 'area_calc_ir',
          },
        ],
        viewParams: ['id_imovel:122161'],
      },
    ],
    centerCoords: [-56.9447, -1.313],
    projection: 'EPSG:4674',
    extent: [-122.19, -59.87, -25.28, 32.72],
    defaultZoom: 1,
    maxZoom: 19,
    controls: {
      draw: true,
      legend: true,
      exportAsImage: true,
      marker: true,
      selectVertex: true,
      search: true,
    },
    layers: {
      availableGroups: ['UF', 'Imovel'],
      sources: [
        {
          title: 'Municípios',
          group: 'UF',
          layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
          layerIdentifier: ['workspace_car_20:vw_camada_municipios'],
          permissions: ['view', 'hide', '...'],
          primary: false,
          type: 'geoserver',
          zIndex: 5,
          boundingBox: [],
          searchField: {
            displayName: 'Nome do Município',
            key: 'tx_nome_municipio',
          },
          sourceType: 'wms',
          descriptionFields: [
            {
              displayName: 'Município',
              key: 'tx_nome_municipio',
            },
            {
              displayName: 'Sigla do Estado',
              key: 'tx_sigla_municipio',
            },
            {
              displayName: 'Área',
              key: 'area_km2',
            },
          ],
          viewParams: [],
          enableFilters: false,
          filterList: [
            {
              key: 'tx_nome_municipio',
              value: "'Itupiranga'",
            },
            {
              key: 'id_municipio',
              value: '',
            },
          ],
          zoomOnInit: true,
          visible: true,
        },
        {
          title: 'Unidades da federação',
          group: 'UF',
          layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
          layerIdentifier: ['workspace_car_20:vw_camada_ufs'],
          permissions: ['view', 'hide', '...'],
          searchField: {
            displayName: 'Estado',
            key: 'tx_nome_uf',
          },
          primary: false,
          type: 'geoserver',
          zIndex: 10,
          boundingBox: [],
          sourceType: 'wms',
          descriptionFields: [
            {
              displayName: 'Nome da UF',
              key: 'tx_nome_uf',
            },
            {
              displayName: 'Sigla',
              key: 'tx_sigla_uf',
            },
            {
              displayName: 'Região',
              key: 'nm_regiao',
            },
          ],
          viewParams: [],
        },
        {
          title: 'Imóveis',
          group: 'Imovel',
          layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
          layerIdentifier: ['workspace_car_20:geo_vw_imoveis'],
          permissions: ['view', 'hide', '...'],
          visible: true,
          zoomOnInit: false,
          primary: false,
          type: 'geoserver',
          zIndex: 9,
          boundingBox: [-56.9447, -1.313, -56.9013, -1.2805],
          sourceType: 'wms',
          descriptionFields: [
            {
              displayName: 'Nome do Imóvel',
              key: 'tx_nome_imovel',
            },
            {
              displayName: 'Código do Imóvel',
              key: 'tx_cod_imovel',
            },
            {
              displayName: 'Status',
              key: 'tx_status_imovel',
            },
            {
              displayName: 'Tipo',
              key: 'tx_tipo_imovel',
            },
            {
              displayName: 'Número módulo fiscal',
              key: 'num_modulo_fiscal',
            },
            {
              displayName: 'Condição',
              key: 'tx_des_condicao',
            },
            {
              displayName: 'Área',
              key: 'area_calc_ir',
            },
          ],
          viewParams: ['id_imovel:122161'],
        },
        {
          title: 'Imóvel fora município de cadastro',
          group: 'Imovel',
          layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
          visible: true,
          layerIdentifier: ['workspace_car_20:geo_vw_detalhe_imovel_fora_municipio'],
          permissions: ['view', 'hide', '...'],
          primary: false,
          type: 'geoserver',
          zIndex: 8,
          boundingBox: [-57.218, -1.4919, -56.8463, -1.1668],
          sourceType: 'wms',
          descriptionFields: [
            {
              displayName: 'Cod. Imovel Vizinho',
              key: 'cod_imovel_vizinho',
            },
            {
              displayName: 'Orgão Responsável',
              key: 'tx_orgao_resp',
            },
            {
              displayName: 'Data da última análise',
              key: 'data_ultima_analise',
            },
          ],
          viewParams: ['id_imovel:122161'],
        },
      ],
      referenceBase: [
        {
          title: 'Municípios',
          group: 'UF',
          layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
          layerIdentifier: ['workspace_car_20:vw_camada_municipios'],
          permissions: ['view', 'hide', '...'],
          primary: false,
          type: 'geoserver',
          zIndex: 5,
          boundingBox: [],
          sourceType: 'wms',
          descriptionFields: [
            {
              displayName: 'Município',
              key: 'tx_nome_municipio',
            },
            {
              displayName: 'Sigla do Estado',
              key: 'tx_sigla_municipio',
            },
            {
              displayName: 'Área',
              key: 'area_km2',
            },
          ],
          viewParams: [],
          enableFilters: false,
          filterList: [
            {
              key: 'tx_nome_municipio',
              value: '',
            },
            {
              key: 'id_municipio',
              value: '',
            },
          ],
          zoomOnInit: false,
          visible: true,
        },
        {
          title: 'Unidades da federação',
          group: 'UF',
          layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
          layerIdentifier: ['workspace_car_20:vw_camada_ufs'],
          permissions: ['view', 'hide', '...'],
          primary: false,
          type: 'geoserver',
          zIndex: 10,
          boundingBox: [],
          sourceType: 'wms',
          descriptionFields: [
            {
              displayName: 'Nome da UF',
              key: 'tx_nome_uf',
            },
            {
              displayName: 'Sigla',
              key: 'tx_sigla_uf',
            },
            {
              displayName: 'Região',
              key: 'nm_regiao',
            },
          ],
          viewParams: [],
        },
        {
          title: 'Imóveis',
          group: 'Imovel',
          layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
          layerIdentifier: ['workspace_car_20:geo_vw_imoveis'],
          permissions: ['view', 'hide', '...'],
          visible: true,
          zoomOnInit: false,
          primary: false,
          type: 'geoserver',
          zIndex: 9,
          boundingBox: [-56.9447, -1.313, -56.9013, -1.2805],
          sourceType: 'wms',
          descriptionFields: [
            {
              displayName: 'Nome do Imóvel',
              key: 'tx_nome_imovel',
            },
            {
              displayName: 'Código do Imóvel',
              key: 'tx_cod_imovel',
            },
            {
              displayName: 'Status',
              key: 'tx_status_imovel',
            },
            {
              displayName: 'Tipo',
              key: 'tx_tipo_imovel',
            },
            {
              displayName: 'Número módulo fiscal',
              key: 'num_modulo_fiscal',
            },
            {
              displayName: 'Condição',
              key: 'tx_des_condicao',
            },
            {
              displayName: 'Área',
              key: 'area_calc_ir',
            },
          ],
          viewParams: ['id_imovel:122161'],
        },
        {
          title: 'Imóvel fora município de cadastro',
          group: 'Imovel',
          layerUrl: 'https://geoserverdw.apps.geoapplications.net/geoserver/wms',
          visible: true,
          layerIdentifier: ['workspace_car_20:geo_vw_detalhe_imovel_fora_municipio'],
          permissions: ['view', 'hide', '...'],
          primary: false,
          type: 'geoserver',
          zIndex: 8,
          boundingBox: [-57.218, -1.4919, -56.8463, -1.1668],
          sourceType: 'wms',
          descriptionFields: [
            {
              displayName: 'Cod. Imovel Vizinho',
              key: 'cod_imovel_vizinho',
            },
            {
              displayName: 'Orgão Responsável',
              key: 'tx_orgao_resp',
            },
            {
              displayName: 'Data da última análise',
              key: 'data_ultima_analise',
            },
          ],
          viewParams: ['id_imovel:122161'],
        },
      ],
      drawedLayers: [],
    },
  };
  @State() shapeFile: any = null;
  @State() shapeArea: any = null;
  @Function() getData?: () => void;
  @Prop() field: any;
  @State() files: Object = {};
  @Prop() value: any;
  @Prop() valuePath?: string;
  @Event() syOneFormFieldDidChangeValue?: EventEmitter<FormFieldDidChangeValueDetail>;

  // @Event() syOneFileFieldDidUpload?: any;
  @State() groupClassId: any = '648ca2c281d70e4d61d5c851';
  @State() groupsSearch: any[] = [
    {
      _type: '_doc',
      _id: '6494369baabaad5335bfb9bd',
      _score: 1.287682,
      _source: {
        _creationUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _revision: '1cf8968ff61cc7f59503582ff72862af',
        _lastUpdateUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _classRevision: 'c12aaf8c69da200bd1eb03a8f3e8fb03',
        nome: 'Tipologia',
        _creationDate: '2023-06-22T11:55:07.385Z',
        menu: true,
        _publishedObject: null,
        _lastUpdateDate: '2023-07-12T15:27:59.449Z',
        _protected: false,
        codExterno: '9',
        _class: {
          _id: '648ca2c281d70e4d61d5c851',
          _classId: '000000000000000000000000',
        },
        _id: '6494369baabaad5335bfb9bd',
      },
      fields: null,
      sort: null,
      _esSource: null,
    },
    {
      _type: '_doc',
      _id: '6494366daabaad5335bdbc63',
      _score: 1.287682,
      _source: {
        _creationUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _revision: '290a58453f664e273b536ac945508785',
        _lastUpdateUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _classRevision: 'c12aaf8c69da200bd1eb03a8f3e8fb03',
        nome: 'Área do Imóvel',
        _creationDate: '2023-06-22T11:54:21.476Z',
        menu: true,
        _publishedObject: null,
        _lastUpdateDate: '2023-07-12T15:28:15.504Z',
        _protected: false,
        codExterno: '6',
        _class: {
          _id: '648ca2c281d70e4d61d5c851',
          _classId: '000000000000000000000000',
        },
        _id: '6494366daabaad5335bdbc63',
      },
      fields: null,
      sort: null,
      _esSource: null,
    },
    {
      _type: '_doc',
      _id: '6494365dd3d03471c8b97949',
      _score: 1.287682,
      _source: {
        _creationUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _revision: '04f43b982749e937aa142a743a36ea64',
        _lastUpdateUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _classRevision: 'c12aaf8c69da200bd1eb03a8f3e8fb03',
        nome: 'Área de Preservação Permanente',
        _creationDate: '2023-06-22T11:54:05.032Z',
        menu: true,
        _publishedObject: null,
        _lastUpdateDate: '2023-07-12T15:28:19.818Z',
        _protected: false,
        codExterno: '5',
        _class: {
          _id: '648ca2c281d70e4d61d5c851',
          _classId: '000000000000000000000000',
        },
        _id: '6494365dd3d03471c8b97949',
      },
      fields: null,
      sort: null,
      _esSource: null,
    },
    {
      _type: '_doc',
      _id: '64943647d3d03471c8b8ae74',
      _score: 1.287682,
      _source: {
        _creationUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _revision: '50df0f641d2e84396782d0e5b39a869e',
        _lastUpdateUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _classRevision: 'c12aaf8c69da200bd1eb03a8f3e8fb03',
        nome: 'Reserva Legal',
        _creationDate: '2023-06-22T11:53:43.474Z',
        menu: true,
        _publishedObject: null,
        _lastUpdateDate: '2023-07-12T15:28:24.207Z',
        _protected: false,
        codExterno: '3',
        _class: {
          _id: '648ca2c281d70e4d61d5c851',
          _classId: '000000000000000000000000',
        },
        _id: '64943647d3d03471c8b8ae74',
      },
      fields: null,
      sort: null,
      _esSource: null,
    },
    {
      _type: '_doc',
      _id: '648cb164f34e252e8d2849f8',
      _score: 1.287682,
      _source: {
        _creationUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _revision: '462f6bfe34d91e7843ace05e2bd7a4e7',
        _lastUpdateUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _classRevision: 'c12aaf8c69da200bd1eb03a8f3e8fb03',
        nome: 'Servidão Administrativa',
        _creationDate: '2023-06-16T19:00:52.057Z',
        menu: true,
        _publishedObject: null,
        _lastUpdateDate: '2023-07-12T15:29:19.981Z',
        _protected: false,
        codExterno: '4',
        _class: {
          _id: '648ca2c281d70e4d61d5c851',
          _classId: '000000000000000000000000',
        },
        _id: '648cb164f34e252e8d2849f8',
      },
      fields: null,
      sort: null,
      _esSource: null,
    },
    {
      _type: '_doc',
      _id: '648cae340a7269115eee6be4',
      _score: 1.287682,
      _source: {
        _creationUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _revision: 'a84fca2ebada7a75999b1bf09810e591',
        _lastUpdateUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _classRevision: 'c12aaf8c69da200bd1eb03a8f3e8fb03',
        nome: 'Área de Uso Restrito',
        _creationDate: '2023-06-16T18:47:16.112Z',
        menu: true,
        _publishedObject: null,
        _lastUpdateDate: '2023-07-12T15:29:24.748Z',
        _protected: false,
        codExterno: '2',
        _class: {
          _id: '648ca2c281d70e4d61d5c851',
          _classId: '000000000000000000000000',
        },
        _id: '648cae340a7269115eee6be4',
      },
      fields: null,
      sort: null,
      _esSource: null,
    },
    {
      _type: '_doc',
      _id: '648cadef0a7269115eebbe2e',
      _score: 1.287682,
      _source: {
        _creationUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _revision: 'dba5b3a08b03446b8d68a36872bf582b',
        _lastUpdateUser: {
          _id: '5f68b587428dd63897c63d4f',
          _classId: '000000000000000000000002',
        },
        _classRevision: 'c12aaf8c69da200bd1eb03a8f3e8fb03',
        nome: 'Cobertura do solo',
        _creationDate: '2023-06-16T18:46:07.824Z',
        menu: true,
        _publishedObject: null,
        _lastUpdateDate: '2023-07-12T15:29:30.620Z',
        _protected: false,
        codExterno: '1',
        _class: {
          _id: '648ca2c281d70e4d61d5c851',
          _classId: '000000000000000000000000',
        },
        _id: '648cadef0a7269115eebbe2e',
      },
      fields: null,
      sort: null,
      _esSource: null,
    },
  ];
  @State() selectedGroup: any = '6494366daabaad5335bdbc63';

  @State() groupsRef: any = {};
  themesRef: Object = {};
  fileField: any;

  @State() themeAreas: Object = {};
  @State() toasts: any[] = [];
  @State() toasterRef: any;
  @State() zipReader: any;

  @State() imovelSum: any;
  @State() servidaoSum: any;

  @State() themesSearch: any[] = [];

  themeClassId: any = '648ca8730a7269115e5dbe23';
  defaultChecked: any = '6494366daabaad5335bdbc63';
  map: any;
  areasField: any;

  // Área do Imóvel
  id_areaImovel: any = '649439f7d3d03471c8ec48c5';
  id_areaLiquidaImovel: any = '64c1091ef90a0a42e962779b';

  // Servidão Administrativa
  id_infraestruturaPublica: any = '64943820d3d03471c8d2b344';
  id_utilidadePublica: any = '64943844aabaad5335d7d72e';
  id_reservatorio: any = '6494385dd3d03471c8d6e708';
  id_entornoReservatorio: any = '64c0fb2207bf1b4262685c92';
  id_servidaoMineraria: any = '6494386cd3d03471c8d7c1d4';
  id_aggServidaoAdministrativa: any = '64c0fb4407bf1b4262691ca2';
  faixaInput: any;
  dialogRef: any;
  entornoReservatorioValue: any;

  // Reserva Legal
  id_rl_proposta: any = '6494370baabaad5335c6ea3d';
  id_rl_averbada: any = '6494372baabaad5335c88c78';
  id_rl_aprovada: any = '64943740aabaad5335c9b1e4';
  id_rl_outro: any = '64943788aabaad5335cc2088';
  id_rl_excedente: any = '64dcae8067f8e20bc21cc00d';
  id_rl_passivo: any = '64dcaeb007bf1b426262a2f0';
  id_rl_total: any = '64dcaed707bf1b4262674e18';

  // Cobertura do solo
  id_consolidada: any = '648cb3eef34e252e8d6e4581';
  id_regeneracao: any = '64c7ae6907bf1b4262ec9d98';
  id_regeneracao_consolidada: any = '64c7ae45f90a0a42e94a5d4c';
  id_regeneracao_antropizada: any = '64c7ae5707bf1b4262eba53f';

  // APP
  id_restinga: any = '64943882d3d03471c8d98ed9'; // no buffer
  id_curso_natural_10: any = '6494389daabaad5335db9089'; // buffer
  id_curso_natural_50: any = '649438b3d3d03471c8de4695'; // buffer
  id_curso_natural_200: any = '649438cbaabaad5335ddb5bd'; // buffer
  id_curso_natural_600: any = '649438e2aabaad5335de6339'; // buffer
  id_curso_natural_601: any = '649438f6d3d03471c8e1d9a8'; // buffer
  id_lago: any = '6515c27ad68d586e1a106c88'; // buffer
  id_nascente: any = '6494390baabaad5335e083d4'; // buffer
  id_reservatorio_artificial: any = '6494392cd3d03471c8e3c040'; // buffer
  id_manguezal: any = '6494393dd3d03471c8e41897'; // buffer
  id_vereda: any = '64943949aabaad5335e4f268'; // buffer
  id_altitude: any = '6494395faabaad5335e57fde'; // no buffer
  id_declividade: any = '64943977d3d03471c8e67f74'; // buffer
  id_chapada: any = '64943987d3d03471c8e7c4f1'; // buffer
  id_morro: any = '64943997d3d03471c8e8c797'; // buffer
  id_banhado: any = '649439a7aabaad5335e8e8be'; // buffer
  id_reservatorio_energia: any = '649439d4d3d03471c8eb0ce3'; // buffer

  id_app_total: any = '650483b99ae91642b6c65dca';
  id_app_buffer: any = '650483e99ae91642b6c86810';
  zindex: any = 20;

  constructor() {
    setTimeout(() => {
      const todoListElement = this.el.shadowRoot.querySelectorAll('li.p-menuitem');
      todoListElement?.forEach((element) => {
        let submenu = [...element.childNodes].find((child) => child.localName === 'p-tieredmenusub');
        if (submenu)
          element.addEventListener('click', (event) => {
            event.stopPropagation();
          });
      });
    }, 5000);
  }

  @Listen('syInputDidChange')
  inputHandler(event: any) {
    console.log(event);
  }

  // @Listen('syOneFormFieldDidChangeValue')
  // formChange(event: any){
  // 	let source = event;

  // 	console.log(source.detail.value)
  // }

  @Listen('syOneFileFieldDidUpload')
  async fileUpload(event: any) {
    console.log('evento', event);
    console.log('value', this.value);

    const file = event.detail.fileList[0];
    const themeId = this.value.anexos[event.detail.valuePath.split('.').at(-2)].tema._id;
    const tableId = this.value.anexos[event.detail.valuePath.split('.').at(-2)]._id;

    const servidaoThemes = [this.id_infraestruturaPublica, this.id_utilidadePublica, this.id_servidaoMineraria];
    const reservaThemes = [this.id_rl_proposta, this.id_rl_averbada, this.id_rl_outro, this.id_rl_aprovada];
    const coberturaThemes = [this.id_consolidada, this.id_regeneracao];
    const appThemes = [
      this.id_restinga,
      this.id_curso_natural_10,
      this.id_curso_natural_50,
      this.id_curso_natural_200,
      this.id_curso_natural_600,
      this.id_curso_natural_601,
      this.id_lago,
      this.id_nascente,
      this.id_reservatorio_artificial,
      this.id_manguezal,
      this.id_vereda,
      this.id_altitude,
      this.id_declividade,
      this.id_chapada,
      this.id_morro,
      this.id_banhado,
      this.id_reservatorio_energia,
    ];

    // Área do Imóvel
    if (themeId == this.id_areaImovel) {
      await this.filesHandler(file, themeId, tableId);

      // console.log(this.themeAreas)
      this.areaLiquidaImovel();
      this.reservaLegal();
    }

    // Servidão Administrativa
    else if (themeId == this.id_reservatorio) {
      // Reservatório (buffer)
      await this.filesHandler(file, themeId, tableId);
      this.dialogRef.open();
    } else if (servidaoThemes.includes(themeId)) {
      // other servidao themes
      await this.filesHandler(file, themeId, tableId);
      this.agregadoServidao();
      this.areaLiquidaImovel();
    }

    // Reserva Legal
    else if (reservaThemes.includes(themeId)) {
      await this.filesHandler(file, themeId, tableId);
      this.areaLiquidaImovel();
      this.reservaLegal();
    }

    // Cobertura do Solo
    else if (coberturaThemes.includes(themeId)) {
      await this.filesHandler(file, themeId, tableId);
      this.calculoCobertura();
    }

    // APP
    else if (appThemes.includes(themeId)) {
      await this.filesHandler(file, themeId, tableId);
      this.calculoAppAggBuffer(themeId);
    }

    // exception
    else {
      await this.filesHandler(file, themeId, tableId);
    }
  }

  getModuloFiscal(city) {
    let modulo = 75;
    if (city == 1500602) {
      modulo = 75;
    }
    const qtd = Number(this.themeAreas[this.id_areaImovel]) / modulo;
    return qtd;
  }

  getFaixa(themeId, modulo) {
    const cursosDagua = [
      this.id_curso_natural_10,
      this.id_curso_natural_50,
      this.id_curso_natural_200,
      this.id_curso_natural_600,
      this.id_curso_natural_601,
    ];

    if (cursosDagua.includes(themeId)) {
      if (modulo < 1) {
        return 5;
      }
      if (modulo >= 1 && modulo < 2) {
        return 8;
      }
      if (modulo >= 2 && modulo < 4) {
        return 15;
      }

      return 20;
    }
    if ((themeId = this.id_nascente)) {
      return 15;
    }
    if ((themeId = this.id_lago)) {
      if (modulo < 1) {
        return 5;
      }
      if (modulo >= 1 && modulo < 2) {
        return 8;
      }
      if (modulo >= 2 && modulo < 4) {
        return 15;
      }

      return 30;
    }
    if ((themeId = this.id_vereda)) {
      if (modulo < 4) {
        return 30;
      }

      return 50;
    }

    return 15; // fallback
  }

  calculoAppAggBuffer(themeId) {
    const intersect: any = turf.intersect(this.files[this.id_areaImovel].features[0], this.files[themeId].features[0]);
    const modulo = this.getModuloFiscal(1500602);
    const faixa = this.getFaixa(themeId, modulo);
    const bufferArea = this.calculoBuffer(intersect, faixa);
    this.themeAreas[this.id_app_buffer] = Number(this.themeAreas[this.id_app_buffer])
      ? Number(this.themeAreas[this.id_app_buffer]) + bufferArea
      : bufferArea;
    this.patchItem(
      this.id_app_buffer,
      'areasExtras',
      this.themeAreas[this.id_app_buffer].toLocaleString('pt-br', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }),
    );
    this.patchItem(
      this.id_app_total,
      'areasExtras',
      this.themeAreas[this.id_app_buffer].toLocaleString('pt-br', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }),
    );
  }

  calculoBuffer(geojson, bufferSize) {
    const buffer: any = turf.buffer(geojson, bufferSize, { units: 'meters' });
    const intersect: any = turf.intersect(this.files[this.id_areaImovel].features[0], buffer);

    // console.log('BUFFER result', buffer)
    const diff = turf.difference(intersect, geojson);
    const num = this.generator(); // => 0.70693204169029
    const golden_color = `hsl(${Math.round(num * 360)}, 55%, 60%)`;
    this.shapeFile = [
      {
        title: 'Buffer APP',
        group: 'Imovel',
        visible: true,
        type: 'geoJson',
        geoJson: diff,
        fillColor: golden_color,
        strokeColor: 'green',
        zIndex: this.zindex,
      },
    ];
    this.zindex = this.zindex + 1;

    // console.log(diff);
    return this.getArea(diff);
  }

  testArea(
    geojson,

    // : FeatureCollection<MultiPolygon|Polygon> | Feature<MultiPolygon|Polygon> // : number
  ) {
    return (geomReduce(geojson, (value, geom) => value + this.calculateArea(geom), 0) / 10000).toLocaleString('pt-br', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  }

  calculateArea(geom: MultiPolygon | Polygon): number {
    switch (geom.type) {
      case 'Polygon':
        return this.polygonArea(geom.coordinates);
      case 'MultiPolygon':
        return geom.coordinates.reduce((value, coords) => value + this.polygonArea(coords), 0);
      default:
        return 0;
    }
  }

  polygonArea(coords: Coord[][]): number {
    return coords.reduce((value, coord) => value + this.computeRing(coord), 0);
  }

  computeRing(coordinates: Coord[]): number {
    const poly = geod.Polygon(false);
    coordinates.forEach((coord) => {
      poly.AddPoint(coord[1], coord[0]); // NOTE - lat, lng order
    });

    const computed = poly.Compute(false, true);
    return Math.abs(computed.area);
  }

  // Cálculo de Área Líquida do Imóvel
  areaLiquidaImovel(): any {
    const areaLiquidaImovel = this.calculoAreaLiquidaImovel().toLocaleString('pt-br', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
    this.themeAreas[this.id_areaLiquidaImovel] = areaLiquidaImovel;
    this.patchItem(this.id_areaLiquidaImovel, 'areasExtras', areaLiquidaImovel); // dá patch na tabela do one
  }

  // Agregado de Servidão
  agregadoServidao(): any {
    // Área do Imóvel
    const areaDoImovel =
      (this.id_areaImovel in this.themeAreas && Number(this.themeAreas[this.id_areaImovel].replace(',', '.'))) || 0;

    let aggServidao = this.calculoAggServidao(); // calcula agregado de servidao
    aggServidao <= areaDoImovel ? (aggServidao = aggServidao) : (aggServidao = areaDoImovel);
    const aggServidaoStr = aggServidao.toLocaleString('pt-br', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    this.themeAreas[this.id_aggServidaoAdministrativa] = aggServidaoStr; // preenche objeto de buscas
    this.patchItem(this.id_aggServidaoAdministrativa, 'areasExtras', aggServidaoStr); // dá patch na tabela do one
  }

  // Reserva Legal passivo
  reservaLegal(): any {
    const passivoAtivo = this.calculoReservaLegal(this.calculoAreaLiquidaImovel());

    // console.log(passivoAtivo)
    if (passivoAtivo.calculo > 0) {
      this.themeAreas[this.id_rl_passivo] = passivoAtivo.calculo;
      this.themeAreas[this.id_rl_excedente] = 0;
      this.patchItem(
        this.id_rl_passivo,
        'areasExtras',
        passivoAtivo.calculo.toLocaleString('pt-br', { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
      ); // dá patch na tabela do one
      this.patchItem(this.id_rl_excedente, 'areasExtras', 0); // dá patch na tabela do one
    } else if (passivoAtivo.calculo < 0) {
      this.themeAreas[this.id_rl_passivo] = 0;
      this.themeAreas[this.id_rl_excedente] = passivoAtivo.calculo * -1;
      this.patchItem(this.id_rl_passivo, 'areasExtras', 0); // dá patch na tabela do one
      this.patchItem(
        this.id_rl_excedente,
        'areasExtras',
        (passivoAtivo.calculo * -1).toLocaleString('pt-br', { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
      ); // dá patch na tabela do one
    } else if (passivoAtivo.calculo == 0) {
      this.themeAreas[this.id_rl_passivo] = 0;
      this.themeAreas[this.id_rl_excedente] = 0;
      this.patchItem(this.id_rl_passivo, 'areasExtras', 0); // dá patch na tabela do one
      this.patchItem(this.id_rl_excedente, 'areasExtras', 0); // dá patch na tabela do one
    }
    this.themeAreas[this.id_rl_total] = passivoAtivo.total;
    this.patchItem(
      this.id_rl_total,
      'areasExtras',
      passivoAtivo.total.toLocaleString('pt-br', { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
    );
  }

  // Cobertura do solo
  cobertura(): any {}

  // Seleção do radio
  radioSelected = async (id: any) => {
    if (this.selectedGroup != id) {
      const event = this.syOneFormFieldDidChangeValue?.emit({
        value: { _id: id },
        options: { customPath: `${this.valuePath}.grupo` },
      });
      this.selectedGroup = id;
      console.log(event);
    }
    this.groupsRef[id].checked = true;

    // await this.getThemes(this.selectedGroup);
    // console.log(this.themesSearch);
  };

  // Refreshes group list from backend and sets map initial params
  async componentWillLoad() {
    await this.getGroups();

    // await this.getThemes(this.defaultChecked);
  }

  // Checks default tab;
  componentDidLoad() {
    if (this.groupsRef && this.defaultChecked in this.groupsRef) {
      this.groupsRef[this.defaultChecked].checked = true;
    }
  }

  componentWillRender() {
    // console.log('toasts ', this.toasts)
  }

  // search any class
  async searchClass(classId, query, sort = {}) {
    let items;
    await OneApi.objectAPI
      .executeCustom({
        _classId: classId,
        method: 'GET',
        methodIdentifier: '_search',
        body: {
          query,
          size: 9999,
          sort,
        },
      })
      .then(
        async (response) => (items = await Promise.all(response.data?.hits?.hits?.map(async (item) => item?._source))),
      )
      .catch((error) => console.log(error));
    return items;
  }

  async getGroups() {
    this.groupsSearch = await this.searchClass(
      this.groupClassId,
      { term: { menu: true } },
      { order: { order: 'ASC' } },
    );
  }

  // async getThemes(group) {
  // 	this.themesSearch = await this.searchClass(this.themeClassId, {term: {'grupo._id': group}}, {"codExterno": {'order': 'ASC'}});
  // }

  // async getFile(file) {
  // 	console.log(file);
  // 	await console.log(file);
  // 	await OneApi.objectAPI.
  // 	.executeCustom({
  // 		_classId: '644bb0be4d2a3164480ea67c',
  // 		methodIdentifier: 'obterTodaHierarquia',
  // 		method: 'GET',
  // 	})
  // 	.then(async (response) => (this.hierarquia = response.data.output))
  // 	.catch((error) => console.log(error));
  // }

  toasterHandler(type, text) {
    if (this.toasterRef) {
      const toast = (
        <sy-toast type={type} expiration-time="3000" extended-time="5000" dismissible={true} expirable={true}>
          {text}
        </sy-toast>
      );
      this.toasterRef.appendChild(toast);
    }
  }

  // function that gets the file from the input, unzips it, and checks if it has all the required file extensions
  // async getFileStencil() {
  // 	let file: any;
  // 	this.files = [];
  // 	if (this.area && this.area.value){
  // 	file = await this.area.getInputFiles();
  // 	this.files.push(...file)
  // 	}
  // 	if (this.remanescente && this.remanescente.value){
  // 	file = await this.remanescente.getInputFiles();
  // 	this.files.push(...file)
  // 	}

  // 	// create a BlobReader to read with a ZipReader the zip from a Blob object
  // 	console.log(this.files);
  // 	const accepted_types = ['application/zip', 'application/x-zip-compressed'];
  // 	if (this.files && this.files.length > 0 && accepted_types.includes(this.files['0'].type)) {
  // 	const reader = new zip.ZipReader(new zip.BlobReader(this.files['0']));
  // 	// console.log(reader);

  // 	// get all entries from the zip
  // 	const entries = await reader.getEntries();
  // 	// console.log(entries);
  // 	this.extensions = [];
  // 	const required_ext = ['shp', 'shx', 'dbf',
  // 	//  'prj'
  // 	];
  // 	if (entries && entries.length > 0) {
  // 		entries.forEach((e) => {
  // 		if (e.filename) {
  // 			this.extensions.push(e.filename.split('.').pop());
  // 		}
  // 		});

  // 		const contains_all_required_ext = required_ext.every((ext) => {
  // 		return this.extensions.includes(ext);
  // 		});

  // 		if (contains_all_required_ext) {
  // 		console.log('contem todos os arquivos');
  // 		// console.log(entries.map((e) => e.filename));
  // 		this.files['0'].arrayBuffer().then((ab: any) => {
  // 			shp(ab).then((geojson: any) => {
  // 				this.getArea(geojson);
  // 				this.shapeFile = geojson;
  // 			});
  // 		});

  // 		// Transforma para poligonos do turf e calcula tamanho da area
  // 		// let polygons = turf.polygonize(this.shapeFile);

  // 		} else {
  // 		window.alert('Insira um .zip que contenha todos os arquivos obrigatórios (.shp, .shx, .dbf e .prj)');
  // 		this.area.value = null;
  // 		}
  // 	}

  // 	// close the ZipReader
  // 	await reader.close();
  // 	} else {
  // 	window.alert('Insira um arquivo com a extensão .zip');
  // 	this.area.value = null;
  // 	}
  // }

  async filesHandler(file, themeId, tableId) {
    // let files: any = await this.readFiles();
    console.log(file);
    const fileIsZip = this.validateIsZip(file);

    // console.log(fileIsZip)
    if (fileIsZip) {
      const entries = await this.unzipFile(file);
      const validate = this.validateFiles(entries);
      if (validate) {
        const geojson = await this.convertShp2Geojson(file);

        // TODO: new function to validate features based on pptx presentation
        this.files[themeId] = geojson;
        const num = this.generator(); // => 0.70693204169029
        const golden_color = `hsl(${Math.round(num * 360)}, 55%, 60%)`;
        this.shapeFile = [
          {
            title: file.name,
            group: 'Imovel',
            visible: true,
            type: 'geoJson',
            geoJson: geojson,
            fillColor: golden_color,
            strokeColor: '#000',
            zIndex: true ? 21 : 20,
          },
        ];
        this.zindex = this.zindex + 1;
        const area = this.testArea(geojson);
        this.themeAreas[themeId] = area;

        // this.validateType(themeId);
        this.patchItem(tableId, 'anexos', area);
        console.log(geojson);

        // AlertsHelpers.add([{ text: `O arquivo foi importado com sucesso!`, type: 'INFO' }]);
        this.toasts.push({ type: 'success', text: `O arquivo foi importado com sucesso!` });
      } else {
        this.toasts.push({
          type: 'error',
          text: `O .zip inserido não contém todos os arquivos necessários (shp, shx, dbf, prj)`,
        });
      }
    } else {
      this.toasts.push({ type: 'error', text: `Insira um arquivo .zip` });
    }
  }

  readFiles() {
    let file: any;
    if (this.themesRef) {
      return Promise.all(
        Object.keys(this.themesRef).map(async (theme) => {
          if (this.themesRef[theme] && this.themesRef[theme].value) {
            file = await this.themesRef[theme].getInputFiles();
            if (file && file.length > 0 && file[0]) {
              // this.files[theme] = file[0];
              return { file: file[0], id: theme };
            }
          }
        }),
      );
    }
  }

  validateIsZip(file: File) {
    const accepted_types = ['application/zip', 'application/x-zip-compressed'];
    if (file && accepted_types.includes(file.type)) {
      return true;
    }

    return false;
  }

  unzipFile(file) {
    if (file) {
      this.zipReader = new zip.ZipReader(new zip.BlobReader(file));

      // get all entries from the zip
      return this.zipReader.getEntries();
    }
  }

  validateFiles(entries) {
    let extensions: any = [];
    extensions = [];
    const required_ext = ['shp', 'shx', 'dbf', 'prj'];
    if (entries && entries.length > 0) {
      entries.forEach((e) => {
        if (e.filename) {
          extensions.push(e.filename.split('.').pop());
        }
      });

      const contains_all_required_ext = required_ext.every((ext) => {
        return extensions.includes(ext);
      });

      if (contains_all_required_ext) {
        console.log('contem todos os arquivos');
        return true;

        // this.toasterHandler('success', `O arquivo ${this.themesRef[id].label} foi importado com sucesso!`);
        // console.log(entries.map((e) => e.filename));

        // Transforma para poligonos do turf e calcula tamanho da area
        // let polygons = turf.polygonize(this.shapeFile);
      }

      // window.alert('Insira um .zip que contenha todos os arquivos obrigatórios (.shp, .shx, .dbf e .prj)');
      return false;
    }
  }

  async convertShp2Geojson(file) {
    const ab = await file.arrayBuffer();
    return shp(ab);

    // file.arrayBuffer().then((ab: any) => {
    // 	shp(ab).then((geojson: any) => {
    // 		return geojson;
    // 	});
    // });
  }

  validateType(id) {
    const idx = this.themeField.value.findIndex((t) => t.tema._id == id);

    console.log(this.value.anexos[idx]);
  }

  // Calculate area in Hectars of geojson polygon
  // TODO: use proj4 to reproject polygons to UFMG string before calculating areas
  getArea(geojson) {
    // let geojsonreproj = proj4();
    const areaSqm = turf.area(geojson);
    const areaHec = turf.convertArea(areaSqm, 'meters', 'hectares');
    return areaHec.toFixed(2).replace('.', ','); // mudar pra tolocale
    // window.alert(`O shapefile inserido possui ${areaHec.toFixed(2).replace('.', ',')} hectares de área`)
    // let polygons = turf.polygonize(geojson);
  }

  // Patch corresponding item in the one-field input list
  // TODO: use tableId from event to patch values directly, eg.: 6470d867a94f3d6cce3c2095:64df890aa92c2f375279c2af.campoArquivo.anexos.64df890aa92c2f375279c31d.anexo
  patchItem(id, fieldName, area) {
    // Using: id;
    // Finds: index of the theme to be patched;
    // Where: one-field input list (themeField.value);
    let idx = '';
    fieldName == 'anexos' ? (idx = id) : (idx = this.areasField.value.findIndex((t) => t.tema._id == id));

    const event = this.syOneFormFieldDidChangeValue?.emit({
      value: area,
      options: { customPath: `${this.valuePath}.${fieldName}.${idx}.area` },
    });
    console.log(event);
  }

  // calculos() {
  // 	// Área do Imóvel
  // 	let areaDoImovel = (this.id_areaImovel in this.themeAreas && Number(this.themeAreas[this.id_areaImovel].replace(',','.'))) || 0;

  // 	// Entorno Reservatório (Servidão)
  // 	if (this.id_reservatorio in this.themeAreas) {
  // 		this.calculoBufferServidao(this.files[this.id_reservatorio]);
  // 	}

  // 	// Agregado de servidão
  // 	let aggServidao = this.calculoAggServidao(); // calcula agregado de servidao
  // 	aggServidao <= areaDoImovel ? aggServidao = aggServidao : aggServidao = areaDoImovel;
  // 	let aggServidaoStr = aggServidao.toLocaleString('pt-br');
  // 	this.themeAreas[this.id_aggServidaoAdministrativa] = aggServidaoStr; // preenche objeto de buscas
  // 	this.patchItem(this.id_aggServidaoAdministrativa, 'areasExtras', aggServidaoStr); // dá patch na tabela do one

  // 	// Área Líquida do Imóvel
  // 	let areaLiquidaImovel = this.calculoAreaLiquidaImovel().toLocaleString('pt-br');
  // 	this.themeAreas[this.id_areaLiquidaImovel] = areaLiquidaImovel;
  // 	this.patchItem(this.id_areaLiquidaImovel, 'areasExtras', areaLiquidaImovel); // dá patch na tabela do one

  // 	// Reserva Legal
  // 	let passivoAtivo = this.calculoReservaLegal(this.calculoAreaLiquidaImovel());
  // 	console.log(passivoAtivo)
  // 	if (passivoAtivo.calculo > 0){
  // 		this.themeAreas[this.id_rl_passivo] = passivoAtivo.calculo;
  // 		this.themeAreas[this.id_rl_excedente] = 0;
  // 		this.patchItem(this.id_rl_passivo, 'areasExtras', passivoAtivo.calculo); // dá patch na tabela do one
  // 		this.patchItem(this.id_rl_excedente, 'areasExtras', 0); // dá patch na tabela do one
  // 	}
  // 	else if (passivoAtivo.calculo < 0){
  // 		this.themeAreas[this.id_rl_passivo] = 0;
  // 		this.themeAreas[this.id_rl_excedente] = passivoAtivo.calculo*(-1);
  // 		this.patchItem(this.id_rl_passivo, 'areasExtras', 0); // dá patch na tabela do one
  // 		this.patchItem(this.id_rl_excedente, 'areasExtras', passivoAtivo.calculo*(-1)); // dá patch na tabela do one
  // 	}
  // 	else if (passivoAtivo.calculo == 0){
  // 		this.themeAreas[this.id_rl_passivo] = 0;
  // 		this.themeAreas[this.id_rl_excedente] = 0;
  // 		this.patchItem(this.id_rl_passivo, 'areasExtras', 0); // dá patch na tabela do one
  // 		this.patchItem(this.id_rl_excedente, 'areasExtras', 0); // dá patch na tabela do one
  // 	}
  // 	this.themeAreas[this.id_rl_total] = passivoAtivo.total;
  // 	this.patchItem(this.id_rl_total, 'areasExtras', passivoAtivo.total);
  // }

  calculoAreaLiquidaImovel() {
    const areaDoImovel =
      (this.id_areaImovel in this.themeAreas && Number(this.themeAreas[this.id_areaImovel].replace(',', '.'))) || 0;
    const aggServidao =
      (this.id_aggServidaoAdministrativa in this.themeAreas &&
        Number(this.themeAreas[this.id_aggServidaoAdministrativa].replace(',', '.'))) ||
      0;
    return areaDoImovel - aggServidao;
  }

  calculoAggServidao() {
    // let infra = (this.id_infraestruturaPublica in this.files && this.files[this.id_infraestruturaPublica]);
    const intersect: any = turf.intersect(
      this.files[this.id_areaImovel].features[0],
      this.files[this.id_infraestruturaPublica].features[0],
    );
    console.log('intersect ', this.testArea(intersect));

    // let utilidade = (this.id_utilidadePublica in this.files && this.files[this.id_utilidadePublica]);
    const infraA =
      (this.id_infraestruturaPublica in this.themeAreas &&
        Number(this.themeAreas[this.id_infraestruturaPublica].replace(',', '.'))) ||
      0;
    const utilidadeA =
      (this.id_utilidadePublica in this.themeAreas &&
        Number(this.themeAreas[this.id_utilidadePublica].replace(',', '.'))) ||
      0;
    const reservatorioA =
      (this.id_reservatorio in this.themeAreas && Number(this.themeAreas[this.id_reservatorio].replace(',', '.'))) || 0;
    const entornoReservatorioA =
      (this.id_entornoReservatorio in this.themeAreas &&
        Number(this.themeAreas[this.id_entornoReservatorio].replace(',', '.'))) ||
      0;
    return infraA + utilidadeA + reservatorioA + entornoReservatorioA;
  }

  calculoBufferServidao(reservatorio, bufferSize) {
    // console.log(reservatorio.features[0])
    const buffer: any = turf.buffer(reservatorio.features[0], bufferSize, { units: 'meters' });
    console.log(this.files[this.id_areaImovel].features[0], buffer);
    const intersect: any = turf.intersect(this.files[this.id_areaImovel].features[0], buffer);
    const diff = turf.difference(intersect, reservatorio.features[0]);
    this.shapeFile = [
      {
        title: 'Buffer do reservatório de energia',
        group: 'Imovel',
        visible: true,
        type: 'geoJson',
        geoJson: diff,
        fillColor: 'green',
        strokeColor: 'black',
        zIndex: true ? 21 : 20,
      },
    ];
    this.zindex = this.zindex + 1;
    console.log(diff);
    const entornoArea = this.getArea(diff);
    this.themeAreas[this.id_entornoReservatorio] = entornoArea;
    this.patchItem(this.id_entornoReservatorio, 'areasExtras', entornoArea);
  }

  calculoReservaLegal(areaLiquidaImovel) {
    const proposta =
      (this.id_rl_proposta in this.themeAreas && Number(this.themeAreas[this.id_rl_proposta].replace(',', '.'))) || 0;
    const averbada =
      (this.id_rl_averbada in this.themeAreas && Number(this.themeAreas[this.id_rl_averbada].replace(',', '.'))) || 0;
    const aprovada =
      (this.id_rl_aprovada in this.themeAreas && Number(this.themeAreas[this.id_rl_aprovada].replace(',', '.'))) || 0;
    const outro =
      (this.id_rl_outro in this.themeAreas && Number(this.themeAreas[this.id_rl_outro].replace(',', '.'))) || 0;
    const total = proposta + averbada + aprovada + outro;
    const passivoInit = areaLiquidaImovel * 0.5;
    const passivoAtivo = passivoInit - total;
    return { total, calculo: passivoAtivo };
  }

  calculoCobertura() {
    const consolidadaFile = this.files[this.id_consolidada];
    const regeneracaoFile = this.files[this.id_regeneracao];
    const intersect: any = turf.intersect(consolidadaFile.features[0], regeneracaoFile.features[0]);
    const regeneracaoConsolidadaArea = this.getArea(intersect);
    this.themeAreas[this.id_regeneracao_consolidada] = regeneracaoConsolidadaArea;
    this.patchItem(this.id_regeneracao_consolidada, 'areasExtras', regeneracaoConsolidadaArea);
    this.themeAreas[this.id_regeneracao_antropizada] = regeneracaoConsolidadaArea;
    this.patchItem(this.id_regeneracao_antropizada, 'areasExtras', regeneracaoConsolidadaArea);
  }

  dialogClose(action) {
    // console.log(action)
    if (action == 'submit') {
      this.syOneFormFieldDidChangeValue?.emit({
        value: this.entornoReservatorioValue.value,
        options: { customPath: `${this.valuePath}.faixaReservatorio` },
      });
      if (this.id_reservatorio in this.themeAreas) {
        // console.log('aa_')

        this.calculoBufferServidao(this.files[this.id_reservatorio], this.entornoReservatorioValue.value); // buffer servidao
        this.agregadoServidao(); // agregado servidao
        this.areaLiquidaImovel(); // area liquida imovel
      }
      return true;
    }
    return true;
  }

  render() {
    return (
      <Host>
        {/* <sy-alert header="Erro" dismissible={true}>Ocorreu um erro</sy-alert>
				<sy-one-field
					{...getEmbeddedFieldAttributes(this.field, this.value, String(this.valuePath), 'grupo')}
					ref={(el) => (this.groupField = el)}
				></sy-one-field> */}
        <div>
          {/* <sy-one-field
					{...getEmbeddedFieldAttributes(this.field, this.value, String(this.valuePath), 'faixaReservatorio')}
					// ref={(el) => (this.groupField = el)}
				></sy-one-field> */}
          {/* <sy-button class="sy-mb-2 hydrated" content="text-only" type="default" onClick={(e) => {this.dialogRef.open(e)}}>Open</sy-button> */}
          <sy-dialog
            data-sy-viewport=""
            dialog-size="medium"
            ignoreOutsideClick={true}
            ref={(el) => {
              this.dialogRef = el;
            }}
            beforeClosed={(action) => {
              return this.dialogClose(action);
            }}
          >
            <sy-dialog-header
              dialog-title="Informe a faixa (em metros) da APP do Reservatório definida na Licença Ambiental do empreendimento"
              position="fixed"
              hideCloseButton={true}
            >
              Dialog Title
            </sy-dialog-header>
            <sy-dialog-content class="hydrated">
              <sy-input
                // min={30}
                // max={100}
                locale="pt-BR"
                type="number"
                placeholder="Digite aqui um valor (em metros) de 30 a 100"
                ref={(el) => {
                  this.entornoReservatorioValue = el;
                }}

                // required
              ></sy-input>
            </sy-dialog-content>
            <sy-dialog-footer cancel-label="Cancelar" submit-label="Salvar" buttons-position="end"></sy-dialog-footer>
          </sy-dialog>
        </div>

        <sy-toast-container
          placement="right-top"
          ref={(el) => {
            this.toasterRef = el;
          }}
        >
          {this.toasts &&
            this.toasts.length > 0 &&
            this.toasts.map((toast) => {
              return (
                <sy-toast
                  type={toast.type}
                  expiration-time="3000"
                  extended-time="5000"
                  dismissible={true}
                  expirable={true}
                >
                  {toast.text}
                </sy-toast>
              );
            })}
        </sy-toast-container>
        <div>
          <sy-button-group>
            {this.groupsSearch.map((group) => {
              if (this.themeAreas[this.id_areaImovel] == null && group._id !== '6494366daabaad5335bdbc63') {
                return (
                  <sy-button
                    onClick={(e) => {
                      e.preventDefault();
                      this.radioSelected(group._id);
                    }}
                    ref={(el) => {
                      this.groupsRef[group._id] = el;
                    }}
                    button-type="radio"
                    label={group.nome}
                    name="group"
                    key={group._id}
                    type="default"
                    data-id={group._id}
                    disabled=""
                  ></sy-button>
                );
              }

              return (
                <sy-button
                  onClick={(e) => {
                    e.preventDefault();
                    this.radioSelected(group._id);

                    // console.log(group)
                  }}
                  ref={(el) => {
                    this.groupsRef[group._id] = el;
                  }}
                  button-type="radio"
                  label={group.nome}
                  name="group"
                  key={group._id}
                  type="default"
                  data-id={group._id}
                ></sy-button>
              );
            })}
          </sy-button-group>
        </div>

        {/* {this.groupField && this.groupField.value &&
				<sy-one-field
					{...getEmbeddedFieldAttributes(this.field, this.value, String(this.valuePath), 'anexosImovel')}
					ref={(el) => (this.fileField = el)}
				></sy-one-field>
				} */}

        {/* <sy-one-field
					{...getEmbeddedFieldAttributes(this.field, this.value, String(this.valuePath), 'grupo')}
					ref={(el) => (this.groupField = el)}
					field={{readOnly: true}}
				></sy-one-field> */}

        <sy-one-field
          {...getEmbeddedFieldAttributes(this.field, this.value, String(this.valuePath), 'anexos')}
          ref={(el) => (this.themeField = el)}

          // field={{ items: { '64b57d091b980e466fb9c16e': { hidden: false, removable: false } } }}
        ></sy-one-field>

        <sy-one-field
          {...getEmbeddedFieldAttributes(this.field, this.value, String(this.valuePath), 'areasExtras')}
          ref={(el) => (this.areasField = el)}

          // field={{items: {'64b57d091b980e466fb9c16e': {hidden: false, removable: false}}}}
        ></sy-one-field>

        {/* <sy-one-field
					{...getEmbeddedFieldAttributes(this.field, this.value, String(this.valuePath), 'tema')}
					ref={(el) => (this.temas = el)}
				></sy-one-field> */}

        {/* {
					this.themesSearch && this.themesSearch.map(theme => {
						return (
							<div>
								<sy-input
									clearButton={true}
									label={theme.nome}
									ref={(el) => this.themesRef[theme._id] = el}
									type="file"
									accept=".zip"
									name={theme._id}
									placeholder="Insira um arquivo .zip contendo seu shapefile"
									key={theme._id}
								></sy-input>
								<span>Área: {theme._id in this.themeAreas && this.themeAreas[theme._id]}</span>
							</div>
						);
					})
				} */}

        {/* {this.imovelSum && <div>
					Imóvel liquido: {this.imovelSum - this.servidaoSum}
				</div>
				} */}
        {/* <sy-button icon="add" type="default"
				onClick={() => AlertsHelpers.add([{ text: `O arquivo foi importado com sucesso!`, type: 'INFO' }])}
				>
					Adicionar arquivos ao mapa
				</sy-button>
				<sy-button icon="add" type="default" onClick={() => this.calculos()}>
					Realizar cálculos
				</sy-button> */}
        {/* <sy-button icon="add" type="default" onClick={() => this.calculoServidao()}>
					Realizar cálculos servidao
				</sy-button> */}

        {/* <sy-input
					clearButton={true}
					label="Área Consolidada"
					ref={(el) => (this.area = el)}
					type="file"
					accept=".zip"
					name="areaConsolidada"
					placeholder="Insira um arquivo .zip contendo seu shapefile"
				></sy-input>

				<sy-input
					clearButton={true}
					label="Remanescente de Vegetação Nativa"
					ref={(el) => (this.remanescente = el)}
					type="file"
					accept=".zip"
					name="remanescente"
					placeholder="Insira um arquivo .zip contendo seu shapefile"
				></sy-input>

				<sy-button icon="add" type="default" onClick={() => this.getFileStencil()}>
					Adicionar arquivos ao mapa
				</sy-button> */}
        {/* <sy-button icon="add" type="default" onClick={() => this.teste()}>
					Teste
				</sy-button> */}
        <br />
        <br />
        <web-map-viewer parsedFiles={this.shapeFile} params={this.paramsMapViewer} ref={(el) => (this.map = el)} />
      </Host>
    );
  }
}
