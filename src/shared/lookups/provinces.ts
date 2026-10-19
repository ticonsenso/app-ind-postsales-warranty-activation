/*
 * Catálogo de provincias exportado de Creatio. Archivo generado: no editar a mano, regenerar desde el export.
 */

export interface Province {
  id: string;
  value: string;
  countryId: string;
}

/** Provincias agrupadas por `countryId`; la clave `''` agrupa los registros sin padre en Creatio. */
const PROVINCES_BY_COUNTRY_ID: Readonly<Record<string, readonly Province[]>> = {
  '066dca30-20ae-422a-b387-ee6e6a2d5cf0': [
    {
      id: 'e730c7da-f566-4198-b7b2-cbf5bf84dc17',
      value: 'Azuay',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '10e3ee53-7852-4573-929f-7eb668fb71dd',
      value: 'Bolívar',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '1829e181-000c-4362-94b2-5b003731efd8',
      value: 'Cañar',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '7e438222-5aec-4656-80b3-7330bb1f3aaf',
      value: 'Carchi',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '1a39f832-c14d-4c00-bfc1-6b53dad4c5a1',
      value: 'Chimborazo',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '1dbbcbaa-0afc-4b22-958e-7b0d8717ff4b',
      value: 'Cotopaxi',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '26bdf4e9-4399-4d01-9447-b275ab108bd5',
      value: 'El Oro',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '51f6676c-ec80-4575-8c4f-adbc58e626ca',
      value: 'ESMERALAS',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '0e448641-8b0b-4cab-94f0-1a812d806954',
      value: 'Esmeraldas',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '876ef775-642d-49ac-8f09-4884c0453dff',
      value: 'Galápagos',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: 'ed309588-0aa4-41d3-93d9-759fba4c6b31',
      value: 'Guayas',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: 'da2f696e-aa89-4050-80cc-ad3fde59d1e8',
      value: 'Imbabura',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: 'd8700862-58a1-49fa-9432-592fd2dacdb5',
      value: 'Loja',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '7ec3f303-59a1-421c-b920-b9449c0541b0',
      value: 'Los Ríos',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '1e8aced9-6a9e-44f8-bf24-ac76e6630e7d',
      value: 'LOS RIOS MOCACHE',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '3a8fef80-8e04-4e33-86ef-09dc99cccff8',
      value: 'Manabí',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '53ffec25-280d-4e7b-b638-c4fc70651d4f',
      value: 'Morona Santiago',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '8071fed6-3fba-48cc-8bb0-415573ee110c',
      value: 'Napo',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: 'd0cebd3d-27c3-4349-9dd1-b94eefad9c0b',
      value: 'Orellana',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: 'dcd89d2d-9802-48f5-b17f-6caa05db6b77',
      value: 'Pastaza',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: 'd6517b0e-f530-4395-9ea0-9aaf7987e193',
      value: 'Pichincha',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '064a798d-18b2-4479-a724-98cdbe09812d',
      value: 'PICHINCHA RUMINAHUI',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: 'a4cf95d6-4469-413a-83f8-5f06b18f7599',
      value: 'Santa Elena',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '6f5fb63d-fefc-4c7e-b0b3-34609409f932',
      value: 'St Domingo Tsáchilas',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '6f4da1d9-3e11-4548-bb9a-2397d9fbbe8f',
      value: 'Sucumbíos',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: '51d9afa5-38f0-4701-ba7e-5f02aef37cef',
      value: 'Tungurahua',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
    {
      id: 'cac1415d-50f4-459a-ab37-3440102ddf77',
      value: 'Zamora Chinchipe',
      countryId: '066dca30-20ae-422a-b387-ee6e6a2d5cf0',
    },
  ],
  '26e29af0-7063-419e-a3f1-3fd5e02e51e1': [
    {
      id: '8958c3f4-799e-4c20-858f-ef8c69165298',
      value: 'AMAZONAS',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: 'b53a14d1-6b33-4fe3-9d62-e94380f9a95c',
      value: 'ANCASH',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '3a74c461-033b-4f8b-ac93-b4463b2bb713',
      value: 'APURIMAC',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '17d5cc48-02bb-4fac-8ddb-28cd1ef4977e',
      value: 'AREQUIPA',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: 'de0b0428-c8fe-415b-a6b8-0b1270942c05',
      value: 'AYACUCHO',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '572c1637-2774-4ff6-b0b0-65f6208c245f',
      value: 'CAJAMARCA',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: 'cbfb64e8-fb07-45f2-a7c1-2c8c954ea928',
      value: 'CALLAO',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: 'f5bee10c-30a3-49d0-b7fc-0c5e34999796',
      value: 'CUSCO',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '3be1890d-129e-4a95-bc5e-6ba1420815cb',
      value: 'HUANCAVELICA',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '247e6f10-1f73-4ccf-9c1d-3b89c05b388a',
      value: 'HUANUCO',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: 'fe6c76f8-7a45-4faa-bc54-66a0c9ced456',
      value: 'ICA',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '8cfeb432-1130-45c7-912c-4c3d2b0a9fe1',
      value: 'JUNIN',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '61836e91-bda4-4be4-a4e0-ed2bca673e2f',
      value: 'LA LIBERTAD',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: 'cfd9c2c2-076c-4e34-9ee4-43d469a453fc',
      value: 'LAMBAYEQUE',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '4537b2ab-94d0-4c9b-84fe-60f97e5f166f',
      value: 'LIMA',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '4a52ff6c-5f93-44a3-b8b9-e1ae99c17dd5',
      value: 'LORETO',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '3fd3a61f-a685-4d06-8d44-c308a388079a',
      value: 'MADRE DE DIOS',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: 'f9f1d8b5-32b2-4469-b3d2-81e5caedcaa2',
      value: 'MOQUEGUA',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '7dffba9f-178e-4d33-80b2-ee6b93c7dc2e',
      value: 'PASCO',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '1260d59b-1d44-4e0a-b054-15ba593b0e4e',
      value: 'PIURA',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: 'fa9cb1d7-e721-457f-99ed-7ec15bb977c5',
      value: 'PUNO',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '3a88ab23-4525-4b29-aa7d-ec855f0874c2',
      value: 'SAN MARTIN',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '0fa79cd8-203f-4b28-9c7c-9b6d3bbf28eb',
      value: 'TACNA',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '078ac7a1-46fa-479f-a3f1-1ed4c6d89865',
      value: 'TUMBES',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
    {
      id: '0e86d15b-77ee-47d1-9fbe-c74f61798c4b',
      value: 'UCAYALI',
      countryId: '26e29af0-7063-419e-a3f1-3fd5e02e51e1',
    },
  ],
  '3319ecac-1b30-4b91-9435-e52c0279f82c': [
    {
      id: '74e58acb-35e4-45a4-a862-6c2487efddf4',
      value: 'AGUASCALIENTES',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '7b512460-5b50-46a4-8dca-0ace2c5dd2fb',
      value: 'BAJA CALIFORNIA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '58ef47c3-7d67-452f-9be4-5553c1c4c72a',
      value: 'BAJA CALIFORNIA SUR',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '770c487f-ba55-4200-955c-62aae2fb2fc7',
      value: 'CAMPECHE',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'f1c60407-3e89-4b03-9a50-06cc529684ce',
      value: 'CHIAPAS',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '4bcfd259-0641-487c-afbd-8056bb030b33',
      value: 'CHIHUAHUA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '80b9b1c3-1853-4ff6-bd73-a4fbaefb914b',
      value: 'CIUDAD DE MÉXICO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '862efbff-9c6a-45bf-bfe0-fb76837a412a',
      value: 'COAHUILA DE ZARAGOZA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'b5c3ebd0-10b3-4a3a-a241-107818198202',
      value: 'COLIMA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'c2746ede-e585-4a29-b59b-9f0dfd77bb3c',
      value: 'DURANGO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'fb5893bc-e14a-45cd-96d5-c8c3c5f01b25',
      value: 'GUANAJUATO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'a64ed26f-51f5-49ea-afbb-b1761ca6cbc0',
      value: 'GUERRERO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '0bdf1dc3-7df6-433f-982e-446147a65663',
      value: 'HIDALGO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '6a04201f-464b-4d3e-b34f-35f5dc9bfb16',
      value: 'JALISCO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'edac2c2c-cc36-4323-9cb7-2e6d1935612d',
      value: 'MÉXICO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '122c8086-caba-406c-adbe-5d15565b496c',
      value: 'MICHOACÁN DE OCAMPO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'c018d716-86d5-45f7-9852-a7148983ec53',
      value: 'MORELOS',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '595f8d8b-ead4-4b5c-802f-c0f3310c59c2',
      value: 'NAYARIT',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '1c463528-ef55-457a-b5df-3a717733e8d3',
      value: 'NUEVO LEÓN',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '3e79600d-f7bd-4177-9fe2-e34fed411824',
      value: 'OXACA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '04efbce2-8b6d-4714-a7de-d9eef9fca095',
      value: 'PUEBLA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '12e53d15-e9d4-4172-b108-6f024fd7a183',
      value: 'QUERÉTARO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '8e7a92a2-4bd5-4ed3-bf93-c8bf6957c875',
      value: 'QUINTANA ROO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '03591bbb-0514-4cd8-9d55-9eac593a0fe8',
      value: 'SAN LUIS POTOSÍ',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '1a788678-0ac1-4cd5-b777-72265e20dd6f',
      value: 'SINALOA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'afe40453-2d44-4058-9e2a-ec57eebf3621',
      value: 'SONORA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '0e86f82f-e382-4f31-b3ea-e0d361d71a29',
      value: 'TABASCO',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '15c1ae2f-170a-4128-97ee-b626b001bee9',
      value: 'TAMAULIPAS',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'b8dad84a-8c13-4246-97e1-ab21624c6ac9',
      value: 'TLAXCALA',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '0d7c30b8-ca6f-4460-a993-c3aa920a0579',
      value: 'VERACRUZ DE IGNACIO DE LA LLAVE',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: 'd584851b-57b9-4271-8a28-34a98f68fbfb',
      value: 'YUCATÁN',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
    {
      id: '935d7c00-5b9f-454a-ad14-e25ed69d997c',
      value: 'ZACATECAS',
      countryId: '3319ecac-1b30-4b91-9435-e52c0279f82c',
    },
  ],
  '3a7f2071-464c-4b07-845f-a46808ea6201': [
    {
      id: '3a5b4940-f10b-4f20-a50a-d4e76f7668b3',
      value: 'AHUACHAPÁN CENTRO',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '5e0bef72-f780-42b2-9526-b8adfd636a56',
      value: 'AHUACHAPÁN NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '65166af8-1f78-4adc-a9fe-b808038ffaa3',
      value: 'AHUACHAPÁN SUR',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '9d74c8d7-e161-4988-849d-40c6a8828d49',
      value: 'CABAÑAS ESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'c579d68d-d159-4f29-b393-5d5f64533c92',
      value: 'CABAÑAS OESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '4e789b1e-6d7d-4a0c-95ca-43390c8db7ab',
      value: 'CHALATENANGO CENTRO',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'd974ad93-23b2-45e9-be45-5e2baff6575d',
      value: 'CHALATENANGO NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'bbc1f7e6-061c-4a52-b7b9-4b04dc2a3174',
      value: 'CHALATENANGO SUR',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '0162480d-7ece-41cb-82bf-549e4c90e871',
      value: 'CUSCATLÁN NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '565c2960-25f9-429f-8f79-b64069e1ef88',
      value: 'CUSCATLÁN SUR',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '2004888f-d12c-4529-af6d-a8752ac8d27d',
      value: 'LA LIBERTAD CENTRO',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'aefede81-e657-460c-a170-73b6dc6f6396',
      value: 'LA LIBERTAD COSTA',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '4b3649e7-ece9-4dfe-9fff-2bf3c7c9129b',
      value: 'LA LIBERTAD ESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '0320df85-c4dc-42f9-adeb-d3705ff5c7d0',
      value: 'LA LIBERTAD NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '04b1639a-255c-40a8-b743-705fdaba390d',
      value: 'LA LIBERTAD OESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '7b8f7904-b766-4784-a56d-bc8f7877bd38',
      value: 'LA LIBERTAD SUR',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '6039af1f-9a5f-4b11-bda3-07be652cbb8e',
      value: 'LA PAZ CENTRO',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '2ea3be63-7f5b-4aba-8774-888285c1b389',
      value: 'LA PAZ ESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '354b79d2-8714-461b-94dc-685cf2b2cfdf',
      value: 'LA PAZ OESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '60f23aa3-a1d8-4698-a921-04cd3233b10a',
      value: 'LA UNIÓN NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '5941d908-71cb-4f80-a40c-15eea69f2872',
      value: 'LA UNIÓN SUR',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '679ba09c-4142-4e7a-8c04-42f4e7d01d9f',
      value: 'MORAZÁN NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '5653860b-f98e-4c5d-b4ac-0efc3a44662d',
      value: 'MORAZÁN SUR',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'c5f4c5fc-e9e6-4c80-8b09-5147d4487c97',
      value: 'SAN MIGUEL CENTRO',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '0f3e0fd7-863f-4e80-a993-7aa7a51032af',
      value: 'SAN MIGUEL NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '926c47bb-d226-48fc-b7a1-2fab7966ef4b',
      value: 'SAN MIGUEL OESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '403bc5aa-d1c4-44a5-8dbf-985c6b8f8846',
      value: 'SAN SALVADOR CENTRO',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'c3e3c6ee-357c-4da5-a71f-288625d1c1bd',
      value: 'SAN SALVADOR ESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '59e22ced-7fe7-4e16-96c5-6ab2cff78373',
      value: 'SAN SALVADOR NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '3767acb8-6b8c-4fe3-8d02-6506ea36f085',
      value: 'SAN SALVADOR OESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '80fea8e5-7563-4318-8e5d-5fbb5c5f898a',
      value: 'SAN SALVADOR SUR',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'ba0009c7-a745-4125-a155-cb8e1ce2281d',
      value: 'SAN VICENTE NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'd80901bd-8f04-4c40-b0bb-be7c60692562',
      value: 'SAN VICENTE SUR',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'b3918e3c-ebea-495c-a9d7-6f1b8e53af28',
      value: 'SANTA ANA CENTRO',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'b4fcb505-c529-49d8-aee1-80efccb5ed1a',
      value: 'SANTA ANA ESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '0e80f54e-bfcb-4511-985c-9e4e5949c2b2',
      value: 'SANTA ANA NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'e6e0d6da-cb49-40a2-b040-93b37a3bd4c0',
      value: 'SANTA ANA OESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '11d23d2a-85eb-402e-a7d4-a367f9cdebaf',
      value: 'SONSONATE CENTRO',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'a795e2bd-4850-49c4-979b-7f4168049492',
      value: 'SONSONATE ESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '735dfa9e-142d-4758-ba2f-fa6eaea4b37e',
      value: 'SONSONATE NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'a4a76f2e-f556-4aa4-abc8-ff8a6db5ad3b',
      value: 'SONSONATE OESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '3a312ada-bad2-4e53-b68b-30a236f3eb88',
      value: 'USULUTÁN ESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: 'f2d28813-6354-401f-84d7-3987c0752951',
      value: 'USULUTÁN NORTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
    {
      id: '69a47eb3-064e-4797-bd0a-47f2a13bf6b2',
      value: 'USULUTÁN OESTE',
      countryId: '3a7f2071-464c-4b07-845f-a46808ea6201',
    },
  ],
  '4a88fe46-607b-4e74-ad4f-d80a50079ba6': [
    {
      id: '59da1de1-d1a9-41c1-b8d4-59233edc1f94',
      value: 'Bahía de Hawke',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: '1b84e417-4304-4e4d-88f3-dce9b50a621d',
      value: 'Bahía de la abundancia',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: '33259fd5-1fb6-4ccd-86df-b0350289ddbc',
      value: 'Canterbury',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: '5c2f8b3e-6c46-4b89-a190-ee427592b3db',
      value: 'Gisborne',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: '66022db0-3cb2-4661-9ec1-fca97c75ee23',
      value: 'Manawatu-Wanganui',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: 'f24408da-e707-4549-a649-b6dff84d709f',
      value: 'Northland',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: '8558b86f-42da-4e5d-a0f2-92d2fb4c94ea',
      value: 'Otago',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: '7d5cbe44-76cb-4e86-8137-90ab70795bcb',
      value: 'Taranaki',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: '437f360a-259e-4be8-bb09-6d67fdac99e4',
      value: 'Waikato',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
    {
      id: '0c1e561d-ccbe-4fae-9c76-64435d8b0ef7',
      value: 'Wellington',
      countryId: '4a88fe46-607b-4e74-ad4f-d80a50079ba6',
    },
  ],
  '5427d100-a8f8-46ab-accc-8d49fee9855a': [
    {
      id: '0e7f6dac-641d-4b6b-8701-adc8a10f7efb',
      value: 'BENI',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
    {
      id: 'ff180a2c-62a6-4592-b3af-fdacdbf9df13',
      value: 'CHUQUISACA',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
    {
      id: '7efbc52d-a4a1-4933-b883-738c634715ad',
      value: 'COCHABAMBA',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
    {
      id: 'f0438a29-9ba7-441f-810a-9635ea958ae7',
      value: 'LA PAZ',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
    {
      id: '82eedab4-df80-40eb-84f7-74902d489924',
      value: 'ORURO',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
    {
      id: '30622a03-8c7f-4814-9811-cbc459313190',
      value: 'PANDO',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
    {
      id: 'bdec9ef0-340d-4651-adac-9788432688c6',
      value: 'POTOSI',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
    {
      id: '266ffa29-e219-4119-809d-0f4ea9a1963b',
      value: 'SANTA CRUZ',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
    {
      id: '78c417ff-070f-48a4-97d8-48b0838ead64',
      value: 'TARIJA',
      countryId: '5427d100-a8f8-46ab-accc-8d49fee9855a',
    },
  ],
  '55c355f6-0d29-496f-93e3-d6e407f3292f': [
    {
      id: '0b7a0c59-0c32-4167-8097-e288d32e2559',
      value: 'BAORUCO',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '12f3fea4-4e71-4ad0-83d5-00cabce6d9dd',
      value: 'BARAHONA',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '5e9cdfa4-960a-4716-8fa9-666dac81698c',
      value: 'DAJABÓN',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '00a113ca-8a00-4891-8df9-cc4c41489f34',
      value: 'DISTRITO NACIONAL',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'a66d6672-68a0-460f-85b4-46baba472a87',
      value: 'DUARTE',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '2b281d2d-91a3-49e4-bd00-562be88cc9a9',
      value: 'EL SEIBO',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'b4f8ffc5-82aa-4334-9097-999fbfd0804b',
      value: 'ESPAILLAT',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'd9a3692e-4e44-4f2a-8384-66a8a61e0274',
      value: 'HATO MAYOR',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'b2197aaa-0ca2-44f9-8d03-1580bb67f88d',
      value: 'HERMANAS MIRABAL',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'a90bfa0c-d6e9-427e-b058-c69483fa62a1',
      value: 'LA ALTAGRACIA',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'b72da788-ee90-4456-b8e1-c7aa3f0bb7cc',
      value: 'LA ROMANA',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'ecd8d688-551b-420a-a98b-47c76a9f6915',
      value: 'LA VEGA',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '51bfee1d-4254-407f-8542-a9cc7f2c447b',
      value: 'MARÍA TRINIDAD SÁNCHEZ',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '07453add-398c-4d1d-ad70-e5362b3df07a',
      value: 'MONSEÑOR NOUEL',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '0b46b766-dc2a-42fd-acd7-8278d54782f9',
      value: 'MONTE CRISTI',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '3a9ef318-34da-4c5c-ab3f-e5513bfc800f',
      value: 'MONTE PLATA',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '5166c4a0-2277-49c1-a186-ebc44b445f1b',
      value: 'PERAVIA',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'bfa734b4-a8e1-43c6-a0aa-ebe2736e3cc4',
      value: 'PROVINCIA DE SANTIAGO',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '9f45f1b4-2e39-4459-acac-7d2149e2f2bc',
      value: 'PUERTO PLATA',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '1a59210e-2f91-4c18-a9df-3f89530b38e7',
      value: 'SAMANÁ',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'fd37ccf4-39de-4f13-ae13-c7eeb0eda897',
      value: 'SAN CRISTÓBAL',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'dfd85bc4-cea4-464c-be37-1d567fdaded0',
      value: 'SAN JOSÉ DE OCOA',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '7ffd0fdb-e654-47b3-a7ba-46a49001eba1',
      value: 'SAN JUAN',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '471515c4-20ff-41ed-b4f1-60947e55772f',
      value: 'SAN PEDRO DE MACORÍS',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'abd633d0-c49d-4fbf-b1d5-9d511c919870',
      value: 'SÁNCHEZ RAMÍREZ',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '07ae9cb7-917f-4b35-bc60-b2fabcdcb41d',
      value: 'SANTIAGO',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: '970bc45b-3418-4fc4-bda6-6cc398741268',
      value: 'SANTIAGO RODRÍGUEZ',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
    {
      id: 'b70f369b-b3a0-4a4d-a674-3102c6696181',
      value: 'VALVERDE',
      countryId: '55c355f6-0d29-496f-93e3-d6e407f3292f',
    },
  ],
  '6525ec6f-8650-45f8-915a-a61b6f3bf09f': [
    {
      id: 'cb05b9f8-4a0d-4743-86bb-2f3d79471fa3',
      value: 'Gomel Oblast',
      countryId: '6525ec6f-8650-45f8-915a-a61b6f3bf09f',
    },
    {
      id: 'b8dee220-a538-411a-a147-2132efe578ff',
      value: 'Minsk Oblast',
      countryId: '6525ec6f-8650-45f8-915a-a61b6f3bf09f',
    },
    {
      id: '31b431d1-e825-4749-b6ff-1bf5802d250f',
      value: 'Mogilev Oblast',
      countryId: '6525ec6f-8650-45f8-915a-a61b6f3bf09f',
    },
    {
      id: 'f4b1803b-ceba-4c50-ba12-4381df907f58',
      value: 'Polesia Voblast',
      countryId: '6525ec6f-8650-45f8-915a-a61b6f3bf09f',
    },
    {
      id: 'b927d859-e91d-4c9d-acf7-4e881d3af4d3',
      value: 'Vitebsk Oblast',
      countryId: '6525ec6f-8650-45f8-915a-a61b6f3bf09f',
    },
  ],
  '81247f2b-eb61-4345-9ff0-37bd26cf9e1a': [
    {
      id: 'b3527500-ab3c-4b95-8c5d-b0785fd15f1a',
      value: 'BOACO',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'ecb8ed3e-dea1-463c-8045-ca8a63317abb',
      value: 'CARAZO',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'a9806867-19eb-4bdd-bd3f-3aed57f0bf33',
      value: 'CHINANDEGA',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'b3dd4a9e-d4af-46fd-b33f-2a153eeccf16',
      value: 'CHONTALES',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'a28b9d0d-43a4-4639-863b-2ba4e1875238',
      value: 'COSTA CARIBE NORTE',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'd2aa5c05-3834-4303-9703-46dfd928d22e',
      value: 'COSTA CARIBE SUR',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: '8beca8d4-9733-490a-ba80-f26218d70eee',
      value: 'ESTELÍ',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: '7284d34e-fd47-40e8-91d3-a4103b631be9',
      value: 'GRANADA',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: '308a7d8a-d195-420c-957a-1c2ace40c55c',
      value: 'JINOTEGA',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: '671ec448-9743-496c-8f38-ac8fb4c4b161',
      value: 'LEÓN',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: '9fcb7a42-8f4b-47ee-bb60-0f9f0984b838',
      value: 'MADRIZ',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'ce879d8e-a88f-47ac-8da1-5991584e9b3b',
      value: 'MANAGUA',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: '09a35767-5ba2-4fac-b5e1-cf5303b4d335',
      value: 'MASAYA',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'b99555d0-ea6d-43f7-a7a2-4739831aa196',
      value: 'MATAGALPA',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: '68c0d34c-f186-420f-bfc1-013dfb6633fc',
      value: 'NUEVA SEGOVIA',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'e21665f7-83de-420a-8236-080aa37c8334',
      value: 'RIO SAN JUAN',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
    {
      id: 'da884325-6e3b-4ea5-900c-46e15f50a460',
      value: 'RIVAS',
      countryId: '81247f2b-eb61-4345-9ff0-37bd26cf9e1a',
    },
  ],
  '96ae123c-f46b-1410-f998-00155d043204': [
    {
      id: 'c0be1e22-f46b-1410-3899-00155d043204',
      value: 'Ciudad de Edinburgo',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: 'f0bf42ea-f36b-1410-3899-00155d043204',
      value: 'Ciudad de Glasgow',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: 'c62429dc-b556-4e12-be9b-5731eb0e5b4d',
      value: 'Gales del Sur',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: 'c0af2282-f36b-1410-3499-00155d043204',
      value: 'Gran Londres',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: 'beae1204-f46b-1410-3799-00155d043204',
      value: 'Gran Manchester',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: '83709aac-542d-429e-8479-cc63e589fddc',
      value: 'Gwent',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: 'dbb196b5-3bfe-420d-b7ae-5adb4227c423',
      value: 'Irlanda del Norte',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: 'b1ae2e80-f36b-1410-3899-00155d043204',
      value: 'Merseyside',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: '00af3e82-f36b-1410-4399-00155d043204',
      value: 'West Midlands',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
    {
      id: 'fdae224a-f36b-1410-4399-00155d043204',
      value: 'Yorkshire',
      countryId: '96ae123c-f46b-1410-f998-00155d043204',
    },
  ],
  'a470b005-e8bb-df11-b00f-001d60e938c6': [
    {
      id: '753e03a0-31d9-49a9-86c5-8982c284f3fa',
      value: 'Cherkasy Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'ffbf0e8e-f36b-1410-bf93-00155d043205',
      value: 'Chernihiv Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2e8c63a9-6504-47e6-ab22-d8eed9703dd3',
      value: 'Chernivtsi Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'b7bf2e7e-f36b-1410-bf93-00155d043205',
      value: 'Dnipropetrovsk Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'c960c08b-728d-48a8-8910-507f19be08bb',
      value: 'Donetsk Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'd8f479b9-1123-424c-bf41-c851f7889b87',
      value: 'Ivano-Frankivsk Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'f03eabaa-65be-4217-b9ce-f809b98686ca',
      value: 'Kharkiv Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'a0421dad-6ac3-4777-a0f2-0a07f6f128f3',
      value: 'Kherson Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '6f7f15f7-ba39-4ccc-a249-acca3accd0b1',
      value: 'Kirovohrad Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '90edc2ee-07dd-df11-971b-001d60e938c6',
      value: 'Kyiv Region',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '66a4d8c0-045c-4a9d-b3b5-dda5a8fe6f5f',
      value: 'Luhansk Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '811cc8ea-ee95-4f10-8883-838a19c5c3aa',
      value: 'Lviv Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '8cebe4c9-9666-448c-a50d-562ba48470a6',
      value: 'Mykolaiv Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'ba169475-0449-4793-9aee-4fbf61396ae4',
      value: 'Óblast de Khmelnytskyi',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '6ba74cd6-0549-4cba-9d4f-1f004b30b8a7',
      value: 'Óblast de Volyn',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'c9bdddff-7db5-4793-8c22-8030458405f8',
      value: 'Odesa Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '22f50e56-5b86-4e6d-97ed-977b3a3ea93f',
      value: 'Poltava Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '402eadac-1c11-4a09-8a16-704ff5093009',
      value: 'Rivne Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2820acf3-3ab3-46dc-84cf-befe7d03ab8b',
      value: 'Sumy Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '3f410023-a26e-46bd-889b-957567cb2e5f',
      value: 'Ternopil Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '511ed1e3-d4c8-4591-92db-156cfddc09a1',
      value: 'Vinnytsia Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'a9f5c02c-9c1f-4c63-a495-9ac5b69149af',
      value: 'Zakarpattia Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'd0526906-e868-430c-b367-4ec72361c4ed',
      value: 'Zaporizhzhia Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'f495ab30-74d9-478b-b9bc-7034aafd61cb',
      value: 'Zhytomyr Oblast',
      countryId: 'a470b005-e8bb-df11-b00f-001d60e938c6',
    },
  ],
  'a570b005-e8bb-df11-b00f-001d60e938c6': [
    {
      id: '887909de-0f9a-4afc-a7b6-3dae43c9c4be',
      value: 'Adygea',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'e160a268-f7dc-416d-a238-285cb0602cd8',
      value: 'Altai Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '580b11c5-0d5d-4a56-8318-670e03d054b3',
      value: 'Altay',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2064f2e4-3673-4a52-81ad-51750db28970',
      value: 'Amur Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2cd992aa-8970-4c3c-b041-9fdcbe7884ed',
      value: 'Arkhangelsk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '0d63e5c1-8f35-46b1-932c-bbcc601aedaf',
      value: 'Astrakhan Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '373821cb-f407-440b-905e-4caab0ef3dc4',
      value: 'Bashkortostan',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'c7cd10fe-1fe0-4771-8d34-474f7299ced1',
      value: 'Bryansk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '0c6c5271-459e-4d8e-9e22-74e51d648784',
      value: 'Buryatia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '293438ec-cf4c-4359-bc9d-5e6f20e1da47',
      value: 'Chechnya',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '4ed7c090-b1de-4c5f-afa0-4a932b4812ae',
      value: 'Chelyabinsk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '6b35ca05-a7c4-4ddb-95af-451df33aef03',
      value: 'Chukotka Autonomous Okrug',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'b8a1bb87-a516-4ebf-a5cf-fed248444f42',
      value: 'Chuvashia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'ee3970d8-6702-4e2f-807f-4a63778c657a',
      value: 'Dagestan',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '02c79c3e-54e6-df11-971b-001d60e938c6',
      value: 'Districto Federal Central',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'dd040237-54e6-df11-971b-001d60e938c6',
      value: 'Distrito Federal del Noroeste',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '03c79c3e-54e6-df11-971b-001d60e938c6',
      value: 'Distrito Federal Sur',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '16a7a18e-9a1d-4ef7-9260-63c1d9efb6f5',
      value: 'Ingushetia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2b7a7406-f634-49f2-989a-1814f1131939',
      value: 'Irkutsk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'ba1bb821-9c9b-4990-8081-30d43e3ff985',
      value: 'Ivanovo Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '05f3e941-86d1-4b33-bbf4-e512627a7bee',
      value: 'Kabardino-Balkaria',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '26d9ea38-5a6a-44eb-80b7-414b40668392',
      value: 'Kaliningrad Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '44d72b83-ccfd-4369-9692-20764a3d3684',
      value: 'Kalmykia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '5166a117-6c71-4753-9964-01536a2c8bf8',
      value: 'Kaluga Óblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '9996165b-4827-43f3-92ee-12a3af1de5b4',
      value: 'Kamchatka Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'afffefee-7bf8-4830-8343-5579e8f859db',
      value: 'Karachay-Cherkessia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '59b976c3-b71d-4954-9a05-bb115eb1dcc8',
      value: 'Karelia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'e0405bc9-36f3-4c83-9338-789b03e22f49',
      value: 'Kemerovo Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '65779067-6c55-4ad7-91d8-1234b5209202',
      value: 'Khabarovsk Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'bb96eb24-8461-41a7-bd05-c0cc4276b075',
      value: 'Khakassia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'e09affa4-4add-416e-8a17-5fcb5b253f5c',
      value: 'Khanty-Mansi Autonomous Okrug',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '7a8bead1-5282-4523-9be1-2ade8239a4ab',
      value: 'Kirov Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'b31080f9-4aab-4bc7-924a-01e931de00f2',
      value: 'Komi',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '1d60e3b0-b939-40f6-806c-524c7219f995',
      value: 'Krasnodar Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '0000e285-2323-45c2-a433-e187340f4fa9',
      value: 'Krasnoyarsk Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '7f4bfb4a-a76f-45e1-a45c-f9401c3ef312',
      value: 'Kurgan Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '70502864-ce89-4c62-87a8-9d5c5a181af5',
      value: 'Kursk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '1becfffd-07dd-df11-971b-001d60e938c6',
      value: 'Leningrad Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '0bb94618-9078-4e05-99c2-81f5e7c44865',
      value: 'Lipetsk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '378acbd4-7818-4813-ac4b-a5a03fde6f9a',
      value: 'Magadan Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '01628ec5-fb80-439a-be8d-ba25962ca756',
      value: 'Mari El',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'ffc28051-7593-492f-8edb-66d1228abe9d',
      value: 'Mordovia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '89c9af37-f8d4-4bb0-a815-fbe0f009dc30',
      value: 'Nenets Autonomous Okrug',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '29149c18-364b-4086-b4e8-9fb47df91a6c',
      value: 'Nizhegorod Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '3704f063-c2da-45eb-a48d-58c8ba49e024',
      value: 'Novgorod Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '59b2c9d8-647f-4481-84c1-0def8310645b',
      value: 'Novosibirsk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '3b7e6672-040c-4d7d-91e2-a32d1c09859e',
      value: 'Óblast Autonómico Judío',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'dc1daae1-8673-4c58-8e95-1c67d4e39ca8',
      value: 'Óblast de Belgorod',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'b8cfd038-1579-4dc4-b71e-388ff6fed19c',
      value: 'Óblast de Kostroma',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '4f485b54-54e6-df11-971b-001d60e938c6',
      value: 'Óblast de Moscú',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '3b8f4ca7-e70f-4902-a421-25da0a1d5fc9',
      value: 'Óblast de Murmansk',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '336fdc2c-5efa-4d3e-9509-f72a3af8976b',
      value: 'Óblast de Samara',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '98f9eb1f-d070-4fc8-a7a1-b045d60876ac',
      value: 'Óblast de Tomsk',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'f95c375a-f296-4a13-9d7b-65f06d8f60ae',
      value: 'Óblast de Vladimir',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '02b82f15-14c5-47cc-9cd5-2a1e0e6cd0b8',
      value: 'Omsk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '3cb61ff9-38f7-456e-9a50-edaa938748f3',
      value: 'Orenburg Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '202841a2-04d0-40c4-8aae-4bab2575aa59',
      value: 'Oryol Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'c4a74ea2-f95d-47be-930c-b852a34e583c',
      value: 'Ossetia del Norte',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'dd04f3ac-484a-4c71-a0d1-70771605cb2f',
      value: 'Penza Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '35ab60f2-66b5-4e9f-ba8b-ca0664c388e8',
      value: 'Perm Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '5dee62fa-2f9a-438a-b594-5307b29af89e',
      value: 'Primorsky Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '17cf24bb-5844-4216-8e44-20c9a26a8980',
      value: 'Pskov Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2fe85584-2093-4dd5-ba93-60b0f4911b22',
      value: 'Rostov Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'e3b7679e-81de-45fd-ac3d-ba4af7465e21',
      value: 'Ryazan Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '7286dfbf-98a5-4b8c-8051-8e9575f3c1e1',
      value: 'Sakhalin Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2e34688f-f650-41c9-9699-f2032ef99542',
      value: 'Saratov Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'c89905ef-32e4-436d-8576-c26a4d40e5ea',
      value: 'Smolensk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '55056bd3-6030-44ff-80df-959e598d2f06',
      value: 'Stavropol Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2877f4a4-fc9b-4fbd-829b-7ef4c24d5d23',
      value: 'Sverdlovsk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '961ab6e4-ad15-4db4-ac16-e18f20bad84c',
      value: 'Tambov Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'c0397971-813f-48e2-a37f-6ae702e4edc5',
      value: 'Tatarstan',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '47b44828-36a7-47b3-8c39-2532d74e5f0b',
      value: 'Tula Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'a617908c-8ba4-4117-b623-cc4e38fe46c0',
      value: 'Tver Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '235af220-c5b2-4c44-b6d6-a255261bf8ea',
      value: 'Tyumen Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'b5514862-033f-4a94-8554-c16daab02d33',
      value: 'Tyva',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '82c9b03b-1979-4cf6-a32e-53e7296f5b39',
      value: 'Udmurtia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'a4e12361-170d-4ea5-9eef-3744493056c6',
      value: 'Ulyanovsk Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'f9fc24df-472f-45fd-98fe-5d7af141c99a',
      value: 'Volgograd Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '55a3e2c3-410b-4c6a-b220-84bfc700c2e8',
      value: 'Vologda Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'd807e9c8-9acc-4a2f-b578-282ae8847110',
      value: 'Voronezh Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '414cf4e9-8126-4762-8c8f-40ca65dfc5c8',
      value: 'Yakutia',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'cc01e86a-b1b5-43b9-abbf-0bfc01f42864',
      value: 'Yamalo-Nenets Autonomous Okrug',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '49692280-5030-46a6-8981-da21ebacb9a7',
      value: 'Yaroslavl Oblast',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'a4c54d2b-a068-4871-9c90-41ae56c881dc',
      value: 'Zabaykalsky Krai',
      countryId: 'a570b005-e8bb-df11-b00f-001d60e938c6',
    },
  ],
  'a670b005-e8bb-df11-b00f-001d60e938c6': [
    {
      id: '4ee12453-aa54-4b27-a223-95dbfd3a1074',
      value: 'Australia del Sur',
      countryId: 'a670b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '5a6dcdf9-dec9-40ee-9a04-419680ae31c4',
      value: 'Australia Occidental',
      countryId: 'a670b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '433a3379-b218-4662-bfb6-44ce48c64c8a',
      value: 'Nuevo Gales del Sur',
      countryId: 'a670b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'd227fc10-f294-4977-866e-15c1075d688e',
      value: 'Queensland',
      countryId: 'a670b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'b62bb437-6636-470b-8317-8ac8a8436428',
      value: 'Tasmania',
      countryId: 'a670b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '05b75c89-736e-43c8-8db6-4646fe69ef7f',
      value: 'Territorio de Capital de Australia',
      countryId: 'a670b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '6f754fe8-ec16-4d71-b013-537ef7b4f095',
      value: 'Territorio del Norte',
      countryId: 'a670b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '249f4b7f-31e3-459c-a472-ad9cd6e86e61',
      value: 'Victoria',
      countryId: 'a670b005-e8bb-df11-b00f-001d60e938c6',
    },
  ],
  'a770b005-e8bb-df11-b00f-001d60e938c6': [
    {
      id: 'a9d034d1-1f93-49a8-a247-06fffc93a2b6',
      value: 'Atyrau Region',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '2b7c9838-95e6-4f16-b7f3-38fb139ddca1',
      value: 'Karaganda Region',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '433b7dff-ba69-4d41-9dff-50c12a0da45a',
      value: 'Kostanay Region',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '1c06aecf-46cb-4d06-bcbb-33738f2e2488',
      value: 'Mangystau Region',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '716310e7-1cd1-490a-8a54-5dc925da294e',
      value: 'Pavlodar Region',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '33c5ce70-7ab5-4b5f-a8aa-8c09d47a5da5',
      value: 'Región de Akmola',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: 'c653274d-c7b1-4a05-9614-955ba0f40888',
      value: 'Región de Aktobe',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '490475b3-1b6d-4f2b-8c23-47a8657640c9',
      value: 'Región de Almaty',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '05e46ea5-ac84-4e87-b9d9-25614525b1db',
      value: 'Región de Jambyl',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '4500449f-9705-4065-a0a1-43de453476b1',
      value: 'Región de Kazakhstán del Norte',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '5bb68a68-cf8d-46c1-afce-afbef628b6e7',
      value: 'Región de Kazakhstán del Sur',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '79da12fb-b755-43df-a021-bd96d39db8ed',
      value: 'Región de Kazakhstán Occidental',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '99f3bcb6-b60b-43e6-a284-219fbbe065c7',
      value: 'Región de Kyzylorda',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
    {
      id: '51f2a42e-877e-4a67-8c0e-d9b93f2b9e9f',
      value: 'Región este Kazakhstan',
      countryId: 'a770b005-e8bb-df11-b00f-001d60e938c6',
    },
  ],
  'c5f65a81-0517-48cf-b113-a9699725cacc': [
    {
      id: 'ba74023b-3683-4c26-9a0f-475eaef2575a',
      value: 'BOCAS DEL TORO',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: 'eaf456e7-8c01-49f4-8105-3edf4e6c643f',
      value: 'CHIRIQUÍ',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: 'd91f33e6-f6db-4319-a88d-7ed1f85a7f55',
      value: 'COCLÉ',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: '4686ef4a-ea20-4e56-83e2-9e6b00ec1c9b',
      value: 'COLÓN',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: 'd6f71f6e-5664-4efe-ba48-3c2a4ecbba8b',
      value: 'DARIÉN',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: '3e03284b-2cc5-4b2c-8d67-faf476c49160',
      value: 'HERRERA',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: 'a770852e-7b6b-44e2-b4f4-5b1d36d79959',
      value: 'LOS SANTOS',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: 'ab4c3714-e2a9-46d4-a394-7efaea821435',
      value: 'PANAMÁ',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: '9108bb6d-4926-4c05-83cb-b957a737661f',
      value: 'PANAMÁ OESTE',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
    {
      id: 'daee021c-c2cb-4d4d-a34b-5c2fc8879171',
      value: 'VERAGUAS',
      countryId: 'c5f65a81-0517-48cf-b113-a9699725cacc',
    },
  ],
  'c6425e57-daec-4795-a16d-d7f947f3c6f1': [
    {
      id: 'c09d3c5b-0556-4f1e-be93-59593e0390d9',
      value: 'ARTIGAS',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'e7df861c-aad3-4f1a-9623-d6be5750ed7a',
      value: 'CANELONES',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: '177066aa-9a1d-4a66-a5e0-6ce628a335e9',
      value: 'CERRO LARGO',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: '001abbd7-2d6d-45ba-b344-571b622a718d',
      value: 'COLONIA',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'a6c8af6a-52b3-46f7-9025-14a110d4e843',
      value: 'DURAZNO',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: '0cd04c03-4ef9-4976-8cf7-f2fccfc33efd',
      value: 'FLORES',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'bf0c0243-3911-41d3-a168-d887dcce85a0',
      value: 'FLORIDA',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: '368b6a6f-53f3-4343-a939-0558f7ea4a56',
      value: 'LAVALLEJA',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'd62f88bc-b90c-42d9-aed0-56f88d4b70fd',
      value: 'MALDONADO',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: '36f8b1f2-c177-4399-927a-d990713446e7',
      value: 'MONTEVIDEO',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'e383237d-8806-4a04-bc25-13277e61f32c',
      value: 'PAYSANDÚ',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'e1e1f523-ca98-4562-95a3-bcfa83da8d86',
      value: 'RÍO NEGRO',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'f09fbc23-e49d-4215-83d7-195e091c425a',
      value: 'RIVERA',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: '036e3153-7527-4196-ba8f-b09896d2c5c3',
      value: 'ROCHA',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'cbb94a40-bea0-4a95-bbc1-92f1a7a314ca',
      value: 'SALTO',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: '15eb7e61-ed35-4a5c-91c3-94fcbf88dc97',
      value: 'SAN JOSÉ',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'b49d4501-7cd8-4d3c-9fc2-b1d8b66ae195',
      value: 'SORIANO',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'b539c248-179f-4622-b7d5-fe282f20f2ad',
      value: 'TACUAREMBÓ',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
    {
      id: 'e301eab0-05ed-4722-a6d5-0d2e887ec68b',
      value: 'TREINTA Y TRES',
      countryId: 'c6425e57-daec-4795-a16d-d7f947f3c6f1',
    },
  ],
  'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9': [
    {
      id: '3b30cc27-b440-4761-b120-a80c772fc52c',
      value: 'ALAJUELA',
      countryId: 'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9',
    },
    {
      id: '1a38c01d-8280-447a-b80e-a786db983d97',
      value: 'CARTAGO',
      countryId: 'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9',
    },
    {
      id: 'fd1407b7-4b53-48bd-8189-2a41c5eccd08',
      value: 'DESAMPARADOS',
      countryId: 'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9',
    },
    {
      id: '5f97d969-f9b4-405f-bdb2-89ae00ba01d6',
      value: 'HEREDIA',
      countryId: 'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9',
    },
    {
      id: '530f1f20-416e-40b7-82a5-d575ddab86f6',
      value: 'PEREZ ZELEDÓN',
      countryId: 'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9',
    },
    {
      id: '9272f76c-10e2-4f53-9893-a3157ae85245',
      value: 'POCOCÍ',
      countryId: 'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9',
    },
    {
      id: '3aae9ab0-3a8f-4c3e-9012-b17b4fc3c2ab',
      value: 'SAN CARLOS',
      countryId: 'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9',
    },
    {
      id: 'b04a585b-2848-47fd-bf9b-9aa4b08a38d0',
      value: 'SAN JOSE',
      countryId: 'd1d0b5e6-0d02-47c3-be56-2b0ca3cb2bc9',
    },
  ],
  'da4ed170-1bb2-46a9-aa28-8986b987c66f': [
    {
      id: 'ecd12635-e134-4d7e-94aa-0d408c84ee77',
      value: 'AMAZONAS',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'b6052ba5-7b76-4ef4-b0bd-f2a494b07fef',
      value: 'ANTIOQUIA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '272c957b-4e3b-468b-989d-3ca1edf8f467',
      value: 'ARAUCA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '7952ae16-58fe-463d-9383-065740f4a020',
      value: 'ATLANTICO',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '34dfd97f-cceb-4336-9006-2b46f7c4bb65',
      value: 'BOGOTA D.C.',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '45685321-f116-4ff4-a208-24e0cb9194ec',
      value: 'BOLIVAR c',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '448be318-fd63-473e-ae08-9a18a09fb804',
      value: 'BOYACA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'e566510f-7927-4794-86a8-419227a21207',
      value: 'CALDAS',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '3350a6b9-bd5b-4066-9f04-4fd102750742',
      value: 'CAQUETA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'd4d3d98f-7ef4-4f70-8827-1037b20b027a',
      value: 'CASANARE',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '6b00e927-1bb9-4357-ab67-c97338f32db1',
      value: 'CAUCA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'a5208396-8b1f-4939-bd4e-bdbd3c510ed2',
      value: 'CESAR',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '77277217-ccca-456d-b4ad-73016fcba397',
      value: 'CHOCO',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '25de04bc-6220-4da3-804b-1a2e532eb2fb',
      value: 'CORDOBA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '697be5f3-1f86-4350-b545-0f0cdf724852',
      value: 'CUNDINAMARCA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'a4d688d1-1a7d-4abd-b692-711221245a78',
      value: 'GUAVIARE',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '9de24874-f7fd-4236-85ca-2f1c71cc3601',
      value: 'HUILA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'b11e07eb-0214-4618-9543-218464109af9',
      value: 'LA GUAJIRA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'a0cdf183-d980-449c-a906-7dff8126361f',
      value: 'MAGDALENA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '81a8a2a0-3156-4cc8-b9e3-e0d345bd8a2d',
      value: 'META',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '0048a391-cc8c-42c6-bf57-9b8f4d9c39fa',
      value: 'NARIÑO',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '5cc530d0-7bf1-4aff-b8b8-1a22749d2098',
      value: 'NORTE DE SANTANDER',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '11be7ac2-9dc3-4399-a756-c8201dc47468',
      value: 'PUTUMAYO',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '4c8a3b11-9b8f-4998-bc1d-f72f3159bd08',
      value: 'QUINDIO',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'a53df431-064b-43b9-a2a8-45de77e2ea66',
      value: 'RISARALDA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '6d754d49-a5a8-4d26-ae1a-04599146459b',
      value: 'SANTANDER',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'ddbdf555-3d66-480e-bdb3-3324efb2da41',
      value: 'SUCRE',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: '1cd1b982-3dd1-4dc8-b8f8-12c052ab3cb0',
      value: 'TOLIMA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
    {
      id: 'a817535e-6cc4-4dd4-82bf-f1662a268bb9',
      value: 'VALLE DEL CAUCA',
      countryId: 'da4ed170-1bb2-46a9-aa28-8986b987c66f',
    },
  ],
  'e0be1264-f36b-1410-fa98-00155d043204': [
    {
      id: 'f6af2204-f46b-1410-fc98-00155d043204',
      value: 'Alabama',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '3fd1d7f6-f46c-45bb-97cd-bc4fc41d3614',
      value: 'Alaska',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'e4761e8f-6890-4438-85c5-75547f22a553',
      value: 'Arizona',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '2eff6fed-ee4c-4799-a184-3f480cae3943',
      value: 'Arkansas',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'd8af122a-f46b-1410-fc98-00155d043204',
      value: 'California',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '529a94ff-eff0-4be1-a6a0-81d7ca6eed53',
      value: 'Carolina del Norte',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'ef25ff12-f3da-4a18-b658-9c473bdeca69',
      value: 'Carolina del Sur',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'c320d949-3238-428f-bf0c-721a20c80930',
      value: 'Colorado',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '0e225f8c-5a50-4b0b-a18b-7b2f85367253',
      value: 'Connecticut',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '81711be5-eb8d-4e19-8889-8e310e2744a1',
      value: 'Dakota del Norte',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'b10993b0-e355-4f12-80c2-141e49f3106c',
      value: 'Dakota del Sur',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'b72ae6a2-7070-4c97-94c0-34b5765edbd0',
      value: 'Delaware',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '99ae3e40-f36b-1410-fd98-00155d043204',
      value: 'Distrito de Columbia',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'd8bf2e4c-f36b-1410-fd98-00155d043204',
      value: 'Florida',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'f8be125e-f36b-1410-fd98-00155d043204',
      value: 'Georgia',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'f9c816b2-1a82-4101-be0f-f90c0ed26521',
      value: 'Hawaii',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '1782e78d-2f18-498b-b6c7-386215b91d66',
      value: 'Idaho',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '96ab9ca7-1965-4426-acfe-272f1e7a4080',
      value: 'Illinois',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '6b6b4922-fab0-4e22-abe7-bc31dafe5f56',
      value: 'Indiana',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'de6847f5-a04f-4c89-890a-3c8083cd9083',
      value: 'Iowa',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'bf89ee26-9e2b-42c9-a3cd-aca53bcbb736',
      value: 'Kansas',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '96bfc3d8-56a4-4a6c-8281-0e87bda8daae',
      value: 'Kentucky',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'df425d32-d849-4010-8885-27e8b4b778d0',
      value: 'Luisiana',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '73110658-0fe6-41e7-8e10-8a3e50eff097',
      value: 'Maine',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '4055656f-b979-4e5f-a91a-52842961c524',
      value: 'Maryland',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '658acfe7-09ae-4747-b1b3-541e2dfa1b9e',
      value: 'Massachusetts',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'dcaf4282-f36b-1410-0299-00155d043204',
      value: 'Michigan',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '7e091cae-1d81-4ee0-ae17-4436fcbb93b4',
      value: 'Minnesota',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '7d9d18ea-72ea-4870-bb43-c7ecc73584b8',
      value: 'Mississippi',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '7eae84c7-b960-47db-ae59-5fd3bc0b9a73',
      value: 'Missouri',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '872cce62-feba-44d1-98ec-426b627dcb96',
      value: 'Montana',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '9136b502-6142-4e57-91ad-f71e4dc975a3',
      value: 'Nebraska',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '83b70eb5-246c-47e8-9777-d9d1e112ef11',
      value: 'Nevada',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'e1afda65-714d-4040-a3ec-8c7944bd4cbd',
      value: 'New Hampshire',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'fa346ca3-244d-4c54-8e8a-6afadc9e0f52',
      value: 'Nueva Jersey',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '00b03270-f36b-1410-fd98-00155d043204',
      value: 'Nueva York',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '896e1da9-a276-47fc-98a6-421b98d3a787',
      value: 'Nuevo Mexico',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '366d0be2-e83a-4fa2-a5b5-f437bff52d73',
      value: 'Ohio',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '1add246e-d83e-44b0-bfe7-de70fed2dcd9',
      value: 'Oklahoma',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '977e3cdc-d018-458a-9b73-67474ebc9f62',
      value: 'Oregón',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '4e6c661e-a401-4de8-bd91-a4366fdc4d89',
      value: 'Pennsylvania',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '38ce8349-107a-471f-967c-8fe3443894f6',
      value: 'Rhode Island',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '6f58e2a4-6eb0-4450-8dbe-13f0a9541715',
      value: 'Tennessee',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'beae2282-f36b-1410-fd98-00155d043204',
      value: 'Texas',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '1eb55c1c-3046-44f1-91ab-c158241f5fdb',
      value: 'Utah',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'ccc3118e-6044-4ce5-ad74-4ea321a0fea6',
      value: 'Vermónt',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'eaf513b2-1914-41ea-9f69-c17238496e45',
      value: 'Virginia',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'e6fdc56d-33b1-4c02-b17a-bec59adb9462',
      value: 'Virginia Occidental',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'f6bf4290-f36b-1410-fd98-00155d043204',
      value: 'Washington',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: '3bad0137-82b6-41bd-8c3c-ee4bcacf6164',
      value: 'Wisconsin',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
    {
      id: 'b75b85a8-8259-4393-ab78-1c0f068ae90b',
      value: 'Wyoming',
      countryId: 'e0be1264-f36b-1410-fa98-00155d043204',
    },
  ],
  'eb13a8e0-5be7-4ef6-bddc-d35436a40807': [
    {
      id: 'f0c24134-0ccd-4b43-8359-d2d37bec47be',
      value: 'ALTA VERAPAZ',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '35d9d3e2-e0a1-4209-b939-c919b6809c61',
      value: 'BAJA VERAPAZ',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '99b392d6-d841-465f-93a6-4cca02f8276f',
      value: 'CHIMALTENANGO',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '23581129-bf10-49da-8272-9036ec972eac',
      value: 'CHIQUIMULA',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'd423d271-45e1-4569-ab36-560ab789b1cb',
      value: 'EL PROGRESO',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '847699a6-0b25-445d-8f4e-e5e08bb5f310',
      value: 'ESCUINTLA',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'e228d516-66a4-4c34-9d8b-31337017408a',
      value: 'GUATEMALA',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '92689fac-06c0-4deb-87d0-1f0f50ebad88',
      value: 'HUEHUETANANGO',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'dc983039-f2a2-4d58-bf64-963c4ff6379a',
      value: 'IZABAL',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '5878c223-dc40-493b-988c-c9da8de8165d',
      value: 'JALAPA',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'e02fc01c-925e-4a44-889a-8f23080a14f2',
      value: 'JUTIAPA',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'c831d234-795c-47d4-b3ca-fa489f30846c',
      value: 'PETÉN',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '0d731738-bc95-4a45-9c0a-2237e5189854',
      value: 'QUETZALTENANGO',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '7576f10f-c226-4382-a03d-2d63a7ba5542',
      value: 'QUICHÉ',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '7377fb71-1f8b-4744-8508-68fb0fd2ebee',
      value: 'RETALHULEU',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'd1b34805-54e4-4df3-8e65-9f27916e3fed',
      value: 'SACATEPÉQUEZ',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'b74d3149-1e97-4748-953b-3ca08ac082e1',
      value: 'SAN MARCOS',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'c9407885-ebd5-494f-aa22-be5797967a60',
      value: 'SANTA ROSA',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '57e7081f-0d4a-4cf4-9bb4-0e4a306f8bdf',
      value: 'SOLOLÁ',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: '7f27d572-fff0-4e44-8edc-1cac655f9d45',
      value: 'SUCHITEPÉQUEZ',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'c6d79c8e-4320-4c3c-ae10-e56509d44606',
      value: 'TOTONICAPÁN',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
    {
      id: 'bdac346f-c1a3-49ee-a203-cb7b4fe1e938',
      value: 'ZACAPA',
      countryId: 'eb13a8e0-5be7-4ef6-bddc-d35436a40807',
    },
  ],
  'f7bf32c8-f36b-1410-fc98-00155d043204': [
    {
      id: 'e371ec2e-fd0e-4147-933e-2ece4e49b467',
      value: 'Baden-Wuerttemberg',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: 'd6731ea2-d86d-4c2b-8435-9e99f29912a0',
      value: 'Bavaria',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: 'c065fa5c-5e11-4da0-9c5c-41fddd2a748d',
      value: 'Berlin',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '5b9dfef9-5977-45fa-a6cd-6e7718c61c7b',
      value: 'Brandenburg',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '4f017a42-7475-40b8-bce2-1eb7dbafb770',
      value: 'Bremen',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '5f4a36eb-eb74-4d62-bfb1-9947cb194743',
      value: 'Hamburg',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '49b936e7-42d0-453d-81b5-252fc2541570',
      value: 'Hesse',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '99b523cc-2db9-411f-91bf-e96437eb52bd',
      value: 'Lower Saxony',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: 'bdeb1e9a-df4d-4893-a22c-3391c1891c18',
      value: 'Mecklenburg-Vorpommern',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '97959aea-bee8-4c38-9d57-d2b395d69e16',
      value: 'North Rhine-Westphalia',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '1a6ad199-d0db-4c3a-bcaa-03712f6160eb',
      value: 'Rhineland-Palatinate',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: 'eeb353ec-0c5c-4b96-871f-4ab44fa93235',
      value: 'Saarland',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: 'f9eca4de-227b-4afa-9048-3b90507b3cb9',
      value: 'Saxony',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '83d79a65-2883-4aac-bc6f-115f3059e90b',
      value: 'Saxony-Anhalt',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: 'a7b33ad9-60a5-4b6e-a783-e9873d4da157',
      value: 'Schleswig-Holstein',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
    {
      id: '84a9864f-7c9f-4c53-b054-7a31248aa96d',
      value: 'Thuringia',
      countryId: 'f7bf32c8-f36b-1410-fc98-00155d043204',
    },
  ],
  '': [{ id: '9d6a9c2c-ae2d-4e03-a0c1-65277abbd45b', value: 'Los Ríos', countryId: '' }],
};

export function getProvinceByCountry(countryId: string): readonly Province[] {
  return PROVINCES_BY_COUNTRY_ID[countryId] ?? [];
}
