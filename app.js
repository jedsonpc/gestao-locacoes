const storageKey = "gestao-locacoes-v1";
const authKey = "gestao-locacoes-auth-v1";
const sessionKey = "gestao-locacoes-session-v1";
const sessionUserKey = "gestao-locacoes-session-user-v1";
const offlineUserKey = "gestao-locacoes-last-online-user-v1";
const reminderSessionKey = "gestao-locacoes-contract-reminder-v1";
const chargeConfirmationReminderSessionKey = "gestao-locacoes-charge-confirmation-reminder-v1";
const syncKey = "gestao-locacoes-sync-v1";
const cloudSyncMetaKey = "gestao-locacoes-cloud-meta-v1";
const backupKey = "gestao-locacoes-backups-v1";
const backupDirectoryDbName = "gestao-locacoes-backup-folder-v1";
const backupDirectoryStoreName = "handles";
const backupDirectoryHandleKey = "app-backup-folder";
const backupMaxItems = 5;
const preferredBackupFolderLabel = "D:\\App\\backups";
const companyName = "Imobiliaria Rio dos Passos Ltda";
const appVersion = "local-1.9.38";
let deferredMobileInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredMobileInstallPrompt = event;
  updateMobileInstallCard();
});

window.addEventListener("appinstalled", () => {
  deferredMobileInstallPrompt = null;
  updateMobileInstallCard();
});
const appDeployedAt = "2026-07-17T17:59:24-03:00";
const updatePackageFileName = "rio-dos-passos-atualizacao.zip";
const updatePackageManifestFileName = "update-package.json";
const appStorage = createSafeStorage("app");
const appSessionStorage = createSafeStorage("session");
const recentFinancialLaunchLimit = 10;
const chargeMonitoringStartDateValue = "2026-01-01";
let appMetadata = {
  version: appVersion,
  deployedAt: appDeployedAt,
};

const initialState = {
  properties: [],
  clients: [],
  contracts: [],
  expenses: [],
  payments: [],
  chargeConfirmations: [],
  auditLogs: [],
};

const bundledRecoveryState = {"properties":[{"id":"property-1779817467079-adc3277c81d2e8","area":"44,30 M2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-320","updatedAt":"2026-06-05T17:41:30.555Z","description":"Sala 2705 Torre A, RIOMAR TRADE CENTER I","documentLink":"https://drive.google.com/drive/folders/1IKvASl0SGQEkvBshDJWnG90I0W5lpkP2","investmentValue":259000},{"id":"property-1779817763051-6ce49e856f2418","area":"36,37 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-320","updatedAt":"2026-06-05T17:42:18.955Z","description":"Sala 2706 Torre A, RIOMAR TRADE CENTER I","documentLink":"https://drive.google.com/drive/folders/1fvX5gjke0wVBP_ngHGQxWvCr_me08MH_","investmentValue":259000},{"id":"property-1779817898681-40f67d5e5a9f1","area":"36,14 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-320","updatedAt":"2026-06-05T17:47:09.172Z","description":"Sala 2707 Torre A, RIOMAR TRADE CENTER I","documentLink":"https://drive.google.com/drive/folders/13S9A9-Eis6TaMXiIj9d71wm2BpytdPV9","investmentValue":259000},{"id":"property-1779817996504-bc8092c0c49258","area":"42,80 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-320","updatedAt":"2026-06-05T17:48:00.423Z","description":"Sala 2708 Torre A, RIOMAR TRADE CENTER I","documentLink":"https://drive.google.com/drive/folders/1qfuNycWtuoPHaLjYAOB8X3iY7iox4WO-","investmentValue":259000},{"id":"property-1779818554431-82ccd864a0ef98","area":"37,01 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:49:46.592Z","description":"Sala 413 Torre C, RIOMAR TRADE CENTER III","documentLink":"https://drive.google.com/drive/folders/1TliW606_wnBgMNVbZn2LQKpVmkzLcrfh","investmentValue":310884},{"id":"property-1779818945081-ce41425ae4ac9","area":"30,47 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:49:32.207Z","description":"Sala 414 Torre C, RIOMAR TRADE CENTER III","documentLink":"https://drive.google.com/drive/folders/108P1zqn96F6CllM-NTKBH6OkrGpaD7KN","investmentValue":255948},{"id":"property-1779819117758-bc9458a6e0fd28","area":"42,80 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:50:24.733Z","description":"Sala 1401 Torre C, RIOMAR TRADE CENTER III","documentLink":"https://drive.google.com/drive/folders/1RLudeRhk47JGTN_STjj_4_YgQVb4RYuY","investmentValue":402320.16},{"id":"property-1779819623676-666ddd22ec65e","area":"36,14 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:50:59.528Z","description":"Sala 1402 Torre C, RIOMAR TRADE CENTER III","documentLink":"https://drive.google.com/drive/folders/1mHC7pP0NvMKSQCv6yEYzMH1HM4PLZ3Yv","investmentValue":339715.96},{"id":"property-1779821555414-2e4d9eec065b28","area":"29,34 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:52:37.897Z","description":"Sala 1611 Torre E, RIOMAR TRADE CENTER V","documentLink":"https://drive.google.com/drive/folders/1a4xZbdxMtEswaUC5SXM6P3N81iD3kDc1","investmentValue":259682.52},{"id":"property-1779821701568-145ba738928b5","area":"28,85 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:53:33.446Z","description":"Sala 1613 Torre E, RIOMAR TRADE CENTER V","documentLink":"https://drive.google.com/drive/folders/1wnmzXKhY8sVjaBkcUSae1AUb_uls5Fpw","investmentValue":255345.24},{"id":"property-1779821806395-e6d1f48a5f6618","area":"28,20 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:54:57.309Z","description":"Sala 1615 Torre E, RIOMAR TRADE CENTER V","documentLink":"https://drive.google.com/drive/folders/1drjCxKp-qMZVx0kos3RjJ0KjKosCZLaM","investmentValue":249592.64},{"id":"property-1779821883726-2d8a4f632c14c","area":"27,39 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:56:26.663Z","description":"Sala 1617 Torre E, RIOMAR TRADE CENTER V","documentLink":"https://drive.google.com/drive/folders/1wbzcNt0YA4WzEtqNUdCpffLE6MG5dZGC","investmentValue":242423.48},{"id":"property-1779821969471-c5804f2b25016","area":"26,53 m2","type":"Sala comercial","location":"Avenida RepÃºblica do Libano, 251, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-05T17:59:51.081Z","description":"Sala 1619 Torre E, RIOMAR TRADE CENTER V","documentLink":"https://drive.google.com/drive/folders/1xF0PvHdKH8vR8l7L7D8BxqdbRZukIQHc","investmentValue":234811.62},{"id":"property-1779824367034-e6bb0f408c4f9","area":"20000 m2","type":"Terreno","location":"Enegenho Vileta, Zona Rural, Escada-PE","updatedAt":"2026-05-26T20:32:49.117Z","description":"Antena","documentLink":"https://drive.google.com/drive/folders/1WBeMqPZ51OWAYMESoxAfCEiln2E_XQqL","investmentValue":"40000"},{"id":"property-1779827474940-393908d800693","area":"17000 m2","type":"Terreno","location":"Rodovia PE 09, S/N, Nossa Senhora do Ã“ - ipojuca-PE CEP 55.590-000","updatedAt":"2026-05-26T20:32:31.040Z","description":"LRA","documentLink":"https://drive.google.com/drive/folders/1EzFf4UHkorZqx6E5-2w8jQaMStSgIofW","investmentValue":"4000000"},{"id":"property-1780425210110-8329b5bfeb9048","area":"0","type":"Area comercial","location":"Avenida RepÃºblica do Libano, 251, Sala 414 Torre C, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-02T18:43:32.918Z","description":"LRA2","documentLink":"https://drive.google.com/drive/folders/1vk_kDvQA4IZjvgzUQYC6VulDwmubG4SY","investmentValue":1964250},{"id":"property-1780425532534-494ab555b57ee8","area":"0","type":"Area comercial","location":"Avenida RepÃºblica do Libano, 251, Sala 2207 - Torre A, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-02T18:38:52.534Z","description":"Yachin","documentLink":"https://drive.google.com/drive/folders/1wvBlU1lPKOjn7jzCRAA-IwwshILqc0Qt","investmentValue":0},{"id":"property-1780425890856-af462c2c678f08","area":"0","type":"Area comercial","location":"Avenida RepÃºblica do Libano, 251, Sala 2301 - Torre D, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-02T18:46:42.787Z","description":"Peixinhos","documentLink":"https://drive.google.com/drive/folders/1TK1xlhKn9oNtqX-uqU39Ef-5yk2e-0wD","investmentValue":687604},{"id":"property-1780426159336-e5b0e725576de8","area":"400 m2","type":"Imovel Residencial","location":"Quadra 04, Lote 03-A, Bairro Portal de GravatÃ¡, GravatÃ¡-PE, CEP: 55.640-000","updatedAt":"2026-06-03T04:47:51.003Z","description":"Casa de GravatÃ¡","documentLink":"https://drive.google.com/drive/folders/1Cr6D85aOaTjKF_QsieXTgXtBvs-eSO1V","investmentValue":100000},{"id":"property-1780426951526-d1bd58fd1fb3","area":"233,30 m2","type":"Apartamento","location":"Rua Artur Muniz, 147, Boa Viagem, Recife-PE, CEP: 51.111-190","updatedAt":"2026-06-03T04:48:05.935Z","description":"AP 602 - Boa Viagem","documentLink":"https://drive.google.com/drive/folders/1EORrAB6jAFQtvd4QJrg2ALqYBzDv2bpF","investmentValue":1000000},{"id":"property-1780427183380-86f553b14313c","area":"380,609 m2","type":"Apartamento","location":"SQS 316, Asa Sul, Brasilia-DF, CEP: 70.387-010","updatedAt":"2026-06-03T04:48:20.778Z","description":"AP Brasilia","documentLink":"https://drive.google.com/drive/folders/1-cbyxm1v-9S7aXaUX9aN2DeyU4lAz7s2","investmentValue":2000000},{"id":"property-1780427381949-f1fb38edef0fc","area":"0","type":"Area comercial","location":"Avenida RepÃºblica do Libano, 251, Sala 2301 - Torre D, Bairro Pina, Recife-PE CEP: 51.110-160","updatedAt":"2026-06-02T19:09:41.949Z","description":"GLD Empreendimentos Ltda","documentLink":"https://drive.google.com/drive/folders/168w5xW95sxDZAtExbJ6KWw0xEUs_2htR","investmentValue":1800000},{"id":"property-1780427798009-a6ab971ece7d5","area":"673,35 m2 (corresponde a 5% de 67x201m2=13.467m2)","type":"Terreno","location":"Rua Compositor Rosil Cavalcante, 900, Bairro Novo BodocongÃ³, Campina Grande - PB, CEP: 58431-070","updatedAt":"2026-06-02T19:16:38.009Z","description":"Terreno - BodocongÃ³, Campina Grande -PB","documentLink":"https://drive.google.com/drive/folders/1-LwQqtq8gpWNHLqjH7FLSwYnbsKRJlMr","investmentValue":52500},{"id":"property-1780428082947-3ccc4690100948","area":"1045 m2","type":"Terreno","location":"Engneho Salgado, Nossa Senhora do Ã“, Ipojuca-PE, CEP: 55.592-000","updatedAt":"2026-06-02T19:21:22.947Z","description":"Terreno NSO - PE 38","documentLink":"https://drive.google.com/drive/folders/1FVD0pXigQyMP4eHEKfy1VPrjnIjbKiYm","investmentValue":0}],"clients":[{"id":"client-1780627738115-764300e73ddbc8","name":"AGENCIA SOMA TECNOLOGIA LTDA","email":"tiago.tiagotoscano@gmail.com","phone":"81 98708 2646","contact":"Tiago Toscano","document":"10.434.254/0001-71","updatedAt":"2026-06-05T19:38:11.478Z"},{"id":"client-1780627824837-a4b2d379d3146","name":"LIDERMAC CONSTRUCOES E EQUIPAMENTOS LTDA","email":"luana.ramos@lidermac.com.br","phone":"81 98715 4023","contact":"Luana","document":"40.882.060/0001-08","updatedAt":"2026-06-05T19:40:44.644Z"},{"id":"client-1780627863341-28608fc09efb1","name":"FREITAS E RIBEIRO ADVOGADOS ASSOCIADOS","email":"","phone":"81 99999 9999","contact":"Kennyo Freitas","document":"46.614.250/0001-12","updatedAt":"2026-06-05T19:43:22.306Z"},{"id":"client-1780627934160-002d22450bfe8","name":"CLAUDIO ANDRE BEZERRA DE H M CORDEIRO","email":"contato@claudiocordeiro.com","phone":"81 99974 5829","contact":"Claudio AndrÃ©","document":"031.527.734-39","updatedAt":"2026-06-05T20:00:39.769Z"},{"id":"client-1780628076326-33b8e064abd14","name":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","email":"larissa.campos@bdo.com.br","phone":"81 3221 2620","contact":"Larissa Campos","document":"54.276.936/0001-79","updatedAt":"2026-06-05T19:33:14.841Z"},{"id":"client-1780628110196-738f106b6f1d98","name":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","email":"","phone":"81 99999 9999","contact":"Jorge de Altinho","document":"18.826.789/0001-08","updatedAt":"2026-06-05T02:55:10.196Z"},{"id":"client-1780628136318-d6188ef138885","name":"MODERA ENGENHARIA LTDA","email":"","phone":"81 99999 9999","contact":"Rodrigo Lopes","document":"28.256.567/0001-42","updatedAt":"2026-06-05T02:55:36.318Z"},{"id":"client-1780628187621-8e896b5fd79da","name":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","email":"brenomoacir.falbuquerque@gmail.com","phone":"81 99747 8370","contact":"Breno Moacir Albuquerque","document":"050.190.384-40","updatedAt":"2026-06-05T19:45:52.752Z"},{"id":"client-1780628221496-644c573762bf3","name":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","email":"ailson@cycloplast.com.br","phone":"81 99999 9999","contact":"Eduardo Jorge","document":"21.279.886/0001-24","updatedAt":"2026-06-05T19:48:58.920Z"},{"id":"client-1780931004783-df6f86e3a9dd","name":"AMERICAN TOWER T. TORRES DO BRASIL LTDA.","email":"","phone":"819999999","contact":"AMERICA","document":"23.842.855/0001-65","updatedAt":"2026-06-09T21:14:37.168Z"},{"id":"client-1780931770873-f7297b26432c7","name":"SUPERMERCADO DA FAMILIA S/A","email":"edivaldo@arcomix.com.br","phone":"819999999","contact":"EDIVALDO","document":"05.677.591/0031-75","updatedAt":"2026-06-08T15:16:10.873Z"},{"id":"client-1780931825881-a9af66bee30d68","name":"SUPERMERCADO DA FAMILIA LTDA","email":"edivaldo@arcomix.com.br","phone":"8199999999","contact":"EDIVALDO","document":"05.677.591/0027-99","updatedAt":"2026-06-08T15:25:18.622Z"}],"contracts":[{"id":"contract-1780628600393-cf4b9f79c1793","dueDay":10,"endDate":"2022-08-29","clientId":"client-1780627738115-764300e73ddbc8","startDate":"2018-09-30","updatedAt":"2026-06-08T21:44:37.408Z","propertyId":"property-1779819623676-666ddd22ec65e","monthlyValue":2800,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780628667996-7169e913d233f","dueDay":10,"endDate":"2027-12-31","clientId":"client-1780627824837-a4b2d379d3146","startDate":"2022-12-01","updatedAt":"2026-06-08T14:22:22.904Z","propertyId":"property-1779819623676-666ddd22ec65e","monthlyValue":2400,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780628761957-6070fafa6aec08","dueDay":10,"endDate":"2028-02-26","clientId":"client-1780627863341-28608fc09efb1","startDate":"2026-02-27","updatedAt":"2026-06-05T03:06:01.957Z","propertyId":"property-1779819117758-bc9458a6e0fd28","monthlyValue":7500,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IGP-M","fireFeeResponsible":"locador","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},{"id":"contract-1780628835796-f27caf2dad48c8","dueDay":20,"endDate":"2018-02-04","clientId":"client-1780627934160-002d22450bfe8","startDate":"2017-10-10","updatedAt":"2026-06-08T15:46:23.468Z","propertyId":"property-1779817996504-bc8092c0c49258","monthlyValue":3500,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IGP-M","fireFeeResponsible":"locador","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},{"id":"contract-1780628896123-f29152cba1da7","dueDay":20,"endDate":"2022-02-04","clientId":"client-1780627934160-002d22450bfe8","startDate":"2018-02-05","updatedAt":"2026-06-08T15:47:02.784Z","propertyId":"property-1779817996504-bc8092c0c49258","monthlyValue":4925.38,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IGP-M","fireFeeResponsible":"locador","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},{"id":"contract-1780628941338-afe9158fc637f","dueDay":20,"endDate":"2027-12-31","clientId":"client-1780627934160-002d22450bfe8","startDate":"2022-12-01","updatedAt":"2026-06-08T15:46:46.205Z","propertyId":"property-1779817996504-bc8092c0c49258","monthlyValue":4925.38,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IGP-M","fireFeeResponsible":"locador","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},{"id":"contract-1780928819589-e432858a1a45c","dueDay":25,"endDate":"2027-12-31","clientId":"client-1780628076326-33b8e064abd14","startDate":"2014-10-30","updatedAt":"2026-06-08T15:47:21.438Z","propertyId":"property-1779817467079-adc3277c81d2e8","monthlyValue":3166.66,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780928849086-d94562f3211938","dueDay":25,"endDate":"2027-12-31","clientId":"client-1780628076326-33b8e064abd14","startDate":"2014-10-30","updatedAt":"2026-06-08T15:47:31.924Z","propertyId":"property-1779817763051-6ce49e856f2418","monthlyValue":3166.66,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780928918436-4465d91442f17","dueDay":25,"endDate":"2027-12-31","clientId":"client-1780628076326-33b8e064abd14","startDate":"2014-10-30","updatedAt":"2026-06-08T15:47:44.464Z","propertyId":"property-1779817898681-40f67d5e5a9f1","monthlyValue":3166.66,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780928976759-5d0c81b6f6dab","dueDay":10,"endDate":"2025-09-01","clientId":"client-1780628110196-738f106b6f1d98","startDate":"2023-03-01","updatedAt":"2026-06-12T15:48:18.118Z","propertyId":"property-1779821555414-2e4d9eec065b28","monthlyValue":3000,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780929015362-37daf2832e1318","dueDay":10,"endDate":"2028-10-05","clientId":"client-1780628136318-d6188ef138885","startDate":"2025-10-06","updatedAt":"2026-06-08T14:30:36.048Z","propertyId":"property-1779821555414-2e4d9eec065b28","monthlyValue":3500,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780929113579-ac1c704c510c9","dueDay":15,"endDate":"2027-12-31","clientId":"client-1780628187621-8e896b5fd79da","startDate":"2023-01-10","updatedAt":"2026-06-08T15:48:13.475Z","propertyId":"property-1779821701568-145ba738928b5","monthlyValue":2852.5,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780929145216-07a65fc292632","dueDay":15,"endDate":"2027-12-31","clientId":"client-1780628187621-8e896b5fd79da","startDate":"2023-01-10","updatedAt":"2026-06-08T15:48:27.541Z","propertyId":"property-1779821806395-e6d1f48a5f6618","monthlyValue":2852.5,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780929198738-09b109f641556","dueDay":10,"endDate":"2025-12-04","clientId":"client-1780628221496-644c573762bf3","startDate":"2022-12-05","updatedAt":"2026-06-08T14:33:18.738Z","propertyId":"property-1779821883726-2d8a4f632c14c","monthlyValue":2696,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780929241437-d816e752d5f1e","dueDay":10,"endDate":"2025-12-04","clientId":"client-1780628221496-644c573762bf3","startDate":"2022-12-05","updatedAt":"2026-06-08T14:34:01.437Z","propertyId":"property-1779821969471-c5804f2b25016","monthlyValue":2696,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780929298222-3d248a5a66ddc","dueDay":15,"endDate":"2028-04-30","clientId":"client-1780628187621-8e896b5fd79da","startDate":"2025-05-01","updatedAt":"2026-06-08T15:48:47.205Z","propertyId":"property-1779821883726-2d8a4f632c14c","monthlyValue":3000,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780929329664-7858ef71951ae","dueDay":15,"endDate":"2028-04-30","clientId":"client-1780628187621-8e896b5fd79da","startDate":"2025-05-01","updatedAt":"2026-06-08T15:49:45.107Z","propertyId":"property-1779821969471-c5804f2b25016","monthlyValue":3000,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780931943089-15715f89efebf8","dueDay":10,"endDate":"2033-08-21","clientId":"client-1780931770873-f7297b26432c7","startDate":"2023-08-21","updatedAt":"2026-06-08T15:19:03.089Z","propertyId":"property-1780425210110-8329b5bfeb9048","monthlyValue":17685,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},{"id":"contract-1780932063019-9a4b580ed6fbf","dueDay":10,"endDate":"2030-09-24","clientId":"client-1780931825881-a9af66bee30d68","startDate":"2020-09-24","updatedAt":"2026-06-08T15:21:03.019Z","propertyId":"property-1779827474940-393908d800693","monthlyValue":54960,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"}],"expenses":[],"payments":[{"id":"payment-1780967517268-215c490157b31","amount":8400,"history":"","updatedAt":"2026-06-09T01:11:57.268Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-09-19","totalAmount":8400,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1780967555786-188e597df5b2e8","amount":2800,"history":"","updatedAt":"2026-06-09T01:12:35.786Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-10-30","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1780967581117-bd0308d0871bc8","amount":2800,"history":"","updatedAt":"2026-06-09T01:13:15.980Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-12-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781039771497-9054d649a2c1f","amount":2800,"history":"","updatedAt":"2026-06-09T21:16:11.497Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-01-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781039794378-2c83c6b63feba8","amount":2800,"history":"","updatedAt":"2026-06-09T21:16:34.378Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-01-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781039840875-64902a26c182a","amount":2800,"history":"","updatedAt":"2026-06-09T21:17:20.875Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-02-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781039920876-9a09747998b5b","amount":2800,"history":"","updatedAt":"2026-06-09T21:18:40.876Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-04-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781039940829-cb815ea32379d","amount":2800,"history":"","updatedAt":"2026-06-09T21:19:00.829Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-04-29","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781039974383-c2bd44c0e6b0a8","amount":2800,"history":"","updatedAt":"2026-06-09T21:19:34.383Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-06-03","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781039999118-bc8ccaa77a844","amount":2800,"history":"","updatedAt":"2026-06-09T21:19:59.118Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-06-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040022559-462e45462c73e8","amount":2800,"history":"","updatedAt":"2026-06-09T21:20:22.559Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-07-29","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040051632-b712934b4ce0e8","amount":2800,"history":"","updatedAt":"2026-06-09T21:20:51.632Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-08-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040082577-b7b8e902afa2f","amount":2800,"history":"","updatedAt":"2026-06-09T21:21:22.577Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-09-27","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040101202-c32237990283d8","amount":2800,"history":"","updatedAt":"2026-06-09T21:21:41.202Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-10-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040801985-69adf8ae66963","amount":2800,"history":"","updatedAt":"2026-06-09T21:33:21.985Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-12-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040818626-5943409d6cdc08","amount":2800,"history":"","updatedAt":"2026-06-09T21:33:38.626Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-01-03","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040867075-6b18b26602b488","amount":2800,"history":"","updatedAt":"2026-06-09T21:34:27.075Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-01-29","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040882739-dd6110ea4a9d","amount":2800,"history":"","updatedAt":"2026-06-09T21:34:42.739Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-03-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040900851-87d79778369aa8","amount":2800,"history":"","updatedAt":"2026-06-09T21:35:00.851Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-04-01","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040917427-fb4ef7e5204c5","amount":2800,"history":"","updatedAt":"2026-06-09T21:35:17.427Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-06-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040972644-5e6bcc02c7e038","amount":2800,"history":"","updatedAt":"2026-06-09T21:36:12.644Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-07-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781040988741-7b394f8f06c06","amount":2800,"history":"","updatedAt":"2026-06-09T21:36:28.741Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-07-31","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781041019061-e2309689993b78","amount":2800,"history":"","updatedAt":"2026-06-09T21:36:59.061Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-08-26","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781041046982-274b7c0f415e7","amount":2800,"history":"","updatedAt":"2026-06-09T21:37:26.982Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-10-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781041068518-70a1978a414d8","amount":5600,"history":"","updatedAt":"2026-06-09T21:37:48.518Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-11-27","totalAmount":5600,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781041109432-186ba7b41b2be","amount":2800,"history":"","updatedAt":"2026-06-09T21:38:29.432Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-12-01","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781041130120-6917e19c9e2148","amount":2800,"history":"","updatedAt":"2026-06-09T21:38:50.120Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-12-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781095904007-8f04bb01de58e8","amount":2800,"history":"","updatedAt":"2026-06-10T12:51:44.007Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-01-29","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781095932136-1bda56060c50e","amount":2800,"history":"","updatedAt":"2026-06-10T12:52:12.136Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-03-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781095959416-e639d273805a1","amount":2800,"history":"","updatedAt":"2026-06-10T12:52:39.416Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-04-05","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781095982781-b6442b23d755e","amount":2800,"history":"","updatedAt":"2026-06-10T12:53:02.781Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-05-03","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096008808-7d5f47dc69fee8","amount":2800,"history":"","updatedAt":"2026-06-10T12:53:28.808Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-05-31","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096027551-1aaa024051eb3","amount":2800,"history":"","updatedAt":"2026-06-10T12:53:47.551Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-06-30","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096050757-8caaaf1e55a1a8","amount":2800,"history":"","updatedAt":"2026-06-10T12:54:10.757Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-08-09","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096072523-a48e7e67c6df8","amount":2800,"history":"","updatedAt":"2026-06-10T12:54:32.523Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-09-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096091579-da01d3eebf2e38","amount":2800,"history":"","updatedAt":"2026-06-10T12:54:51.579Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-09-30","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096116862-31908f3a24ea58","amount":3800,"history":"","updatedAt":"2026-06-10T12:55:16.862Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-11-01","totalAmount":3800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096135821-b11eb1e802e94","amount":3500,"history":"","updatedAt":"2026-06-10T12:55:35.821Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-12-02","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096157150-67822072c84f08","amount":3500,"history":"","updatedAt":"2026-06-10T12:55:57.150Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-01-03","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096175374-9201d5ee2d98e","amount":3500,"history":"","updatedAt":"2026-06-10T12:56:15.374Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-01-27","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096213263-40f2d26a3070b","amount":3500,"history":"","updatedAt":"2026-06-10T12:56:53.263Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-03-02","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096293712-9a65f36a8fdcf","amount":3500,"history":"","updatedAt":"2026-06-10T12:58:13.712Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-03-30","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096310370-31f35ced590b6","amount":3500,"history":"","updatedAt":"2026-06-10T12:59:07.395Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-04-27","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096332962-8335bbe9dfd998","amount":3500,"history":"","updatedAt":"2026-06-10T12:58:52.962Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-05-31","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096367443-4844b6a40c092","amount":3500,"history":"","updatedAt":"2026-06-10T12:59:27.443Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-07-05","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096384275-922a8fc68e699","amount":3500,"history":"","updatedAt":"2026-06-10T12:59:44.275Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-07-29","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781096411556-71ef1982d12808","amount":3500,"history":"","updatedAt":"2026-06-10T13:00:11.556Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-08-29","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781121810384-2ee2b097b34f5","amount":28800,"history":"Pagamento anual","updatedAt":"2026-06-10T20:03:30.384Z","contractId":"contract-1780628667996-7169e913d233f","lessorName":"LIDERMAC CONSTRUCOES E EQUIPAMENTOS LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2023-02-06","totalAmount":28800,"chargeAmount":0,"contractCode":"CTR-17806286"},{"id":"payment-1781277178454-e921ec20b4cda","amount":3000,"history":"","updatedAt":"2026-06-12T15:12:58.454Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-04-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781278802398-fa5456a30c8a4","amount":3000,"history":"","updatedAt":"2026-06-12T15:40:02.398Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-05-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781278836297-fcdafaae8e5f7","amount":3000,"history":"","updatedAt":"2026-06-12T15:40:36.297Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-06-16","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781278855732-b4b74e69fb01e8","amount":3000,"history":"","updatedAt":"2026-06-12T15:40:55.732Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-07-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781278882030-cfa4c09d5e553","amount":3000,"history":"","updatedAt":"2026-06-12T15:41:22.030Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-08-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781278903640-a1d12fc300a748","amount":3000,"history":"","updatedAt":"2026-06-12T15:41:43.640Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-09-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781278925971-984251adc48b48","amount":3000,"history":"","updatedAt":"2026-06-12T15:42:05.971Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-10-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781278951497-b635b8120af74","amount":3000,"history":"","updatedAt":"2026-06-12T15:42:31.497Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-11-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781278977183-c2b16b2830d548","amount":3000,"history":"","updatedAt":"2026-06-12T15:42:57.183Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-12-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279002986-13fea2ef7812a8","amount":3000,"history":"","updatedAt":"2026-06-12T15:43:22.986Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-01-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279129955-ab4bb12831bc9","amount":3000,"history":"","updatedAt":"2026-06-12T15:45:29.955Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-02-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279313761-3e7e34bfe075c","amount":3000,"history":"","updatedAt":"2026-06-12T15:48:33.761Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-03-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279340978-9c3d3e5ee8217","amount":3000,"history":"","updatedAt":"2026-06-12T15:49:00.978Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-04-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279368239-0c299341c106b","amount":3000,"history":"","updatedAt":"2026-06-12T15:49:28.239Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-05-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279393273-9787579fc8675","amount":3000,"history":"","updatedAt":"2026-06-12T15:49:53.273Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-06-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279414588-69c9921ec2a228","amount":3000,"history":"","updatedAt":"2026-06-12T15:50:14.588Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-07-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279431176-bebd3721ff733","amount":3000,"history":"","updatedAt":"2026-06-12T15:50:31.176Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-08-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279450381-d696e42d23a6c8","amount":3000,"history":"","updatedAt":"2026-06-12T15:50:50.381Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-09-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279471792-1e807b3ef5042","amount":3000,"history":"","updatedAt":"2026-06-12T15:51:11.792Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-10-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279509677-21456a1749807","amount":3000,"history":"","updatedAt":"2026-06-12T15:51:49.677Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-11-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279524984-b8d05687cc9f28","amount":3000,"history":"","updatedAt":"2026-06-12T15:52:04.984Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-12-03","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279543166-2c1dc1e9108968","amount":3000,"history":"","updatedAt":"2026-06-12T15:52:23.166Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2025-01-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279560865-c8db7b7777f758","amount":3000,"history":"","updatedAt":"2026-06-12T15:52:40.865Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2025-02-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781279582277-8e0a7c561d2dc8","amount":3203,"history":"","updatedAt":"2026-06-12T15:53:02.277Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2025-03-05","totalAmount":3203,"chargeAmount":0,"contractCode":"CTR-17809289"},{"id":"payment-1781724325037-590e22a8efd8a8","amount":2773,"history":"","updatedAt":"2026-06-17T19:25:25.037Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-04-04","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724359036-8d0ba58ce6fc18","amount":2773,"history":"","updatedAt":"2026-06-17T19:29:07.968Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-05-08","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724757592-f0cad5139a1","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:32:37.592Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-06-09","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724783349-0618db5ac53308","amount":2773,"history":"","updatedAt":"2026-06-17T19:33:03.349Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-04-04","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724824227-3fb8fc4544c4b8","amount":2773,"history":"","updatedAt":"2026-06-17T19:33:44.227Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-05-08","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724838838-0ec876a41f7938","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:33:58.838Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-06-09","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724903890-8d3edcae5fd708","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:35:03.890Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-07-17","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724921388-2a5a55892ef77","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:35:21.388Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-08-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724937009-958192ebb25ec8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:35:37.009Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-09-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781724993297-2ee01470544098","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:36:33.297Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-10-03","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725021858-05a1826a7804f8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:37:01.858Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-11-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725074558-cb855f657f10d8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:37:54.558Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-12-13","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725100096-1c3e697f5ab53","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:38:20.096Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-01-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725120844-0ea52a62d0b7b8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:38:40.844Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-02-20","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725143863-6608e1dbfce598","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:39:03.863Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-03-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725161968-4f34da546b1d38","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:39:21.968Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-04-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725834860-406d3a425eadd","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:50:34.860Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-05-15","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725852686-bda350eb7d7648","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:50:52.686Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-06-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725874316-5041c1cb8694d8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:51:14.316Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-07-17","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725895412-004b6e3b1aad88","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:51:35.412Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-08-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725914197-0f8238c058c24","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:51:54.197Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-09-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781725961019-18e2626ebd20f","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:52:41.019Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-10-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726010320-92838872f13fd","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:53:30.320Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-11-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726036091-8d3a0e4b4819a","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:53:56.091Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-12-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726163732-d60743d885b11","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:56:03.732Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2025-01-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726184323-3a178bfea593a","amount":3038.99,"history":"","updatedAt":"2026-06-17T19:56:24.323Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2025-02-14","totalAmount":3038.99,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726219342-7e3faa0fc42ee","amount":3038.99,"history":"","updatedAt":"2026-06-17T19:56:59.342Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2025-03-17","totalAmount":3038.99,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726268369-f02e77dc4e55d","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:57:48.369Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-07-17","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726290665-8451bbe56a14a8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:58:10.665Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-08-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726309493-08391e305c88f","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:58:29.493Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-09-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726329605-084fd98bf1fa78","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:58:49.605Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-10-03","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726358383-07008074d725a","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:59:18.383Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-11-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726380685-b7dc45679b919","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:59:40.685Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-12-13","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726402478-4765ae91c2a98","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:00:02.478Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-01-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726422316-a1fa7d2c4b60e","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:00:22.316Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-02-20","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726443530-dcc2e472bacca8","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:00:43.530Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-03-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726462957-0f3d928968eb68","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:01:02.957Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-04-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726481587-b65f37072603d","amount":2852.24,"history":"","updatedAt":"2026-06-17T20:01:21.587Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-05-15","totalAmount":2852.24,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726512501-afa1742a944158","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:01:52.501Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-06-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726539228-ee6dadfee5255","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:02:19.228Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-07-17","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726976575-dfa4f288cf65d","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:09:36.575Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-08-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781726999828-ba2e2d09e99fc","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:09:59.828Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-09-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781727601704-75f4cb816be5a8","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:20:01.704Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-10-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781727624063-14e629ac571e88","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:20:24.063Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-11-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781727637214-0e37b6f2ecd6f8","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:20:37.214Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-12-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781727662350-6794b3cafab878","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:21:02.350Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2025-01-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781727688423-b480d092be234","amount":3038.99,"history":"","updatedAt":"2026-06-17T20:21:28.423Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2025-02-14","totalAmount":3038.99,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781727706799-690ee21ffdc2a","amount":3038.99,"history":"","updatedAt":"2026-06-17T20:21:46.799Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2025-03-17","totalAmount":3038.99,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781727832560-d4503e3a355aa8","amount":2696,"history":"","updatedAt":"2026-06-17T20:23:52.560Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-03-07","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781727874791-d926d34f55a45","amount":2696,"history":"","updatedAt":"2026-06-17T20:24:34.791Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-04-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728396862-839372bb3658a","amount":2696,"history":"","updatedAt":"2026-06-17T20:33:16.862Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-05-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728421837-ccb44264bff78","amount":2696,"history":"","updatedAt":"2026-06-17T20:33:41.837Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-06-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728440386-fed8432364ab48","amount":2696,"history":"","updatedAt":"2026-06-17T20:34:00.386Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-07-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728456380-509a4d61609ba8","amount":2696,"history":"","updatedAt":"2026-06-17T20:34:16.380Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-08-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728509179-b39a1df4cfe01","amount":2696,"history":"","updatedAt":"2026-06-17T20:35:09.179Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-09-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728528992-098aaef1f5f498","amount":2696,"history":"","updatedAt":"2026-06-17T20:35:28.992Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-10-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728546575-0f5b58fa72cb98","amount":2696,"history":"","updatedAt":"2026-06-17T20:35:46.575Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-11-06","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728563908-5c008f3ebb6d2","amount":2696,"history":"","updatedAt":"2026-06-17T20:36:03.908Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-12-02","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728591455-ddd95c4fb9b0d","amount":2696,"history":"","updatedAt":"2026-06-17T20:36:31.455Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-01-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728605061-cba5ec43d26cc8","amount":2696,"history":"","updatedAt":"2026-06-17T20:36:45.061Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-02-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728620424-3970b52f640fe8","amount":2696,"history":"","updatedAt":"2026-06-17T20:37:00.424Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-03-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781728642722-f510885876735","amount":2696,"history":"","updatedAt":"2026-06-17T20:37:22.722Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-04-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729098997-a1adac8003602","amount":2696,"history":"","updatedAt":"2026-06-17T20:44:58.997Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-05-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729119792-f980ef23c039f","amount":2696,"history":"","updatedAt":"2026-06-17T20:45:19.792Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-06-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729155107-14ca238cd819e8","amount":2696,"history":"","updatedAt":"2026-06-17T20:45:55.107Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-07-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729175354-d19374f0ac4ec","amount":2696,"history":"","updatedAt":"2026-06-17T20:46:15.354Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-08-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729188942-46266850a8e7c8","amount":2696,"history":"","updatedAt":"2026-06-17T20:46:28.942Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-09-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729207646-0981b7bf732068","amount":2696,"history":"","updatedAt":"2026-06-17T20:46:47.646Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-10-07","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729232295-fbc292b525d61","amount":3000,"history":"","updatedAt":"2026-06-17T20:47:12.295Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-11-11","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729248399-11f1bd4ff624","amount":3000,"history":"","updatedAt":"2026-06-17T20:47:28.399Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-12-10","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729267778-eca5d561534678","amount":3000,"history":"","updatedAt":"2026-06-17T20:47:47.778Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2025-01-14","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729295108-f44b6561fcac5","amount":3000,"history":"","updatedAt":"2026-06-17T20:48:15.108Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2025-02-10","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729312081-d17945b2b60558","amount":3000,"history":"","updatedAt":"2026-06-17T20:48:32.081Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2025-03-14","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},{"id":"payment-1781729343757-fc2a1be58cb848","amount":2696,"history":"","updatedAt":"2026-06-17T20:49:03.757Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-03-07","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729364338-aa3a7a31265098","amount":2696,"history":"","updatedAt":"2026-06-17T20:49:24.338Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-04-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729379292-e9ca9f398f9368","amount":2696,"history":"","updatedAt":"2026-06-17T20:49:39.292Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-05-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729393437-8a7541f8148a58","amount":2696,"history":"","updatedAt":"2026-06-17T20:49:53.437Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-06-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729408435-3858d2f3906908","amount":2696,"history":"","updatedAt":"2026-06-17T20:50:08.435Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-07-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729424487-7c0974b74512a8","amount":2696,"history":"","updatedAt":"2026-06-17T20:50:24.487Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-08-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729438222-b39ab521e120a","amount":2696,"history":"","updatedAt":"2026-06-17T20:50:38.222Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-09-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729449901-4ff06cdb7963e8","amount":2696,"history":"","updatedAt":"2026-06-17T20:50:49.901Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-10-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729465381-6bb62c6a10ecd","amount":2696,"history":"","updatedAt":"2026-06-17T20:51:05.381Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-11-06","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729479803-7c5cd87761c96","amount":2696,"history":"","updatedAt":"2026-06-17T20:51:19.803Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-12-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729490030-6fd76286f1ff98","amount":2696,"history":"","updatedAt":"2026-06-17T20:51:30.030Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-01-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729514312-cebad1a1ce17a8","amount":2696,"history":"","updatedAt":"2026-06-17T20:51:54.312Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-02-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729527502-abf0e0594edca8","amount":2696,"history":"","updatedAt":"2026-06-17T20:52:22.507Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-03-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729559798-939a870d77c938","amount":2696,"history":"","updatedAt":"2026-06-17T20:52:39.798Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-04-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729585791-66e8326a7a7248","amount":2696,"history":"","updatedAt":"2026-06-17T20:53:05.791Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-05-06","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729609632-d426126bfbec3","amount":2696,"history":"","updatedAt":"2026-06-17T20:53:29.632Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-06-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729622717-03ec6bd95083c8","amount":2696,"history":"","updatedAt":"2026-06-17T20:53:42.717Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-07-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729651761-b7af8e969565","amount":2696,"history":"","updatedAt":"2026-06-17T20:54:11.761Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-08-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729666488-a84a2cf048dc48","amount":2696,"history":"","updatedAt":"2026-06-17T20:54:26.488Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-09-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729682342-ebe9ba2ba4c5d8","amount":2696,"history":"","updatedAt":"2026-06-17T20:54:42.342Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-10-07","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729889031-1b4fe6381605e","amount":3000,"history":"","updatedAt":"2026-06-17T20:58:09.031Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-11-11","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729906144-24acb7db251c98","amount":3000,"history":"","updatedAt":"2026-06-17T20:58:26.144Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-12-10","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729953597-345f96dfa73f38","amount":3000,"history":"","updatedAt":"2026-06-17T20:59:13.597Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2025-01-14","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729975739-ec1d6513a676b8","amount":3000,"history":"","updatedAt":"2026-06-17T20:59:35.739Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2025-02-10","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781729990210-dbf0d8fb906508","amount":3000,"history":"","updatedAt":"2026-06-17T20:59:50.210Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2025-03-14","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},{"id":"payment-1781730042739-586e539a40ac78","amount":2888.5,"history":"","updatedAt":"2026-06-17T21:00:42.739Z","contractId":"contract-1780928819589-e432858a1a45c","lessorName":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","propertyId":"property-1779817467079-adc3277c81d2e8","paymentDate":"2015-01-30","totalAmount":2888.5,"chargeAmount":0,"contractCode":"CTR-17809288"},{"id":"payment-1781730077477-b0786c24614388","paymentDate":"2015-02-02","propertyId":"property-1779817467079-adc3277c81d2e8","contractId":"contract-1780928819589-e432858a1a45c","contractCode":"CTR-17809288","lessorName":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","amount":2888.5,"chargeAmount":0,"totalAmount":2888.5,"history":"","updatedAt":"2026-06-17T21:01:17.477Z"},{"id":"payment-1781730098629-d49dbdbd41782","paymentDate":"2015-03-05","propertyId":"property-1779817467079-adc3277c81d2e8","contractId":"contract-1780928819589-e432858a1a45c","contractCode":"CTR-17809288","lessorName":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","amount":2888.5,"chargeAmount":0,"totalAmount":2888.5,"history":"","updatedAt":"2026-06-17T21:01:38.629Z"},{"id":"payment-1781730190767-e7e40f619e332","paymentDate":"2015-04-27","propertyId":"property-1779817467079-adc3277c81d2e8","contractId":"contract-1780928819589-e432858a1a45c","contractCode":"CTR-17809288","lessorName":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","amount":5777,"chargeAmount":0,"totalAmount":5777,"history":"","updatedAt":"2026-06-17T21:03:10.767Z"}],"auditLogs":[{"id":"audit-1779817467079-3cb57f99dcb1f","action":"record_created","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2705 Torre A, RIOMAR TRADE CENTER","recordId":"property-1779817467079-adc3277c81d2e8","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:44:27.079Z","financial":false,"collection":"properties"},{"id":"audit-1779817588475-1291a2e8474808","action":"record_updated","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2705 Torre A, RIOMAR TRADE CENTER -\u003e Sala 2705 Torre A, RIOMAR TRADE CENTER","recordId":"property-1779817467079-adc3277c81d2e8","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:46:28.475Z","financial":false,"collection":"properties"},{"id":"audit-1779817604376-c8a4f9e6b1dd08","action":"logout","userId":"user-1779816995469-aab94256561e58","summary":"admin (sem perfil)","recordId":"user-1779816995469-aab94256561e58","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:46:44.376Z","financial":false,"collection":"auth"},{"id":"audit-1779817624334-63e678b6ed2e28","action":"login_success","userId":"user-1779816995469-aab94256561e58","summary":"admin (Administrador)","recordId":"user-1779816995469-aab94256561e58","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:47:04.334Z","financial":false,"collection":"auth"},{"id":"audit-1779817685208-8e780e955fb62","action":"record_deleted","userId":"user-1779816995469-aab94256561e58","summary":"Sala comercial 204","recordId":"property-1779817124049-a3d5783ef80d08","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:48:05.208Z","financial":false,"collection":"properties"},{"id":"audit-1779817688614-ba23e11ebb3ee8","action":"record_deleted","userId":"user-1779816995469-aab94256561e58","summary":"Terreno BR-116","recordId":"property-1779817124049-10e8ee41e4a5e","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:48:08.614Z","financial":false,"collection":"properties"},{"id":"audit-1779817763051-4f662147430458","action":"record_created","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2706 Torre A, RIOMAR TRADE CENTER","recordId":"property-1779817763051-6ce49e856f2418","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:49:23.051Z","financial":false,"collection":"properties"},{"id":"audit-1779817781344-0f04b0e1029688","action":"record_updated","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2705 Torre A, RIOMAR TRADE CENTER -\u003e Sala 2705 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817467079-adc3277c81d2e8","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:49:41.344Z","financial":false,"collection":"properties"},{"id":"audit-1779817820024-010865794ba448","action":"record_updated","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2706 Torre A, RIOMAR TRADE CENTER -\u003e Sala 2706 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817763051-6ce49e856f2418","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:50:20.024Z","financial":false,"collection":"properties"},{"id":"audit-1779817898681-341492286c944","action":"record_created","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2707 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817898681-40f67d5e5a9f1","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:51:38.681Z","financial":false,"collection":"properties"},{"id":"audit-1779817928999-d1274bc42e7cc","action":"record_updated","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2707 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2707 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817898681-40f67d5e5a9f1","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:52:08.999Z","financial":false,"collection":"properties"},{"id":"audit-1779817996504-9f979da77c58f8","action":"record_created","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2708 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817996504-bc8092c0c49258","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:53:16.504Z","financial":false,"collection":"properties"},{"id":"audit-1779818028036-43ea9abdb6e618","action":"record_updated","userId":"user-1779816995469-aab94256561e58","summary":"Sala 2708 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2708 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817996504-bc8092c0c49258","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:53:48.036Z","financial":false,"collection":"properties"},{"id":"audit-1779818068832-b26e65d413dfa","action":"user_created","userId":"user-1779816995469-aab94256561e58","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:54:28.832Z","financial":false,"collection":"users"},{"id":"audit-1779818076137-4cff0bb1eea388","action":"logout","userId":"user-1779816995469-aab94256561e58","summary":"admin (sem perfil)","recordId":"user-1779816995469-aab94256561e58","userName":"admin","userRole":"admin","createdAt":"2026-05-26T17:54:36.137Z","financial":false,"collection":"auth"},{"id":"audit-1779818101957-c738dc5578ddb","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T17:55:01.957Z","financial":false,"collection":"auth"},{"id":"audit-1779818554431-8420ea7198d82","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 413 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818554431-82ccd864a0ef98","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:02:34.431Z","financial":false,"collection":"properties"},{"id":"audit-1779818572447-2cf7a3b946e1d","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 413 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 413 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818554431-82ccd864a0ef98","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:02:52.447Z","financial":false,"collection":"properties"},{"id":"audit-1779818822215-a8b70e003f359","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 413 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 413 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818554431-82ccd864a0ef98","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:07:02.215Z","financial":false,"collection":"properties"},{"id":"audit-1779818945081-1f6413d34c04b","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 414 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818945081-ce41425ae4ac9","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:09:05.081Z","financial":false,"collection":"properties"},{"id":"audit-1779818961320-1268f48284473","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 414 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 414 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818945081-ce41425ae4ac9","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:09:21.320Z","financial":false,"collection":"properties"},{"id":"audit-1779819117758-e373e0af70b8e8","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1401 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779819117758-bc9458a6e0fd28","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:11:57.758Z","financial":false,"collection":"properties"},{"id":"audit-1779819154915-ba6b4f5ef7e488","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1401 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 1401 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779819117758-bc9458a6e0fd28","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:12:34.915Z","financial":false,"collection":"properties"},{"id":"audit-1779819623676-301f0d080649e","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1402 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779819623676-666ddd22ec65e","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:20:23.676Z","financial":false,"collection":"properties"},{"id":"audit-1779819640020-6403250adc4868","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1402 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 1402 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779819623676-666ddd22ec65e","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:20:40.020Z","financial":false,"collection":"properties"},{"id":"audit-1779819643605-455f3fdcf60478","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:20:43.605Z","financial":false,"collection":"auth"},{"id":"audit-1779819674829-7b8c6a0285df18","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:21:14.829Z","financial":false,"collection":"auth"},{"id":"audit-1779821555414-d2f079bfa254c","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1611 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821555414-2e4d9eec065b28","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:52:35.414Z","financial":false,"collection":"properties"},{"id":"audit-1779821576122-8f4883d534529","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1611 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1611 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821555414-2e4d9eec065b28","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:52:56.122Z","financial":false,"collection":"properties"},{"id":"audit-1779821641534-bffc85fab94f4","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1611 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1611 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821555414-2e4d9eec065b28","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:54:01.534Z","financial":false,"collection":"properties"},{"id":"audit-1779821701568-c01d14d773c4c","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1613 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821701568-145ba738928b5","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:55:01.568Z","financial":false,"collection":"properties"},{"id":"audit-1779821806395-51e60c06667e1","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1615 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821806395-e6d1f48a5f6618","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:56:46.395Z","financial":false,"collection":"properties"},{"id":"audit-1779821883726-6d6501147e17f","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1617 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821883726-2d8a4f632c14c","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:58:03.726Z","financial":false,"collection":"properties"},{"id":"audit-1779821969471-2b23d9b5f08d7","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1619 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821969471-c5804f2b25016","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:59:29.471Z","financial":false,"collection":"properties"},{"id":"audit-1779821998161-85f3f03f5f2d68","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1617 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1617 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821883726-2d8a4f632c14c","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T18:59:58.161Z","financial":false,"collection":"properties"},{"id":"audit-1779822020632-1d408642dfd5d8","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1613 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1613 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821701568-145ba738928b5","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:00:20.632Z","financial":false,"collection":"properties"},{"id":"audit-1779822031463-db85c9608abee8","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1615 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1615 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821806395-e6d1f48a5f6618","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:00:31.463Z","financial":false,"collection":"properties"},{"id":"audit-1779822039863-f04ccc9c0fb348","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1617 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1617 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821883726-2d8a4f632c14c","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:00:39.863Z","financial":false,"collection":"properties"},{"id":"audit-1779822050574-714f134a2ff428","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Sala 1619 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1619 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821969471-c5804f2b25016","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:00:50.574Z","financial":false,"collection":"properties"},{"id":"audit-1779822062036-6e44f7eab62588","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:01:02.036Z","financial":false,"collection":"auth"},{"id":"audit-1779822079246-fb04171d524ff8","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:01:19.246Z","financial":false,"collection":"auth"},{"id":"audit-1779822768239-3c41753d5189b","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:12:48.239Z","financial":false,"collection":"auth"},{"id":"audit-1779822837979-11f747aa403898","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:13:57.979Z","financial":false,"collection":"auth"},{"id":"audit-1779824367035-73f2a13e9dada8","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Terreno,no Engenho Vileta","recordId":"property-1779824367034-e6bb0f408c4f9","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T19:39:27.035Z","financial":false,"collection":"properties"},{"id":"audit-1779827474940-20f119476d613","action":"record_created","userId":"user-1779818068831-2056c0f807c448","summary":"Terreno as margens da Rod PE 09","recordId":"property-1779827474940-393908d800693","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T20:31:14.940Z","financial":false,"collection":"properties"},{"id":"audit-1779827551040-d2b04a25d058e8","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Terreno as margens da Rod PE 09 -\u003e LRA","recordId":"property-1779827474940-393908d800693","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T20:32:31.040Z","financial":false,"collection":"properties"},{"id":"audit-1779827569117-8b7acbe947fbf8","action":"record_updated","userId":"user-1779818068831-2056c0f807c448","summary":"Terreno,no Engenho Vileta -\u003e Antena","recordId":"property-1779824367034-e6bb0f408c4f9","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T20:32:49.117Z","financial":false,"collection":"properties"},{"id":"audit-1779827587628-11e14ecb35d928","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T20:33:07.628Z","financial":false,"collection":"auth"},{"id":"audit-1779827614992-13fd4908fb85b8","action":"login_success","userId":"user-1779816995469-aab94256561e58","summary":"admin (Administrador)","recordId":"user-1779816995469-aab94256561e58","userName":"admin","userRole":"admin","createdAt":"2026-05-26T20:33:34.992Z","financial":false,"collection":"auth"},{"id":"audit-1779827625026-4505f3b7d97dd8","action":"logout","userId":"user-1779816995469-aab94256561e58","summary":"admin (sem perfil)","recordId":"user-1779816995469-aab94256561e58","userName":"admin","userRole":"admin","createdAt":"2026-05-26T20:33:45.026Z","financial":false,"collection":"auth"},{"id":"audit-1779827666690-e908b26beb0e78","action":"login_failed","userId":"system","summary":"Edson (sem perfil)","recordId":"","userName":"Sistema","userRole":"system","createdAt":"2026-05-26T20:34:26.690Z","financial":false,"collection":"auth"},{"id":"audit-1779827669241-2935f0be784b8","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T20:34:29.241Z","financial":false,"collection":"auth"},{"id":"audit-1779827679163-4764638e927958","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-26T20:34:39.163Z","financial":false,"collection":"auth"},{"id":"audit-1779919109692-63ac4c54fc2738","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-27T21:58:29.692Z","financial":false,"collection":"auth"},{"id":"audit-1779919280656-3bd1c92938d248","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-27T22:01:20.656Z","financial":false,"collection":"auth"},{"id":"audit-1779919294528-87a2befe6b6bc8","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-27T22:01:34.528Z","financial":false,"collection":"auth"},{"id":"audit-1779919310674-7940a334b77aa8","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-27T22:01:50.674Z","financial":false,"collection":"auth"},{"id":"audit-1779919383862-32cafe1545cc9","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-27T22:03:03.862Z","financial":false,"collection":"auth"},{"id":"audit-1779975604077-b10de524d742e8","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-28T13:40:04.077Z","financial":false,"collection":"auth"},{"id":"audit-1779980165142-c68ee5a449562","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-28T14:56:05.142Z","financial":false,"collection":"auth"},{"id":"audit-1779991902654-ccb6f68b6f2858","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-28T18:11:42.654Z","financial":false,"collection":"auth"},{"id":"audit-1779991960840-e13880f917bf88","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-28T18:12:40.840Z","financial":false,"collection":"auth"},{"id":"audit-1779992434297-6c5646e1640048","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-28T18:20:34.297Z","financial":false,"collection":"auth"},{"id":"audit-1779992651344-a14daac139116","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-28T18:24:11.344Z","financial":false,"collection":"auth"},{"id":"audit-1779996847722-2b55e4153cacc","action":"login_success","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (Administrador)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-28T19:34:07.722Z","financial":false,"collection":"auth"},{"id":"audit-1779996961892-5add07a276b588","action":"logout","userId":"user-1779818068831-2056c0f807c448","summary":"Edson (sem perfil)","recordId":"user-1779818068831-2056c0f807c448","userName":"Edson","userRole":"admin","createdAt":"2026-05-28T19:36:01.892Z","financial":false,"collection":"auth"},{"id":"audit-1780068378189-56bc8f36e4ff48","action":"logout","userId":"64258770-022e-48a0-aace-fae48a9289d4","summary":"joaquim@jmmfconsultoria.com (sem perfil)","recordId":"64258770-022e-48a0-aace-fae48a9289d4","userName":"joaquim@jmmfconsultoria.com","userRole":"admin","createdAt":"2026-05-29T15:26:18.189Z","financial":false,"collection":"auth"},{"id":"audit-1780088161571-76eb163bb33498","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala teste","recordId":"property-1780088161571-c0c52618829bd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-29T20:56:01.571Z","financial":false,"collection":"properties"},{"id":"audit-1780088206303-7b748b0396cc4","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Terreno teste","recordId":"property-1780088206303-7c8a4e8b38e548","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-29T20:56:46.303Z","financial":false,"collection":"properties"},{"id":"audit-1780089892526-530c0cefd6156","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"29/05/2026 R$Â 5.000,00","recordId":"payment-1780089892526-d0a9234e5a3e18","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-29T21:24:52.526Z","financial":true,"collection":"payments"},{"id":"audit-1780090043140-5adbd98f2e5d88","action":"logout","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-29T21:27:23.140Z","financial":false,"collection":"auth"},{"id":"audit-1780093510476-05a46d8e04bf4","action":"cloud_upload","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":26}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-29T22:25:10.476Z","financial":false,"collection":"sync"},{"id":"audit-1780095323331-f6ddb8cd4ad668","action":"cloud_upload","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":26}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-29T22:55:23.331Z","financial":false,"collection":"sync"},{"id":"audit-1780095329158-0588b613a8b848","action":"cloud_upload","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":26}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-29T22:55:29.158Z","financial":false,"collection":"sync"},{"id":"audit-1780240580939-954f1e9338be68","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 6.000,00 2026-04-01","recordId":"contract-1780240580939-dabf149ec2c398","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-31T15:16:20.939Z","financial":true,"collection":"contracts"},{"id":"audit-1780240632868-0a76fd31817008","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"08/05/2026 R$Â 6.000,00","recordId":"payment-1780240632868-c585cbd2193e58","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-31T15:17:12.868Z","financial":true,"collection":"payments"},{"id":"audit-1780240805022-6bc799ce2b1638","action":"cloud_upload","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":28}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-31T15:20:05.022Z","financial":false,"collection":"sync"},{"id":"audit-1780240823885-dcfec8f963f16","action":"logout","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-05-31T15:20:23.885Z","financial":false,"collection":"auth"},{"id":"audit-1780360971593-12abe45333edf","action":"logout","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T00:42:51.593Z","financial":false,"collection":"auth"},{"id":"audit-1780424322365-b1416c61977a2","action":"record_deleted","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala teste","recordId":"property-1780088161571-c0c52618829bd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:18:42.365Z","financial":false,"collection":"properties"},{"id":"audit-1780424326108-d4757ba6d865e","action":"record_deleted","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Terreno teste","recordId":"property-1780088206303-7c8a4e8b38e548","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:18:46.108Z","financial":false,"collection":"properties"},{"id":"audit-1780425210110-1f120b203c692","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"LRA2","recordId":"property-1780425210110-8329b5bfeb9048","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:33:30.110Z","financial":false,"collection":"properties"},{"id":"audit-1780425306575-f14906e8bf008","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"LRA2 -\u003e LRA2","recordId":"property-1780425210110-8329b5bfeb9048","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:35:06.575Z","financial":false,"collection":"properties"},{"id":"audit-1780425532535-7b3655be76e778","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Yachin","recordId":"property-1780425532534-494ab555b57ee8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:38:52.535Z","financial":false,"collection":"properties"},{"id":"audit-1780425812918-c0508d1b460468","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"LRA2 -\u003e LRA2","recordId":"property-1780425210110-8329b5bfeb9048","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:43:32.918Z","financial":false,"collection":"properties"},{"id":"audit-1780425890856-78094af2b796e","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Peixinhos","recordId":"property-1780425890856-af462c2c678f08","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:44:50.856Z","financial":false,"collection":"properties"},{"id":"audit-1780426002787-f01637512664f8","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Peixinhos -\u003e Peixinhos","recordId":"property-1780425890856-af462c2c678f08","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:46:42.787Z","financial":false,"collection":"properties"},{"id":"audit-1780426159336-31fe4479787478","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Casa de GravatÃ¡","recordId":"property-1780426159336-e5b0e725576de8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T18:49:19.336Z","financial":false,"collection":"properties"},{"id":"audit-1780426951526-fe9c208b3237a","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AP 602 - Boa Viagem","recordId":"property-1780426951526-d1bd58fd1fb3","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:02:31.526Z","financial":false,"collection":"properties"},{"id":"audit-1780427183380-eff94b2cbfb658","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AP Brasilia","recordId":"property-1780427183380-86f553b14313c","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:06:23.380Z","financial":false,"collection":"properties"},{"id":"audit-1780427381949-27d017cc51519","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"GLD Empreendimentos Ltda","recordId":"property-1780427381949-f1fb38edef0fc","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:09:41.949Z","financial":false,"collection":"properties"},{"id":"audit-1780427798009-1b801f35c6458","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Terreno - BodocongÃ³, Campina Grande -PB","recordId":"property-1780427798009-a6ab971ece7d5","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:16:38.009Z","financial":false,"collection":"properties"},{"id":"audit-1780428082947-3b0c4dd1815a78","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Terreno NSO - PE 38","recordId":"property-1780428082947-3ccc4690100948","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:21:22.947Z","financial":false,"collection":"properties"},{"id":"audit-1780429266534-9e5ab6bfeaa2e","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 2705 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2705 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817467079-adc3277c81d2e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:41:06.534Z","financial":false,"collection":"properties"},{"id":"audit-1780429289703-e1a66efa30d0b","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 2706 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2706 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817763051-6ce49e856f2418","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:41:29.703Z","financial":false,"collection":"properties"},{"id":"audit-1780429303346-2f133d928fce6","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 2707 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2707 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817898681-40f67d5e5a9f1","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:41:43.346Z","financial":false,"collection":"properties"},{"id":"audit-1780429319637-67958c0432c748","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 2708 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2708 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817996504-bc8092c0c49258","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:41:59.637Z","financial":false,"collection":"properties"},{"id":"audit-1780429335404-7abf6c757a833","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 413 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 413 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818554431-82ccd864a0ef98","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:42:15.404Z","financial":false,"collection":"properties"},{"id":"audit-1780429350524-918422fc5398e","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 414 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 414 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818945081-ce41425ae4ac9","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:42:30.524Z","financial":false,"collection":"properties"},{"id":"audit-1780429374736-72bce897eebd1","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1401 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 1401 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779819117758-bc9458a6e0fd28","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:42:54.736Z","financial":false,"collection":"properties"},{"id":"audit-1780429395325-22373181fb367","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1402 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 1402 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779819623676-666ddd22ec65e","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:43:15.325Z","financial":false,"collection":"properties"},{"id":"audit-1780429411939-2c6d06fdf4cef","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1611 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1611 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821555414-2e4d9eec065b28","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:43:31.939Z","financial":false,"collection":"properties"},{"id":"audit-1780429426984-30dbfa30babb","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1613 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1613 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821701568-145ba738928b5","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:43:46.984Z","financial":false,"collection":"properties"},{"id":"audit-1780429443441-f16816da1c8fa8","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1615 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1615 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821806395-e6d1f48a5f6618","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:44:03.441Z","financial":false,"collection":"properties"},{"id":"audit-1780429458374-4fa587234ac9f8","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1617 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1617 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821883726-2d8a4f632c14c","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:44:18.374Z","financial":false,"collection":"properties"},{"id":"audit-1780429476931-955385d1fc84a","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1619 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1619 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821969471-c5804f2b25016","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:44:36.931Z","financial":false,"collection":"properties"},{"id":"audit-1780429506910-ac99572e5b117","action":"cloud_upload","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":35}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T19:45:06.910Z","financial":false,"collection":"sync"},{"id":"audit-1780430627861-6ad8a0440e4958","action":"logout","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-02T20:03:47.861Z","financial":false,"collection":"auth"},{"id":"audit-1780461969033-62d05ee4060d18","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-03T04:46:09.033Z","financial":false,"collection":"auth"},{"id":"audit-1780462071004-3bdade587690c","after":{"id":"property-1780426159336-e5b0e725576de8","area":"400 m2","type":"Imovel Residencial","location":"Quadra 04, Lote 03-A, Bairro Portal de GravatÃ¡, GravatÃ¡-PE, CEP: 55.640-000","updatedAt":"2026-06-03T04:47:51.003Z","description":"Casa de GravatÃ¡","documentLink":"https://drive.google.com/drive/folders/1Cr6D85aOaTjKF_QsieXTgXtBvs-eSO1V","investmentValue":100000},"action":"record_updated","before":{"id":"property-1780426159336-e5b0e725576de8","area":"400 m2","type":"Terreno","location":"Quadra 04, Lote 03-A, Bairro Portal de GravatÃ¡, GravatÃ¡-PE, CEP: 55.640-000","updatedAt":"2026-06-02T18:49:19.336Z","description":"Casa de GravatÃ¡","documentLink":"https://drive.google.com/drive/folders/1Cr6D85aOaTjKF_QsieXTgXtBvs-eSO1V","investmentValue":100000},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Casa de GravatÃ¡ -\u003e Casa de GravatÃ¡","recordId":"property-1780426159336-e5b0e725576de8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-03T04:47:51.004Z","financial":false,"collection":"properties"},{"id":"audit-1780462085935-1c607dbc7f6bf8","after":{"id":"property-1780426951526-d1bd58fd1fb3","area":"233,30 m2","type":"Apartamento","location":"Rua Artur Muniz, 147, Boa Viagem, Recife-PE, CEP: 51.111-190","updatedAt":"2026-06-03T04:48:05.935Z","description":"AP 602 - Boa Viagem","documentLink":"https://drive.google.com/drive/folders/1EORrAB6jAFQtvd4QJrg2ALqYBzDv2bpF","investmentValue":1000000},"action":"record_updated","before":{"id":"property-1780426951526-d1bd58fd1fb3","area":"233,30 m2","type":"Sala comercial","location":"Rua Artur Muniz, 147, Boa Viagem, Recife-PE, CEP: 51.111-190","updatedAt":"2026-06-02T19:02:31.526Z","description":"AP 602 - Boa Viagem","documentLink":"https://drive.google.com/drive/folders/1EORrAB6jAFQtvd4QJrg2ALqYBzDv2bpF","investmentValue":1000000},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AP 602 - Boa Viagem -\u003e AP 602 - Boa Viagem","recordId":"property-1780426951526-d1bd58fd1fb3","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-03T04:48:05.935Z","financial":false,"collection":"properties"},{"id":"audit-1780462100779-a24d37753612d8","after":{"id":"property-1780427183380-86f553b14313c","area":"380,609 m2","type":"Apartamento","location":"SQS 316, Asa Sul, Brasilia-DF, CEP: 70.387-010","updatedAt":"2026-06-03T04:48:20.778Z","description":"AP Brasilia","documentLink":"https://drive.google.com/drive/folders/1-cbyxm1v-9S7aXaUX9aN2DeyU4lAz7s2","investmentValue":2000000},"action":"record_updated","before":{"id":"property-1780427183380-86f553b14313c","area":"380,609 m2","type":"Sala comercial","location":"SQS 316, Asa Sul, Brasilia-DF, CEP: 70.387-010","updatedAt":"2026-06-02T19:06:23.380Z","description":"AP Brasilia","documentLink":"https://drive.google.com/drive/folders/1-cbyxm1v-9S7aXaUX9aN2DeyU4lAz7s2","investmentValue":2000000},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AP Brasilia -\u003e AP Brasilia","recordId":"property-1780427183380-86f553b14313c","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-03T04:48:20.779Z","financial":false,"collection":"properties"},{"id":"audit-1780462535358-75b78c4e802228","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-03T04:55:35.358Z","financial":false,"collection":"auth"},{"id":"audit-1780463332103-5c54a2eea84d9","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-03T05:08:52.103Z","financial":false,"collection":"auth"},{"id":"audit-1780627738115-d3938fc5dbaf4","after":{"id":"client-1780627738115-764300e73ddbc8","name":"AGENCIA SOMA TECNOLOGIA LTDA","email":"","phone":"81999999","contact":"Tiago Toscano","document":"10.434.254/0001-71","updatedAt":"2026-06-05T02:48:58.115Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AGENCIA SOMA TECNOLOGIA LTDA","recordId":"client-1780627738115-764300e73ddbc8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:48:58.115Z","financial":false,"collection":"clients"},{"id":"audit-1780627752920-24638979141aa","after":null,"action":"record_deleted","before":{"id":"client-1779817124049-db5be78cc3ab1","name":"Joao Pereira","email":"joao@example.com","phone":"5585888888888","contact":"Joao Pereira","document":"123.456.789-00"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Joao Pereira","recordId":"client-1779817124049-db5be78cc3ab1","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:49:12.920Z","financial":false,"collection":"clients"},{"id":"audit-1780627760987-d9c7443518397","after":null,"action":"record_deleted","before":{"id":"client-1779817124049-259ab48f110e38","name":"Comercial Lima Ltda","email":"cliente@example.com","phone":"5585999999999","contact":"Mariana Lima","document":"12.345.678/0001-90"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Comercial Lima Ltda","recordId":"client-1779817124049-259ab48f110e38","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:49:20.987Z","financial":false,"collection":"clients"},{"id":"audit-1780627824837-7119c1b48abeb8","after":{"id":"client-1780627824837-a4b2d379d3146","name":"LIDERMAC CONSTRUCOES E EQUIPAMENTOS LTDA","email":"","phone":"81 99999 9999","contact":"Rodrigo Carneiro Leao","document":"40.882.060/0001-08","updatedAt":"2026-06-05T02:50:24.837Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"LIDERMAC CONSTRUCOES E EQUIPAMENTOS LTDA","recordId":"client-1780627824837-a4b2d379d3146","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:50:24.837Z","financial":false,"collection":"clients"},{"id":"audit-1780627863341-4463478967a85","after":{"id":"client-1780627863341-28608fc09efb1","name":"FREITAS E RIBEIRO ADVOGADOS ASSOCIADOS","email":"","phone":"81 99999 9999","contact":"Freitas","document":"46.614.250/0001-12","updatedAt":"2026-06-05T02:51:03.341Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"FREITAS E RIBEIRO ADVOGADOS ASSOCIADOS","recordId":"client-1780627863341-28608fc09efb1","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:51:03.341Z","financial":false,"collection":"clients"},{"id":"audit-1780627934160-f728c4c78fa9b8","after":{"id":"client-1780627934160-002d22450bfe8","name":"CLAUDIO ANDRE BEZERRA DE H M CORDEIRO","email":"","phone":"81 99999 9999","contact":"Claudio","document":"031.527.734-39","updatedAt":"2026-06-05T02:52:14.160Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"CLAUDIO ANDRE BEZERRA DE H M CORDEIRO","recordId":"client-1780627934160-002d22450bfe8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:52:14.160Z","financial":false,"collection":"clients"},{"id":"audit-1780628076326-cf4badc104de88","after":{"id":"client-1780628076326-33b8e064abd14","name":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","email":"","phone":"81 99999 9999","contact":"Auditor","document":"54.276.936/0001-79","updatedAt":"2026-06-05T02:54:36.326Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","recordId":"client-1780628076326-33b8e064abd14","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:54:36.326Z","financial":false,"collection":"clients"},{"id":"audit-1780628110196-48000ac6c369a","after":{"id":"client-1780628110196-738f106b6f1d98","name":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","email":"","phone":"81 99999 9999","contact":"Jorge de Altinho","document":"18.826.789/0001-08","updatedAt":"2026-06-05T02:55:10.196Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","recordId":"client-1780628110196-738f106b6f1d98","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:55:10.196Z","financial":false,"collection":"clients"},{"id":"audit-1780628136318-5525135463cce8","after":{"id":"client-1780628136318-d6188ef138885","name":"MODERA ENGENHARIA LTDA","email":"","phone":"81 99999 9999","contact":"Rodrigo Lopes","document":"28.256.567/0001-42","updatedAt":"2026-06-05T02:55:36.318Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"MODERA ENGENHARIA LTDA","recordId":"client-1780628136318-d6188ef138885","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:55:36.318Z","financial":false,"collection":"clients"},{"id":"audit-1780628187621-de0168b106ffb8","after":{"id":"client-1780628187621-8e896b5fd79da","name":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","email":"","phone":"81 99999 9999","contact":"Cinthya Santos","document":"050.190.384-40","updatedAt":"2026-06-05T02:56:27.621Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","recordId":"client-1780628187621-8e896b5fd79da","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:56:27.621Z","financial":false,"collection":"clients"},{"id":"audit-1780628221497-774f6ac78d5e48","after":{"id":"client-1780628221496-644c573762bf3","name":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","email":"","phone":"81 99999 9999","contact":"Eduardo Jorge","document":"21.279.886/0001-24","updatedAt":"2026-06-05T02:57:01.496Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","recordId":"client-1780628221496-644c573762bf3","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:57:01.497Z","financial":false,"collection":"clients"},{"id":"audit-1780628251653-64370e13a4df18","after":{"id":"client-1780628251652-be835dcbffde28","name":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","email":"","phone":"81 99999 9999","contact":"Cinthya Santos","document":"050.190.384-40","updatedAt":"2026-06-05T02:57:31.652Z"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","recordId":"client-1780628251652-be835dcbffde28","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:57:31.653Z","financial":false,"collection":"clients"},{"id":"audit-1780628272913-22b5da2459206","after":null,"action":"record_deleted","before":{"id":"client-1780628251652-be835dcbffde28","name":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","email":"","phone":"81 99999 9999","contact":"Cinthya Santos","document":"050.190.384-40","updatedAt":"2026-06-05T02:57:31.652Z"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","recordId":"client-1780628251652-be835dcbffde28","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:57:52.913Z","financial":false,"collection":"clients"},{"id":"audit-1780628308096-004b323705a6b8","after":null,"action":"record_deleted","before":{"id":"expense-1779817124049-f8ac43ccf39c1","note":"Reparo eletrico","amount":450,"propertyId":"property-1779817124049-a3d5783ef80d08","expenseDate":"2026-05-10","expenseType":"Manutencao"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/05/2026 R$Â 450,00 Manutencao","recordId":"expense-1779817124049-f8ac43ccf39c1","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:58:28.096Z","financial":true,"collection":"expenses"},{"id":"audit-1780628310245-2ba33e53e57f7","after":null,"action":"record_deleted","before":{"id":"expense-1779817124049-6742940941dd","note":"Taxa municipal","amount":1300,"propertyId":"property-1779817124049-10e8ee41e4a5e","expenseDate":"2026-04-20","expenseType":"Impostos e taxas"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"20/04/2026 R$Â 1.300,00 Impostos e taxas","recordId":"expense-1779817124049-6742940941dd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:58:30.245Z","financial":true,"collection":"expenses"},{"id":"audit-1780628318505-6f819acd709a7","after":null,"action":"record_deleted","before":{"id":"payment-1779817124049-52a80fb7e2f23","amount":2800,"history":"Pagamento no vencimento","contractId":"contract-1779817124049-c9924be79d2c9","lessorName":"Comercial Lima Ltda","propertyId":"property-1779817124049-a3d5783ef80d08","paymentDate":"2026-05-10","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17798171"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/05/2026 R$Â 2.800,00","recordId":"payment-1779817124049-52a80fb7e2f23","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:58:38.505Z","financial":true,"collection":"payments"},{"id":"audit-1780628321119-74105156effc9","after":null,"action":"record_deleted","before":{"id":"payment-1779817124049-402c658991e24","amount":5200,"history":"Pagamento com encargo por atraso","contractId":"contract-1779817124049-9d887ba1a47b18","lessorName":"Joao Pereira","propertyId":"property-1779817124049-10e8ee41e4a5e","paymentDate":"2026-05-12","totalAmount":5380,"chargeAmount":180,"contractCode":"CTR-17798171"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"12/05/2026 R$Â 5.380,00","recordId":"payment-1779817124049-402c658991e24","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:58:41.119Z","financial":true,"collection":"payments"},{"id":"audit-1780628327247-78c65a8d142d3","after":null,"action":"record_deleted","before":{"id":"payment-1779817124049-402c658991e24","amount":5200,"history":"Pagamento com encargo por atraso","contractId":"contract-1779817124049-9d887ba1a47b18","lessorName":"Joao Pereira","propertyId":"property-1779817124049-10e8ee41e4a5e","paymentDate":"2026-05-12","totalAmount":5380,"chargeAmount":180,"contractCode":"CTR-17798171"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"12/05/2026 R$Â 5.380,00","recordId":"payment-1779817124049-402c658991e24","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:58:47.247Z","financial":true,"collection":"payments"},{"id":"audit-1780628331544-43f58dda633458","after":null,"action":"record_deleted","before":{"id":"payment-1780089892526-d0a9234e5a3e18","amount":5000,"history":"","updatedAt":"2026-05-29T21:24:52.526Z","contractId":"","lessorName":"","propertyId":"property-1780088161571-c0c52618829bd","paymentDate":"2026-05-29","totalAmount":5000,"chargeAmount":0,"contractCode":""},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"29/05/2026 R$Â 5.000,00","recordId":"payment-1780089892526-d0a9234e5a3e18","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:58:51.544Z","financial":true,"collection":"payments"},{"id":"audit-1780628335617-9b58fb3ec8b618","after":null,"action":"record_deleted","before":{"id":"payment-1780240632868-c585cbd2193e58","amount":6000,"history":"Pagamento realizado no prazo","updatedAt":"2026-05-31T15:17:12.868Z","contractId":"contract-1780240580939-dabf149ec2c398","lessorName":"Comercial Lima Ltda","propertyId":"property-1779817467079-adc3277c81d2e8","paymentDate":"2026-05-08","totalAmount":6000,"chargeAmount":0,"contractCode":"CTR-17802405"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"08/05/2026 R$Â 6.000,00","recordId":"payment-1780240632868-c585cbd2193e58","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T02:58:55.617Z","financial":true,"collection":"payments"},{"id":"audit-1780628514315-2f04acce4f9ea8","after":null,"action":"record_deleted","before":{"id":"contract-1779817124049-c9924be79d2c9","dueDay":10,"endDate":"2027-01-01","clientId":"client-1779817124049-259ab48f110e38","startDate":"2026-01-01","propertyId":"property-1779817124049-a3d5783ef80d08","monthlyValue":2800,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IPCA","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.800,00 2026-01-01","recordId":"contract-1779817124049-c9924be79d2c9","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:01:54.315Z","financial":true,"collection":"contracts"},{"id":"audit-1780628516578-c7a04e871e2ab","after":null,"action":"record_deleted","before":{"id":"contract-1779817124049-9d887ba1a47b18","dueDay":5,"endDate":"2026-07-31","clientId":"client-1779817124049-db5be78cc3ab1","startDate":"2025-08-01","propertyId":"property-1779817124049-10e8ee41e4a5e","monthlyValue":5200,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 5.200,00 2025-08-01","recordId":"contract-1779817124049-9d887ba1a47b18","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:01:56.578Z","financial":true,"collection":"contracts"},{"id":"audit-1780628518510-5bb4c1ccd9ade8","after":null,"action":"record_deleted","before":{"id":"contract-1780240580939-dabf149ec2c398","dueDay":10,"endDate":"2026-06-30","clientId":"client-1779817124049-259ab48f110e38","startDate":"2026-04-01","updatedAt":"2026-05-31T15:16:20.939Z","propertyId":"property-1779817467079-adc3277c81d2e8","monthlyValue":6000,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 6.000,00 2026-04-01","recordId":"contract-1780240580939-dabf149ec2c398","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:01:58.510Z","financial":true,"collection":"contracts"},{"id":"audit-1780628600393-8f6fa36f979cc8","after":{"id":"contract-1780628600393-cf4b9f79c1793","dueDay":10,"endDate":"2022-03-29","clientId":"client-1780627738115-764300e73ddbc8","startDate":"2018-09-30","updatedAt":"2026-06-05T03:03:20.393Z","propertyId":"property-1779819623676-666ddd22ec65e","monthlyValue":2800,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.800,00 2018-09-30","recordId":"contract-1780628600393-cf4b9f79c1793","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:03:20.393Z","financial":true,"collection":"contracts"},{"id":"audit-1780628667996-5cdf4e98aa1538","after":{"id":"contract-1780628667996-7169e913d233f","dueDay":10,"endDate":"2027-12-31","clientId":"client-1780627824837-a4b2d379d3146","startDate":"2022-12-01","updatedAt":"2026-06-05T03:04:27.996Z","propertyId":"property-1779819623676-666ddd22ec65e","monthlyValue":3000,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2022-12-01","recordId":"contract-1780628667996-7169e913d233f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:04:27.996Z","financial":true,"collection":"contracts"},{"id":"audit-1780628761957-af32be0d5c2b08","after":{"id":"contract-1780628761957-6070fafa6aec08","dueDay":10,"endDate":"2028-02-26","clientId":"client-1780627863341-28608fc09efb1","startDate":"2026-02-27","updatedAt":"2026-06-05T03:06:01.957Z","propertyId":"property-1779819117758-bc9458a6e0fd28","monthlyValue":7500,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IGP-M","fireFeeResponsible":"locador","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 7.500,00 2026-02-27","recordId":"contract-1780628761957-6070fafa6aec08","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:06:01.957Z","financial":true,"collection":"contracts"},{"id":"audit-1780628835796-377e95fb52fa48","after":{"id":"contract-1780628835796-f27caf2dad48c8","dueDay":10,"endDate":"2018-02-04","clientId":"client-1780627934160-002d22450bfe8","startDate":"2017-10-10","updatedAt":"2026-06-05T03:07:15.796Z","propertyId":"property-1779817996504-bc8092c0c49258","monthlyValue":3500,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IGP-M","fireFeeResponsible":"locador","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.500,00 2017-10-10","recordId":"contract-1780628835796-f27caf2dad48c8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:07:15.796Z","financial":true,"collection":"contracts"},{"id":"audit-1780628896123-2996b3c2e95648","after":{"id":"contract-1780628896123-f29152cba1da7","dueDay":10,"endDate":"2022-02-04","clientId":"client-1780627934160-002d22450bfe8","startDate":"2018-02-05","updatedAt":"2026-06-05T03:08:16.123Z","propertyId":"property-1779817996504-bc8092c0c49258","monthlyValue":4925.38,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IGP-M","fireFeeResponsible":"locador","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 4.925,38 2018-02-05","recordId":"contract-1780628896123-f29152cba1da7","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:08:16.123Z","financial":true,"collection":"contracts"},{"id":"audit-1780628941338-b834375e836ad8","after":{"id":"contract-1780628941338-afe9158fc637f","dueDay":10,"endDate":"2027-12-31","clientId":"client-1780627934160-002d22450bfe8","startDate":"2022-12-01","updatedAt":"2026-06-05T03:09:01.338Z","propertyId":"property-1779817996504-bc8092c0c49258","monthlyValue":4925.38,"spuResponsible":"locador","iptuResponsible":"locador","adjustmentMethod":"IGP-M","fireFeeResponsible":"locador","adjustmentFrequency":"Anual","condoFeeResponsible":"locador"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 4.925,38 2022-12-01","recordId":"contract-1780628941338-afe9158fc637f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:09:01.338Z","financial":true,"collection":"contracts"},{"id":"audit-1780629065596-53457c0ae4dd08","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T03:11:05.596Z","financial":false,"collection":"auth"},{"id":"audit-1780681290555-b2c71a17c01468","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 2705 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2705 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817467079-adc3277c81d2e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:41:30.555Z","financial":false,"collection":"properties"},{"id":"audit-1780681338955-07d2208e5e7748","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 2706 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2706 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817763051-6ce49e856f2418","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:42:18.955Z","financial":false,"collection":"properties"},{"id":"audit-1780681629172-636612014a7db8","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 2707 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2707 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817898681-40f67d5e5a9f1","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:47:09.172Z","financial":false,"collection":"properties"},{"id":"audit-1780681680423-447d1cacd75978","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 2708 Torre A, RIOMAR TRADE CENTER I -\u003e Sala 2708 Torre A, RIOMAR TRADE CENTER I","recordId":"property-1779817996504-bc8092c0c49258","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:48:00.423Z","financial":false,"collection":"properties"},{"id":"audit-1780681772207-894a23afa70d58","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 414 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 414 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818945081-ce41425ae4ac9","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:49:32.207Z","financial":false,"collection":"properties"},{"id":"audit-1780681786592-506e4007c6aec","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 413 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 413 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779818554431-82ccd864a0ef98","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:49:46.592Z","financial":false,"collection":"properties"},{"id":"audit-1780681824733-14cc64a350292","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1401 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 1401 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779819117758-bc9458a6e0fd28","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:50:24.733Z","financial":false,"collection":"properties"},{"id":"audit-1780681859528-9f7f0436bd7a4","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1402 Torre C, RIOMAR TRADE CENTER III -\u003e Sala 1402 Torre C, RIOMAR TRADE CENTER III","recordId":"property-1779819623676-666ddd22ec65e","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:50:59.528Z","financial":false,"collection":"properties"},{"id":"audit-1780681957897-fbbdae9de587c","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1611 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1611 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821555414-2e4d9eec065b28","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:52:37.897Z","financial":false,"collection":"properties"},{"id":"audit-1780682013446-d0edef349af398","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1613 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1613 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821701568-145ba738928b5","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:53:33.446Z","financial":false,"collection":"properties"},{"id":"audit-1780682097309-68c3eda7597b78","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1615 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1615 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821806395-e6d1f48a5f6618","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:54:57.309Z","financial":false,"collection":"properties"},{"id":"audit-1780682186663-ce99a96d88bde","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1617 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1617 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821883726-2d8a4f632c14c","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:56:26.663Z","financial":false,"collection":"properties"},{"id":"audit-1780682391081-8966ed36dee108","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"Sala 1619 Torre E, RIOMAR TRADE CENTER V -\u003e Sala 1619 Torre E, RIOMAR TRADE CENTER V","recordId":"property-1779821969471-c5804f2b25016","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T17:59:51.081Z","financial":false,"collection":"properties"},{"id":"audit-1780687122702-7208eca668e318","action":"logout","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T19:18:42.702Z","financial":false,"collection":"auth"},{"id":"audit-1780687994841-be14276a28267","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA -\u003e BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","recordId":"client-1780628076326-33b8e064abd14","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T19:33:14.841Z","financial":false,"collection":"clients"},{"id":"audit-1780688291478-95864b9cf4e51","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AGENCIA SOMA TECNOLOGIA LTDA -\u003e AGENCIA SOMA TECNOLOGIA LTDA","recordId":"client-1780627738115-764300e73ddbc8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T19:38:11.479Z","financial":false,"collection":"clients"},{"id":"audit-1780688444644-ccac3bef73f908","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"LIDERMAC CONSTRUCOES E EQUIPAMENTOS LTDA -\u003e LIDERMAC CONSTRUCOES E EQUIPAMENTOS LTDA","recordId":"client-1780627824837-a4b2d379d3146","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T19:40:44.644Z","financial":false,"collection":"clients"},{"id":"audit-1780688602306-318d9df431ab38","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"FREITAS E RIBEIRO ADVOGADOS ASSOCIADOS -\u003e FREITAS E RIBEIRO ADVOGADOS ASSOCIADOS","recordId":"client-1780627863341-28608fc09efb1","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T19:43:22.306Z","financial":false,"collection":"clients"},{"id":"audit-1780688752752-b98a2e9a312a2","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE -\u003e CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","recordId":"client-1780628187621-8e896b5fd79da","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T19:45:52.752Z","financial":false,"collection":"clients"},{"id":"audit-1780688938920-5b05a855d5c638","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA -\u003e CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","recordId":"client-1780628221496-644c573762bf3","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T19:48:58.920Z","financial":false,"collection":"clients"},{"id":"audit-1780689639769-0ebccf11733ab8","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"CLAUDIO ANDRE BEZERRA DE H M CORDEIRO -\u003e CLAUDIO ANDRE BEZERRA DE H M CORDEIRO","recordId":"client-1780627934160-002d22450bfe8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T20:00:39.769Z","financial":false,"collection":"clients"},{"id":"audit-1780690779986-1a81dced63482","action":"logout","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-05T20:19:39.986Z","financial":false,"collection":"auth"},{"id":"audit-1780716728564-662d9410e7b2f","after":{"target":"Supabase","records":39},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":39}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-06T03:32:08.564Z","financial":false,"collection":"sync"},{"id":"audit-1780716765966-1c4a3360898d88","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-06T03:32:45.966Z","financial":false,"collection":"auth"},{"id":"audit-1780717397560-516e4fe47944f8","after":{"target":"Supabase","records":39},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":39}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-06T03:43:17.560Z","financial":false,"collection":"sync"},{"id":"audit-1780717420070-0479cbea141308","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-06T03:43:40.070Z","financial":false,"collection":"auth"},{"id":"audit-1780718433874-99f81c37d963a8","after":{"target":"Supabase","records":39},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":39}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-06T04:00:33.874Z","financial":false,"collection":"sync"},{"id":"audit-1780718541697-8ad1c860470da","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-06T04:02:21.697Z","financial":false,"collection":"auth"},{"id":"audit-1780928542904-e50e72bd1839f8","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2022-12-01 -\u003e R$Â 2.400,00 2022-12-01","recordId":"contract-1780628667996-7169e913d233f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:22:22.904Z","financial":true,"collection":"contracts"},{"id":"audit-1780928819590-45284574a8a5f8","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.166,66 2014-10-30","recordId":"contract-1780928819589-e432858a1a45c","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:26:59.590Z","financial":true,"collection":"contracts"},{"id":"audit-1780928849086-8613bba3eed1e","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.166,66 2014-10-30","recordId":"contract-1780928849086-d94562f3211938","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:27:29.086Z","financial":true,"collection":"contracts"},{"id":"audit-1780928868215-54d8eed05ceee","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.166,66 2014-10-30 -\u003e R$Â 3.166,66 2014-10-30","recordId":"contract-1780928849086-d94562f3211938","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:27:48.215Z","financial":true,"collection":"contracts"},{"id":"audit-1780928918436-7cedc4e295aaa8","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.166,66 2014-10-30","recordId":"contract-1780928918436-4465d91442f17","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:28:38.436Z","financial":true,"collection":"contracts"},{"id":"audit-1780928976759-5782830d48237","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2023-03-01","recordId":"contract-1780928976759-5d0c81b6f6dab","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:29:36.759Z","financial":true,"collection":"contracts"},{"id":"audit-1780929015362-4038d440c0994","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.500,00 2025-10-06","recordId":"contract-1780929015362-37daf2832e1318","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:30:15.362Z","financial":true,"collection":"contracts"},{"id":"audit-1780929036048-e67d7d44beed98","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.500,00 2025-10-06 -\u003e R$Â 3.500,00 2025-10-06","recordId":"contract-1780929015362-37daf2832e1318","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:30:36.048Z","financial":true,"collection":"contracts"},{"id":"audit-1780929113579-52ed6114e4cab8","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.852,50 2023-01-10","recordId":"contract-1780929113579-ac1c704c510c9","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:31:53.579Z","financial":true,"collection":"contracts"},{"id":"audit-1780929145216-143697430d2488","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.852,50 2023-01-10","recordId":"contract-1780929145216-07a65fc292632","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:32:25.216Z","financial":true,"collection":"contracts"},{"id":"audit-1780929198739-733d2efa77a4d8","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.696,00 2022-12-05","recordId":"contract-1780929198738-09b109f641556","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:33:18.739Z","financial":true,"collection":"contracts"},{"id":"audit-1780929241438-4788a8bb1d81e8","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.696,00 2022-12-05","recordId":"contract-1780929241437-d816e752d5f1e","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:34:01.438Z","financial":true,"collection":"contracts"},{"id":"audit-1780929298222-7cb84f0549676","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2025-05-01","recordId":"contract-1780929298222-3d248a5a66ddc","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:34:58.222Z","financial":true,"collection":"contracts"},{"id":"audit-1780929329664-a5e18e8b7a2808","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2025-05-01","recordId":"contract-1780929329664-7858ef71951ae","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T14:35:29.664Z","financial":true,"collection":"contracts"},{"id":"audit-1780931004783-659e62a91d18a","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AMERICA TOWER T TORRES DO BRASIL LTDA","recordId":"client-1780931004783-df6f86e3a9dd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:03:24.783Z","financial":false,"collection":"clients"},{"id":"audit-1780931520106-cfe5ead58d632","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AMERICA TOWER T TORRES DO BRASIL LTDA -\u003e AMERICA TOWER T TORRES DO BRASIL LTDA","recordId":"client-1780931004783-df6f86e3a9dd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:12:00.106Z","financial":false,"collection":"clients"},{"id":"audit-1780931770873-ff7364725f914","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"SUPERMERCADO DA FAMILIA S/A","recordId":"client-1780931770873-f7297b26432c7","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:16:10.873Z","financial":false,"collection":"clients"},{"id":"audit-1780931825881-fc28d963e8fb3","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"SUPERMERCADO DA FAMILIA ltda","recordId":"client-1780931825881-a9af66bee30d68","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:17:05.881Z","financial":false,"collection":"clients"},{"id":"audit-1780931943090-94e7f958bd728","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 17.685,00 2023-08-21","recordId":"contract-1780931943089-15715f89efebf8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:19:03.090Z","financial":true,"collection":"contracts"},{"id":"audit-1780932063019-bb9e3e6cac4218","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 54.960,00 2020-09-24","recordId":"contract-1780932063019-9a4b580ed6fbf","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:21:03.019Z","financial":true,"collection":"contracts"},{"id":"audit-1780932318622-25a6a405a74ff8","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"SUPERMERCADO DA FAMILIA ltda -\u003e SUPERMERCADO DA FAMILIA LTDA","recordId":"client-1780931825881-a9af66bee30d68","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:25:18.622Z","financial":false,"collection":"clients"},{"id":"audit-1780933583468-c3054cae195808","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.500,00 2017-10-10 -\u003e R$Â 3.500,00 2017-10-10","recordId":"contract-1780628835796-f27caf2dad48c8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:46:23.468Z","financial":true,"collection":"contracts"},{"id":"audit-1780933606205-06409512430a88","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 4.925,38 2022-12-01 -\u003e R$Â 4.925,38 2022-12-01","recordId":"contract-1780628941338-afe9158fc637f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:46:46.205Z","financial":true,"collection":"contracts"},{"id":"audit-1780933622785-90eb5d5ca04c48","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 4.925,38 2018-02-05 -\u003e R$Â 4.925,38 2018-02-05","recordId":"contract-1780628896123-f29152cba1da7","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:47:02.785Z","financial":true,"collection":"contracts"},{"id":"audit-1780933641438-29026f3c904368","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.166,66 2014-10-30 -\u003e R$Â 3.166,66 2014-10-30","recordId":"contract-1780928819589-e432858a1a45c","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:47:21.438Z","financial":true,"collection":"contracts"},{"id":"audit-1780933651924-7eefaa2e357808","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.166,66 2014-10-30 -\u003e R$Â 3.166,66 2014-10-30","recordId":"contract-1780928849086-d94562f3211938","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:47:31.924Z","financial":true,"collection":"contracts"},{"id":"audit-1780933664464-829bcfa2e3214","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.166,66 2014-10-30 -\u003e R$Â 3.166,66 2014-10-30","recordId":"contract-1780928918436-4465d91442f17","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:47:44.464Z","financial":true,"collection":"contracts"},{"id":"audit-1780933693475-6fcb5b19406f28","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.852,50 2023-01-10 -\u003e R$Â 2.852,50 2023-01-10","recordId":"contract-1780929113579-ac1c704c510c9","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:48:13.475Z","financial":true,"collection":"contracts"},{"id":"audit-1780933707541-171e19abdc8ef","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.852,50 2023-01-10 -\u003e R$Â 2.852,50 2023-01-10","recordId":"contract-1780929145216-07a65fc292632","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:48:27.541Z","financial":true,"collection":"contracts"},{"id":"audit-1780933727205-8e173fcd7727d8","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2025-05-01 -\u003e R$Â 3.000,00 2025-05-01","recordId":"contract-1780929298222-3d248a5a66ddc","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:48:47.205Z","financial":true,"collection":"contracts"},{"id":"audit-1780933740555-aac38c478abc98","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2025-05-01 -\u003e R$Â 3.000,00 2025-05-01","recordId":"contract-1780929329664-7858ef71951ae","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:49:00.555Z","financial":true,"collection":"contracts"},{"id":"audit-1780933785107-e7629f6d935c9","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2025-05-01 -\u003e R$Â 3.000,00 2025-05-01","recordId":"contract-1780929329664-7858ef71951ae","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T15:49:45.107Z","financial":true,"collection":"contracts"},{"id":"audit-1780955077408-5875b65417ca98","action":"record_updated","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 2.800,00 2018-09-30 -\u003e R$Â 2.800,00 2018-09-30","recordId":"contract-1780628600393-cf4b9f79c1793","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T21:44:37.408Z","financial":true,"collection":"contracts"},{"id":"audit-1780955124299-bbd5c955fe66e","action":"record_created","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"19/02/2018 R$Â 8.400,00","recordId":"payment-1780955124299-bf4c1f8e476bb8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T21:45:24.299Z","financial":true,"collection":"payments"},{"id":"audit-1780955586486-f500a9044283b8","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T21:53:06.486Z","financial":false,"collection":"auth"},{"id":"audit-1780955613492-04c8ae48d79e4","after":null,"action":"record_deleted","before":{"id":"payment-1780955124299-bf4c1f8e476bb8","amount":8400,"history":"","updatedAt":"2026-06-08T21:45:24.299Z","contractId":"contract-1780628667996-7169e913d233f","lessorName":"LIDERMAC CONSTRUCOES E EQUIPAMENTOS LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-02-19","totalAmount":8400,"chargeAmount":0,"contractCode":"CTR-17806286"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"19/02/2018 R$Â 8.400,00","recordId":"payment-1780955124299-bf4c1f8e476bb8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-08T21:53:33.492Z","financial":true,"collection":"payments"},{"id":"audit-1780967517268-506ab4e66398b8","after":{"id":"payment-1780967517268-215c490157b31","amount":8400,"history":"","updatedAt":"2026-06-09T01:11:57.268Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-09-19","totalAmount":8400,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"19/09/2018 R$Â 8.400,00","recordId":"payment-1780967517268-215c490157b31","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T01:11:57.268Z","financial":true,"collection":"payments"},{"id":"audit-1780967555787-9511a9050485f","after":{"id":"payment-1780967555786-188e597df5b2e8","amount":2800,"history":"","updatedAt":"2026-06-09T01:12:35.786Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-10-30","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"30/10/2018 R$Â 2.800,00","recordId":"payment-1780967555786-188e597df5b2e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T01:12:35.787Z","financial":true,"collection":"payments"},{"id":"audit-1780967581117-b820e2d6360b2","after":{"id":"payment-1780967581117-bd0308d0871bc8","amount":2800,"history":"","updatedAt":"2026-06-09T01:13:01.117Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-12-01","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/12/2018 R$Â 2.800,00","recordId":"payment-1780967581117-bd0308d0871bc8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T01:13:01.117Z","financial":true,"collection":"payments"},{"id":"audit-1780967595981-aff860c80d52d","after":{"id":"payment-1780967581117-bd0308d0871bc8","amount":2800,"history":"","updatedAt":"2026-06-09T01:13:15.980Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-12-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_updated","before":{"id":"payment-1780967581117-bd0308d0871bc8","amount":2800,"history":"","updatedAt":"2026-06-09T01:13:01.117Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2018-12-01","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/12/2018 R$Â 2.800,00 -\u003e 02/12/2018 R$Â 2.800,00","recordId":"payment-1780967581117-bd0308d0871bc8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T01:13:15.981Z","financial":true,"collection":"payments"},{"id":"audit-1781026044125-01891fdc90241","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:27:24.125Z","financial":false,"collection":"auth"},{"id":"audit-1781026297956-ed5fcf57cd273","after":{"target":"Supabase","records":58},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":58}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:31:37.956Z","financial":false,"collection":"sync"},{"id":"audit-1781026304695-31808edc4090b","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:31:44.695Z","financial":false,"collection":"auth"},{"id":"audit-1781026364401-5aecab63f38488","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:32:44.401Z","financial":false,"collection":"auth"},{"id":"audit-1781026609689-a48e49ceacea28","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:36:49.689Z","financial":false,"collection":"auth"},{"id":"audit-1781026707133-c4a8b5ad5d23f","after":{"target":"Supabase","records":58},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":58}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:38:27.133Z","financial":false,"collection":"sync"},{"id":"audit-1781026714958-2fcadc448f85b8","after":{"target":"Supabase","records":58},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":58}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:38:34.958Z","financial":false,"collection":"sync"},{"id":"audit-1781026720211-3314ddcb92de48","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:38:40.211Z","financial":false,"collection":"auth"},{"id":"audit-1781026931309-736ab24733f7b","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:42:11.309Z","financial":false,"collection":"auth"},{"id":"audit-1781027075783-ea9e94bfb4c9f","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:44:35.783Z","financial":false,"collection":"auth"},{"id":"audit-1781027382279-86e07433d9523","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T17:49:42.279Z","financial":false,"collection":"auth"},{"id":"audit-1781039677169-edcd3f4e096e18","after":{"id":"client-1780931004783-df6f86e3a9dd","name":"AMERICAN TOWER T. TORRES DO BRASIL LTDA.","email":"","phone":"819999999","contact":"AMERICA","document":"23.842.855/0001-65","updatedAt":"2026-06-09T21:14:37.168Z"},"action":"record_updated","before":{"id":"client-1780931004783-df6f86e3a9dd","name":"AMERICA TOWER T TORRES DO BRASIL LTDA","email":"","phone":"819999999","contact":"AMERICA","document":"23.842.855/0001-65","updatedAt":"2026-06-08T15:12:00.106Z"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"AMERICA TOWER T TORRES DO BRASIL LTDA -\u003e AMERICAN TOWER T. TORRES DO BRASIL LTDA.","recordId":"client-1780931004783-df6f86e3a9dd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:14:37.169Z","financial":false,"collection":"clients"},{"id":"audit-1781039771497-ef96c3e4148e88","after":{"id":"payment-1781039771497-9054d649a2c1f","amount":2800,"history":"","updatedAt":"2026-06-09T21:16:11.497Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-01-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/01/2019 R$Â 2.800,00","recordId":"payment-1781039771497-9054d649a2c1f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:16:11.497Z","financial":true,"collection":"payments"},{"id":"audit-1781039794378-f6d348b7cb115","after":{"id":"payment-1781039794378-2c83c6b63feba8","amount":2800,"history":"","updatedAt":"2026-06-09T21:16:34.378Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-01-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"28/01/2019 R$Â 2.800,00","recordId":"payment-1781039794378-2c83c6b63feba8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:16:34.378Z","financial":true,"collection":"payments"},{"id":"audit-1781039840875-496fce93fb7fe","after":{"id":"payment-1781039840875-64902a26c182a","amount":2800,"history":"","updatedAt":"2026-06-09T21:17:20.875Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-02-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"28/02/2019 R$Â 2.800,00","recordId":"payment-1781039840875-64902a26c182a","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:17:20.875Z","financial":true,"collection":"payments"},{"id":"audit-1781039920876-4091aec69e40e","after":{"id":"payment-1781039920876-9a09747998b5b","amount":2800,"history":"","updatedAt":"2026-06-09T21:18:40.876Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-04-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/04/2019 R$Â 2.800,00","recordId":"payment-1781039920876-9a09747998b5b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:18:40.876Z","financial":true,"collection":"payments"},{"id":"audit-1781039940829-b11437c660141","after":{"id":"payment-1781039940829-cb815ea32379d","amount":2800,"history":"","updatedAt":"2026-06-09T21:19:00.829Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-04-29","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"29/04/2019 R$Â 2.800,00","recordId":"payment-1781039940829-cb815ea32379d","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:19:00.829Z","financial":true,"collection":"payments"},{"id":"audit-1781039974383-1ae9418ae0042","after":{"id":"payment-1781039974383-c2bd44c0e6b0a8","amount":2800,"history":"","updatedAt":"2026-06-09T21:19:34.383Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-06-03","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"03/06/2019 R$Â 2.800,00","recordId":"payment-1781039974383-c2bd44c0e6b0a8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:19:34.383Z","financial":true,"collection":"payments"},{"id":"audit-1781039999118-69c4a6dbb0bb6","after":{"id":"payment-1781039999118-bc8ccaa77a844","amount":2800,"history":"","updatedAt":"2026-06-09T21:19:59.118Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-06-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"28/06/2019 R$Â 2.800,00","recordId":"payment-1781039999118-bc8ccaa77a844","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:19:59.118Z","financial":true,"collection":"payments"},{"id":"audit-1781040022559-dfdfcbbda29b8","after":{"id":"payment-1781040022559-462e45462c73e8","amount":2800,"history":"","updatedAt":"2026-06-09T21:20:22.559Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-07-29","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"29/07/2019 R$Â 2.800,00","recordId":"payment-1781040022559-462e45462c73e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:20:22.559Z","financial":true,"collection":"payments"},{"id":"audit-1781040051632-89282574add018","after":{"id":"payment-1781040051632-b712934b4ce0e8","amount":2800,"history":"","updatedAt":"2026-06-09T21:20:51.632Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-08-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"28/08/2019 R$Â 2.800,00","recordId":"payment-1781040051632-b712934b4ce0e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:20:51.632Z","financial":true,"collection":"payments"},{"id":"audit-1781040082577-e9a79e980f58e","after":{"id":"payment-1781040082577-b7b8e902afa2f","amount":2800,"history":"","updatedAt":"2026-06-09T21:21:22.577Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-09-27","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"27/09/2019 R$Â 2.800,00","recordId":"payment-1781040082577-b7b8e902afa2f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:21:22.577Z","financial":true,"collection":"payments"},{"id":"audit-1781040101202-c1233a63b52bc8","after":{"id":"payment-1781040101202-c32237990283d8","amount":2800,"history":"","updatedAt":"2026-06-09T21:21:41.202Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-10-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"28/10/2019 R$Â 2.800,00","recordId":"payment-1781040101202-c32237990283d8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:21:41.202Z","financial":true,"collection":"payments"},{"id":"audit-1781040801985-bdb8b41d262d98","after":{"id":"payment-1781040801985-69adf8ae66963","amount":2800,"history":"","updatedAt":"2026-06-09T21:33:21.985Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2019-12-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/12/2019 R$Â 2.800,00","recordId":"payment-1781040801985-69adf8ae66963","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:33:21.985Z","financial":true,"collection":"payments"},{"id":"audit-1781040818626-5d04eefee26f8","after":{"id":"payment-1781040818626-5943409d6cdc08","amount":2800,"history":"","updatedAt":"2026-06-09T21:33:38.626Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-01-03","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"03/01/2020 R$Â 2.800,00","recordId":"payment-1781040818626-5943409d6cdc08","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:33:38.626Z","financial":true,"collection":"payments"},{"id":"audit-1781040867075-e72554ae6198e","after":{"id":"payment-1781040867075-6b18b26602b488","amount":2800,"history":"","updatedAt":"2026-06-09T21:34:27.075Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-01-29","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"29/01/2020 R$Â 2.800,00","recordId":"payment-1781040867075-6b18b26602b488","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:34:27.075Z","financial":true,"collection":"payments"},{"id":"audit-1781040882739-af06f4ffdae4c","after":{"id":"payment-1781040882739-dd6110ea4a9d","amount":2800,"history":"","updatedAt":"2026-06-09T21:34:42.739Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-03-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/03/2020 R$Â 2.800,00","recordId":"payment-1781040882739-dd6110ea4a9d","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:34:42.739Z","financial":true,"collection":"payments"},{"id":"audit-1781040900851-e5f975558fdd3","after":{"id":"payment-1781040900851-87d79778369aa8","amount":2800,"history":"","updatedAt":"2026-06-09T21:35:00.851Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-04-01","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/04/2020 R$Â 2.800,00","recordId":"payment-1781040900851-87d79778369aa8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:35:00.851Z","financial":true,"collection":"payments"},{"id":"audit-1781040917427-e93cb2c0113ca","after":{"id":"payment-1781040917427-fb4ef7e5204c5","amount":2800,"history":"","updatedAt":"2026-06-09T21:35:17.427Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-06-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/06/2020 R$Â 2.800,00","recordId":"payment-1781040917427-fb4ef7e5204c5","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:35:17.427Z","financial":true,"collection":"payments"},{"id":"audit-1781040972644-77d7da5b9e63c","after":{"id":"payment-1781040972644-5e6bcc02c7e038","amount":2800,"history":"","updatedAt":"2026-06-09T21:36:12.644Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-07-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/07/2020 R$Â 2.800,00","recordId":"payment-1781040972644-5e6bcc02c7e038","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:36:12.644Z","financial":true,"collection":"payments"},{"id":"audit-1781040988741-147cd5aa63972","after":{"id":"payment-1781040988741-7b394f8f06c06","amount":2800,"history":"","updatedAt":"2026-06-09T21:36:28.741Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-07-31","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"31/07/2020 R$Â 2.800,00","recordId":"payment-1781040988741-7b394f8f06c06","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:36:28.741Z","financial":true,"collection":"payments"},{"id":"audit-1781041019061-7011f97ed3a7f8","after":{"id":"payment-1781041019061-e2309689993b78","amount":2800,"history":"","updatedAt":"2026-06-09T21:36:59.061Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-08-26","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"26/08/2020 R$Â 2.800,00","recordId":"payment-1781041019061-e2309689993b78","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:36:59.061Z","financial":true,"collection":"payments"},{"id":"audit-1781041046982-647d236aea812","after":{"id":"payment-1781041046982-274b7c0f415e7","amount":2800,"history":"","updatedAt":"2026-06-09T21:37:26.982Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-10-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/10/2020 R$Â 2.800,00","recordId":"payment-1781041046982-274b7c0f415e7","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:37:26.982Z","financial":true,"collection":"payments"},{"id":"audit-1781041068518-177c1c866d0c6","after":{"id":"payment-1781041068518-70a1978a414d8","amount":5600,"history":"","updatedAt":"2026-06-09T21:37:48.518Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-11-27","totalAmount":5600,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"27/11/2020 R$Â 5.600,00","recordId":"payment-1781041068518-70a1978a414d8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:37:48.518Z","financial":true,"collection":"payments"},{"id":"audit-1781041109432-180b67a3611f9","after":{"id":"payment-1781041109432-186ba7b41b2be","amount":2800,"history":"","updatedAt":"2026-06-09T21:38:29.432Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-12-01","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/12/2020 R$Â 2.800,00","recordId":"payment-1781041109432-186ba7b41b2be","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:38:29.432Z","financial":true,"collection":"payments"},{"id":"audit-1781041130120-01d3044eb0bb58","after":{"id":"payment-1781041130120-6917e19c9e2148","amount":2800,"history":"","updatedAt":"2026-06-09T21:38:50.120Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2020-12-28","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"28/12/2020 R$Â 2.800,00","recordId":"payment-1781041130120-6917e19c9e2148","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:38:50.120Z","financial":true,"collection":"payments"},{"id":"audit-1781041953554-ed7611de48caa","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-09T21:52:33.554Z","financial":false,"collection":"auth"},{"id":"audit-1781056804960-624971f5df6e3","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T02:00:04.960Z","financial":false,"collection":"auth"},{"id":"audit-1781058562872-bf92f0141726e8","after":{"target":"Supabase","records":82},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":82}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T02:29:22.872Z","financial":false,"collection":"sync"},{"id":"audit-1781095749206-24bedc142ef7d8","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:49:09.206Z","financial":false,"collection":"auth"},{"id":"audit-1781095904007-dd3cffa9849df8","after":{"id":"payment-1781095904007-8f04bb01de58e8","amount":2800,"history":"","updatedAt":"2026-06-10T12:51:44.007Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-01-29","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"29/01/2021 R$Â 2.800,00","recordId":"payment-1781095904007-8f04bb01de58e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:51:44.007Z","financial":true,"collection":"payments"},{"id":"audit-1781095932136-d8523c7b7f56a8","after":{"id":"payment-1781095932136-1bda56060c50e","amount":2800,"history":"","updatedAt":"2026-06-10T12:52:12.136Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-03-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/03/2021 R$Â 2.800,00","recordId":"payment-1781095932136-1bda56060c50e","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:52:12.136Z","financial":true,"collection":"payments"},{"id":"audit-1781095959417-c3cd07068fff68","after":{"id":"payment-1781095959416-e639d273805a1","amount":2800,"history":"","updatedAt":"2026-06-10T12:52:39.416Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-04-05","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/04/2021 R$Â 2.800,00","recordId":"payment-1781095959416-e639d273805a1","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:52:39.417Z","financial":true,"collection":"payments"},{"id":"audit-1781095982781-0a38eb259827c","after":{"id":"payment-1781095982781-b6442b23d755e","amount":2800,"history":"","updatedAt":"2026-06-10T12:53:02.781Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-05-03","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"03/05/2021 R$Â 2.800,00","recordId":"payment-1781095982781-b6442b23d755e","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:53:02.781Z","financial":true,"collection":"payments"},{"id":"audit-1781096008808-8ac5a86e68a42","after":{"id":"payment-1781096008808-7d5f47dc69fee8","amount":2800,"history":"","updatedAt":"2026-06-10T12:53:28.808Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-05-31","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"31/05/2021 R$Â 2.800,00","recordId":"payment-1781096008808-7d5f47dc69fee8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:53:28.808Z","financial":true,"collection":"payments"},{"id":"audit-1781096027551-063a59fc5d6468","after":{"id":"payment-1781096027551-1aaa024051eb3","amount":2800,"history":"","updatedAt":"2026-06-10T12:53:47.551Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-06-30","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"30/06/2021 R$Â 2.800,00","recordId":"payment-1781096027551-1aaa024051eb3","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:53:47.551Z","financial":true,"collection":"payments"},{"id":"audit-1781096050757-8e21103fc202d8","after":{"id":"payment-1781096050757-8caaaf1e55a1a8","amount":2800,"history":"","updatedAt":"2026-06-10T12:54:10.757Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-08-09","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"09/08/2021 R$Â 2.800,00","recordId":"payment-1781096050757-8caaaf1e55a1a8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:54:10.757Z","financial":true,"collection":"payments"},{"id":"audit-1781096072523-56454e90ccc748","after":{"id":"payment-1781096072523-a48e7e67c6df8","amount":2800,"history":"","updatedAt":"2026-06-10T12:54:32.523Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-09-02","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/09/2021 R$Â 2.800,00","recordId":"payment-1781096072523-a48e7e67c6df8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:54:32.523Z","financial":true,"collection":"payments"},{"id":"audit-1781096091580-5fa1cd48fabac8","after":{"id":"payment-1781096091579-da01d3eebf2e38","amount":2800,"history":"","updatedAt":"2026-06-10T12:54:51.579Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-09-30","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"30/09/2021 R$Â 2.800,00","recordId":"payment-1781096091579-da01d3eebf2e38","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:54:51.580Z","financial":true,"collection":"payments"},{"id":"audit-1781096116862-e63d9f86675d98","after":{"id":"payment-1781096116862-31908f3a24ea58","amount":3800,"history":"","updatedAt":"2026-06-10T12:55:16.862Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-11-01","totalAmount":3800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/11/2021 R$Â 3.800,00","recordId":"payment-1781096116862-31908f3a24ea58","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:55:16.862Z","financial":true,"collection":"payments"},{"id":"audit-1781096135821-992f833604973","after":{"id":"payment-1781096135821-b11eb1e802e94","amount":3500,"history":"","updatedAt":"2026-06-10T12:55:35.821Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2021-12-02","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/12/2021 R$Â 3.500,00","recordId":"payment-1781096135821-b11eb1e802e94","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:55:35.821Z","financial":true,"collection":"payments"},{"id":"audit-1781096157150-c05d32b64c17e8","after":{"id":"payment-1781096157150-67822072c84f08","amount":3500,"history":"","updatedAt":"2026-06-10T12:55:57.150Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-01-03","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"03/01/2022 R$Â 3.500,00","recordId":"payment-1781096157150-67822072c84f08","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:55:57.150Z","financial":true,"collection":"payments"},{"id":"audit-1781096175374-a97601c3d25ab","after":{"id":"payment-1781096175374-9201d5ee2d98e","amount":3500,"history":"","updatedAt":"2026-06-10T12:56:15.374Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-01-27","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"27/01/2022 R$Â 3.500,00","recordId":"payment-1781096175374-9201d5ee2d98e","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:56:15.374Z","financial":true,"collection":"payments"},{"id":"audit-1781096213263-4836887a2fbf4","after":{"id":"payment-1781096213263-40f2d26a3070b","amount":3500,"history":"","updatedAt":"2026-06-10T12:56:53.263Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-03-02","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/03/2022 R$Â 3.500,00","recordId":"payment-1781096213263-40f2d26a3070b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:56:53.263Z","financial":true,"collection":"payments"},{"id":"audit-1781096293713-78cd2e73a960e","after":{"id":"payment-1781096293712-9a65f36a8fdcf","amount":3500,"history":"","updatedAt":"2026-06-10T12:58:13.712Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-03-30","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"30/03/2022 R$Â 3.500,00","recordId":"payment-1781096293712-9a65f36a8fdcf","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:58:13.713Z","financial":true,"collection":"payments"},{"id":"audit-1781096310370-6ec1599f1d238","after":{"id":"payment-1781096310370-31f35ced590b6","amount":2800,"history":"","updatedAt":"2026-06-10T12:58:30.370Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-04-27","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"27/04/2022 R$Â 2.800,00","recordId":"payment-1781096310370-31f35ced590b6","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:58:30.370Z","financial":true,"collection":"payments"},{"id":"audit-1781096332962-5c576d98712fc8","after":{"id":"payment-1781096332962-8335bbe9dfd998","amount":3500,"history":"","updatedAt":"2026-06-10T12:58:52.962Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-05-31","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"31/05/2022 R$Â 3.500,00","recordId":"payment-1781096332962-8335bbe9dfd998","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:58:52.962Z","financial":true,"collection":"payments"},{"id":"audit-1781096347395-370f59cb063288","after":{"id":"payment-1781096310370-31f35ced590b6","amount":3500,"history":"","updatedAt":"2026-06-10T12:59:07.395Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-04-27","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_updated","before":{"id":"payment-1781096310370-31f35ced590b6","amount":2800,"history":"","updatedAt":"2026-06-10T12:58:30.370Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-04-27","totalAmount":2800,"chargeAmount":0,"contractCode":"CTR-17806286"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"27/04/2022 R$Â 2.800,00 -\u003e 27/04/2022 R$Â 3.500,00","recordId":"payment-1781096310370-31f35ced590b6","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:59:07.395Z","financial":true,"collection":"payments"},{"id":"audit-1781096367443-6581d23052492","after":{"id":"payment-1781096367443-4844b6a40c092","amount":3500,"history":"","updatedAt":"2026-06-10T12:59:27.443Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-07-05","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/07/2022 R$Â 3.500,00","recordId":"payment-1781096367443-4844b6a40c092","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:59:27.443Z","financial":true,"collection":"payments"},{"id":"audit-1781096384275-f1611bff7c2d18","after":{"id":"payment-1781096384275-922a8fc68e699","amount":3500,"history":"","updatedAt":"2026-06-10T12:59:44.275Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-07-29","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"29/07/2022 R$Â 3.500,00","recordId":"payment-1781096384275-922a8fc68e699","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T12:59:44.275Z","financial":true,"collection":"payments"},{"id":"audit-1781096411556-d2f31523720e3","after":{"id":"payment-1781096411556-71ef1982d12808","amount":3500,"history":"","updatedAt":"2026-06-10T13:00:11.556Z","contractId":"contract-1780628600393-cf4b9f79c1793","lessorName":"AGENCIA SOMA TECNOLOGIA LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2022-08-29","totalAmount":3500,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"29/08/2022 R$Â 3.500,00","recordId":"payment-1781096411556-71ef1982d12808","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T13:00:11.556Z","financial":true,"collection":"payments"},{"id":"audit-1781096707145-d6642b10583548","after":{"target":"Supabase","records":102},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":102}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T13:05:07.145Z","financial":false,"collection":"sync"},{"id":"audit-1781105484124-6b228f356cbaa8","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T15:31:24.124Z","financial":false,"collection":"auth"},{"id":"audit-1781111551939-f025983372e","after":{"target":"Supabase","records":102},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":102}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T17:12:31.939Z","financial":false,"collection":"sync"},{"id":"audit-1781111653987-6b7abed788aab","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T17:14:13.987Z","financial":false,"collection":"auth"},{"id":"audit-1781111742984-81738c2b92cb28","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T17:15:42.984Z","financial":false,"collection":"auth"},{"id":"audit-1781121810384-fbee7ae37047c8","after":{"id":"payment-1781121810384-2ee2b097b34f5","amount":28800,"history":"Pagamento anual","updatedAt":"2026-06-10T20:03:30.384Z","contractId":"contract-1780628667996-7169e913d233f","lessorName":"LIDERMAC CONSTRUCOES E EQUIPAMENTOS LTDA","propertyId":"property-1779819623676-666ddd22ec65e","paymentDate":"2023-02-06","totalAmount":28800,"chargeAmount":0,"contractCode":"CTR-17806286"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"06/02/2023 R$Â 28.800,00","recordId":"payment-1781121810384-2ee2b097b34f5","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T20:03:30.384Z","financial":true,"collection":"payments"},{"id":"audit-1781124742620-dd4c624b0508d","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T20:52:22.620Z","financial":false,"collection":"auth"},{"id":"audit-1781124743347-86f0aac6e7e3d","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-10T20:52:23.347Z","financial":false,"collection":"auth"},{"id":"audit-1781277178454-f2af350031aa7","after":{"id":"payment-1781277178454-e921ec20b4cda","amount":3000,"history":"","updatedAt":"2026-06-12T15:12:58.454Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-04-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/04/2023 R$Â 3.000,00","recordId":"payment-1781277178454-e921ec20b4cda","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:12:58.454Z","financial":true,"collection":"payments"},{"id":"audit-1781278802399-3ce6cd6455dca8","after":{"id":"payment-1781278802398-fa5456a30c8a4","amount":3000,"history":"","updatedAt":"2026-06-12T15:40:02.398Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-05-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/05/2023 R$Â 3.000,00","recordId":"payment-1781278802398-fa5456a30c8a4","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:40:02.399Z","financial":true,"collection":"payments"},{"id":"audit-1781278836297-ac814fd666a998","after":{"id":"payment-1781278836297-fcdafaae8e5f7","amount":3000,"history":"","updatedAt":"2026-06-12T15:40:36.297Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-06-16","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"16/06/2023 R$Â 3.000,00","recordId":"payment-1781278836297-fcdafaae8e5f7","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:40:36.297Z","financial":true,"collection":"payments"},{"id":"audit-1781278855732-2a5ed0fc39b2f","after":{"id":"payment-1781278855732-b4b74e69fb01e8","amount":3000,"history":"","updatedAt":"2026-06-12T15:40:55.732Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-07-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/07/2023 R$Â 3.000,00","recordId":"payment-1781278855732-b4b74e69fb01e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:40:55.732Z","financial":true,"collection":"payments"},{"id":"audit-1781278882030-297819ae39eb","after":{"id":"payment-1781278882030-cfa4c09d5e553","amount":3000,"history":"","updatedAt":"2026-06-12T15:41:22.030Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-08-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/08/2023 R$Â 3.000,00","recordId":"payment-1781278882030-cfa4c09d5e553","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:41:22.030Z","financial":true,"collection":"payments"},{"id":"audit-1781278903640-f13024aab24e58","after":{"id":"payment-1781278903640-a1d12fc300a748","amount":3000,"history":"","updatedAt":"2026-06-12T15:41:43.640Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-09-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/09/2023 R$Â 3.000,00","recordId":"payment-1781278903640-a1d12fc300a748","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:41:43.640Z","financial":true,"collection":"payments"},{"id":"audit-1781278925971-d4c08eb05c5bb","after":{"id":"payment-1781278925971-984251adc48b48","amount":3000,"history":"","updatedAt":"2026-06-12T15:42:05.971Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-10-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/10/2023 R$Â 3.000,00","recordId":"payment-1781278925971-984251adc48b48","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:42:05.971Z","financial":true,"collection":"payments"},{"id":"audit-1781278951497-fe915e85f24e3","after":{"id":"payment-1781278951497-b635b8120af74","amount":3000,"history":"","updatedAt":"2026-06-12T15:42:31.497Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-11-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/11/2023 R$Â 3.000,00","recordId":"payment-1781278951497-b635b8120af74","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:42:31.497Z","financial":true,"collection":"payments"},{"id":"audit-1781278977183-da8873b51aabf","after":{"id":"payment-1781278977183-c2b16b2830d548","amount":3000,"history":"","updatedAt":"2026-06-12T15:42:57.183Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2023-12-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/12/2023 R$Â 3.000,00","recordId":"payment-1781278977183-c2b16b2830d548","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:42:57.183Z","financial":true,"collection":"payments"},{"id":"audit-1781279002986-6f5e745a2bd5e8","after":{"id":"payment-1781279002986-13fea2ef7812a8","amount":3000,"history":"","updatedAt":"2026-06-12T15:43:22.986Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-01-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/01/2024 R$Â 3.000,00","recordId":"payment-1781279002986-13fea2ef7812a8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:43:22.986Z","financial":true,"collection":"payments"},{"id":"audit-1781279129955-6d689598274388","after":{"id":"payment-1781279129955-ab4bb12831bc9","amount":3000,"history":"","updatedAt":"2026-06-12T15:45:29.955Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-02-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/02/2024 R$Â 3.000,00","recordId":"payment-1781279129955-ab4bb12831bc9","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:45:29.955Z","financial":true,"collection":"payments"},{"id":"audit-1781279298118-aa5c029bcb9fe8","after":{"id":"contract-1780928976759-5d0c81b6f6dab","dueDay":10,"endDate":"2025-09-01","clientId":"client-1780628110196-738f106b6f1d98","startDate":"2023-03-01","updatedAt":"2026-06-12T15:48:18.118Z","propertyId":"property-1779821555414-2e4d9eec065b28","monthlyValue":3000,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},"action":"record_updated","before":{"id":"contract-1780928976759-5d0c81b6f6dab","dueDay":10,"endDate":"2024-02-28","clientId":"client-1780628110196-738f106b6f1d98","startDate":"2023-03-01","updatedAt":"2026-06-08T14:29:36.759Z","propertyId":"property-1779821555414-2e4d9eec065b28","monthlyValue":3000,"spuResponsible":"cliente","iptuResponsible":"cliente","adjustmentMethod":"IGP-M","fireFeeResponsible":"cliente","adjustmentFrequency":"Anual","condoFeeResponsible":"cliente"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"R$Â 3.000,00 2023-03-01 -\u003e R$Â 3.000,00 2023-03-01","recordId":"contract-1780928976759-5d0c81b6f6dab","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:48:18.118Z","financial":true,"collection":"contracts"},{"id":"audit-1781279313761-16f29484b21d","after":{"id":"payment-1781279313761-3e7e34bfe075c","amount":3000,"history":"","updatedAt":"2026-06-12T15:48:33.761Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-03-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/03/2024 R$Â 3.000,00","recordId":"payment-1781279313761-3e7e34bfe075c","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:48:33.761Z","financial":true,"collection":"payments"},{"id":"audit-1781279340978-d09bbbe1c06dd","after":{"id":"payment-1781279340978-9c3d3e5ee8217","amount":3000,"history":"","updatedAt":"2026-06-12T15:49:00.978Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-04-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/04/2024 R$Â 3.000,00","recordId":"payment-1781279340978-9c3d3e5ee8217","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:49:00.978Z","financial":true,"collection":"payments"},{"id":"audit-1781279368239-729c3d2c48f0e8","after":{"id":"payment-1781279368239-0c299341c106b","amount":3000,"history":"","updatedAt":"2026-06-12T15:49:28.239Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-05-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/05/2024 R$Â 3.000,00","recordId":"payment-1781279368239-0c299341c106b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:49:28.239Z","financial":true,"collection":"payments"},{"id":"audit-1781279393273-773a4d959a49f","after":{"id":"payment-1781279393273-9787579fc8675","amount":3000,"history":"","updatedAt":"2026-06-12T15:49:53.273Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-06-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/06/2024 R$Â 3.000,00","recordId":"payment-1781279393273-9787579fc8675","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:49:53.273Z","financial":true,"collection":"payments"},{"id":"audit-1781279414588-596f4caa402648","after":{"id":"payment-1781279414588-69c9921ec2a228","amount":3000,"history":"","updatedAt":"2026-06-12T15:50:14.588Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-07-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/07/2024 R$Â 3.000,00","recordId":"payment-1781279414588-69c9921ec2a228","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:50:14.588Z","financial":true,"collection":"payments"},{"id":"audit-1781279431176-c25ec7bdbe2918","after":{"id":"payment-1781279431176-bebd3721ff733","amount":3000,"history":"","updatedAt":"2026-06-12T15:50:31.176Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-08-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/08/2024 R$Â 3.000,00","recordId":"payment-1781279431176-bebd3721ff733","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:50:31.176Z","financial":true,"collection":"payments"},{"id":"audit-1781279450381-29f42f7ff8c908","after":{"id":"payment-1781279450381-d696e42d23a6c8","amount":3000,"history":"","updatedAt":"2026-06-12T15:50:50.381Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-09-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/09/2024 R$Â 3.000,00","recordId":"payment-1781279450381-d696e42d23a6c8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:50:50.381Z","financial":true,"collection":"payments"},{"id":"audit-1781279471792-9262797758f9e8","after":{"id":"payment-1781279471792-1e807b3ef5042","amount":3000,"history":"","updatedAt":"2026-06-12T15:51:11.792Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-10-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/10/2024 R$Â 3.000,00","recordId":"payment-1781279471792-1e807b3ef5042","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:51:11.792Z","financial":true,"collection":"payments"},{"id":"audit-1781279509677-d5de1917a2c53","after":{"id":"payment-1781279509677-21456a1749807","amount":3000,"history":"","updatedAt":"2026-06-12T15:51:49.677Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-11-01","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"01/11/2024 R$Â 3.000,00","recordId":"payment-1781279509677-21456a1749807","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:51:49.677Z","financial":true,"collection":"payments"},{"id":"audit-1781279524984-120f0fb4cf4fb8","after":{"id":"payment-1781279524984-b8d05687cc9f28","amount":3000,"history":"","updatedAt":"2026-06-12T15:52:04.984Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2024-12-03","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"03/12/2024 R$Â 3.000,00","recordId":"payment-1781279524984-b8d05687cc9f28","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:52:04.984Z","financial":true,"collection":"payments"},{"id":"audit-1781279543166-344fb728f5ea08","after":{"id":"payment-1781279543166-2c1dc1e9108968","amount":3000,"history":"","updatedAt":"2026-06-12T15:52:23.166Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2025-01-02","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/01/2025 R$Â 3.000,00","recordId":"payment-1781279543166-2c1dc1e9108968","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:52:23.166Z","financial":true,"collection":"payments"},{"id":"audit-1781279560865-0f707cf95a0cb","after":{"id":"payment-1781279560865-c8db7b7777f758","amount":3000,"history":"","updatedAt":"2026-06-12T15:52:40.865Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2025-02-05","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/02/2025 R$Â 3.000,00","recordId":"payment-1781279560865-c8db7b7777f758","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:52:40.865Z","financial":true,"collection":"payments"},{"id":"audit-1781279582277-8b0486c3f2ca38","after":{"id":"payment-1781279582277-8e0a7c561d2dc8","amount":3203,"history":"","updatedAt":"2026-06-12T15:53:02.277Z","contractId":"contract-1780928976759-5d0c81b6f6dab","lessorName":"JORGE DE ALTINHO A. ASSUNCAO PRODUCOES ARTISTICAS LTDA","propertyId":"property-1779821555414-2e4d9eec065b28","paymentDate":"2025-03-05","totalAmount":3203,"chargeAmount":0,"contractCode":"CTR-17809289"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/03/2025 R$Â 3.203,00","recordId":"payment-1781279582277-8e0a7c561d2dc8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:53:02.277Z","financial":true,"collection":"payments"},{"id":"audit-1781279667501-b6806252972588","after":{"target":"Supabase","records":127},"action":"cloud_upload","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"{\"target\":\"Supabase\",\"records\":127}","recordId":"","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:54:27.501Z","financial":false,"collection":"sync"},{"id":"audit-1781279708600-36a803316227a8","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-12T15:55:08.600Z","financial":false,"collection":"auth"},{"id":"audit-1781561166044-0e8cc9c6f1d3f","after":{"username":"jedsonpc@hotmail.com"},"action":"logout","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"jedsonpc@hotmail.com (sem perfil)","recordId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-15T22:06:06.044Z","financial":false,"collection":"auth"},{"id":"audit-1781724325037-a023952fdedba","after":{"id":"payment-1781724325037-590e22a8efd8a8","amount":2773,"history":"","updatedAt":"2026-06-17T19:25:25.037Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-04-04","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/04/2023 R$Â 2.773,00","recordId":"payment-1781724325037-590e22a8efd8a8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:25:25.037Z","financial":true,"collection":"payments"},{"id":"audit-1781724359036-b4e6ed6e8568f8","after":{"id":"payment-1781724359036-8d0ba58ce6fc18","amount":2773,"history":"","updatedAt":"2026-06-17T19:25:59.036Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-04-04","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/04/2023 R$Â 2.773,00","recordId":"payment-1781724359036-8d0ba58ce6fc18","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:25:59.036Z","financial":true,"collection":"payments"},{"id":"audit-1781724547969-2ab19765c24e38","after":{"id":"payment-1781724359036-8d0ba58ce6fc18","amount":2773,"history":"","updatedAt":"2026-06-17T19:29:07.968Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-05-08","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_updated","before":{"id":"payment-1781724359036-8d0ba58ce6fc18","amount":2773,"history":"","updatedAt":"2026-06-17T19:25:59.036Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-04-04","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/04/2023 R$Â 2.773,00 -\u003e 08/05/2023 R$Â 2.773,00","recordId":"payment-1781724359036-8d0ba58ce6fc18","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:29:07.969Z","financial":true,"collection":"payments"},{"id":"audit-1781724757592-f25c86a18f5408","after":{"id":"payment-1781724757592-f0cad5139a1","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:32:37.592Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-06-09","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"09/06/2023 R$Â 2.852,50","recordId":"payment-1781724757592-f0cad5139a1","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:32:37.592Z","financial":true,"collection":"payments"},{"id":"audit-1781724783349-8d5093b304e558","after":{"id":"payment-1781724783349-0618db5ac53308","amount":2773,"history":"","updatedAt":"2026-06-17T19:33:03.349Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-04-04","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/04/2023 R$Â 2.773,00","recordId":"payment-1781724783349-0618db5ac53308","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:33:03.349Z","financial":true,"collection":"payments"},{"id":"audit-1781724824227-79796e539cb64","after":{"id":"payment-1781724824227-3fb8fc4544c4b8","amount":2773,"history":"","updatedAt":"2026-06-17T19:33:44.227Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-05-08","totalAmount":2773,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"08/05/2023 R$Â 2.773,00","recordId":"payment-1781724824227-3fb8fc4544c4b8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:33:44.227Z","financial":true,"collection":"payments"},{"id":"audit-1781724838838-35d8536dac736","after":{"id":"payment-1781724838838-0ec876a41f7938","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:33:58.838Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-06-09","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"09/06/2023 R$Â 2.852,50","recordId":"payment-1781724838838-0ec876a41f7938","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:33:58.838Z","financial":true,"collection":"payments"},{"id":"audit-1781724903890-a43499340e6cc","after":{"id":"payment-1781724903890-8d3edcae5fd708","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:35:03.890Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-07-17","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"17/07/2023 R$Â 2.852,50","recordId":"payment-1781724903890-8d3edcae5fd708","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:35:03.890Z","financial":true,"collection":"payments"},{"id":"audit-1781724921388-3815d1a0c177d8","after":{"id":"payment-1781724921388-2a5a55892ef77","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:35:21.388Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-08-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/08/2023 R$Â 2.852,50","recordId":"payment-1781724921388-2a5a55892ef77","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:35:21.388Z","financial":true,"collection":"payments"},{"id":"audit-1781724937009-9ec8030c1c3538","after":{"id":"payment-1781724937009-958192ebb25ec8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:35:37.009Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-09-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"11/09/2023 R$Â 2.852,50","recordId":"payment-1781724937009-958192ebb25ec8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:35:37.009Z","financial":true,"collection":"payments"},{"id":"audit-1781724993297-4bb5d6ec9a69d8","after":{"id":"payment-1781724993297-2ee01470544098","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:36:33.297Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-10-03","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"03/10/2023 R$Â 2.852,50","recordId":"payment-1781724993297-2ee01470544098","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:36:33.297Z","financial":true,"collection":"payments"},{"id":"audit-1781725021858-9a31c02fd0127","after":{"id":"payment-1781725021858-05a1826a7804f8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:37:01.858Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-11-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/11/2023 R$Â 2.852,50","recordId":"payment-1781725021858-05a1826a7804f8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:37:01.858Z","financial":true,"collection":"payments"},{"id":"audit-1781725074558-cfecdca9411d5","after":{"id":"payment-1781725074558-cb855f657f10d8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:37:54.558Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2023-12-13","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"13/12/2023 R$Â 2.852,50","recordId":"payment-1781725074558-cb855f657f10d8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:37:54.558Z","financial":true,"collection":"payments"},{"id":"audit-1781725100096-f83dfb764d7598","after":{"id":"payment-1781725100096-1c3e697f5ab53","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:38:20.096Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-01-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/01/2024 R$Â 2.852,50","recordId":"payment-1781725100096-1c3e697f5ab53","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:38:20.096Z","financial":true,"collection":"payments"},{"id":"audit-1781725120844-bed7d84e141918","after":{"id":"payment-1781725120844-0ea52a62d0b7b8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:38:40.844Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-02-20","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"20/02/2024 R$Â 2.852,50","recordId":"payment-1781725120844-0ea52a62d0b7b8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:38:40.844Z","financial":true,"collection":"payments"},{"id":"audit-1781725143863-a8eae97a97dc5","after":{"id":"payment-1781725143863-6608e1dbfce598","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:39:03.863Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-03-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"11/03/2024 R$Â 2.852,50","recordId":"payment-1781725143863-6608e1dbfce598","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:39:03.863Z","financial":true,"collection":"payments"},{"id":"audit-1781725161968-33890fdaa04cf8","after":{"id":"payment-1781725161968-4f34da546b1d38","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:39:21.968Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-04-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/04/2024 R$Â 2.852,50","recordId":"payment-1781725161968-4f34da546b1d38","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:39:21.968Z","financial":true,"collection":"payments"},{"id":"audit-1781725834860-4385c4acad4eb","after":{"id":"payment-1781725834860-406d3a425eadd","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:50:34.860Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-05-15","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"15/05/2024 R$Â 2.852,50","recordId":"payment-1781725834860-406d3a425eadd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:50:34.860Z","financial":true,"collection":"payments"},{"id":"audit-1781725852686-e5cee91e85dff","after":{"id":"payment-1781725852686-bda350eb7d7648","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:50:52.686Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-06-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"18/06/2024 R$Â 2.852,50","recordId":"payment-1781725852686-bda350eb7d7648","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:50:52.686Z","financial":true,"collection":"payments"},{"id":"audit-1781725874316-538eeb628951a","after":{"id":"payment-1781725874316-5041c1cb8694d8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:51:14.316Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-07-17","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"17/07/2024 R$Â 2.852,50","recordId":"payment-1781725874316-5041c1cb8694d8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:51:14.316Z","financial":true,"collection":"payments"},{"id":"audit-1781725895412-f2fd40425db448","after":{"id":"payment-1781725895412-004b6e3b1aad88","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:51:35.412Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-08-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"16/08/2024 R$Â 2.852,50","recordId":"payment-1781725895412-004b6e3b1aad88","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:51:35.412Z","financial":true,"collection":"payments"},{"id":"audit-1781725914197-a056f8edb724c8","after":{"id":"payment-1781725914197-0f8238c058c24","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:51:54.197Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-09-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"16/09/2024 R$Â 2.852,50","recordId":"payment-1781725914197-0f8238c058c24","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:51:54.197Z","financial":true,"collection":"payments"},{"id":"audit-1781725961019-8038f29dd444f8","after":{"id":"payment-1781725961019-18e2626ebd20f","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:52:41.019Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-10-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"16/10/2024 R$Â 2.852,50","recordId":"payment-1781725961019-18e2626ebd20f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:52:41.019Z","financial":true,"collection":"payments"},{"id":"audit-1781726010320-ae436ff55bc768","after":{"id":"payment-1781726010320-92838872f13fd","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:53:30.320Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-11-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"18/11/2024 R$Â 2.852,50","recordId":"payment-1781726010320-92838872f13fd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:53:30.320Z","financial":true,"collection":"payments"},{"id":"audit-1781726036091-dcbd4e9689c35","after":{"id":"payment-1781726036091-8d3a0e4b4819a","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:53:56.091Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2024-12-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"18/12/2024 R$Â 2.852,50","recordId":"payment-1781726036091-8d3a0e4b4819a","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:53:56.091Z","financial":true,"collection":"payments"},{"id":"audit-1781726163732-d600da8d2feee8","after":{"id":"payment-1781726163732-d60743d885b11","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:56:03.732Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2025-01-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/01/2025 R$Â 2.852,50","recordId":"payment-1781726163732-d60743d885b11","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:56:03.732Z","financial":true,"collection":"payments"},{"id":"audit-1781726184324-d949cf9d9a63a","after":{"id":"payment-1781726184323-3a178bfea593a","amount":3038.99,"history":"","updatedAt":"2026-06-17T19:56:24.323Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2025-02-14","totalAmount":3038.99,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"14/02/2025 R$Â 3.038,99","recordId":"payment-1781726184323-3a178bfea593a","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:56:24.324Z","financial":true,"collection":"payments"},{"id":"audit-1781726219342-5b7a8b3dfd2858","after":{"id":"payment-1781726219342-7e3faa0fc42ee","amount":3038.99,"history":"","updatedAt":"2026-06-17T19:56:59.342Z","contractId":"contract-1780929113579-ac1c704c510c9","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821701568-145ba738928b5","paymentDate":"2025-03-17","totalAmount":3038.99,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"17/03/2025 R$Â 3.038,99","recordId":"payment-1781726219342-7e3faa0fc42ee","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:56:59.342Z","financial":true,"collection":"payments"},{"id":"audit-1781726268369-5ce0167eba00f8","after":{"id":"payment-1781726268369-f02e77dc4e55d","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:57:48.369Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-07-17","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"17/07/2023 R$Â 2.852,50","recordId":"payment-1781726268369-f02e77dc4e55d","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:57:48.369Z","financial":true,"collection":"payments"},{"id":"audit-1781726290665-5fa42d0d13ea98","after":{"id":"payment-1781726290665-8451bbe56a14a8","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:58:10.665Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-08-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/08/2023 R$Â 2.852,50","recordId":"payment-1781726290665-8451bbe56a14a8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:58:10.665Z","financial":true,"collection":"payments"},{"id":"audit-1781726309493-f778e0f7612758","after":{"id":"payment-1781726309493-08391e305c88f","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:58:29.493Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-09-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"11/09/2023 R$Â 2.852,50","recordId":"payment-1781726309493-08391e305c88f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:58:29.493Z","financial":true,"collection":"payments"},{"id":"audit-1781726329605-d5cd9f9e47b72","after":{"id":"payment-1781726329605-084fd98bf1fa78","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:58:49.605Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-10-03","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"03/10/2023 R$Â 2.852,50","recordId":"payment-1781726329605-084fd98bf1fa78","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:58:49.605Z","financial":true,"collection":"payments"},{"id":"audit-1781726358383-9021b2ea9ffb18","after":{"id":"payment-1781726358383-07008074d725a","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:59:18.383Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-11-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/11/2023 R$Â 2.852,50","recordId":"payment-1781726358383-07008074d725a","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:59:18.383Z","financial":true,"collection":"payments"},{"id":"audit-1781726380685-cd0d3653964228","after":{"id":"payment-1781726380685-b7dc45679b919","amount":2852.5,"history":"","updatedAt":"2026-06-17T19:59:40.685Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2023-12-13","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"13/12/2023 R$Â 2.852,50","recordId":"payment-1781726380685-b7dc45679b919","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T19:59:40.685Z","financial":true,"collection":"payments"},{"id":"audit-1781726402478-f33b934f33d758","after":{"id":"payment-1781726402478-4765ae91c2a98","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:00:02.478Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-01-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"11/01/2024 R$Â 2.852,50","recordId":"payment-1781726402478-4765ae91c2a98","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:00:02.478Z","financial":true,"collection":"payments"},{"id":"audit-1781726422316-c34156840b5658","after":{"id":"payment-1781726422316-a1fa7d2c4b60e","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:00:22.316Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-02-20","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"20/02/2024 R$Â 2.852,50","recordId":"payment-1781726422316-a1fa7d2c4b60e","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:00:22.316Z","financial":true,"collection":"payments"},{"id":"audit-1781726443530-9ee701ce04671","after":{"id":"payment-1781726443530-dcc2e472bacca8","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:00:43.530Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-03-11","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"11/03/2024 R$Â 2.852,50","recordId":"payment-1781726443530-dcc2e472bacca8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:00:43.530Z","financial":true,"collection":"payments"},{"id":"audit-1781726462957-1e7ab781434e68","after":{"id":"payment-1781726462957-0f3d928968eb68","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:01:02.957Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-04-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/04/2024 R$Â 2.852,50","recordId":"payment-1781726462957-0f3d928968eb68","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:01:02.957Z","financial":true,"collection":"payments"},{"id":"audit-1781726481587-e38a0b40cc3d8","after":{"id":"payment-1781726481587-b65f37072603d","amount":2852.24,"history":"","updatedAt":"2026-06-17T20:01:21.587Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-05-15","totalAmount":2852.24,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"15/05/2024 R$Â 2.852,24","recordId":"payment-1781726481587-b65f37072603d","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:01:21.587Z","financial":true,"collection":"payments"},{"id":"audit-1781726512501-10ca84b39c8a08","after":{"id":"payment-1781726512501-afa1742a944158","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:01:52.501Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-06-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"18/06/2024 R$Â 2.852,50","recordId":"payment-1781726512501-afa1742a944158","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:01:52.501Z","financial":true,"collection":"payments"},{"id":"audit-1781726539228-5cd4085f4ab68","after":{"id":"payment-1781726539228-ee6dadfee5255","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:02:19.228Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-07-17","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"17/07/2024 R$Â 2.852,50","recordId":"payment-1781726539228-ee6dadfee5255","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:02:19.228Z","financial":true,"collection":"payments"},{"id":"audit-1781726976576-01ad2bc39392d8","after":{"id":"payment-1781726976575-dfa4f288cf65d","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:09:36.575Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-08-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"16/08/2024 R$Â 2.852,50","recordId":"payment-1781726976575-dfa4f288cf65d","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:09:36.576Z","financial":true,"collection":"payments"},{"id":"audit-1781726999828-99bf49f11612f8","after":{"id":"payment-1781726999828-ba2e2d09e99fc","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:09:59.828Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-09-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"16/09/2024 R$Â 2.852,50","recordId":"payment-1781726999828-ba2e2d09e99fc","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:09:59.828Z","financial":true,"collection":"payments"},{"id":"audit-1781727601704-cc915ac8fb1858","after":{"id":"payment-1781727601704-75f4cb816be5a8","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:20:01.704Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-10-16","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"16/10/2024 R$Â 2.852,50","recordId":"payment-1781727601704-75f4cb816be5a8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:20:01.704Z","financial":true,"collection":"payments"},{"id":"audit-1781727624063-a6209206f9017","after":{"id":"payment-1781727624063-14e629ac571e88","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:20:24.063Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-11-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"18/11/2024 R$Â 2.852,50","recordId":"payment-1781727624063-14e629ac571e88","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:20:24.063Z","financial":true,"collection":"payments"},{"id":"audit-1781727637214-165ce16f33cc2","after":{"id":"payment-1781727637214-0e37b6f2ecd6f8","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:20:37.214Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2024-12-18","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"18/12/2024 R$Â 2.852,50","recordId":"payment-1781727637214-0e37b6f2ecd6f8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:20:37.214Z","financial":true,"collection":"payments"},{"id":"audit-1781727662351-e8f6a85773188","after":{"id":"payment-1781727662350-6794b3cafab878","amount":2852.5,"history":"","updatedAt":"2026-06-17T20:21:02.350Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2025-01-10","totalAmount":2852.5,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/01/2025 R$Â 2.852,50","recordId":"payment-1781727662350-6794b3cafab878","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:21:02.351Z","financial":true,"collection":"payments"},{"id":"audit-1781727688423-715b16a30a9cd8","after":{"id":"payment-1781727688423-b480d092be234","amount":3038.99,"history":"","updatedAt":"2026-06-17T20:21:28.423Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2025-02-14","totalAmount":3038.99,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"14/02/2025 R$Â 3.038,99","recordId":"payment-1781727688423-b480d092be234","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:21:28.423Z","financial":true,"collection":"payments"},{"id":"audit-1781727706799-702e7ea8fc0828","after":{"id":"payment-1781727706799-690ee21ffdc2a","amount":3038.99,"history":"","updatedAt":"2026-06-17T20:21:46.799Z","contractId":"contract-1780929145216-07a65fc292632","lessorName":"CINTHYA SANTOS NASCIMENTO DE ALBUQUERQUE","propertyId":"property-1779821806395-e6d1f48a5f6618","paymentDate":"2025-03-17","totalAmount":3038.99,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"17/03/2025 R$Â 3.038,99","recordId":"payment-1781727706799-690ee21ffdc2a","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:21:46.799Z","financial":true,"collection":"payments"},{"id":"audit-1781727832560-d20c8d38223178","after":{"id":"payment-1781727832560-d4503e3a355aa8","amount":2696,"history":"","updatedAt":"2026-06-17T20:23:52.560Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-03-07","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"07/03/2023 R$Â 2.696,00","recordId":"payment-1781727832560-d4503e3a355aa8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:23:52.560Z","financial":true,"collection":"payments"},{"id":"audit-1781727874791-14fb688b80bc68","after":{"id":"payment-1781727874791-d926d34f55a45","amount":2696,"history":"","updatedAt":"2026-06-17T20:24:34.791Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-04-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/04/2023 R$Â 2.696,00","recordId":"payment-1781727874791-d926d34f55a45","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:24:34.791Z","financial":true,"collection":"payments"},{"id":"audit-1781728396862-6a947317070fa","after":{"id":"payment-1781728396862-839372bb3658a","amount":2696,"history":"","updatedAt":"2026-06-17T20:33:16.862Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-05-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/05/2023 R$Â 2.696,00","recordId":"payment-1781728396862-839372bb3658a","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:33:16.862Z","financial":true,"collection":"payments"},{"id":"audit-1781728421837-81e8ae6690a44","after":{"id":"payment-1781728421837-ccb44264bff78","amount":2696,"history":"","updatedAt":"2026-06-17T20:33:41.837Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-06-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/06/2023 R$Â 2.696,00","recordId":"payment-1781728421837-ccb44264bff78","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:33:41.837Z","financial":true,"collection":"payments"},{"id":"audit-1781728440386-0620f45f76a09","after":{"id":"payment-1781728440386-fed8432364ab48","amount":2696,"history":"","updatedAt":"2026-06-17T20:34:00.386Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-07-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/07/2023 R$Â 2.696,00","recordId":"payment-1781728440386-fed8432364ab48","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:34:00.386Z","financial":true,"collection":"payments"},{"id":"audit-1781728456380-cc2be713b6791","after":{"id":"payment-1781728456380-509a4d61609ba8","amount":2696,"history":"","updatedAt":"2026-06-17T20:34:16.380Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-08-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/08/2023 R$Â 2.696,00","recordId":"payment-1781728456380-509a4d61609ba8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:34:16.380Z","financial":true,"collection":"payments"},{"id":"audit-1781728509179-c8425c7f0cee88","after":{"id":"payment-1781728509179-b39a1df4cfe01","amount":2696,"history":"","updatedAt":"2026-06-17T20:35:09.179Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-09-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/09/2023 R$Â 2.696,00","recordId":"payment-1781728509179-b39a1df4cfe01","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:35:09.179Z","financial":true,"collection":"payments"},{"id":"audit-1781728528992-6c098b36e659e8","after":{"id":"payment-1781728528992-098aaef1f5f498","amount":2696,"history":"","updatedAt":"2026-06-17T20:35:28.992Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-10-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/10/2023 R$Â 2.696,00","recordId":"payment-1781728528992-098aaef1f5f498","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:35:28.992Z","financial":true,"collection":"payments"},{"id":"audit-1781728546575-aa81944ddcc328","after":{"id":"payment-1781728546575-0f5b58fa72cb98","amount":2696,"history":"","updatedAt":"2026-06-17T20:35:46.575Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-11-06","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"06/11/2023 R$Â 2.696,00","recordId":"payment-1781728546575-0f5b58fa72cb98","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:35:46.575Z","financial":true,"collection":"payments"},{"id":"audit-1781728563908-d4f539f03c3328","after":{"id":"payment-1781728563908-5c008f3ebb6d2","amount":2696,"history":"","updatedAt":"2026-06-17T20:36:03.908Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2023-12-02","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"02/12/2023 R$Â 2.696,00","recordId":"payment-1781728563908-5c008f3ebb6d2","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:36:03.908Z","financial":true,"collection":"payments"},{"id":"audit-1781728591455-c44258c69b3b18","after":{"id":"payment-1781728591455-ddd95c4fb9b0d","amount":2696,"history":"","updatedAt":"2026-06-17T20:36:31.455Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-01-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/01/2024 R$Â 2.696,00","recordId":"payment-1781728591455-ddd95c4fb9b0d","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:36:31.455Z","financial":true,"collection":"payments"},{"id":"audit-1781728605061-be3a50f0cb78f8","after":{"id":"payment-1781728605061-cba5ec43d26cc8","amount":2696,"history":"","updatedAt":"2026-06-17T20:36:45.061Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-02-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/02/2024 R$Â 2.696,00","recordId":"payment-1781728605061-cba5ec43d26cc8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:36:45.061Z","financial":true,"collection":"payments"},{"id":"audit-1781728620424-37926eee3a9a9","after":{"id":"payment-1781728620424-3970b52f640fe8","amount":2696,"history":"","updatedAt":"2026-06-17T20:37:00.424Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-03-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/03/2024 R$Â 2.696,00","recordId":"payment-1781728620424-3970b52f640fe8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:37:00.424Z","financial":true,"collection":"payments"},{"id":"audit-1781728642722-70a01ef5b950b","after":{"id":"payment-1781728642722-f510885876735","amount":2696,"history":"","updatedAt":"2026-06-17T20:37:22.722Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-04-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/04/2024 R$Â 2.696,00","recordId":"payment-1781728642722-f510885876735","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:37:22.722Z","financial":true,"collection":"payments"},{"id":"audit-1781729098998-8d683176ba2f88","after":{"id":"payment-1781729098997-a1adac8003602","amount":2696,"history":"","updatedAt":"2026-06-17T20:44:58.997Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-05-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/05/2024 R$Â 2.696,00","recordId":"payment-1781729098997-a1adac8003602","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:44:58.998Z","financial":true,"collection":"payments"},{"id":"audit-1781729119792-d6bbf5a8d92e3","after":{"id":"payment-1781729119792-f980ef23c039f","amount":2696,"history":"","updatedAt":"2026-06-17T20:45:19.792Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-06-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/06/2024 R$Â 2.696,00","recordId":"payment-1781729119792-f980ef23c039f","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:45:19.792Z","financial":true,"collection":"payments"},{"id":"audit-1781729155107-925c58600e76e","after":{"id":"payment-1781729155107-14ca238cd819e8","amount":2696,"history":"","updatedAt":"2026-06-17T20:45:55.107Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-07-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/07/2024 R$Â 2.696,00","recordId":"payment-1781729155107-14ca238cd819e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:45:55.107Z","financial":true,"collection":"payments"},{"id":"audit-1781729175354-eedcf51e6f7d88","after":{"id":"payment-1781729175354-d19374f0ac4ec","amount":2696,"history":"","updatedAt":"2026-06-17T20:46:15.354Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-08-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/08/2024 R$Â 2.696,00","recordId":"payment-1781729175354-d19374f0ac4ec","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:46:15.354Z","financial":true,"collection":"payments"},{"id":"audit-1781729188942-c6a36fd79bfcf","after":{"id":"payment-1781729188942-46266850a8e7c8","amount":2696,"history":"","updatedAt":"2026-06-17T20:46:28.942Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-09-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/09/2024 R$Â 2.696,00","recordId":"payment-1781729188942-46266850a8e7c8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:46:28.942Z","financial":true,"collection":"payments"},{"id":"audit-1781729207646-3b8fb93374d268","after":{"id":"payment-1781729207646-0981b7bf732068","amount":2696,"history":"","updatedAt":"2026-06-17T20:46:47.646Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-10-07","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"07/10/2024 R$Â 2.696,00","recordId":"payment-1781729207646-0981b7bf732068","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:46:47.646Z","financial":true,"collection":"payments"},{"id":"audit-1781729232295-a96fca41e4449","after":{"id":"payment-1781729232295-fbc292b525d61","amount":3000,"history":"","updatedAt":"2026-06-17T20:47:12.295Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-11-11","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"11/11/2024 R$Â 3.000,00","recordId":"payment-1781729232295-fbc292b525d61","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:47:12.295Z","financial":true,"collection":"payments"},{"id":"audit-1781729248399-0824066046baa","after":{"id":"payment-1781729248399-11f1bd4ff624","amount":3000,"history":"","updatedAt":"2026-06-17T20:47:28.399Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2024-12-10","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/12/2024 R$Â 3.000,00","recordId":"payment-1781729248399-11f1bd4ff624","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:47:28.399Z","financial":true,"collection":"payments"},{"id":"audit-1781729267779-578897fec74168","after":{"id":"payment-1781729267778-eca5d561534678","amount":3000,"history":"","updatedAt":"2026-06-17T20:47:47.778Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2025-01-14","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"14/01/2025 R$Â 3.000,00","recordId":"payment-1781729267778-eca5d561534678","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:47:47.779Z","financial":true,"collection":"payments"},{"id":"audit-1781729295108-8bbdc98f51d198","after":{"id":"payment-1781729295108-f44b6561fcac5","amount":3000,"history":"","updatedAt":"2026-06-17T20:48:15.108Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2025-02-10","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/02/2025 R$Â 3.000,00","recordId":"payment-1781729295108-f44b6561fcac5","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:48:15.108Z","financial":true,"collection":"payments"},{"id":"audit-1781729312081-6914a5d91b5be8","after":{"id":"payment-1781729312081-d17945b2b60558","amount":3000,"history":"","updatedAt":"2026-06-17T20:48:32.081Z","contractId":"contract-1780929198738-09b109f641556","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821883726-2d8a4f632c14c","paymentDate":"2025-03-14","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809291"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"14/03/2025 R$Â 3.000,00","recordId":"payment-1781729312081-d17945b2b60558","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:48:32.081Z","financial":true,"collection":"payments"},{"id":"audit-1781729343757-07cb4d5ded0df","after":{"id":"payment-1781729343757-fc2a1be58cb848","amount":2696,"history":"","updatedAt":"2026-06-17T20:49:03.757Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-03-07","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"07/03/2023 R$Â 2.696,00","recordId":"payment-1781729343757-fc2a1be58cb848","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:49:03.757Z","financial":true,"collection":"payments"},{"id":"audit-1781729364338-95a047ba792a28","after":{"id":"payment-1781729364338-aa3a7a31265098","amount":2696,"history":"","updatedAt":"2026-06-17T20:49:24.338Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-04-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/04/2023 R$Â 2.696,00","recordId":"payment-1781729364338-aa3a7a31265098","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:49:24.338Z","financial":true,"collection":"payments"},{"id":"audit-1781729379292-daedd3308a50c","after":{"id":"payment-1781729379292-e9ca9f398f9368","amount":2696,"history":"","updatedAt":"2026-06-17T20:49:39.292Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-05-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/05/2023 R$Â 2.696,00","recordId":"payment-1781729379292-e9ca9f398f9368","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:49:39.292Z","financial":true,"collection":"payments"},{"id":"audit-1781729393437-e82d4f4033c8c8","after":{"id":"payment-1781729393437-8a7541f8148a58","amount":2696,"history":"","updatedAt":"2026-06-17T20:49:53.437Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-06-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/06/2023 R$Â 2.696,00","recordId":"payment-1781729393437-8a7541f8148a58","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:49:53.437Z","financial":true,"collection":"payments"},{"id":"audit-1781729408435-c28ce80b07c8","after":{"id":"payment-1781729408435-3858d2f3906908","amount":2696,"history":"","updatedAt":"2026-06-17T20:50:08.435Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-07-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/07/2023 R$Â 2.696,00","recordId":"payment-1781729408435-3858d2f3906908","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:50:08.435Z","financial":true,"collection":"payments"},{"id":"audit-1781729424487-1e2d4109671618","after":{"id":"payment-1781729424487-7c0974b74512a8","amount":2696,"history":"","updatedAt":"2026-06-17T20:50:24.487Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-08-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/08/2023 R$Â 2.696,00","recordId":"payment-1781729424487-7c0974b74512a8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:50:24.487Z","financial":true,"collection":"payments"},{"id":"audit-1781729438222-2cfcfe8fded708","after":{"id":"payment-1781729438222-b39ab521e120a","amount":2696,"history":"","updatedAt":"2026-06-17T20:50:38.222Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-09-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"04/09/2023 R$Â 2.696,00","recordId":"payment-1781729438222-b39ab521e120a","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:50:38.222Z","financial":true,"collection":"payments"},{"id":"audit-1781729449901-3b8f6563521e28","after":{"id":"payment-1781729449901-4ff06cdb7963e8","amount":2696,"history":"","updatedAt":"2026-06-17T20:50:49.901Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-10-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/10/2023 R$Â 2.696,00","recordId":"payment-1781729449901-4ff06cdb7963e8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:50:49.901Z","financial":true,"collection":"payments"},{"id":"audit-1781729465381-e4544cef1b47","after":{"id":"payment-1781729465381-6bb62c6a10ecd","amount":2696,"history":"","updatedAt":"2026-06-17T20:51:05.381Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-11-06","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"06/11/2023 R$Â 2.696,00","recordId":"payment-1781729465381-6bb62c6a10ecd","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:51:05.381Z","financial":true,"collection":"payments"},{"id":"audit-1781729479803-79f778188bdb6","after":{"id":"payment-1781729479803-7c5cd87761c96","amount":2696,"history":"","updatedAt":"2026-06-17T20:51:19.803Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-12-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/12/2023 R$Â 2.696,00","recordId":"payment-1781729479803-7c5cd87761c96","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:51:19.803Z","financial":true,"collection":"payments"},{"id":"audit-1781729490030-45aaea92d551b","after":{"id":"payment-1781729490030-6fd76286f1ff98","amount":2696,"history":"","updatedAt":"2026-06-17T20:51:30.030Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-01-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/01/2024 R$Â 2.696,00","recordId":"payment-1781729490030-6fd76286f1ff98","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:51:30.030Z","financial":true,"collection":"payments"},{"id":"audit-1781729514312-ad8845c65dba3","after":{"id":"payment-1781729514312-cebad1a1ce17a8","amount":2696,"history":"","updatedAt":"2026-06-17T20:51:54.312Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-02-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/02/2024 R$Â 2.696,00","recordId":"payment-1781729514312-cebad1a1ce17a8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:51:54.312Z","financial":true,"collection":"payments"},{"id":"audit-1781729527502-ad73f24d4072e","after":{"id":"payment-1781729527502-abf0e0594edca8","amount":2696,"history":"","updatedAt":"2026-06-17T20:52:07.502Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-03-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/03/2024 R$Â 2.696,00","recordId":"payment-1781729527502-abf0e0594edca8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:52:07.502Z","financial":true,"collection":"payments"},{"id":"audit-1781729542507-ba0082c0834ac8","after":{"id":"payment-1781729527502-abf0e0594edca8","amount":2696,"history":"","updatedAt":"2026-06-17T20:52:22.507Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-03-04","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_updated","before":{"id":"payment-1781729527502-abf0e0594edca8","amount":2696,"history":"","updatedAt":"2026-06-17T20:52:07.502Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-03-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/03/2024 R$Â 2.696,00 -\u003e 04/03/2024 R$Â 2.696,00","recordId":"payment-1781729527502-abf0e0594edca8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:52:22.507Z","financial":true,"collection":"payments"},{"id":"audit-1781729559798-f835c4e78a7fa8","after":{"id":"payment-1781729559798-939a870d77c938","amount":2696,"history":"","updatedAt":"2026-06-17T20:52:39.798Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2023-04-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/04/2023 R$Â 2.696,00","recordId":"payment-1781729559798-939a870d77c938","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:52:39.798Z","financial":true,"collection":"payments"},{"id":"audit-1781729585791-5f78c222957028","after":{"id":"payment-1781729585791-66e8326a7a7248","amount":2696,"history":"","updatedAt":"2026-06-17T20:53:05.791Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-05-06","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"06/05/2024 R$Â 2.696,00","recordId":"payment-1781729585791-66e8326a7a7248","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:53:05.791Z","financial":true,"collection":"payments"},{"id":"audit-1781729609632-f9ff0e4732eb18","after":{"id":"payment-1781729609632-d426126bfbec3","amount":2696,"history":"","updatedAt":"2026-06-17T20:53:29.632Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-06-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/06/2024 R$Â 2.696,00","recordId":"payment-1781729609632-d426126bfbec3","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:53:29.632Z","financial":true,"collection":"payments"},{"id":"audit-1781729622717-ec515b45de5a6","after":{"id":"payment-1781729622717-03ec6bd95083c8","amount":2696,"history":"","updatedAt":"2026-06-17T20:53:42.717Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-07-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/07/2024 R$Â 2.696,00","recordId":"payment-1781729622717-03ec6bd95083c8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:53:42.717Z","financial":true,"collection":"payments"},{"id":"audit-1781729651761-e479210a044ed","after":{"id":"payment-1781729651761-b7af8e969565","amount":2696,"history":"","updatedAt":"2026-06-17T20:54:11.761Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-08-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/08/2024 R$Â 2.696,00","recordId":"payment-1781729651761-b7af8e969565","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:54:11.761Z","financial":true,"collection":"payments"},{"id":"audit-1781729666488-70442ce73e1ae8","after":{"id":"payment-1781729666488-a84a2cf048dc48","amount":2696,"history":"","updatedAt":"2026-06-17T20:54:26.488Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-09-05","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"05/09/2024 R$Â 2.696,00","recordId":"payment-1781729666488-a84a2cf048dc48","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:54:26.488Z","financial":true,"collection":"payments"},{"id":"audit-1781729682342-e85bc984bf6aa8","after":{"id":"payment-1781729682342-ebe9ba2ba4c5d8","amount":2696,"history":"","updatedAt":"2026-06-17T20:54:42.342Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-10-07","totalAmount":2696,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"07/10/2024 R$Â 2.696,00","recordId":"payment-1781729682342-ebe9ba2ba4c5d8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:54:42.342Z","financial":true,"collection":"payments"},{"id":"audit-1781729889032-0fcaad8f5e3da8","after":{"id":"payment-1781729889031-1b4fe6381605e","amount":3000,"history":"","updatedAt":"2026-06-17T20:58:09.031Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-11-11","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"11/11/2024 R$Â 3.000,00","recordId":"payment-1781729889031-1b4fe6381605e","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:58:09.032Z","financial":true,"collection":"payments"},{"id":"audit-1781729906145-12ee33b1bff2e8","after":{"id":"payment-1781729906144-24acb7db251c98","amount":3000,"history":"","updatedAt":"2026-06-17T20:58:26.144Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2024-12-10","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/12/2024 R$Â 3.000,00","recordId":"payment-1781729906144-24acb7db251c98","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:58:26.145Z","financial":true,"collection":"payments"},{"id":"audit-1781729953597-7bafa08e038eb8","after":{"id":"payment-1781729953597-345f96dfa73f38","amount":3000,"history":"","updatedAt":"2026-06-17T20:59:13.597Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2025-01-14","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"14/01/2025 R$Â 3.000,00","recordId":"payment-1781729953597-345f96dfa73f38","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:59:13.598Z","financial":true,"collection":"payments"},{"id":"audit-1781729975740-67e989194e1dd8","after":{"id":"payment-1781729975739-ec1d6513a676b8","amount":3000,"history":"","updatedAt":"2026-06-17T20:59:35.739Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2025-02-10","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"10/02/2025 R$Â 3.000,00","recordId":"payment-1781729975739-ec1d6513a676b8","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:59:35.740Z","financial":true,"collection":"payments"},{"id":"audit-1781729990210-589b27b4633988","after":{"id":"payment-1781729990210-dbf0d8fb906508","amount":3000,"history":"","updatedAt":"2026-06-17T20:59:50.210Z","contractId":"contract-1780929241437-d816e752d5f1e","lessorName":"CYCLOPLAST IMPORTACAO E EXPORTACAO DE RESINAS LTDA","propertyId":"property-1779821969471-c5804f2b25016","paymentDate":"2025-03-14","totalAmount":3000,"chargeAmount":0,"contractCode":"CTR-17809292"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"14/03/2025 R$Â 3.000,00","recordId":"payment-1781729990210-dbf0d8fb906508","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T20:59:50.210Z","financial":true,"collection":"payments"},{"id":"audit-1781730042739-8a060220069528","after":{"id":"payment-1781730042739-586e539a40ac78","amount":2888.5,"history":"","updatedAt":"2026-06-17T21:00:42.739Z","contractId":"contract-1780928819589-e432858a1a45c","lessorName":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","propertyId":"property-1779817467079-adc3277c81d2e8","paymentDate":"2015-01-30","totalAmount":2888.5,"chargeAmount":0,"contractCode":"CTR-17809288"},"action":"record_created","before":null,"userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","summary":"30/01/2015 R$Â 2.888,50","recordId":"payment-1781730042739-586e539a40ac78","userName":"jedsonpc@hotmail.com","userRole":"admin","createdAt":"2026-06-17T21:00:42.739Z","financial":true,"collection":"payments"},{"id":"audit-1781730077477-aae9a15d5c2128","createdAt":"2026-06-17T21:01:17.477Z","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","action":"record_created","collection":"payments","recordId":"payment-1781730077477-b0786c24614388","financial":true,"summary":"02/02/2015 R$Â 2.888,50","before":null,"after":{"id":"payment-1781730077477-b0786c24614388","paymentDate":"2015-02-02","propertyId":"property-1779817467079-adc3277c81d2e8","contractId":"contract-1780928819589-e432858a1a45c","contractCode":"CTR-17809288","lessorName":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","amount":2888.5,"chargeAmount":0,"totalAmount":2888.5,"history":"","updatedAt":"2026-06-17T21:01:17.477Z"}},{"id":"audit-1781730098629-162ac3ae1235d8","createdAt":"2026-06-17T21:01:38.629Z","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","action":"record_created","collection":"payments","recordId":"payment-1781730098629-d49dbdbd41782","financial":true,"summary":"05/03/2015 R$Â 2.888,50","before":null,"after":{"id":"payment-1781730098629-d49dbdbd41782","paymentDate":"2015-03-05","propertyId":"property-1779817467079-adc3277c81d2e8","contractId":"contract-1780928819589-e432858a1a45c","contractCode":"CTR-17809288","lessorName":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","amount":2888.5,"chargeAmount":0,"totalAmount":2888.5,"history":"","updatedAt":"2026-06-17T21:01:38.629Z"}},{"id":"audit-1781730190767-f6cd1e0b0c2b7","createdAt":"2026-06-17T21:03:10.767Z","userId":"87d88057-a5b8-4ce6-8847-1e111d01f92b","userName":"jedsonpc@hotmail.com","userRole":"admin","action":"record_created","collection":"payments","recordId":"payment-1781730190767-e7e40f619e332","financial":true,"summary":"27/04/2015 R$Â 5.777,00","before":null,"after":{"id":"payment-1781730190767-e7e40f619e332","paymentDate":"2015-04-27","propertyId":"property-1779817467079-adc3277c81d2e8","contractId":"contract-1780928819589-e432858a1a45c","contractCode":"CTR-17809288","lessorName":"BDO RCS AUDITORES INDEPENDENTES - SOCIEDADE SIMPLES LIMITADA","amount":5777,"chargeAmount":0,"totalAmount":5777,"history":"","updatedAt":"2026-06-17T21:03:10.767Z"}}]};

let state = loadState(); // estado inicial do cache local (sincroniza com Supabase no boot)
let syncConfig = loadSyncConfig();
let reportMode = "analytic";
const REPORT_EXPORT_TABLES = {
  analytic: [
    { key: "revenue", title: "Receitas lancadas", selector: "#revenue-report-body", headers: ["Imovel", "Data", "Competencia", "Receita", "Encargo", "Total recebido", "Historico"] },
    { key: "property", title: "Resultado por imovel", selector: "#property-report-body", headers: ["Imovel", "Receita recebida", "Despesas apropriadas", "Taxas do locador", "Receita liquida"] },
    { key: "expense-detail", title: "Despesas detalhadas", selector: "#expense-detail-report-body", headers: ["Data", "Tipo", "Historico", "Contrato", "Valor"] },
    { key: "expense-type", title: "Despesas por tipo", selector: "#expense-type-report-body", headers: ["Despesa", "Quantidade", "Total", "Participacao"] },
    { key: "charges", title: "Encargos e vencimentos", selector: "#charges-report-body", headers: ["Cliente", "Encargo", "Responsavel", "Vencimento base", "Vencimento ajustado"] },
    { key: "contracts", title: "Contratos filtrados", selector: "#reports-body", headers: ["Imovel", "Cliente", "Contato", "Vigencia", "Valor mensal", "Valor ajustado", "Garantia/carencia", "Despesa vinculada", "Status"] },
  ],
  summary: [
    { key: "summary", title: "Resumo executivo", selector: "#summary-report-body", headers: ["Indicador", "Resultado", "Leitura gerencial"] },
    { key: "summary-property", title: "Resultado gerencial por imovel", selector: "#summary-property-body", headers: ["Imovel", "Receita", "Encargos", "Despesas", "Resultado", "Part. receita"] },
  ],
};

const ERP_EXPORT_KEYS = ["summary", "cashflow", "receivables", "expenseCategories", "profitability"];
let backupDirectoryHandle = null;
let backupFolderReady = false;
let accessUsers = [];
let accessUsersLoading = false;
let accessUsersLoadedAt = 0;

const roleLabels = {
  admin: "Administrador",
  financeiro: "Financeiro",
  operacional: "Operacional",
  consulta: "Consulta",
};

const rolePermissions = {
  admin: ["*"],
  financeiro: ["view", "financial:write", "reports:view"],
  operacional: ["view", "operations:write", "reports:view"],
  consulta: ["view", "reports:view"],
};

const collectionPermissions = {
  properties: "operations:write",
  clients: "operations:write",
  contracts: "operations:write",
  expenses: "financial:write",
  payments: "financial:write",
};

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const numberFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
});

const viewTitles = {
  dashboard: "Painel",
  properties: "Imoveis",
  clients: "Clientes",
  contracts: "Contratos",
  expenses: "Despesas",
  payments: "Pagamentos",
  "charge-checklist": "Checklist de encargos",
  "financial-erp": "ERP financeiro",
  reports: "Relatorios",
  institutional: "Sobre e privacidade",
  users: "Usuarios e perfis",
  settings: "Acesso e nuvem",
};

const chargeRules = [
  {
    key: "condoFeeResponsible",
    label: "Taxa de condominio",
    kind: "monthly",
    day: 5,
    baseLabel: "Dia 05 de cada mes",
  },
  {
    key: "iptuResponsible",
    label: "IPTU",
    kind: "annual",
    month: 1,
    day: 10,
    baseLabel: "10/02",
  },
  {
    key: "spuResponsible",
    label: "SPU",
    kind: "annual",
    month: 5,
    day: 30,
    baseLabel: "30/06",
  },
  {
    key: "fireFeeResponsible",
    label: "Taxa de bombeiros",
    kind: "annual",
    month: 7,
    day: 31,
    baseLabel: "31/08",
  },
];

const expenseChargeTypeRules = {
  "condominio": ["condoFeeResponsible"],
  "impostos e taxas": ["iptuResponsible", "spuResponsible", "fireFeeResponsible"],
  "seguro": ["fireFeeResponsible"],
};

async function resolveSupabaseUser(retries = 5, delayMs = 250) {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const user = await window.SupabaseSync.getCurrentUser();
      if (user) return user;
    } catch (error) {
      console.warn("Falha ao validar sessao Supabase:", error);
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return null;
}

function cacheOfflineUser(user) {
  if (!user?.id && !user?.email) return;
  try {
    appStorage.setItem(offlineUserKey, JSON.stringify({
      id: user.id || user.email,
      email: user.email || user.username || "",
      name: getUserDisplayName(user),
      username: getUserDisplayName(user),
      role: resolveUserRole(user),
      cachedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.warn("Nao foi possivel salvar usuario offline:", error);
  }
}

function getCachedOfflineUser() {
  try {
    return JSON.parse(appStorage.getItem(offlineUserKey));
  } catch {
    return null;
  }
}

function canUseCachedOfflineUser() {
  return !navigator.onLine && Boolean(getCachedOfflineUser());
}

function activateOfflineSession(user = getCachedOfflineUser()) {
  if (!user) return false;
  appSessionStorage.setItem(sessionKey, "active");
  document.body.classList.remove("locked");
  appSessionStorage.setItem(sessionUserKey, JSON.stringify({
    id: user.id || user.email || "offline-user",
    username: user.name || user.username || user.email || "Usuário offline",
    role: user.role || "admin",
    offline: true,
  }));
  return true;
}

document.addEventListener("DOMContentLoaded", async () => {
  const hasActiveScreenSession = appSessionStorage.getItem(sessionKey) === "active";
  let canSyncOnBoot = false;

  if (!hasActiveScreenSession) {
    appSessionStorage.removeItem(sessionUserKey);
    if (window.SupabaseSync) {
      const user = await resolveSupabaseUser(2, 200);
      if (user) {
        cacheOfflineUser(user);
        activateSupabaseSession(user);
        canSyncOnBoot = navigator.onLine;
      } else {
        document.body.classList.add("locked");
      }
    } else {
      document.body.classList.add("locked");
    }
  } else if (!window.SupabaseSync && canUseCachedOfflineUser()) {
    activateOfflineSession();
  } else if (!window.SupabaseSync) {
    console.warn("Supabase nao carregou no boot. Mantendo a sessao local sem redirecionar.");
  } else {
    const user = await resolveSupabaseUser();
    if (user) {
      cacheOfflineUser(user);
      activateSupabaseSession(user);
      canSyncOnBoot = navigator.onLine;
    } else if (!activateOfflineSession()) {
      appSessionStorage.removeItem(sessionKey);
      appSessionStorage.removeItem(sessionUserKey);
      document.body.classList.add("locked");
    }
  }

  try {
    if (canSyncOnBoot && window.SupabaseSync) {
      await reconcileCloudState();
      await window.SupabaseSync.flushPendingState?.();
    }
  } catch (error) {
    console.warn("Nao foi possivel sincronizar com a nuvem ao iniciar. Usando dados locais.", error);
  }

  window.SupabaseSync?.subscribeChanges((newData, remoteUpdatedAt) => {
    if (!navigator.onLine) return;
    createLocalBackup("before_cloud_download", state, { force: true });
    state = sanitizeRemoteState(newData);
    saveLocalState(state);
    createLocalBackup("auto_save", state, { force: true });
    markRemoteStateApplied(remoteUpdatedAt);
    renderAll();
  });

  await initializeAuth();
  initializeBackupFolder();
  bindNavigation();
  bindForms();
  bindUtilities();
  bindTableActions();
  bindConnectivityRecovery();
  renderAll();
  loadAppVersionInfo();
});

function createSafeStorage(kind) {
  const fallback = new Map();
  try {
    const nativeStorage = kind === "session" ? globalThis.sessionStorage : globalThis.localStorage;
    const testKey = `storage-test-${Date.now()}`;
    nativeStorage.setItem(testKey, "1");
    nativeStorage.removeItem(testKey);
    return nativeStorage;
  } catch {
    return {
      getItem: (key) => (fallback.has(key) ? fallback.get(key) : null),
      setItem: (key, value) => fallback.set(key, String(value)),
      removeItem: (key) => fallback.delete(key),
    };
  }
}

function getInitialStateSnapshot() {
  const recoveryState = sanitizeRemoteState(bundledRecoveryState || {});
  if (hasBusinessData(recoveryState)) return JSON.parse(JSON.stringify(recoveryState));
  return structuredClone(initialState);
}

function loadState() {
  const stored = appStorage.getItem(storageKey);
  if (!stored) return getInitialStateSnapshot();

  try {
    const parsedState = sanitizeRemoteState({ ...structuredClone(initialState), ...JSON.parse(stored) });
    return hasBusinessData(parsedState) ? parsedState : getInitialStateSnapshot();
  } catch {
    return getInitialStateSnapshot();
  }
}

function saveLocalState(nextState = state) {
  try {
    appStorage.setItem(storageKey, JSON.stringify(nextState));
  } catch {
    freeStorageForAuth();
    appStorage.setItem(storageKey, JSON.stringify(nextState));
  }
}

function saveState() {
  if (isSmartphoneReadOnlyMode()) {
    try {
      saveLocalState(state);
    } catch (error) {
      console.error("Falha ao atualizar o cache local em modo leitura:", error);
    }
    return true;
  }

  try {
    markLocalStateChanged();
    saveLocalState(state);
    createLocalBackup("auto_save", state);
  } catch (error) {
    console.error("Falha ao salvar dados localmente:", error);
  }

  // Salva no Supabase (debounce 300ms) + cache local
  if (window.SupabaseSync) {
    window.SupabaseSync.saveRemoteState(state);
    return true;
  }
  // Fallback se Supabase nao estiver configurado
  try {
    saveLocalState(state);
    createLocalBackup("auto_save", state);
    return true;
  } catch (error) {
    console.error("Falha ao salvar dados localmente:", error);
    try {
      alert(
        "Nao foi possivel salvar os dados neste navegador.\n" +
        "Causa provavel: armazenamento cheio ou navegacao privada.\n" +
        "Detalhe tecnico: " + (error && error.message ? error.message : error)
      );
    } catch {
      console.warn("Nao foi possivel exibir o alerta de falha de armazenamento.");
    }
    return false;
  }
}

function loadBackups() {
  try {
    const stored = JSON.parse(appStorage.getItem(backupKey));
    return Array.isArray(stored?.items) ? stored.items : [];
  } catch {
    return [];
  }
}

function saveBackups(items) {
  appStorage.setItem(backupKey, JSON.stringify({ items: items.slice(0, backupMaxItems) }));
}

function freeStorageForAuth() {
  try {
    const backups = loadBackups();
    if (backups.length) {
      const manual = backups.filter((item) => item.reason === "manual").slice(0, 1);
      const latest = backups.slice(0, 1);
      saveBackups([...manual, ...latest].filter((item, index, list) => item?.id && list.findIndex((other) => other.id === item.id) === index));
    }
  } catch {
    appStorage.removeItem(backupKey);
  }
  ["gestao-supabase-cache-v1", "gestao-supabase-pending-v1"].forEach((key) => {
    try {
      appStorage.removeItem(key);
    } catch {
      console.warn("Nao foi possivel liberar cache local:", key);
    }
  });
}

function getBackupReasonLabel(reason) {
  const labels = {
    auto_save: "Automatico",
    manual: "Manual",
    before_clear: "Antes de limpar dados",
    before_delete: "Antes de excluir",
    before_cloud_download: "Antes de baixar da nuvem",
    before_cloud_upload: "Antes de enviar para nuvem",
    before_restore: "Antes de restaurar",
    imported: "Importado",
  };
  return labels[reason] || reason || "Backup";
}

function createBackupFileName(createdAt = new Date().toISOString()) {
  return `rio-dos-passos-backup-${createdAt.replace(/[:.]/g, "-")}.json`;
}

function createBackupEnvelope(reason, sourceState = state) {
  const createdAt = new Date().toISOString();
  const safeState = sanitizeRemoteState(sourceState);
  const id = uid("backup");
  return {
    id,
    createdAt,
    reason,
    reasonLabel: getBackupReasonLabel(reason),
    company: companyName,
    appVersion,
    storageAddress: backupFolderReady ? `${preferredBackupFolderLabel}\\${createBackupFileName(createdAt)}` : `localStorage:${backupKey}:${id}`,
    fileName: createBackupFileName(createdAt),
    counts: getBusinessCounts(safeState),
    state: safeState,
  };
}

function hasSameBackupSnapshot(left, right) {
  if (!left || !right) return false;
  return JSON.stringify(left.counts || {}) === JSON.stringify(right.counts || {})
    && JSON.stringify(left.state || {}) === JSON.stringify(right.state || {});
}

function createLocalBackup(reason = "auto_save", sourceState = state, options = {}) {
  if (!hasBusinessData(sourceState) && reason !== "before_restore") return null;
  const backup = createBackupEnvelope(reason, sourceState);
  const existing = loadBackups();
  if (!options.force && reason === "auto_save" && hasSameBackupSnapshot(backup, existing[0])) {
    return existing[0] || null;
  }
  const nextItems = [backup, ...existing.filter((item) => item.id !== backup.id)].slice(0, backupMaxItems);
  try {
    saveBackups(nextItems);
  } catch (error) {
    const trimmed = nextItems.slice(0, 1);
    try {
      saveBackups(trimmed);
    } catch (retryError) {
      console.error("Falha ao gerar backup local:", retryError || error);
      return null;
    }
  }
  writeBackupToSelectedFolder(backup).catch((error) => {
    console.warn("Backup automatico em pasta nao gravado:", error);
  });
  renderBackupPanel();
  return backup;
}

function isFileSystemBackupSupported() {
  return typeof window.showDirectoryPicker === "function" && typeof indexedDB !== "undefined";
}

function openBackupDirectoryDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(backupDirectoryDbName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(backupDirectoryStoreName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function setBackupDirectoryHandle(handle) {
  const db = await openBackupDirectoryDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(backupDirectoryStoreName, "readwrite");
    tx.objectStore(backupDirectoryStoreName).put(handle, backupDirectoryHandleKey);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function getBackupDirectoryHandle() {
  if (!isFileSystemBackupSupported()) return null;
  if (backupDirectoryHandle) return backupDirectoryHandle;
  try {
    const db = await openBackupDirectoryDb();
    const handle = await new Promise((resolve, reject) => {
      const tx = db.transaction(backupDirectoryStoreName, "readonly");
      const request = tx.objectStore(backupDirectoryStoreName).get(backupDirectoryHandleKey);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
    db.close();
    backupDirectoryHandle = handle;
    return handle;
  } catch (error) {
    console.warn("Nao foi possivel carregar a pasta de backup:", error);
    return null;
  }
}

async function ensureBackupDirectoryPermission(handle, mode = "readwrite") {
  if (!handle) return false;
  const options = { mode };
  if ((await handle.queryPermission(options)) === "granted") return true;
  return (await handle.requestPermission(options)) === "granted";
}

async function chooseBackupFolder() {
  if (!requirePermission("admin:write", "Apenas administradores podem configurar backups em pasta.")) return;
  if (!isFileSystemBackupSupported()) {
    setText("backup-message", "Este navegador nao permite gravar automaticamente em pasta. Use o botao Baixar backup.");
    return;
  }
  try {
    const handle = await window.showDirectoryPicker({ id: "rio-dos-passos-backups", mode: "readwrite" });
    if (!(await ensureBackupDirectoryPermission(handle))) {
      setText("backup-message", "Permissao de escrita nao concedida para a pasta escolhida.");
      return;
    }
    backupDirectoryHandle = handle;
    backupFolderReady = true;
    await setBackupDirectoryHandle(handle);
    const backup = createLocalBackup("manual", state, { force: true });
    const targetPath = `${handle.name}\\backups`;
    setText("backup-message", backup
      ? `Pasta configurada. Backup gravado em ${targetPath}\\${backup.fileName}. Se voce selecionou D:\\App, o arquivo ficou em ${preferredBackupFolderLabel}.`
      : `Pasta configurada: ${targetPath}. O proximo cadastro alterado gerara o backup automatico.`);
    renderBackupPanel();
  } catch (error) {
    if (error?.name !== "AbortError") {
      setText("backup-message", `Nao foi possivel configurar a pasta: ${error.message || error}`);
    }
  }
}

async function initializeBackupFolder() {
  const handle = await getBackupDirectoryHandle();
  backupFolderReady = Boolean(handle && await ensureBackupDirectoryPermission(handle));
  renderBackupPanel();
}

async function writeBackupToSelectedFolder(backup) {
  if (!backup || !isFileSystemBackupSupported()) return false;
  const handle = await getBackupDirectoryHandle();
  if (!handle || !(await ensureBackupDirectoryPermission(handle))) {
    backupFolderReady = false;
    return false;
  }
  backupFolderReady = true;
  const backupsDir = await handle.getDirectoryHandle("backups", { create: true });
  const fileName = backup.fileName || createBackupFileName(backup.createdAt);
  const fileHandle = await backupsDir.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify({ ...backup, storageAddress: `${handle.name}\\backups\\${fileName}` }, null, 2));
  await writable.close();
  return true;
}

function downloadJsonFile(fileName, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function reconcileCloudState() {
  const hasStoredLocalState = Boolean(appStorage.getItem(storageKey));
  const localState = sanitizeRemoteState(state);
  const remote = await window.SupabaseSync.loadRemoteState({ fallbackToCache: false, includeMetadata: true });

  if (!remote) {
    if (hasBusinessData(localState)) {
      state = localState;
      if (!isSmartphoneReadOnlyMode()) await saveRemoteStateNowAndTrack(state);
    }
    return;
  }

  const remoteState = sanitizeRemoteState(remote.state || remote);
  const remoteUpdatedAt = remote.updatedAt || null;
  if (hasStoredLocalState && !isSmartphoneReadOnlyMode() && shouldPreferLocalState(localState, remoteState, remoteUpdatedAt)) {
    state = localState;
    await saveRemoteStateNowAndTrack(state);
    return;
  }

  state = remoteState;
  createLocalBackup("before_cloud_download", localState, { force: true });
  saveLocalState(state);
  createLocalBackup("auto_save", state, { force: true });
  markRemoteStateApplied(remoteUpdatedAt);
}

function hasBusinessData(nextState) {
  return ["properties", "clients", "contracts", "expenses", "payments"].some(
    (collection) => Array.isArray(nextState[collection]) && nextState[collection].length > 0
  );
}

function shouldPreferLocalState(localState, remoteState, remoteUpdatedAt = null) {
  if (hasBusinessData(localState) && !hasBusinessData(remoteState)) return true;
  if (!hasBusinessData(localState) && hasBusinessData(remoteState)) return false;
  if (getCountReductionWarnings(getBusinessCounts(localState), getBusinessCounts(remoteState)).length) {
    return false;
  }
  const localUpdatedAt = getLocalStateUpdatedAt(localState);
  if (remoteUpdatedAt && localUpdatedAt) {
    return new Date(localUpdatedAt).getTime() > new Date(remoteUpdatedAt).getTime();
  }
  if (remoteUpdatedAt && !localUpdatedAt) return false;
  if (localUpdatedAt && !remoteUpdatedAt) return true;

  const localProperties = localState.properties.length;
  const remoteProperties = remoteState.properties.length;
  if (localProperties > remoteProperties) return true;
  if (remoteProperties > localProperties) return false;
  return countBusinessRecords(localState) > countBusinessRecords(remoteState);
}

function countBusinessRecords(nextState) {
  return ["properties", "clients", "contracts", "expenses", "payments"].reduce(
    (total, collection) => total + (Array.isArray(nextState[collection]) ? nextState[collection].length : 0),
    0
  );
}

function getBusinessCounts(nextState = state) {
  return ["properties", "clients", "contracts", "expenses", "payments"].reduce(
    (counts, collection) => {
      counts[collection] = Array.isArray(nextState[collection]) ? nextState[collection].length : 0;
      return counts;
    },
    {}
  );
}

function getCountReductionWarnings(localCounts, remoteCounts) {
  const labels = {
    properties: "imoveis",
    clients: "clientes",
    contracts: "contratos",
    expenses: "despesas",
    payments: "receitas",
  };
  return Object.keys(labels)
    .filter((collection) => (remoteCounts[collection] || 0) > (localCounts[collection] || 0))
    .map((collection) => `${labels[collection]}: nuvem ${remoteCounts[collection] || 0}, navegador ${localCounts[collection] || 0}`);
}

async function loadRemoteStateForSafety() {
  if (!window.SupabaseSync) return null;
  const remote = await window.SupabaseSync.loadRemoteState({ fallbackToCache: false, includeMetadata: true });
  if (!remote) return null;
  return sanitizeRemoteState(remote.state || remote);
}

function loadCloudSyncMeta() {
  try {
    return JSON.parse(appStorage.getItem(cloudSyncMetaKey)) || {};
  } catch {
    return {};
  }
}

function saveCloudSyncMeta(meta) {
  appStorage.setItem(cloudSyncMetaKey, JSON.stringify({ ...loadCloudSyncMeta(), ...meta }));
}

function markLocalStateChanged() {
  saveCloudSyncMeta({ localChangedAt: new Date().toISOString() });
}

function markRemoteStateApplied(remoteUpdatedAt) {
  saveCloudSyncMeta({ remoteUpdatedAt: remoteUpdatedAt || new Date().toISOString(), localChangedAt: null });
}

function getLocalStateUpdatedAt(nextState) {
  const meta = loadCloudSyncMeta();
  const candidates = [
    meta.localChangedAt,
    ...["properties", "clients", "contracts", "expenses", "payments"].flatMap((collection) =>
      Array.isArray(nextState[collection]) ? nextState[collection].map((item) => item.updatedAt) : []
    ),
    ...(Array.isArray(nextState.auditLogs) ? nextState.auditLogs.map((log) => log.createdAt) : []),
  ];
  return candidates
    .filter(Boolean)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b - a)[0]?.toISOString() || null;
}

async function saveRemoteStateNowAndTrack(nextState) {
  if (isSmartphoneReadOnlyMode()) return null;
  const saveNow = window.SupabaseSync.saveRemoteStateNow || window.SupabaseSync.saveRemoteState;
  const result = await saveNow(nextState);
  if (result?.updatedAt) markRemoteStateApplied(result.updatedAt);
  return result;
}

function loadSyncConfig() {
  try {
    return JSON.parse(appStorage.getItem(syncKey)) || { endpoint: "", token: "" };
  } catch {
    return { endpoint: "", token: "" };
  }
}

function saveSyncConfig() {
  appStorage.setItem(syncKey, JSON.stringify(syncConfig));
}

async function initializeAuth() {
  purgeLocalAccessUsers();

  if (appSessionStorage.getItem(sessionKey) === "active" && !getCurrentUser()) {
    appSessionStorage.removeItem(sessionKey);
  }
  document.body.classList.toggle("locked", appSessionStorage.getItem(sessionKey) !== "active");
  const syncForm = document.getElementById("sync-form");
  if (syncForm) {
    const endpointField = syncForm.elements.namedItem("endpoint");
    const tokenField = syncForm.elements.namedItem("token");
    if (endpointField) endpointField.value = syncConfig.endpoint || "";
    if (tokenField) tokenField.value = syncConfig.token || "";
  }
  const accessForm = document.getElementById("access-form");
  if (accessForm) {
    accessForm.reset();
    const accessIdField = accessForm.elements.namedItem("id");
    if (accessIdField) accessIdField.value = "";
  }
  updateSyncStatus();
}

function purgeLocalAccessUsers() {
  appStorage.removeItem(authKey);
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function bindNavigation() {
  syncMobileShellCapability();
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => {
      const activated = activateView(button.dataset.view, { showAccessAlert: true });
      if (activated) collapseMobileShell();
    });
  });
  document.getElementById("mobile-shell-toggle")?.addEventListener("click", toggleMobileShell);
  window.addEventListener("resize", syncMobileShellCapability);
  const initialView = new URLSearchParams(location.search).get("view");
  if (initialView && document.getElementById(initialView)) activateView(initialView);
}

function isMobileShellEligible() {
  const mobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent || "");
  const compactViewport = window.innerWidth <= 680 || (window.innerWidth <= 1100 && window.innerHeight <= 600);
  return mobileDevice || compactViewport;
}

function syncMobileShellCapability() {
  const eligible = isMobileShellEligible();
  document.body.classList.toggle("mobile-layout-enabled", eligible);
  if (!eligible) document.body.classList.remove("mobile-shell-collapsed");
  updateMobileShellToggle();
}

function updateMobileShellToggle() {
  const button = document.getElementById("mobile-shell-toggle");
  if (!button) return;
  const collapsed = document.body.classList.contains("mobile-shell-collapsed");
  button.setAttribute("aria-expanded", String(!collapsed));
  button.setAttribute("aria-label", collapsed ? "Mostrar menu superior" : "Ocultar menu superior");
  const label = button.querySelector("strong");
  if (label) label.textContent = collapsed ? "Mostrar menu" : "Ocultar menu";
}

function collapseMobileShell() {
  if (!isMobileShellEligible()) return;
  document.body.classList.add("mobile-shell-collapsed");
  updateMobileShellToggle();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileShell() {
  if (!isMobileShellEligible()) return;
  document.body.classList.toggle("mobile-shell-collapsed");
  updateMobileShellToggle();
  if (!document.body.classList.contains("mobile-shell-collapsed")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function bindConnectivityRecovery() {
  window.addEventListener("online", async () => {
    setText("sync-status", "Conexao restaurada. Reconectando...");
    if (!window.SupabaseSync) {
      setTimeout(() => location.reload(), 600);
      return;
    }
    try {
      const user = await resolveSupabaseUser(2, 200);
      if (user) {
        cacheOfflineUser(user);
        activateSupabaseSession(user);
      }
      await window.SupabaseSync.flushPendingState?.();
      await reconcileCloudState();
      updateSyncStatus();
      renderAll();
    } catch (error) {
      console.warn("Nao foi possivel sincronizar automaticamente ao voltar a internet:", error);
      setText("sync-status", "Online, com sincronizacao pendente");
    }
  });

  window.addEventListener("offline", () => {
    setText("sync-status", "Offline - dados locais ativos");
  });
}

function activateView(target, options = {}) {
  if (!canAccessView(target)) {
    if (options.showAccessAlert) alert("Seu perfil nao tem permissao para acessar esta area.");
    return false;
  }
  const button = document.querySelector(`.nav-button[data-view="${CSS.escape(target)}"]`);
  if (!button) return false;
  document.querySelectorAll(".nav-button").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  document.getElementById(target).classList.add("active");
  document.getElementById("view-title").textContent = viewTitles[target];
  renderAll();
  return true;
}

function bindForms() {
  bindCurrencyFields();

  document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await login(event.currentTarget);
  });

  document.getElementById("property-form").addEventListener("submit", (event) => {
    event.preventDefault();
    upsertFromForm(event.currentTarget, "properties", "property", normalizeProperty);
  });

  document.getElementById("client-form").addEventListener("submit", (event) => {
    event.preventDefault();
    upsertFromForm(event.currentTarget, "clients", "client", normalizeClient);
  });
  const clientDocumentInput = document.querySelector("#client-form [name='document']");
  clientDocumentInput?.addEventListener("input", () => {
    clientDocumentInput.value = formatCpfCnpj(clientDocumentInput.value);
  });
  clientDocumentInput?.addEventListener("blur", () => validateAndFillClientDocument(clientDocumentInput.form));

  document.getElementById("contract-form").addEventListener("submit", (event) => {
    event.preventDefault();
    upsertFromForm(event.currentTarget, "contracts", "contract", normalizeContract);
  });
  const contractForm = document.getElementById("contract-form");
  document.getElementById("add-contract-adjustment")?.addEventListener("click", () => {
    addContractAdjustmentRow(contractForm, getOpenCompetence());
    syncContractFinancialTermFields(contractForm);
  });
  ["hasSecurityDeposit", "securityDepositMonths", "hasGracePeriod", "gracePeriodMonths", "hasAdjustedRent"].forEach((name) => {
    contractForm.elements[name]?.addEventListener("input", () => syncContractFinancialTermFields(contractForm));
    contractForm.elements[name]?.addEventListener("change", () => syncContractFinancialTermFields(contractForm));
  });
  contractForm.elements.condoFeeResponsible?.addEventListener("change", () => syncContractCondoClientNameField(contractForm));
  contractForm.addEventListener("input", (event) => {
    if (event.target.closest(".contract-adjustment-row")) syncContractFinancialTermFields(contractForm);
  });
  contractForm.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-adjustment]");
    if (!removeButton) return;
    removeButton.closest(".contract-adjustment-row")?.remove();
    syncContractFinancialTermFields(contractForm);
  });
  syncContractFinancialTermFields(contractForm);

  document.getElementById("expense-form").addEventListener("submit", (event) => {
    event.preventDefault();
    syncFinancialCompetence(event.currentTarget, "expenseDate");
    const contract = updateExpenseContractInfo(event.currentTarget);
    if (!contract) {
      alert("Para lancar despesa, selecione um imovel com contrato vinculado.");
      return;
    }
    const blockedCharge = getBlockedExpenseCharge(event.currentTarget, contract);
    if (blockedCharge) {
      updateExpenseChargeGuard(event.currentTarget, contract);
      alert(`${blockedCharge.label} consta no contrato como responsabilidade do cliente. Lance apenas despesas do locador.`);
      return;
    }
    upsertFromForm(event.currentTarget, "expenses", "expense", normalizeExpense);
  });
  const expenseForm = document.getElementById("expense-form");
  bindFinancialCompetenceFields(expenseForm, "expenseDate", () => updateExpenseContractInfo(expenseForm));
  ["propertyId", "contractPicker", "expenseType", "chargeRule"].forEach((name) => {
    expenseForm.elements[name]?.addEventListener("change", () => updateExpenseContractInfo(expenseForm));
  });
  syncFinancialCompetence(expenseForm, "expenseDate", { overwrite: false });

  const paymentForm = document.getElementById("payment-form");
  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    syncFinancialCompetence(paymentForm, "paymentDate");
    updatePaymentTotal(paymentForm);
    const contract = updatePaymentContractInfo(paymentForm);
    if (!contract) {
      alert("Para lancar receita, selecione um imovel com contrato vinculado.");
      return;
    }
    upsertFromForm(event.currentTarget, "payments", "payment", normalizePayment);
  });
  ["amount", "chargeAmount"].forEach((name) => {
    paymentForm.elements[name].addEventListener("input", () => updatePaymentTotal(paymentForm));
  });
  bindFinancialCompetenceFields(paymentForm, "paymentDate", () => updatePaymentContractInfo(paymentForm));
  paymentForm.elements.propertyId.addEventListener("change", () => updatePaymentContractInfo(paymentForm));
  paymentForm.elements.contractPicker?.addEventListener("change", () => updatePaymentContractInfo(paymentForm));
  syncFinancialCompetence(paymentForm, "paymentDate", { overwrite: false });

  document.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.reset).reset();
      document.getElementById(button.dataset.reset).elements.id.value = "";
      if (button.dataset.reset === "payment-form") {
        syncFinancialCompetence(document.getElementById("payment-form"), "paymentDate", { overwrite: true });
        updatePaymentTotal(document.getElementById("payment-form"));
        updatePaymentContractInfo(document.getElementById("payment-form"));
      }
      if (button.dataset.reset === "expense-form") {
        syncFinancialCompetence(document.getElementById("expense-form"), "expenseDate", { overwrite: true });
        updateExpenseContractInfo(document.getElementById("expense-form"));
      }
      if (button.dataset.reset === "contract-form") {
        renderContractAdjustmentRows(document.getElementById("contract-form"), []);
        syncContractFinancialTermFields(document.getElementById("contract-form"));
      }
    });
  });

  document.getElementById("access-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await updateAccess(event.currentTarget);
  });
  document.getElementById("access-users-body")?.addEventListener("change", async (event) => {
    const select = event.target.closest("[data-access-role]");
    if (!select) return;
    await editAccessUser(select.dataset.accessRole, select.value);
  });
  document.getElementById("access-refresh")?.addEventListener("click", () => loadAccessUsers(true));

  document.getElementById("sync-form").addEventListener("submit", (event) => {
    event.preventDefault();
    updateSyncConfig(event.currentTarget);
  });

  ["report-dataset", "report-property", "report-client", "report-status", "report-expense-type", "report-include-revenue", "report-include-expenses", "report-expense-view", "report-start", "report-end", "report-min-value", "report-max-value"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderReports);
    document.getElementById(id).addEventListener("change", renderReports);
  });

  ["charge-checklist-property", "charge-checklist-client", "charge-checklist-responsible", "charge-checklist-status", "charge-checklist-start", "charge-checklist-end"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", renderChargeChecklist);
    document.getElementById(id)?.addEventListener("change", renderChargeChecklist);
  });
  document.getElementById("charge-checklist-body")?.addEventListener("change", (event) => {
    if (event.target.matches("[data-charge-paid]")) {
      toggleChargeConfirmation(event.target.dataset.chargePaid, event.target.checked);
    }
    if (event.target.matches("[data-charge-payment-date]")) {
      updateChargeConfirmationPaymentDate(event.target.dataset.chargePaymentDate, event.target.value);
    }
  });

  setupErpPeriodFilters();
  ["erp-year", "erp-start-month", "erp-end-month"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderFinancialErp);
    document.getElementById(id).addEventListener("change", renderFinancialErp);
  });
  setupExportSelectionControls();

  [
    "expense-history-property",
    "expense-history-start",
    "expense-history-end",
    "payment-history-property",
    "payment-history-start",
    "payment-history-end",
    "missing-payment-property",
    "missing-payment-start",
    "missing-payment-end",
  ].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", renderFinancialLaunches);
    document.getElementById(id)?.addEventListener("change", renderFinancialLaunches);
  });
  document.getElementById("expense-history-clear")?.addEventListener("click", () => clearFinancialLaunchFilters("expense"));
  document.getElementById("payment-history-clear")?.addEventListener("click", () => clearFinancialLaunchFilters("payment"));
  document.getElementById("missing-payment-clear")?.addEventListener("click", () => {
    setDefaultMissingPaymentPeriod(true);
    renderMissingPayments();
  });

  ["audit-start", "audit-end"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", renderAuditLogs);
    document.getElementById(id)?.addEventListener("change", renderAuditLogs);
  });
  document.getElementById("audit-clear-period")?.addEventListener("click", () => {
    document.getElementById("audit-start").value = "";
    document.getElementById("audit-end").value = "";
    renderAuditLogs();
  });

  document.querySelectorAll("[data-report-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      reportMode = button.dataset.reportMode;
      document.querySelectorAll("[data-report-mode]").forEach((item) => item.classList.toggle("active", item === button));
      renderReports();
    });
  });
}

function bindUtilities() {
  document.getElementById("mobile-install-button")?.addEventListener("click", handleMobileInstall);
  updateMobileInstallCard();
  document.getElementById("seed-data")?.addEventListener("click", () => {
    createLocalBackup("before_restore", state, { force: true });
    state = createSampleData();
    saveState();
    renderAll();
  });

  document.getElementById("clear-data")?.addEventListener("click", () => {
    if (!requirePermission("admin:write", "Apenas administradores podem limpar os dados.")) return;
    if (!confirm("Deseja apagar todos os dados cadastrados neste navegador?")) return;
    createLocalBackup("before_clear", state, { force: true });
    state = structuredClone(initialState);
    addAuditLog("data_cleared", "system", "", null, { message: "Base local limpa pelo usuario." }, false);
    saveState();
    renderAll();
  });

  document.getElementById("export-csv").addEventListener("click", exportReportsCsv);
  document.getElementById("erp-export-pdf")?.addEventListener("click", exportFinancialErpPdf);
  document.getElementById("erp-export-excel")?.addEventListener("click", exportFinancialErpExcel);
  document.getElementById("erp-export-csv")?.addEventListener("click", exportFinancialErpCsv);
  document.getElementById("export-excel").addEventListener("click", exportReportsExcel);
  document.getElementById("export-pdf").addEventListener("click", exportReportsPdf);
  document.getElementById("open-property-document").addEventListener("click", openPropertyDocumentFromForm);
  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("sync-download").addEventListener("click", downloadFromCloud);
  document.getElementById("sync-upload").addEventListener("click", uploadToCloud);
  document.getElementById("backup-create")?.addEventListener("click", createManualBackup);
  document.getElementById("backup-folder")?.addEventListener("click", chooseBackupFolder);
  document.getElementById("backup-download")?.addEventListener("click", downloadSelectedBackup);
  document.getElementById("backup-restore")?.addEventListener("click", restoreSelectedBackup);
  document.getElementById("backup-import-file")?.addEventListener("change", importBackupFile);
  document.getElementById("download-app-update")?.addEventListener("click", downloadAppUpdatePackage);
  setText("update-package-name", updatePackageFileName);
  refreshUpdatePackageInfo();
}

async function refreshUpdatePackageInfo() {
  const packageInfo = await getUpdatePackageInfo();
  setText("update-package-name", packageInfo.fileName);
}

async function getUpdatePackageInfo() {
  try {
    const response = await fetch(`${updatePackageManifestFileName}?_=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Manifesto indisponivel");
    const data = await response.json();
    return {
      fileName: data.fileName || updatePackageFileName,
      version: data.version || appVersion,
    };
  } catch {
    return { fileName: updatePackageFileName, version: appVersion };
  }
}

async function loadAppVersionInfo() {
  try {
    const response = await fetch(`version.json?_=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Versao indisponivel");
    const data = await response.json();
    appMetadata = {
      version: data.version || appVersion,
      deployedAt: isValidDateTime(data.deployedAt) ? data.deployedAt : appDeployedAt,
    };
  } catch {
    appMetadata = {
      version: appVersion,
      deployedAt: appDeployedAt,
    };
  }
  renderAppVersionInfo();
}

async function downloadAppUpdatePackage() {
  const packageInfo = await getUpdatePackageInfo();
  const link = document.createElement("a");
  link.href = packageInfo.fileName;
  link.download = packageInfo.fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setText("app-update-status", `Download do pacote ${packageInfo.version} iniciado. Use o arquivo ZIP para atualizar outra maquina.`);
}

function openPropertyDocumentFromForm() {
  const form = document.getElementById("property-form");
  const link = form.elements.documentLink.value.trim();
  if (!link) {
    alert("Informe o link da documentacao do imovel no Google Drive.");
    return;
  }
  try {
    const url = new URL(link);
    window.open(url.href, "_blank", "noopener");
  } catch {
    alert("Informe um link valido para abrir a documentacao.");
  }
}

function setLoginProgress(percent, message, visible = true) {
  const container = document.getElementById("login-progress");
  const bar = document.getElementById("login-progress-bar");
  const track = container?.querySelector('[role="progressbar"]');
  const normalizedPercent = Math.max(0, Math.min(100, Number(percent) || 0));
  container?.classList.toggle("hidden", !visible);
  if (bar) bar.style.width = `${normalizedPercent}%`;
  setText("login-progress-text", message || "Validando acesso...");
  setText("login-progress-percent", `${normalizedPercent}%`);
  track?.setAttribute("aria-valuenow", String(normalizedPercent));
}

async function login(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const submitButton = form.querySelector('button[type="submit"]');
  setText("login-message", "");
  setLoginProgress(15, "Validando os dados informados...");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Validando...";
  }
  try {
    const email = String(data.username || "").trim();
    if (!window.SupabaseSync && canUseCachedOfflineUser()) {
      setLoginProgress(55, "Verificando o acesso offline...");
      const cachedUser = getCachedOfflineUser();
      if (email && cachedUser.email && email.toLowerCase() !== cachedUser.email.toLowerCase()) {
        throw new Error("Este dispositivo esta offline e so pode entrar com o ultimo usuario validado online.");
      }
      setLoginProgress(100, "Acesso confirmado. Abrindo o sistema...");
      activateOfflineSession(cachedUser);
      setText("login-message", "Entrada offline liberada. As alteracoes serao sincronizadas quando a internet voltar.");
      renderAll();
      return;
    }
    if (!window.SupabaseSync) {
      throw new Error("Conexao com Supabase nao carregada. Verifique a internet e recarregue.");
    }
    setLoginProgress(45, "Conectando ao servico de autenticacao...");
    const signedUser = await window.SupabaseSync.signIn(email, data.password || "");
    setLoginProgress(75, "Verificando usuario e permissoes...");
    const user = signedUser || await resolveSupabaseUser(3, 200);
    if (!user) throw new Error("Sessao Supabase nao retornada.");
    cacheOfflineUser(user);
    setLoginProgress(100, "Acesso confirmado. Abrindo o sistema...");
    activateSupabaseSession(user);
    addAuditLog("login_success", "auth", user.id, null, { username: user.email || email, role: resolveUserRole(user) }, false);
    form.reset();
    setText("login-message", "");
    renderAll();
  } catch (error) {
    addAuditLog("login_failed", "auth", "", null, { username: String(data.username || "").trim() }, false);
    setText("login-message", `Falha no login Supabase: ${error.message || error}`);
    setLoginProgress(0, "Nao foi possivel validar o acesso.");
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Entrar";
    }
  }
}

async function logout() {
  const user = getCurrentUser();
  if (user) addAuditLog("logout", "auth", user.id, null, { username: user.username }, false);
  try {
    if (window.SupabaseSync) await window.SupabaseSync.signOut();
  } catch (error) {
    console.warn("A sessão local foi encerrada, mas o Supabase não confirmou a saída:", error);
  } finally {
    appSessionStorage.removeItem(sessionKey);
    appSessionStorage.removeItem(sessionUserKey);
    document.body.classList.add("locked");
  }
}

function isInstalledMobileApp() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIosMobileDevice() {
  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent || "");
}

function updateMobileInstallCard() {
  const card = document.getElementById("mobile-install-card");
  const button = document.getElementById("mobile-install-button");
  const help = document.getElementById("mobile-install-help");
  if (!card || !button || !help) return;

  const shouldShow = isMobileShellEligible() && !isInstalledMobileApp();
  card.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) return;

  if (isIosMobileDevice()) {
    button.textContent = "Ver como adicionar";
    help.textContent = "No iPhone ou iPad, use Compartilhar e depois Adicionar à Tela de Início.";
    return;
  }

  button.textContent = deferredMobileInstallPrompt ? "Instalar aplicativo" : "Criar atalho";
  help.textContent = deferredMobileInstallPrompt
    ? "Instale para abrir o sistema em tela própria, diretamente pelo ícone do celular."
    : "No navegador, abra o menu e escolha Instalar app ou Adicionar à tela inicial.";
}

async function handleMobileInstall() {
  const help = document.getElementById("mobile-install-help");
  if (isIosMobileDevice()) {
    if (help) help.innerHTML = "Toque em <strong>Compartilhar</strong> e selecione <strong>Adicionar à Tela de Início</strong>.";
    showMobileInstallGuide("ios");
    return;
  }

  if (!deferredMobileInstallPrompt) {
    if (help) help.innerHTML = "Abra o menu do navegador e escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>.";
    showMobileInstallGuide("android");
    return;
  }

  try {
    deferredMobileInstallPrompt.prompt();
    const choice = await deferredMobileInstallPrompt.userChoice;
    deferredMobileInstallPrompt = null;
    if (choice?.outcome === "accepted") {
      document.getElementById("mobile-install-card")?.classList.add("hidden");
    } else {
      updateMobileInstallCard();
      if (help) help.textContent = "Instalação cancelada. Toque novamente quando desejar criar o atalho.";
    }
  } catch {
    deferredMobileInstallPrompt = null;
    showMobileInstallGuide("android");
  }
}

function showMobileInstallGuide(platform = "android") {
  const dialog = document.getElementById("mobile-install-dialog");
  const title = document.getElementById("mobile-install-dialog-title");
  const content = document.getElementById("mobile-install-dialog-content");
  if (!dialog || !title || !content) {
    alert(platform === "ios"
      ? "Toque em Compartilhar e depois em Adicionar à Tela de Início."
      : "Abra o menu de três pontos do navegador e escolha Instalar app ou Adicionar à tela inicial.");
    return;
  }

  if (platform === "ios") {
    title.textContent = "Adicionar no iPhone ou iPad";
    content.innerHTML = `
      <p><strong>1.</strong> Abra esta página no Safari.</p>
      <p><strong>2.</strong> Toque no botão <strong>Compartilhar</strong>.</p>
      <p><strong>3.</strong> Escolha <strong>Adicionar à Tela de Início</strong> e confirme.</p>
    `;
  } else {
    title.textContent = "Adicionar no Android";
    content.innerHTML = `
      <p><strong>1.</strong> Abra o menu de <strong>três pontos (⋮)</strong> do Chrome.</p>
      <p><strong>2.</strong> Toque em <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>.</p>
      <p><strong>3.</strong> Confirme em <strong>Instalar</strong> ou <strong>Adicionar</strong>.</p>
    `;
  }

  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function activateSupabaseSession(user) {
  const email = user.email || "usuario@supabase";
  const role = resolveUserRole(user);
  const displayName = getUserDisplayName(user);
  cacheOfflineUser(user);
  appSessionStorage.setItem(sessionKey, "active");
  document.body.classList.remove("locked");
  appSessionStorage.setItem(sessionUserKey, JSON.stringify({
    id: user.id,
    username: displayName,
    email,
    role,
  }));
}

async function updateAccess(form) {
  if (!canManageUsers()) {
    alert("Apenas administradores podem convidar usuários.");
    return;
  }
  if (!window.SupabaseSync?.inviteAccessUser) {
    setText("access-message", "A função de usuários ainda não foi publicada no Supabase.");
    return;
  }
  const record = Object.fromEntries(new FormData(form).entries());
  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  setText("access-message", "Enviando convite com segurança...");
  try {
    const invited = await window.SupabaseSync.inviteAccessUser({
      name: String(record.name || "").trim(),
      email: String(record.email || "").trim(),
      role: record.role,
      redirectTo: "https://gestao-locacoes-opal.vercel.app/login.html",
    });
    addAuditLog("user_invited", "auth", invited.user?.user_id || "", null, { username: record.email, role: record.role }, false);
    form.reset();
    await loadAccessUsers(true);
    setText("access-message", "Convite enviado. O usuário receberá um e-mail para definir o acesso.");
  } catch (error) {
    setText("access-message", `Não foi possível enviar o convite: ${error.message || error}`);
  } finally {
    button.disabled = false;
  }
}

function updateSyncConfig(form) {
  if (!requirePermission("admin:write", "Apenas administradores podem alterar a sincronizacao.")) return;
  const data = Object.fromEntries(new FormData(form).entries());
  syncConfig = {
    endpoint: data.endpoint.trim(),
    token: data.token.trim(),
  };
  saveSyncConfig();
  updateSyncStatus();
  setText("settings-message", syncConfig.endpoint ? "Configuracao de nuvem salva." : "Sincronizacao online desativada.");
}

function upsertFromForm(form, collectionName, prefix, normalizer = (value) => value) {
  if (!canWriteCollection(collectionName)) {
    setText("settings-message", "Seu perfil nao permite alterar este cadastro.");
    alert("Seu perfil nao permite alterar este cadastro.");
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  let record;
  try {
    record = normalizer({
      ...data,
      id: data.id || uid(prefix),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    alert(error.message || "Nao foi possivel salvar o registro.");
    return;
  }

  if (isFinancialCollection(collectionName) && !confirmDuplicateFinancialLaunch(collectionName, record)) {
    return;
  }

  const index = state[collectionName].findIndex((item) => item.id === record.id);
  const before = index >= 0 ? state[collectionName][index] : null;
  if (index >= 0) {
    state[collectionName][index] = record;
  } else {
    state[collectionName].push(record);
  }

  addAuditLog(index >= 0 ? "record_updated" : "record_created", collectionName, record.id, before, record, isFinancialCollection(collectionName));
  saveState();
  form.reset();
  form.elements.id.value = "";
  if (collectionName === "contracts") {
    renderContractAdjustmentRows(form, []);
    syncContractFinancialTermFields(form);
  }
  if (collectionName === "expenses") {
    syncFinancialCompetence(form, "expenseDate", { overwrite: true });
    updateExpenseContractInfo(form);
  }
  if (collectionName === "payments") {
    syncFinancialCompetence(form, "paymentDate", { overwrite: true });
    updatePaymentTotal(form);
  }
  renderAll();
}

function normalizeProperty(record) {
  return {
    ...record,
    description: String(record.description || "").trim(),
    type: String(record.type || "").trim(),
    area: String(record.area || "").trim(),
    location: String(record.location || "").trim(),
    documentLink: String(record.documentLink || "").trim(),
    investmentValue: record.investmentValue === "" || record.investmentValue == null
      ? 0
      : parseMoneyInput(record.investmentValue),
  };
}

function normalizeClient(record) {
  const documentValue = formatCpfCnpj(record.document);
  const digits = onlyDigits(documentValue);
  if (digits.length === 11 && !isValidCpf(digits)) {
    throw new Error("CPF invalido. Confira os digitos informados.");
  }
  if (digits.length === 14 && !isValidCnpj(digits)) {
    throw new Error("CNPJ invalido. Confira os digitos informados.");
  }
  if (![11, 14].includes(digits.length)) {
    throw new Error("Informe um CPF com 11 digitos ou CNPJ com 14 digitos.");
  }
  return {
    ...record,
    document: documentValue,
    name: String(record.name || "").trim(),
    contact: String(record.contact || "").trim(),
    phone: String(record.phone || "").trim(),
    email: String(record.email || "").trim(),
  };
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatCpfCnpj(value) {
  const digits = onlyDigits(value).slice(0, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function isValidCpf(value) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  const calc = (size) => {
    const sum = cpf.slice(0, size).split("").reduce((total, digit, index) => total + Number(digit) * (size + 1 - index), 0);
    const result = 11 - (sum % 11);
    return result > 9 ? 0 : result;
  };
  return calc(9) === Number(cpf[9]) && calc(10) === Number(cpf[10]);
}

function isValidCnpj(value) {
  const cnpj = onlyDigits(value);
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  const calc = (base, weights) => {
    const sum = base.split("").reduce((total, digit, index) => total + Number(digit) * weights[index], 0);
    const result = sum % 11;
    return result < 2 ? 0 : 11 - result;
  };
  const first = calc(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = calc(cnpj.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return first === Number(cnpj[12]) && second === Number(cnpj[13]);
}

async function validateAndFillClientDocument(form) {
  if (!form) return;
  const input = form.elements.document;
  const nameInput = form.elements.name;
  const digits = onlyDigits(input.value);
  input.value = formatCpfCnpj(input.value);
  if (!digits) {
    setText("client-document-message", "");
    return;
  }
  if (digits.length === 11) {
    setText("client-document-message", isValidCpf(digits)
      ? "CPF validado pelos digitos verificadores. A Receita Federal nao oferece consulta publica oficial do nome do titular para preenchimento automatico."
      : "CPF invalido. Confira os digitos informados.");
    return;
  }
  if (digits.length !== 14 || !isValidCnpj(digits)) {
    setText("client-document-message", "CNPJ invalido. Confira os digitos informados.");
    return;
  }
  setText("client-document-message", "CNPJ valido. Buscando dados publicos da empresa...");
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const companyNameValue = data.razao_social || data.nome_fantasia || "";
    if (companyNameValue) nameInput.value = companyNameValue;
    setText("client-document-message", companyNameValue
      ? `Dados publicos carregados para ${companyNameValue}.`
      : "CNPJ validado, mas a consulta nao retornou nome empresarial.");
  } catch {
    setText("client-document-message", "CNPJ validado pelos digitos. Nao foi possivel consultar os dados publicos agora.");
  }
}

function normalizeContract(record) {
  const hasSecurityDeposit = record.hasSecurityDeposit === "on" || record.hasSecurityDeposit === true;
  const hasGracePeriod = record.hasGracePeriod === "on" || record.hasGracePeriod === true;
  const adjustedRent = normalizeContractAdjustedRent(record);
  return {
    ...record,
    monthlyValue: parseMoneyInput(record.monthlyValue),
    dueDay: Number(record.dueDay || 1),
    hasSecurityDeposit,
    securityDepositMonths: hasSecurityDeposit ? Math.max(0, Math.floor(Number(record.securityDepositMonths || 0))) : 0,
    hasGracePeriod,
    gracePeriodMonths: hasGracePeriod ? Math.max(0, Math.floor(Number(record.gracePeriodMonths || 0))) : 0,
    ...adjustedRent,
    condoFeeResponsible: record.condoFeeResponsible || "cliente",
    condoFeeInClientName: (record.condoFeeResponsible || "cliente") === "cliente" && (record.condoFeeInClientName === "on" || record.condoFeeInClientName === true),
    iptuResponsible: record.iptuResponsible || "cliente",
    spuResponsible: record.spuResponsible || "cliente",
    fireFeeResponsible: record.fireFeeResponsible || "cliente",
  };
}

function syncContractFinancialTermFields(form = document.getElementById("contract-form")) {
  if (!form) return;
  const securityCheckbox = form.elements.hasSecurityDeposit;
  const securityMonths = form.elements.securityDepositMonths;
  const graceCheckbox = form.elements.hasGracePeriod;
  const graceMonths = form.elements.gracePeriodMonths;
  const adjustedCheckbox = form.elements.hasAdjustedRent;

  if (securityMonths && securityCheckbox) {
    securityMonths.disabled = !securityCheckbox.checked;
    if (!securityCheckbox.checked) securityMonths.value = "0";
    if (securityCheckbox.checked && Number(securityMonths.value || 0) < 1) securityMonths.value = "1";
  }
  if (graceMonths && graceCheckbox) {
    graceMonths.disabled = !graceCheckbox.checked;
    if (!graceCheckbox.checked) graceMonths.value = "0";
    if (graceCheckbox.checked && Number(graceMonths.value || 0) < 1) graceMonths.value = "1";
  }
  const list = document.getElementById("contract-adjustments-list");
  const enabled = Boolean(adjustedCheckbox?.checked);
  list?.querySelectorAll("input, textarea, button").forEach((field) => {
    field.disabled = !enabled;
  });
  document.getElementById("add-contract-adjustment")?.toggleAttribute("disabled", !enabled);
  if (enabled && list && !list.querySelector(".contract-adjustment-row")) {
    addContractAdjustmentRow(form, getOpenCompetence());
  }
  if (!enabled) renderContractAdjustmentRows(form, []);
  syncContractRentAdjustmentsInput(form);
  syncContractCondoClientNameField(form);
}

function syncContractCondoClientNameField(form = document.getElementById("contract-form")) {
  if (!form) return;
  const responsible = form.elements.condoFeeResponsible;
  const checkbox = form.elements.condoFeeInClientName;
  const wrapper = checkbox?.closest(".condo-client-name-option");
  const enabled = responsible?.value === "cliente";
  if (checkbox) {
    checkbox.disabled = !enabled;
    if (!enabled) checkbox.checked = false;
  }
  wrapper?.classList.toggle("hidden", !enabled);
}

function addContractAdjustmentRow(form, adjustment = {}) {
  const list = document.getElementById("contract-adjustments-list");
  if (!list) return;
  const row = document.createElement("div");
  row.className = "contract-adjustment-row";
  row.dataset.adjustmentId = adjustment.id || uid("adjustment");
  row.innerHTML = `
    <label>
      Competencia
      <input data-adjustment-field="competence" type="month" value="${escapeAttribute(normalizeCompetence(adjustment.competence, adjustment.startDate || new Date()))}" />
    </label>
    <label>
      Inicio
      <input data-adjustment-field="startDate" type="date" value="${escapeAttribute(adjustment.startDate || "")}" />
    </label>
    <label>
      Termino
      <input data-adjustment-field="endDate" type="date" value="${escapeAttribute(adjustment.endDate || "")}" />
    </label>
    <label>
      Valor mensal
      <input data-adjustment-field="monthlyValue" type="text" inputmode="decimal" data-money-input value="${escapeAttribute(formatMoneyInputValue(adjustment.monthlyValue || ""))}" />
    </label>
    <label class="adjustment-note">
      Observacao
      <textarea data-adjustment-field="note" rows="2">${escapeHtml(adjustment.note || "")}</textarea>
    </label>
    <button class="small-button" data-remove-adjustment type="button">Remover</button>
  `;
  list.append(row);
  row.querySelectorAll("[data-money-input]").forEach(bindCurrencyInput);
}

function renderContractAdjustmentRows(form, adjustments = []) {
  const list = document.getElementById("contract-adjustments-list");
  if (!list) return;
  list.innerHTML = "";
  adjustments.forEach((adjustment) => addContractAdjustmentRow(form, adjustment));
  syncContractRentAdjustmentsInput(form);
}

function syncContractRentAdjustmentsInput(form = document.getElementById("contract-form")) {
  if (!form?.elements.rentAdjustments) return;
  form.elements.rentAdjustments.value = JSON.stringify(collectContractRentAdjustments());
}

function collectContractRentAdjustments() {
  return [...document.querySelectorAll("#contract-adjustments-list .contract-adjustment-row")]
    .map((row) => {
      const valueOf = (field) => row.querySelector(`[data-adjustment-field="${field}"]`)?.value || "";
      const startDate = valueOf("startDate");
      const endDate = valueOf("endDate");
      const monthlyValue = parseMoneyInput(valueOf("monthlyValue"));
      const competence = normalizeCompetence(valueOf("competence"), startDate || new Date());
      return {
        id: row.dataset.adjustmentId || uid("adjustment"),
        competence,
        startDate,
        endDate,
        monthlyValue,
        note: String(valueOf("note") || "").trim(),
      };
    })
    .filter((adjustment) => adjustment.startDate && adjustment.endDate && adjustment.monthlyValue > 0)
    .sort((left, right) => String(left.startDate).localeCompare(String(right.startDate)));
}

function normalizeContractAdjustedRent(record) {
  const requested = record.hasAdjustedRent === "on" || record.hasAdjustedRent === true;
  const rentAdjustments = normalizeRentAdjustments(record);
  if (requested && rentAdjustments.length) {
    const first = rentAdjustments[0];
    return {
      hasAdjustedRent: true,
      rentAdjustments,
      adjustedRentStartDate: first.startDate,
      adjustedRentEndDate: first.endDate,
      adjustedMonthlyValue: first.monthlyValue,
    };
  }
  const adjustedRentStartDate = String(record.adjustedRentStartDate || "").trim();
  const adjustedRentEndDate = String(record.adjustedRentEndDate || "").trim();
  const adjustedMonthlyValue = parseMoneyInput(record.adjustedMonthlyValue);
  const hasAdjustedRent = Boolean(requested && adjustedRentStartDate && adjustedRentEndDate && adjustedMonthlyValue > 0);
  const legacyAdjustment = hasAdjustedRent
    ? [{
        id: record.rentAdjustmentId || uid("adjustment"),
        competence: normalizeCompetence(record.adjustedRentCompetence, adjustedRentStartDate),
        startDate: adjustedRentStartDate,
        endDate: adjustedRentEndDate,
        monthlyValue: adjustedMonthlyValue,
        note: String(record.adjustedRentNote || "").trim(),
      }]
    : [];
  return {
    hasAdjustedRent,
    rentAdjustments: legacyAdjustment,
    adjustedRentStartDate: hasAdjustedRent ? adjustedRentStartDate : "",
    adjustedRentEndDate: hasAdjustedRent ? adjustedRentEndDate : "",
    adjustedMonthlyValue: hasAdjustedRent ? adjustedMonthlyValue : 0,
  };
}

function normalizeRentAdjustments(record) {
  let rows = record.rentAdjustments;
  if (typeof rows === "string") {
    try {
      rows = JSON.parse(rows);
    } catch {
      rows = [];
    }
  }
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => {
      const startDate = String(row.startDate || row.adjustedRentStartDate || "").trim();
      const endDate = String(row.endDate || row.adjustedRentEndDate || "").trim();
      const monthlyValue = Number(row.monthlyValue || row.adjustedMonthlyValue || 0);
      return {
        id: row.id || uid("adjustment"),
        competence: normalizeCompetence(row.competence, startDate),
        startDate,
        endDate,
        monthlyValue,
        note: String(row.note || row.observation || "").trim(),
      };
    })
    .filter((row) => row.startDate && row.endDate && row.monthlyValue > 0)
    .sort((left, right) => String(left.startDate).localeCompare(String(right.startDate)));
}

function getContractMonthlyValueForDate(contract, referenceDate = new Date()) {
  const baseValue = Number(contract?.monthlyValue || 0);
  const date = referenceDate instanceof Date ? referenceDate : parseDate(referenceDate);
  if (!contract?.hasAdjustedRent || !date) return baseValue;
  const adjustment = getContractRentAdjustmentForDate(contract, date);
  return Number(adjustment?.monthlyValue || baseValue);
}

function getContractMonthlyValueForCompetence(contract, competenceDate = new Date()) {
  const baseValue = Number(contract?.monthlyValue || 0);
  const date = competenceDate instanceof Date ? competenceDate : parseMonthValue(competenceDate);
  if (!contract?.hasAdjustedRent || !date) return baseValue;
  const adjustment = getContractRentAdjustmentForCompetence(contract, date);
  return Number(adjustment?.monthlyValue || baseValue);
}

function getContractRentAdjustmentForDate(contract, referenceDate = new Date()) {
  const date = referenceDate instanceof Date ? referenceDate : parseDate(referenceDate);
  if (!date) return null;
  const adjustments = normalizeRentAdjustments(contract);
  return adjustments
    .filter((adjustment) => {
      const start = parseDate(adjustment.startDate);
      const end = parseDate(adjustment.endDate);
      return start && end && date >= start && date <= end;
    })
    .sort((left, right) => String(right.startDate).localeCompare(String(left.startDate)))[0] || null;
}

function getContractRentAdjustmentForCompetence(contract, competenceDate = new Date()) {
  const date = competenceDate instanceof Date ? competenceDate : parseMonthValue(competenceDate);
  if (!date) return null;
  const monthStart = firstDayOfMonth(date);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const competence = toMonthValue(date);
  const adjustments = normalizeRentAdjustments(contract);
  return adjustments
    .filter((adjustment) => {
      const start = parseDate(adjustment.startDate);
      const end = parseDate(adjustment.endDate);
      const adjustmentCompetence = normalizeCompetence(adjustment.competence, adjustment.startDate);
      return start && end && competence >= adjustmentCompetence && monthStart <= end && monthEnd >= start;
    })
    .sort((left, right) => String(right.competence || right.startDate).localeCompare(String(left.competence || left.startDate)))[0] || null;
}

function getContractAdjustedRentText(contract) {
  const adjustments = normalizeRentAdjustments(contract);
  if (!contract?.hasAdjustedRent || !adjustments.length) return "-";
  return adjustments
    .map((adjustment) => {
      const note = adjustment.note ? ` (${adjustment.note})` : "";
      return `${formatCompetence(adjustment.competence)} - ${formatDate(adjustment.startDate)} a ${formatDate(adjustment.endDate)}: ${formatMoney(adjustment.monthlyValue)}${note}`;
    })
    .join(" | ");
}
function normalizeExpense(record) {
  const contract = findFinancialContract(record.propertyId, record.expenseDate, record.contractId || record.contractPicker);
  const client = findClient(contract?.clientId);
  const blockedCharge = getBlockedExpenseChargeFromRecord(record, contract);
  if (blockedCharge) {
    throw new Error(`${blockedCharge.label} consta no contrato como responsabilidade do cliente.`);
  }
  const cleanRecord = { ...record };
  delete cleanRecord.contractPicker;
  delete cleanRecord.chargeRule;
  return {
    ...cleanRecord,
    contractId: contract?.id || "",
    contractCode: contract ? getContractCode(contract) : "",
    lessorName: client?.name || "",
    competence: normalizeCompetence(record.competence, record.expenseDate),
    amount: parseMoneyInput(record.amount),
    note: String(record.note || "").trim(),
  };
}

function getExpenseChargeRuleKeys(expenseType) {
  return expenseChargeTypeRules[String(expenseType || "").trim().toLowerCase()] || [];
}

function getExpenseChargeRules(expenseType) {
  const keys = getExpenseChargeRuleKeys(expenseType);
  return chargeRules.filter((rule) => keys.includes(rule.key));
}

function getSelectedExpenseChargeRule(form) {
  const rules = getExpenseChargeRules(form?.elements.expenseType?.value);
  if (!rules.length) return null;
  const selectedKey = form?.elements.chargeRule?.value || "";
  return rules.find((rule) => rule.key === selectedKey) || rules[0] || null;
}

function getBlockedExpenseCharge(form, contract) {
  return getBlockedExpenseChargeFromRecord(
    {
      expenseType: form?.elements.expenseType?.value,
      chargeRule: form?.elements.chargeRule?.value,
    },
    contract,
  );
}

function getBlockedExpenseChargeFromRecord(record, contract) {
  if (!contract) return null;
  const rules = getExpenseChargeRules(record?.expenseType);
  if (!rules.length) return null;
  const selectedRule = rules.find((rule) => rule.key === record?.chargeRule) || rules[0];
  return (contract[selectedRule.key] || "cliente") === "cliente" ? selectedRule : null;
}

function normalizePayment(record) {
  const amount = parseMoneyInput(record.amount);
  const chargeAmount = parseMoneyInput(record.chargeAmount);
  const contract = findFinancialContract(record.propertyId, record.paymentDate, record.contractId || record.contractPicker);
  const client = findClient(contract?.clientId);
  const cleanRecord = { ...record };
  delete cleanRecord.contractPicker;
  return {
    ...cleanRecord,
    contractId: contract?.id || "",
    contractCode: contract ? getContractCode(contract) : "",
    lessorName: client?.name || "",
    competence: normalizeCompetence(record.competence, record.paymentDate),
    amount,
    chargeAmount,
    totalAmount: amount + chargeAmount,
    history: String(record.history || "").trim(),
  };
}

function updatePaymentTotal(form = document.getElementById("payment-form")) {
  const amount = parseMoneyInput(form.elements.amount.value);
  const chargeAmount = parseMoneyInput(form.elements.chargeAmount.value);
  form.elements.totalAmount.value = formatMoneyInputValue(amount + chargeAmount);
}

function updatePaymentContractInfo(form = document.getElementById("payment-form")) {
  return updateFinancialContractInfo(form, "paymentDate");
}

function updateExpenseContractInfo(form = document.getElementById("expense-form")) {
  const contract = updateFinancialContractInfo(form, "expenseDate");
  updateExpenseChargeGuard(form, contract);
  return contract;
}

function updateExpenseChargeGuard(form = document.getElementById("expense-form"), contract = null) {
  if (!form) return;
  const ruleField = document.getElementById("expense-charge-rule-field");
  const ruleSelect = form.elements.chargeRule;
  const amountInput = form.elements.amount;
  const saveButton = form.querySelector("button[type='submit']");
  const rules = getExpenseChargeRules(form.elements.expenseType?.value);
  const showRuleSelect = rules.length > 0;

  if (ruleSelect) {
    const previousValue = ruleSelect.value;
    ruleSelect.innerHTML = "";
    rules.forEach((rule) => ruleSelect.append(new Option(rule.label, rule.key)));
    ruleSelect.value = rules.some((rule) => rule.key === previousValue) ? previousValue : (rules[0]?.key || "");
    ruleSelect.required = showRuleSelect;
    ruleSelect.disabled = !showRuleSelect;
  }
  ruleField?.classList.toggle("hidden", !showRuleSelect);

  const selectedRule = getSelectedExpenseChargeRule(form, contract);
  const responsible = selectedRule && contract ? (contract[selectedRule.key] || "cliente") : "";
  const blocked = selectedRule && responsible === "cliente";
  amountInput?.toggleAttribute("disabled", Boolean(blocked));
  saveButton?.toggleAttribute("disabled", Boolean(blocked));

  if (!showRuleSelect) {
    setText("expense-charge-message", "");
  } else if (!contract) {
    setText("expense-charge-message", "Selecione um imovel com contrato para validar a responsabilidade do encargo.");
  } else if (blocked) {
    setText("expense-charge-message", `${selectedRule.label} esta como responsabilidade do cliente no contrato. O lancamento de despesa do locador foi bloqueado.`);
  } else {
    setText("expense-charge-message", `${selectedRule.label} esta como responsabilidade do locador. Lancamento liberado.`);
  }
}

function updateFinancialContractInfo(form, dateFieldName) {
  if (!form) return null;
  const propertyId = form.elements.propertyId?.value || "";
  const launchDate = form.elements[dateFieldName]?.value || "";
  const preferredContractId = form.elements.contractPicker?.value || form.elements.contractId?.value || "";
  const contracts = getContractsForProperty(propertyId);
  const activeContract = findActiveContractForDate(contracts, launchDate);
  const contract = activeContract
    || contracts.find((item) => item.id === preferredContractId)
    || (contracts.length === 1 ? contracts[0] : null);
  const client = findClient(contract?.clientId);

  updateContractPicker(form, contracts, contract, Boolean(propertyId && launchDate && !activeContract && contracts.length));
  if (form.elements.contractId) form.elements.contractId.value = contract?.id || "";
  if (form.elements.contractCode) form.elements.contractCode.value = contract ? getContractCode(contract) : "";
  if (form.elements.lessorName) form.elements.lessorName.value = client?.name || "";
  return contract || null;
}

function updateContractPicker(form, contracts, selectedContract, shouldShow) {
  const picker = form.elements.contractPicker;
  const container = picker?.closest(".contract-manual");
  if (!picker || !container) return;
  picker.innerHTML = "";
  picker.append(new Option(contracts.length ? "Selecione o contrato" : "Nenhum contrato cadastrado", ""));
  contracts.forEach((contract) => picker.append(new Option(getContractOptionLabel(contract), contract.id)));
  picker.required = shouldShow && contracts.length > 1;
  picker.disabled = !shouldShow;
  container.classList.toggle("hidden", !shouldShow);
  picker.value = selectedContract?.id || "";
}

function getContractOptionLabel(contract) {
  const client = findClient(contract.clientId);
  return `${getContractCode(contract)} - ${client?.name || "Cliente"} - ${formatDate(contract.startDate)} a ${formatDate(contract.endDate)}`;
}

async function downloadFromCloud() {
  if (!requirePermission("admin:write", "Apenas administradores podem baixar dados da nuvem.")) return;
  if (window.SupabaseSync) {
    setText("settings-message", "Baixando dados do Supabase...");
    try {
      const remote = await window.SupabaseSync.loadRemoteState({ fallbackToCache: false, includeMetadata: true });
      if (!remote) {
        setText("settings-message", "Ainda nao ha dados salvos no Supabase para este workspace.");
        return;
      }
      createLocalBackup("before_cloud_download", state, { force: true });
      state = sanitizeRemoteState(remote.state || remote);
      saveLocalState(state);
      createLocalBackup("auto_save", state, { force: true });
      markRemoteStateApplied(remote.updatedAt || null);
      renderAll();
      setText("settings-message", `Dados do Supabase aplicados. Imoveis carregados: ${state.properties.length}.`);
    } catch (error) {
      setText("settings-message", `Nao foi possivel baixar do Supabase: ${error.message}`);
    }
    return;
  }
  if (!ensureSyncConfigured()) return;
  setText("settings-message", "Baixando dados da nuvem...");
  try {
    const response = await fetch(syncConfig.endpoint, { headers: getSyncHeaders() });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    createLocalBackup("before_cloud_download", state, { force: true });
    state = sanitizeRemoteState(payload.state || payload);
    addAuditLog("cloud_download", "sync", "", null, { endpoint: syncConfig.endpoint }, false);
    saveState();
    renderAll();
    setText("settings-message", "Dados baixados e aplicados com sucesso.");
  } catch (error) {
    setText("settings-message", `Nao foi possivel baixar: ${error.message}`);
  }
}

async function uploadToCloud() {
  if (!requirePermission("admin:write", "Apenas administradores podem enviar dados para a nuvem.")) return;
  if (window.SupabaseSync) {
    setText("settings-message", "Enviando todos os dados deste navegador para o Supabase...");
    try {
      state = sanitizeRemoteState(state);
      createLocalBackup("before_cloud_upload", state, { force: true });
      const remoteState = await loadRemoteStateForSafety();
      if (remoteState) {
        const warnings = getCountReductionWarnings(getBusinessCounts(state), getBusinessCounts(remoteState));
        if (warnings.length && !confirm(`A nuvem tem mais registros que este navegador:\n${warnings.join("\n")}\n\nEnviar mesmo assim pode manter apenas os registros deste navegador. Deseja continuar?`)) {
          setText("settings-message", "Envio cancelado para proteger os dados da nuvem.");
          return;
        }
      }
      addAuditLog("cloud_upload", "sync", "", null, { target: "Supabase", records: countBusinessRecords(state) }, false);
      saveLocalState(state);
      const result = window.SupabaseSync.saveRemoteStateNow
        ? await window.SupabaseSync.saveRemoteStateNow(state)
        : (window.SupabaseSync.saveRemoteState(state), null);
      if (result?.updatedAt) markRemoteStateApplied(result.updatedAt);
      const counts = result?.counts || {};
      setText(
        "settings-message",
        `Supabase atualizado com os dados deste navegador: ${counts.properties ?? state.properties.length} imoveis, ${counts.clients ?? state.clients.length} clientes, ${counts.contracts ?? state.contracts.length} contratos, ${counts.payments ?? state.payments.length} receitas e ${counts.expenses ?? state.expenses.length} despesas.`,
      );
    } catch (error) {
      setText("settings-message", `Nao foi possivel enviar ao Supabase: ${error.message}`);
    }
    return;
  }
  if (!ensureSyncConfigured()) return;
  setText("settings-message", "Enviando dados para a nuvem...");
  try {
    createLocalBackup("before_cloud_upload", state, { force: true });
    const response = await fetch(syncConfig.endpoint, {
      method: "PUT",
      headers: { ...getSyncHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ company: companyName, updatedAt: new Date().toISOString(), state }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    addAuditLog("cloud_upload", "sync", "", null, { endpoint: syncConfig.endpoint }, false);
    setText("settings-message", "Dados enviados para a nuvem com sucesso.");
  } catch (error) {
    setText("settings-message", `Nao foi possivel enviar: ${error.message}`);
  }
}

function createManualBackup() {
  if (!requirePermission("admin:write", "Apenas administradores podem gerar backup manual.")) return;
  const backup = createLocalBackup("manual", state, { force: true });
  renderBackupPanel();
  setText(
    "backup-message",
    backup
      ? `Backup gerado: ${backup.fileName}. Endereco: ${backup.storageAddress}.`
      : "Nao ha dados de negocio para gerar backup."
  );
}

function getSelectedBackup() {
  const select = document.getElementById("backup-select");
  const backupId = select?.value;
  const backups = loadBackups();
  return backups.find((backup) => backup.id === backupId) || backups[0] || null;
}

function downloadSelectedBackup() {
  if (!requirePermission("admin:write", "Apenas administradores podem baixar backups.")) return;
  const backup = getSelectedBackup();
  if (!backup) {
    setText("backup-message", "Nenhum backup disponivel para download.");
    return;
  }
  downloadJsonFile(backup.fileName || createBackupFileName(backup.createdAt), backup);
  setText("backup-message", `Download iniciado: ${backup.fileName}.`);
}

function restoreBackupEnvelope(backup, sourceLabel = "backup local") {
  if (!requirePermission("admin:write", "Apenas administradores podem restaurar backups.")) return;
  if (!backup?.state) {
    setText("backup-message", "Backup invalido ou sem dados para restaurar.");
    return;
  }
  const restoredState = sanitizeRemoteState(backup.state);
  const counts = getBusinessCounts(restoredState);
  const summary = `${counts.properties} imoveis, ${counts.clients} clientes, ${counts.contracts} contratos, ${counts.payments} receitas e ${counts.expenses} despesas`;
  if (!confirm(`Deseja restaurar este ${sourceLabel}?\n\nEle contem ${summary}.\n\nO estado atual sera salvo em backup antes da restauracao.`)) return;
  createLocalBackup("before_restore", state, { force: true });
  state = restoredState;
  addAuditLog("backup_restored", "system", backup.id || "", null, { message: `Restaurado ${sourceLabel}: ${summary}` }, false);
  saveState();
  renderAll();
  setText("backup-message", `Backup restaurado com sucesso. ${summary}.`);
}

function restoreSelectedBackup() {
  const backup = getSelectedBackup();
  if (!backup) {
    setText("backup-message", "Nenhum backup disponivel para restaurar.");
    return;
  }
  restoreBackupEnvelope(backup, "backup local");
}

async function importBackupFile(event) {
  if (!requirePermission("admin:write", "Apenas administradores podem importar backups.")) return;
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const envelope = payload.state ? payload : createBackupEnvelope("imported", payload);
    envelope.id = envelope.id || uid("backup");
    envelope.createdAt = envelope.createdAt || new Date().toISOString();
    envelope.reason = envelope.reason || "imported";
    envelope.reasonLabel = getBackupReasonLabel(envelope.reason);
    envelope.fileName = envelope.fileName || file.name || createBackupFileName(envelope.createdAt);
    envelope.storageAddress = envelope.storageAddress || `arquivo:${envelope.fileName}`;
    envelope.counts = getBusinessCounts(sanitizeRemoteState(envelope.state));
    restoreBackupEnvelope(envelope, `arquivo ${envelope.fileName}`);
  } catch (error) {
    setText("backup-message", `Nao foi possivel importar o backup: ${error.message}`);
  }
}

function ensureSyncConfigured() {
  if (!syncConfig.endpoint) {
    setText("settings-message", "Informe e salve um endpoint HTTPS antes de sincronizar.");
    return false;
  }
  if (!syncConfig.endpoint.startsWith("https://")) {
    setText("settings-message", "Use um endpoint HTTPS para proteger os dados.");
    return false;
  }
  return true;
}

function getSyncHeaders() {
  return syncConfig.token ? { Authorization: `Bearer ${syncConfig.token}` } : {};
}

function sanitizeRemoteState(remoteState) {
  return {
    properties: Array.isArray(remoteState.properties) ? remoteState.properties : [],
    clients: Array.isArray(remoteState.clients) ? remoteState.clients : [],
    contracts: Array.isArray(remoteState.contracts) ? remoteState.contracts.map(normalizeContract) : [],
    expenses: Array.isArray(remoteState.expenses) ? remoteState.expenses.map(normalizeStoredExpense) : [],
    payments: Array.isArray(remoteState.payments) ? remoteState.payments.map(normalizeStoredPayment) : [],
    chargeConfirmations: Array.isArray(remoteState.chargeConfirmations) ? remoteState.chargeConfirmations.map(normalizeChargeConfirmation) : [],
    auditLogs: Array.isArray(remoteState.auditLogs) ? remoteState.auditLogs : [],
  };
}

function normalizeChargeConfirmation(record) {
  return {
    ...record,
    id: record.id || getChargeConfirmationId(record.contractId, record.chargeKey, record.dueDate),
    contractId: record.contractId || "",
    chargeKey: record.chargeKey || "",
    dueDate: record.dueDate || "",
    paymentDate: record.paymentDate || "",
    confirmed: Boolean(record.confirmed),
    confirmedAt: record.confirmedAt || "",
    confirmedByUserId: record.confirmedByUserId || "",
    confirmedByUserName: record.confirmedByUserName || "",
  };
}

function normalizeStoredExpense(record) {
  return {
    ...record,
    contractId: record.contractId || "",
    contractCode: record.contractCode || "",
    lessorName: record.lessorName || "",
    competence: normalizeCompetence(record.competence, record.expenseDate),
    amount: Number(record.amount || 0),
    note: String(record.note || "").trim(),
  };
}

function normalizeStoredPayment(record) {
  const amount = Number(record.amount || 0);
  const chargeAmount = Number(record.chargeAmount || 0);
  return {
    ...record,
    competence: normalizeCompetence(record.competence, record.paymentDate),
    amount,
    chargeAmount,
    totalAmount: Number(record.totalAmount || amount + chargeAmount),
    history: String(record.history || "").trim(),
  };
}

function getPropertyDependencies(propertyId) {
  return {
    contracts: state.contracts.filter((item) => item.propertyId === propertyId).length,
    expenses: state.expenses.filter((item) => item.propertyId === propertyId).length,
    payments: state.payments.filter((item) => item.propertyId === propertyId).length,
  };
}

function canDeleteRecordSafely(collection, id) {
  if (collection !== "properties") return true;
  const dependencies = getPropertyDependencies(id);
  const total = dependencies.contracts + dependencies.expenses + dependencies.payments;
  if (!total) return true;
  alert(
    "Este imovel nao pode ser excluido porque possui registros vinculados:\n" +
    `${dependencies.contracts} contrato(s), ${dependencies.payments} receita(s) e ${dependencies.expenses} despesa(s).\n` +
    "Edite ou remova os vinculos antes de excluir o imovel."
  );
  return false;
}

function updateSyncStatus() {
  const status = document.getElementById("sync-status");
  if (!status) return;
  if (!navigator.onLine) {
    status.textContent = "Offline - dados locais ativos";
    return;
  }
  if (window.SupabaseSync) {
    status.textContent = "Supabase conectado";
    return;
  }
  status.textContent = syncConfig.endpoint ? "Nuvem configurada" : "Offline local";
}


function normalizeRole(role) {
  const value = String(role || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const aliases = {
    administrador: "admin",
    administrator: "admin",
    proprietario: "admin",
    owner: "admin",
    master: "admin",
    financial: "financeiro",
    operational: "operacional",
    operador: "operacional",
    viewer: "consulta",
    leitura: "consulta",
  };
  return aliases[value] || value || "consulta";
}

function resolveUserRole(user) {
  const candidates = [
    user?.app_metadata?.role,
    user?.user_metadata?.role,
    user?.role,
    user?.appAccessProfile?.role,
  ].map(normalizeRole);
  if (candidates.includes("admin")) return "admin";
  return normalizeRole(
    user?.appAccessProfile?.role ||
    user?.app_metadata?.role ||
    user?.user_metadata?.role ||
    user?.role
  );
}

function getUserDisplayName(user) {
  const explicitName = String(
    user?.appAccessProfile?.name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.name ||
    ""
  ).trim();
  if (explicitName) return explicitName;

  const email = String(user?.email || user?.username || "").trim();
  const localPart = email.split("@")[0].replace(/[._-]+/g, " ").trim();
  if (localPart) return localPart.replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("pt-BR"));
  return "Usuário";
}

function getCurrentUser() {
  try {
    const user = JSON.parse(appSessionStorage.getItem(sessionUserKey));
    if (!user) return null;
    return { ...user, role: normalizeRole(user.role) };
  } catch {
    return null;
  }
}

function canManageUsers() {
  return normalizeRole(getCurrentUser()?.role) === "admin";
}

function isSmartphoneReadOnlyMode() {
  const mobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent || "");
  return Boolean(mobileDevice);
}

function isWritePermission(permission) {
  return permission === "*" || String(permission || "").endsWith(":write");
}

function hasPermission(permission) {
  if (isSmartphoneReadOnlyMode() && isWritePermission(permission)) return false;
  const user = getCurrentUser();
  const permissions = rolePermissions[user?.role || "consulta"] || rolePermissions.consulta;
  return permissions.includes("*") || permissions.includes(permission);
}

function requirePermission(permission, message) {
  if (hasPermission(permission)) return true;
  if (message) alert(message);
  return false;
}

function canAccessView(view) {
  if (view === "settings") return hasPermission("admin:write");
  if (view === "users") return hasPermission("view");
  return hasPermission("view");
}

function canWriteCollection(collection) {
  return hasPermission(collectionPermissions[collection] || "admin:write");
}

function canDeleteRecords() {
  return hasPermission("admin:write");
}

function isFinancialCollection(collection) {
  return ["contracts", "expenses", "payments", "chargeConfirmations"].includes(collection);
}

function applyPermissionUi() {
  const user = getCurrentUser();
  const badge = document.getElementById("current-user-badge");
  if (badge) badge.textContent = user ? `${user.username} - ${roleLabels[user.role] || user.role}` : "Sessao bloqueada";

  document.querySelectorAll("[data-view='settings']").forEach((item) => {
    item.hidden = !hasPermission("admin:write");
  });
  document.querySelectorAll("[data-view='users']").forEach((item) => {
    item.hidden = !user;
  });
  document.getElementById("clear-data")?.toggleAttribute("hidden", !hasPermission("admin:write"));

  setFormWriteState("property-form", canWriteCollection("properties"));
  setFormWriteState("client-form", canWriteCollection("clients"));
  setFormWriteState("contract-form", canWriteCollection("contracts"));
  setFormWriteState("expense-form", canWriteCollection("expenses"));
  setFormWriteState("payment-form", canWriteCollection("payments"));
  setFormWriteState("access-form", canManageUsers());
}

function setFormWriteState(formId, enabled) {
  const form = document.getElementById(formId);
  if (!form) return;
  [...form.elements].forEach((element) => {
    if (element.type === "hidden") return;
    element.disabled = !enabled;
  });
}

function renderAll() {
  populateSelects();
  renderDashboard();
  renderProperties();
  renderClients();
  renderContracts();
  renderExpenses();
  renderPayments();
  renderMissingPayments();
  renderChargeChecklist();
  renderFinancialErp();
  renderReports();
  renderAccessUsers();
  renderAuditLogs();
  renderBackupPanel();
  applyPermissionUi();
  scheduleContractExpirationReminder();
  scheduleChargeConfirmationReminder();
}

function scheduleContractExpirationReminder() {
  if (document.body.classList.contains("locked")) return;
  if (appSessionStorage.getItem(reminderSessionKey) === "shown") return;
  const expiringContracts = getExpiringContracts(30);
  if (!expiringContracts.length) return;
  appSessionStorage.setItem(reminderSessionKey, "shown");
  setTimeout(() => showContractExpirationReminder(expiringContracts), 250);
}

function getExpiringContracts(daysAhead) {
  return state.contracts
    .map((contract) => ({
      contract,
      property: findProperty(contract.propertyId),
      client: findClient(contract.clientId),
      days: daysUntil(contract.endDate),
    }))
    .filter((item) => item.days >= 0 && item.days <= daysAhead)
    .sort((a, b) => a.days - b.days);
}

function getUpcomingAdjustments(daysAhead) {
  return state.contracts
    .filter((contract) => getContractStatus(contract).key !== "expired")
    .map((contract) => {
      const adjustmentDate = getNextAdjustmentDate(contract);
      return {
        contract,
        property: findProperty(contract.propertyId),
        client: findClient(contract.clientId),
        adjustmentDate,
        days: adjustmentDate ? daysUntil(toDateInputValue(adjustmentDate)) : null,
      };
    })
    .filter((item) => item.adjustmentDate && item.days >= 0 && item.days <= daysAhead)
    .sort((a, b) => a.days - b.days);
}

function getNextAdjustmentDate(contract) {
  const months = getAdjustmentFrequencyMonths(contract?.adjustmentFrequency);
  const startDate = parseDate(contract?.startDate);
  const endDate = parseDate(contract?.endDate);
  if (!months || !startDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextDate = new Date(startDate);
  while (nextDate < today) {
    nextDate.setMonth(nextDate.getMonth() + months);
  }
  if (endDate && nextDate > endDate) return null;
  return nextDate;
}

function getAdjustmentFrequencyMonths(frequency) {
  const normalized = String(frequency || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (!normalized || normalized.includes("sem reajuste")) return 0;
  if (normalized.includes("mensal")) return 1;
  if (normalized.includes("trimestral")) return 3;
  if (normalized.includes("semestral")) return 6;
  if (normalized.includes("bienal")) return 24;
  if (normalized.includes("anual")) return 12;
  return 12;
}

function showContractExpirationReminder(expiringContracts) {
  const visibleRows = expiringContracts.slice(0, 8).map((item) => {
    const property = item.property?.description || "Imovel nao localizado";
    const client = item.client?.name || "Cliente nao localizado";
    return `- ${property} | ${client} | vence em ${item.days} dia(s), em ${formatDate(item.contract.endDate)}`;
  });
  const extraCount = expiringContracts.length - visibleRows.length;
  const extraText = extraCount > 0 ? `\n\nE mais ${extraCount} contrato(s). Consulte o painel para ver todos.` : "";
  alert(`Lembrete: ${expiringContracts.length} contrato(s) vencem nos proximos 30 dias.\n\n${visibleRows.join("\n")}${extraText}`);
}

function scheduleChargeConfirmationReminder() {
  if (document.body.classList.contains("locked")) return;
  if (appSessionStorage.getItem(chargeConfirmationReminderSessionKey) === "shown") return;
  const pendingCharges = getClientChargeConfirmationsDue(5);
  if (!pendingCharges.length) return;
  appSessionStorage.setItem(chargeConfirmationReminderSessionKey, "shown");
  setTimeout(() => showChargeConfirmationReminder(pendingCharges), 400);
}

function getClientChargeConfirmationsDue(daysAfterDue) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return getChargeChecklistRows(today)
    .filter((item) => !item.confirmed)
    .filter((item) => !isChargeReminderExcludedProperty(item.property))
    .filter((item) => item.elapsedDays >= daysAfterDue)
    .sort((a, b) => b.elapsedDays - a.elapsedDays);
}

function showChargeConfirmationReminder(pendingCharges) {
  const visibleRows = pendingCharges.slice(0, 12);
  const extraCount = pendingCharges.length - visibleRows.length;
  const modal = document.createElement("div");
  modal.className = "charge-alert-modal";
  modal.innerHTML = `
    <div class="charge-alert-dialog" role="dialog" aria-modal="true" aria-label="Alertas de encargos">
      <div class="charge-alert-header">
        <div>
          <span class="eyebrow">Impostos e taxas</span>
          <h3>${pendingCharges.length} encargo(s) aguardam confirmacao</h3>
        </div>
        <button class="icon-button" data-close-charge-alert type="button" aria-label="Fechar">x</button>
      </div>
      <p class="charge-alert-copy">Estes vencimentos passaram de 5 dias e ainda nao possuem confirmacao de pagamento.</p>
      <div class="charge-alert-list">
        ${visibleRows.map((item) => `
          <article class="charge-alert-row">
            <strong>${escapeHtml(item.property)}</strong>
            <span>${escapeHtml(item.client)}</span>
            <span>${escapeHtml(item.charge)}</span>
            <span>${escapeHtml(formatChargeResponsible(item.responsible))}</span>
            <span>${formatDate(item.dueDate)}</span>
            <span>${item.elapsedDays} dia(s)</span>
          </article>
        `).join("")}
      </div>
      ${extraCount > 0 ? `<p class="charge-alert-copy">Mais ${extraCount} encargo(s) aparecem no checklist.</p>` : ""}
      <div class="charge-alert-actions">
        <button class="ghost-button" data-close-charge-alert type="button">Agora nao</button>
        <button class="primary-button" data-open-charge-checklist type="button">Abrir checklist</button>
      </div>
    </div>
  `;
  const closeModal = () => modal.remove();
  modal.querySelectorAll("[data-close-charge-alert]").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelector("[data-open-charge-checklist]")?.addEventListener("click", () => {
    closeModal();
    activateView("charge-checklist");
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.body.appendChild(modal);
}

function isChargeReminderExcludedProperty(propertyName) {
  const normalized = String(propertyName || "").trim().toLowerCase();
  return normalized === "lra" || normalized === "lra2";
}

function getMostRecentChargeDueDate(rule, referenceDate = new Date()) {
  const dueDate = rule.kind === "monthly"
    ? new Date(referenceDate.getFullYear(), referenceDate.getMonth(), rule.day)
    : new Date(referenceDate.getFullYear(), rule.month, rule.day);
  dueDate.setHours(0, 0, 0, 0);
  if (dueDate > referenceDate) {
    if (rule.kind === "monthly") dueDate.setMonth(dueDate.getMonth() - 1);
    else dueDate.setFullYear(dueDate.getFullYear() - 1);
  }
  return dueDate;
}

function daysBetweenDates(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return Math.floor((end - start) / 86400000);
}

function populateSelects() {
  populateSelect(document.querySelector("#contract-form [name='propertyId']"), state.properties, "Selecione o imovel", "description");
  populateSelect(document.querySelector("#expense-form [name='propertyId']"), state.properties, "Selecione o imovel", "description");
  populateSelect(document.querySelector("#payment-form [name='propertyId']"), getPropertiesWithAnyContracts(), "Selecione o imovel com contrato", "description");
  populateSelect(document.querySelector("#contract-form [name='clientId']"), state.clients, "Selecione o cliente", "name");
  populateSelect(document.getElementById("report-property"), state.properties, "Todos os imoveis", "description", true);
  populateSelect(document.getElementById("report-client"), state.clients, "Todos os clientes", "name", true);
  populateSelect(document.getElementById("charge-checklist-property"), state.properties, "Todos os imoveis", "description", true);
  populateSelect(document.getElementById("charge-checklist-client"), state.clients, "Todos os clientes", "name", true);
  populateSelect(document.getElementById("expense-history-property"), state.properties, "Todos os imoveis", "description", true);
  populateSelect(document.getElementById("payment-history-property"), state.properties, "Todos os imoveis", "description", true);
  populateSelect(document.getElementById("missing-payment-property"), getPropertiesWithAnyContracts(), "Todos os imoveis", "description", true);
  updatePaymentContractInfo();
  updateExpenseContractInfo();
}

function populateSelect(select, rows, placeholder, labelKey, includeAll = false) {
  const current = select.value;
  select.innerHTML = "";
  select.append(new Option(placeholder, includeAll ? "all" : ""));
  rows.forEach((row) => select.append(new Option(row[labelKey], row.id)));
  if ([...select.options].some((option) => option.value === current)) {
    select.value = current;
  }
}

function getPropertiesWithAnyContracts() {
  const linkedPropertyIds = new Set(state.contracts.map((contract) => contract.propertyId));
  return state.properties.filter((property) => linkedPropertyIds.has(property.id));
}

function isPropertyExcludedFromOccupancy(property) {
  const normalizedType = String(property?.type || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return normalizedType === "uso proprio";
}

function renderDashboard() {
  const activeContracts = state.contracts.filter((contract) => getContractStatus(contract).key !== "expired");
  const monthlyRevenue = activeContracts.reduce((sum, contract) => sum + contract.monthlyValue, 0);
  const expensesTotal = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const receivedRevenue = state.payments.reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
  const netResult = receivedRevenue - expensesTotal;
  const occupancyProperties = state.properties.filter((property) => !isPropertyExcludedFromOccupancy(property));
  const occupancyPropertyIds = new Set(occupancyProperties.map((property) => property.id));
  const occupiedProperties = new Set(
    activeContracts
      .map((contract) => contract.propertyId)
      .filter((propertyId) => occupancyPropertyIds.has(propertyId)),
  ).size;
  const occupancyRate = occupancyProperties.length ? (occupiedProperties / occupancyProperties.length) * 100 : 0;

  setText("metric-properties", state.properties.length);
  setText("metric-active-contracts", activeContracts.length);
  setText("metric-revenue", formatMoney(receivedRevenue || monthlyRevenue));
  setText("metric-expenses", formatMoney(expensesTotal));
  setText("metric-net", formatMoney(netResult));
  setText("metric-occupancy", `${formatNumber(occupancyRate)}%`);
  renderAppVersionInfo();

  const upcoming = getExpiringContracts(90);
  const adjustments = getUpcomingAdjustments(90);

  setText("upcoming-count", `${upcoming.length} itens`);
  renderList(
    "upcoming-list",
    upcoming,
    (item) => `
      <strong>${escapeHtml(item.property?.description || "Imovel nao localizado")}</strong>
      <span>${escapeHtml(item.client?.name || "Cliente nao localizado")} - termina em ${item.days} dias</span>
      <span>Vigencia ate ${formatDate(item.contract.endDate)} | Aluguel ${formatMoney(item.contract.monthlyValue)}</span>
    `,
  );
  setText("adjustment-count", `${adjustments.length} itens`);
  renderList(
    "adjustment-list",
    adjustments,
    (item) => `
      <strong>${escapeHtml(item.property?.description || "Imovel nao localizado")}</strong>
      <span>${escapeHtml(item.client?.name || "Cliente nao localizado")} - reajuste em ${item.days} dias</span>
      <span>${formatDate(toDateInputValue(item.adjustmentDate))} | ${escapeHtml(item.contract.adjustmentFrequency)} por ${escapeHtml(item.contract.adjustmentMethod)}</span>
    `,
  );

  renderPropertyResult();
  renderDashboardCharts();
}

function renderAppVersionInfo() {
  const deployedAt = isValidDateTime(appMetadata.deployedAt) ? appMetadata.deployedAt : appDeployedAt;
  setText("metric-app-version", appMetadata.version || appVersion);
  setText("institutional-app-version", appMetadata.version || appVersion);
  setText("metric-app-updated", isValidDateTime(deployedAt) ? formatDateTime(deployedAt).replace(",", "") : "Data indisponivel");
}

function renderPropertyResult() {
  updateFinancialPeriodCaption();
  const rows = state.properties.map(getPropertyFinancials);

  renderTable(
    "property-result-body",
    rows,
    (row) => `
      <td>
        <strong>${escapeHtml(row.property.description)}</strong>
        <span class="mini-line">${row.area ? `${formatArea(row.area)} m2` : "Area nao informada"}</span>
      </td>
      <td>${renderPeriodValues(row.revenue)}</td>
      <td>${renderPeriodValues(row.expenses)}</td>
      <td>${renderPeriodValues(row.net, true)}</td>
      <td>${renderPeriodValues(row.netPerSquareMeter, true)}</td>
    `,
  );
}

function getPropertyAccumulatedResult(propertyId) {
  const revenue = state.payments
    .filter((payment) => payment.propertyId === propertyId)
    .reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
  const expenses = state.expenses
    .filter((expense) => expense.propertyId === propertyId)
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  return revenue - expenses;
}

function getTotalAccumulatedResult() {
  return state.properties.reduce((sum, property) => sum + getPropertyAccumulatedResult(property.id), 0);
}

function calculatePropertyRoi(property, periodResult, periodMonths) {
  const investment = Number(property.investmentValue || 0);
  if (!investment) return { annual: 0, total: 0, accumulatedResult: 0 };
  const accumulatedResult = getPropertyAccumulatedResult(property.id);
  return {
    annual: (periodResult / investment) * (12 / periodMonths) * 100,
    total: (accumulatedResult / investment) * 100,
    accumulatedResult,
  };
}

function renderDashboardCharts() {
  const financials = state.properties.map(getPropertyFinancials);
  const referenceDate = getFinancialReferenceDate();

  renderSimpleBarChart(
    "dashboard-revenue-chart",
    financials
      .map((row) => ({ label: row.property.description, value: row.revenue.current }))
      .filter((row) => row.value !== 0)
      .sort((a, b) => b.value - a.value),
    "revenue",
  );

  renderSimpleBarChart(
    "dashboard-net-chart",
    financials
      .map((row) => ({ label: row.property.description, value: row.net.accumulated }))
      .filter((row) => row.value !== 0)
      .sort((a, b) => b.value - a.value),
    "net",
  );

  const expenseGroups = state.expenses.reduce((groups, expense) => {
    const key = expense.expenseType || "Outros";
    groups[key] = (groups[key] || 0) + Number(expense.amount || 0);
    return groups;
  }, {});
  renderSimpleBarChart(
    "dashboard-expense-chart",
    Object.entries(expenseGroups)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value),
    "expense",
  );

  renderDashboardMonthlyChart(referenceDate);
  renderDashboardContractChart();
}

function renderSimpleBarChart(id, rows, tone) {
  const target = document.getElementById(id);
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = document.getElementById("empty-template").innerHTML;
    return;
  }

  const max = Math.max(...rows.map((row) => Math.abs(row.value)), 1);
  target.innerHTML = rows
    .map((row) => {
      const width = Math.max(3, Math.round((Math.abs(row.value) / max) * 100));
      const barClass = [
        "chart-bar",
        tone === "expense" ? "expense" : tone === "revenue" ? "revenue" : "",
        row.value < 0 ? "negative" : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `
        <div class="chart-row">
          <div class="chart-label">
            <span>${escapeHtml(row.label)}</span>
            <strong>${formatMoney(row.value)}</strong>
          </div>
          <div class="chart-track">
            <div class="${barClass}" style="width: ${width}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderDashboardMonthlyChart(referenceDate) {
  const target = document.getElementById("dashboard-monthly-chart");
  const caption = document.getElementById("dashboard-monthly-caption");
  if (!target) return;

  const year = referenceDate.getFullYear();
  if (caption) caption.textContent = `Receitas e despesas em ${year}`;

  const months = Array.from({ length: 12 }, (_, index) => {
    const start = new Date(year, index, 1);
    const end = new Date(year, index + 1, 0);
    const label = capitalize(new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(start));
    const revenue = sumPaymentsInPeriod(state.payments, start, end);
    const expenses = sumExpensesInPeriod(state.expenses, start, end);
    return { label, revenue, expenses, net: revenue - expenses };
  }).filter((month) => month.revenue || month.expenses);

  if (!months.length) {
    target.innerHTML = document.getElementById("empty-template").innerHTML;
    return;
  }

  const max = Math.max(...months.flatMap((month) => [month.revenue, month.expenses]), 1);
  target.innerHTML = months
    .map((month) => `
      <div class="monthly-chart-row">
        <span class="monthly-label">${escapeHtml(month.label)}</span>
        <div class="monthly-bars">
          <div class="monthly-bar-wrap" title="Receita: ${formatMoney(month.revenue)}">
            <div class="chart-bar revenue" style="width: ${Math.max(3, Math.round((month.revenue / max) * 100))}%"></div>
          </div>
          <div class="monthly-bar-wrap" title="Despesas: ${formatMoney(month.expenses)}">
            <div class="chart-bar expense" style="width: ${Math.max(3, Math.round((month.expenses / max) * 100))}%"></div>
          </div>
        </div>
        <span class="monthly-net ${month.net < 0 ? "negative-text" : "positive-text"}">${formatMoney(month.net)}</span>
      </div>
    `)
    .join("");
}

function renderDashboardContractChart() {
  const target = document.getElementById("dashboard-contract-chart");
  const caption = document.getElementById("dashboard-contract-caption");
  if (!target) return;

  const groups = [
    { key: "active", label: "Ativos", tone: "active" },
    { key: "ending", label: "A vencer", tone: "ending" },
    { key: "expired", label: "Encerrados", tone: "expired" },
  ].map((group) => ({
    ...group,
    count: state.contracts.filter((contract) => getContractStatus(contract).key === group.key).length,
  }));

  const total = groups.reduce((sum, group) => sum + group.count, 0);
  if (caption) caption.textContent = `${total} contrato(s)`;

  if (!total) {
    target.innerHTML = document.getElementById("empty-template").innerHTML;
    return;
  }

  target.innerHTML = `
    <div class="contract-status-track">
      ${groups
        .filter((group) => group.count)
        .map((group) => {
          const width = Math.max(8, Math.round((group.count / total) * 100));
          return `<div class="contract-status-segment ${group.tone}" style="width: ${width}%" title="${group.label}: ${group.count}"></div>`;
        })
        .join("")}
    </div>
    <div class="contract-status-legend">
      ${groups
        .map(
          (group) => `
            <article class="contract-status-item">
              <span class="legend-dot ${group.tone}"></span>
              <div>
                <strong>${group.count}</strong>
                <span>${group.label}</span>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function getPropertyFinancials(property) {
  const referenceDate = getFinancialReferenceDate();
  const currentMonthStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
  const currentMonthEnd = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0);
  const yearStart = new Date(referenceDate.getFullYear(), 0, 1);
  const area = parseAreaValue(property.area);
  const propertyPayments = state.payments.filter((payment) => payment.propertyId === property.id);
  const revenue = getPaymentPeriodTotals(propertyPayments, currentMonthStart, currentMonthEnd, yearStart, referenceDate);

  const propertyExpenses = state.expenses.filter((expense) => expense.propertyId === property.id);
  const expenses = {
    current: sumExpensesInPeriod(propertyExpenses, currentMonthStart, currentMonthEnd),
    annual: sumExpensesInPeriod(propertyExpenses, yearStart, referenceDate),
    accumulated: propertyExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
  };
  const net = subtractPeriodTotals(revenue, expenses);
  const netPerSquareMeter = area ? dividePeriodTotals(net, area) : createPeriodTotals();

  return { property, area, revenue, expenses, net, netPerSquareMeter };
}

function getFinancialReferenceDate() {
  const dates = [
    ...state.expenses.map((expense) => getExpenseCompetenceDate(expense)),
    ...state.payments.map((payment) => getPaymentCompetenceDate(payment)),
    ...state.contracts.flatMap((contract) => [contract.updatedAt ? new Date(contract.updatedAt) : null, parseDate(contract.startDate)]),
  ].filter(Boolean);
  return dates.length ? new Date(Math.max(...dates.map((date) => date.getTime()))) : new Date();
}

function getPaymentPeriodTotals(payments, currentMonthStart, currentMonthEnd, yearStart, referenceDate) {
  return {
    current: sumPaymentsInPeriod(payments, currentMonthStart, currentMonthEnd),
    annual: sumPaymentsInPeriod(payments, yearStart, referenceDate),
    accumulated: payments.reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0),
  };
}

function getFinancialPeriodLabels() {
  const referenceDate = getFinancialReferenceDate();
  return {
    current: new Intl.DateTimeFormat("pt-BR", { month: "2-digit", year: "numeric" }).format(referenceDate),
    annual: String(referenceDate.getFullYear()),
    accumulated: "Acumulado",
  };
}

function updateFinancialPeriodCaption() {
  const caption = document.getElementById("financial-period-caption");
  if (!caption) return;
  const labels = getFinancialPeriodLabels();
  caption.textContent = `Competencia ${labels.current}, ano ${labels.annual} e acumulado`;
}

function createPeriodTotals() {
  return { current: 0, annual: 0, accumulated: 0 };
}

function subtractPeriodTotals(left, right) {
  return {
    current: left.current - right.current,
    annual: left.annual - right.annual,
    accumulated: left.accumulated - right.accumulated,
  };
}

function dividePeriodTotals(totals, divisor) {
  return {
    current: totals.current / divisor,
    annual: totals.annual / divisor,
    accumulated: totals.accumulated / divisor,
  };
}

function renderPeriodValues(totals, highlightBalance = false) {
  const labels = getFinancialPeriodLabels();
  return `
    <div class="period-values">
      ${renderPeriodValue(labels.current, totals.current, highlightBalance)}
      ${renderPeriodValue(labels.annual, totals.annual, highlightBalance)}
      ${renderPeriodValue(labels.accumulated, totals.accumulated, highlightBalance)}
    </div>
  `;
}

function renderPeriodValue(label, value, highlightBalance) {
  const tone = highlightBalance && value < 0 ? "negative" : highlightBalance && value > 0 ? "positive" : "";
  return `
    <span class="period-value ${tone}">
      <small>${label}</small>
      <strong>${formatMoney(value)}</strong>
    </span>
  `;
}

function sumExpensesInPeriod(expenses, startDate, endDate) {
  return expenses
    .filter((expense) => isDateInPeriod(getExpenseCompetenceDate(expense), startDate, endDate))
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
}

function sumPaymentsInPeriod(payments, startDate, endDate) {
  return payments
    .filter((payment) => isDateInPeriod(getPaymentCompetenceDate(payment), startDate, endDate))
    .reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
}

function contractOverlapsPeriod(contract, periodStart, periodEnd) {
  const contractStart = parseDate(contract.startDate);
  const contractEnd = parseDate(contract.endDate);
  return Boolean(contractStart && contractEnd && contractStart <= periodEnd && contractEnd >= periodStart);
}

function isDateInPeriod(date, startDate, endDate) {
  return Boolean(date && startDate && endDate && date >= startDate && date <= endDate);
}

function parseDate(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function parseCompetence(value) {
  if (!value) return null;
  const [year, month] = String(value).split("-").map(Number);
  if (!year || !month) return null;
  return new Date(year, month - 1, 1);
}

function normalizeCompetence(value, fallbackDate = new Date()) {
  const parsed = parseCompetence(value);
  if (parsed) return toMonthValue(parsed);
  const fallback = fallbackDate instanceof Date ? fallbackDate : parseDate(fallbackDate);
  return toMonthValue(fallback || new Date());
}

function getOpenCompetence() {
  return toMonthValue(getFinancialReferenceDate());
}

function getExpenseCompetenceDate(expense) {
  return parseCompetence(expense?.competence) || parseDate(expense?.expenseDate);
}

function getPaymentCompetenceDate(payment) {
  return parseCompetence(payment?.competence) || parseDate(payment?.paymentDate);
}

function bindFinancialCompetenceFields(form, dateFieldName, afterDateChange) {
  if (!form) return;
  const dateInput = form.elements[dateFieldName];
  const competenceInput = form.elements.competence;
  competenceInput?.addEventListener("input", () => {
    competenceInput.dataset.autoCompetence = "false";
  });
  competenceInput?.addEventListener("change", () => {
    competenceInput.dataset.autoCompetence = "false";
  });
  ["input", "change"].forEach((eventName) => {
    dateInput?.addEventListener(eventName, () => {
      syncFinancialCompetence(form, dateFieldName);
      afterDateChange?.();
    });
  });
}

function syncFinancialCompetence(form, dateFieldName, options = {}) {
  if (!form?.elements.competence) return;
  const input = form.elements.competence;
  const suggested = getSuggestedFinancialCompetence(dateFieldName, form.elements[dateFieldName]?.value || getFinancialReferenceDate());
  const overwrite = options.overwrite ?? (!input.value || input.dataset.autoCompetence === "true");
  if (!overwrite && input.value) return;
  input.value = suggested;
  input.dataset.autoCompetence = "true";
}

function getSuggestedFinancialCompetence(dateFieldName, referenceDate) {
  const reference = referenceDate instanceof Date ? new Date(referenceDate) : parseDate(referenceDate);
  if (dateFieldName === "paymentDate" && reference) {
    reference.setDate(1);
    reference.setMonth(reference.getMonth() - 1);
    return toMonthValue(reference);
  }
  return normalizeCompetence("", reference || getFinancialReferenceDate());
}

function getFinancialLaunchCategory(collectionName, record) {
  if (collectionName === "expenses") return String(record.expenseType || "").trim().toLowerCase();
  if (collectionName === "payments") return "receita";
  return "";
}

function getFinancialLaunchCompetence(collectionName, record) {
  if (collectionName === "expenses") return normalizeCompetence(record.competence, record.expenseDate);
  if (collectionName === "payments") return normalizeCompetence(record.competence, record.paymentDate);
  return "";
}

function findDuplicateFinancialLaunches(collectionName, record) {
  if (!["expenses", "payments"].includes(collectionName)) return [];
  const competence = getFinancialLaunchCompetence(collectionName, record);
  const category = getFinancialLaunchCategory(collectionName, record);
  return state[collectionName].filter((item) => {
    if (item.id === record.id) return false;
    if (getFinancialLaunchCompetence(collectionName, item) !== competence) return false;
    if (getFinancialLaunchCategory(collectionName, item) !== category) return false;
    if (collectionName === "payments") {
      return item.propertyId === record.propertyId && item.contractId === record.contractId;
    }
    return item.propertyId === record.propertyId;
  });
}

function confirmDuplicateFinancialLaunch(collectionName, record) {
  const duplicates = findDuplicateFinancialLaunches(collectionName, record);
  if (!duplicates.length) return true;
  const kind = collectionName === "expenses" ? "despesa" : "receita";
  const category = collectionName === "expenses" ? record.expenseType : "Receita";
  const message = `Ja existe ${duplicates.length} ${kind}(s) para ${category} na competencia ${formatCompetence(getFinancialLaunchCompetence(collectionName, record))} deste imovel. Deseja salvar mesmo assim?`;
  return window.confirm(message);
}

function formatCompetence(value) {
  const date = parseCompetence(value);
  if (!date) return "-";
  return new Intl.DateTimeFormat("pt-BR", { month: "2-digit", year: "numeric" }).format(date);
}

function firstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function parseAreaValue(area) {
  const match = String(area || "").match(/\d+(?:[.,]\d+)*/);
  if (!match) return 0;
  const value = match[0];
  const normalized = value.includes(",")
    ? value.replace(/\./g, "").replace(",", ".")
    : value.replace(/\.(?=\d{3}(?:\D|$))/g, "");
  return Number(normalized) || 0;
}

function formatArea(value) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value);
}

function renderProperties() {
  renderTable(
    "properties-body",
    state.properties,
    (property) => `
      <td>${escapeHtml(property.description)}</td>
      <td>${escapeHtml(property.type)}</td>
      <td>${escapeHtml(property.area)}</td>
      <td>${escapeHtml(property.location)}</td>
      <td>${property.investmentValue ? formatMoney(property.investmentValue) : "-"}</td>
      <td>${renderDocumentLink(property.documentLink)}</td>
      <td>${actions("properties", property.id, "property-form")}</td>
    `,
  );
}

function renderDocumentLink(link) {
  if (!link) return "-";
  return `<a href="${escapeHtml(link)}" target="_blank" rel="noopener">Abrir documento</a>`;
}

function renderClients() {
  renderTable(
    "clients-body",
    state.clients,
    (client) => `
      <td>${escapeHtml(client.document)}</td>
      <td>${escapeHtml(client.name)}</td>
      <td>${escapeHtml(client.contact)}</td>
      <td>${escapeHtml(client.phone)}</td>
      <td>${escapeHtml(client.email || "-")}</td>
      <td>${actions("clients", client.id, "client-form")}</td>
    `,
  );
}

function renderContracts() {
  renderTable(
    "contracts-body",
    state.contracts,
    (contract) => {
      const property = findProperty(contract.propertyId);
      const client = findClient(contract.clientId);
      return `
        <td>${escapeHtml(property?.description || "-")}</td>
        <td>${escapeHtml(client?.name || "-")}</td>
        <td>${formatDate(contract.startDate)} a ${formatDate(contract.endDate)}</td>
        <td>${formatMoney(contract.monthlyValue)}</td>
        <td>${renderContractAdjustedRent(contract)}</td>
        <td>${renderContractFinancialTerms(contract)}</td>
        <td>${escapeHtml(contract.adjustmentFrequency)} - ${escapeHtml(contract.adjustmentMethod)}</td>
        <td>${renderChargeSummary(contract)}</td>
        <td>
          <div class="actions-cell">
            <button class="small-button" data-whatsapp="${contract.id}" type="button">WhatsApp</button>
            <button class="small-button" data-whatsapp-attachment="${contract.id}" type="button">WhatsApp + anexo</button>
            <button class="small-button" data-email="${contract.id}" type="button">E-mail</button>
          </div>
        </td>
        <td>${actions("contracts", contract.id, "contract-form")}</td>
      `;
    },
  );

  document.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", () => openWhatsApp(button.dataset.whatsapp));
  });
  document.querySelectorAll("[data-email]").forEach((button) => {
    button.addEventListener("click", () => openEmail(button.dataset.email));
  });
  document.querySelectorAll("[data-whatsapp-attachment]").forEach((button) => {
    button.addEventListener("click", () => shareChargesAttachment(button.dataset.whatsappAttachment));
  });
}

function renderExpenses() {
  const rows = getVisibleExpenses();
  setText("expenses-list-caption", getFinancialLaunchCaption("expense", rows.length));
  renderTable(
    "expenses-body",
    rows,
    (expense) => {
      const contract = findFinancialContract(expense.propertyId, expense.expenseDate, expense.contractId);
      return `
        <td>${escapeHtml(findProperty(expense.propertyId)?.description || "-")}</td>
        <td>${escapeHtml(expense.contractCode || (contract ? getContractCode(contract) : "-"))}</td>
        <td>${escapeHtml(expense.expenseType)}</td>
        <td>${formatDate(expense.expenseDate)}</td>
        <td>${formatCompetence(expense.competence)}</td>
        <td>${formatMoney(expense.amount)}</td>
        <td>${escapeHtml(expense.note || "-")}</td>
        <td>${actions("expenses", expense.id, "expense-form")}</td>
      `;
    },
  );
}

function renderPayments() {
  const rows = getVisiblePayments();
  setText("payments-list-caption", getFinancialLaunchCaption("payment", rows.length));
  renderTable(
    "payments-body",
    rows,
    (payment) => {
      const contract = findFinancialContract(payment.propertyId, payment.paymentDate, payment.contractId);
      const client = findClient(contract?.clientId);
      return `
        <td>${escapeHtml(findProperty(payment.propertyId)?.description || "-")}</td>
        <td>${escapeHtml(payment.contractCode || (contract ? getContractCode(contract) : "-"))}</td>
        <td>${escapeHtml(payment.lessorName || client?.name || "-")}</td>
        <td>${formatDate(payment.paymentDate)}</td>
        <td>${formatCompetence(payment.competence)}</td>
        <td>${formatMoney(payment.amount)}</td>
        <td>${formatMoney(payment.chargeAmount)}</td>
        <td>${formatMoney(payment.totalAmount)}</td>
        <td>${escapeHtml(payment.history || "-")}</td>
        <td>${actions("payments", payment.id, "payment-form")}</td>
      `;
    },
  );
}

function renderChargeChecklist() {
  const rows = getChargeChecklistRows();
  const visibleRows = filterChargeChecklistRows(rows);
  const pendingCount = rows.filter((row) => !row.confirmed).length;
  const overdueCount = rows.filter((row) => !row.confirmed && row.elapsedDays > 0).length;
  setText("charge-checklist-count", `${pendingCount} pendente(s), ${overdueCount} vencido(s)`);

  renderTable(
    "charge-checklist-body",
    visibleRows,
    (row) => `
      <td>
        <input class="charge-paid-checkbox" type="checkbox" data-charge-paid="${escapeHtml(row.confirmationId)}" ${row.confirmed ? "checked" : ""} />
      </td>
      <td>${escapeHtml(row.property)}</td>
      <td>
        <strong class="charge-client-name">${escapeHtml(row.client)}</strong>
        <span class="mini-line">${escapeHtml(row.clientContact || "Contato nao informado")}</span>
      </td>
      <td>${escapeHtml(row.charge)}</td>
      <td>${escapeHtml(formatChargeResponsible(row.responsible))}</td>
      <td>${formatDate(row.dueDate)}</td>
      <td>
        <input class="table-date-input" type="date" data-charge-payment-date="${escapeHtml(row.confirmationId)}" value="${escapeHtml(row.paymentDate || "")}" ${row.confirmed ? "" : "disabled"} />
      </td>
      <td>${escapeHtml(row.confirmedBy || "-")}</td>
    `,
  );
}

function getChargeChecklistRows(referenceDate = new Date()) {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  const period = getChargeChecklistDateRange(today);
  const contractRows = state.contracts
    .filter((contract) => getContractStatus(contract).key !== "expired")
    .flatMap((contract) => {
      const property = findProperty(contract.propertyId);
      if (isChargeReminderExcludedProperty(property?.description)) return [];
      const client = findClient(contract.clientId);
      return chargeRules.flatMap((rule) => {
        if (isChargeAlreadyInClientName(contract, rule)) return [];
        const dueDates = period.hasCustomPeriod
          ? getChargeDueDatesInRange(rule, period.startDate, period.endDate)
          : [adjustToPreviousBusinessDay(getMostRecentChargeDueDate(rule, today))].filter((dueDate) => dueDate >= period.startDate);
        const contractDueDates = dueDates.filter((dueDate) => isChargeDueDateInsideContract(dueDate, contract));
        return contractDueDates.map((dueDateValue) => {
          const dueDate = toIsoDate(dueDateValue);
          const confirmationId = getChargeConfirmationId(contract.id, rule.key, dueDate);
          const confirmation = getChargeConfirmation(confirmationId);
          return {
            confirmationId,
            contractId: contract.id,
            propertyId: contract.propertyId,
            clientId: contract.clientId,
            property: property?.description || "-",
            client: client?.name || "-",
            clientContact: client?.contact || client?.phone || client?.email || "",
            charge: rule.label,
            chargeKey: rule.key,
            responsible: contract[rule.key] || "cliente",
            dueDate,
            elapsedDays: daysBetweenDates(parseDate(dueDate), today),
            confirmed: Boolean(confirmation?.confirmed),
            paymentDate: confirmation?.paymentDate || "",
            confirmedBy: confirmation?.confirmedByUserName || "",
          };
        });
      });
    });
  return [
    ...contractRows,
    ...getOwnUseChargeChecklistRows(period, today),
  ]
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)) || a.property.localeCompare(b.property));
}

function getOwnUseChargeChecklistRows(period, today) {
  return state.properties
    .filter(isPropertyExcludedFromOccupancy)
    .filter((property) => !isChargeReminderExcludedProperty(property?.description))
    .flatMap((property) => chargeRules.flatMap((rule) => {
      const dueDates = period.hasCustomPeriod
        ? getChargeDueDatesInRange(rule, period.startDate, period.endDate)
        : [adjustToPreviousBusinessDay(getMostRecentChargeDueDate(rule, today))].filter((dueDate) => dueDate >= period.startDate);
      return dueDates.map((dueDateValue) => {
        const dueDate = toIsoDate(dueDateValue);
        const confirmationId = getChargeConfirmationId(`own-use-${property.id}`, rule.key, dueDate);
        const confirmation = getChargeConfirmation(confirmationId);
        return {
          confirmationId,
          contractId: "",
          propertyId: property.id,
          clientId: "own-use",
          property: property.description || "-",
          client: "Uso proprio",
          clientContact: "",
          charge: rule.label,
          chargeKey: rule.key,
          responsible: "locador",
          dueDate,
          elapsedDays: daysBetweenDates(parseDate(dueDate), today),
          confirmed: Boolean(confirmation?.confirmed),
          paymentDate: confirmation?.paymentDate || "",
          confirmedBy: confirmation?.confirmedByUserName || "",
        };
      });
    }));
}

function isChargeAlreadyInClientName(contract, rule) {
  return rule.key === "condoFeeResponsible"
    && (contract.condoFeeResponsible || "cliente") === "cliente"
    && Boolean(contract.condoFeeInClientName);
}

function isChargeDueDateInsideContract(dueDate, contract) {
  const contractStart = parseDate(contract.startDate);
  const contractEnd = parseDate(contract.endDate);
  return (!contractStart || dueDate >= contractStart) && (!contractEnd || dueDate <= contractEnd);
}

function getChargeChecklistDateRange(referenceDate = new Date()) {
  const startInput = document.getElementById("charge-checklist-start")?.value || "";
  const endInput = document.getElementById("charge-checklist-end")?.value || "";
  const monitoringStart = parseDate(chargeMonitoringStartDateValue);
  const requestedStart = parseDate(startInput);
  const requestedEnd = parseDate(endInput);
  const endDate = requestedEnd || referenceDate;
  endDate.setHours(0, 0, 0, 0);
  const startDate = requestedStart && requestedStart > monitoringStart ? requestedStart : monitoringStart;
  startDate.setHours(0, 0, 0, 0);
  return {
    startDate,
    endDate: endDate < startDate ? startDate : endDate,
    hasCustomPeriod: Boolean(startInput || endInput),
  };
}

function getChargeDueDatesInRange(rule, startDate, endDate) {
  const rows = [];
  if (rule.kind === "monthly") {
    const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), rule.day);
    if (cursor < startDate) cursor.setMonth(cursor.getMonth() + 1);
    while (cursor <= endDate) {
      const adjusted = adjustToPreviousBusinessDay(cursor);
      if (adjusted >= startDate && adjusted <= endDate) rows.push(new Date(adjusted));
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return rows;
  }
  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year += 1) {
    const dueDate = adjustToPreviousBusinessDay(new Date(year, rule.month, rule.day));
    if (dueDate >= startDate && dueDate <= endDate) rows.push(dueDate);
  }
  return rows;
}

function filterChargeChecklistRows(rows) {
  const propertyId = document.getElementById("charge-checklist-property")?.value || "all";
  const clientId = document.getElementById("charge-checklist-client")?.value || "all";
  const responsible = document.getElementById("charge-checklist-responsible")?.value || "all";
  const status = document.getElementById("charge-checklist-status")?.value || "pending";
  return rows
    .filter((row) => propertyId === "all" || row.propertyId === propertyId)
    .filter((row) => clientId === "all" || row.clientId === clientId)
    .filter((row) => responsible === "all" || row.responsible === responsible)
    .filter((row) => {
      if (status === "confirmed") return row.confirmed;
      if (status === "overdue") return !row.confirmed && row.elapsedDays > 0;
      if (status === "pending") return !row.confirmed;
      return true;
    });
}

function getChargeConfirmationId(contractId, chargeKey, dueDate) {
  return `${contractId || "contract"}::${chargeKey || "charge"}::${dueDate || "date"}`;
}

function getChargeConfirmation(confirmationId) {
  return (state.chargeConfirmations || []).find((item) => item.id === confirmationId);
}

function toggleChargeConfirmation(confirmationId, confirmed) {
  if (!requirePermission("financial:write", "Seu perfil nao permite confirmar pagamentos.")) {
    renderChargeChecklist();
    return;
  }
  const row = getChargeChecklistRows().find((item) => item.confirmationId === confirmationId);
  if (!row) return;
  const user = getCurrentUser();
  const before = getChargeConfirmation(confirmationId) || null;
  const next = {
    ...(before || {}),
    id: confirmationId,
    contractId: row.contractId,
    chargeKey: row.chargeKey,
    dueDate: row.dueDate,
    paymentDate: confirmed ? (before?.paymentDate || toIsoDate(new Date())) : "",
    confirmed,
    confirmedAt: confirmed ? new Date().toISOString() : "",
    confirmedByUserId: confirmed ? (user?.id || "system") : "",
    confirmedByUserName: confirmed ? (user?.username || "Sistema") : "",
  };
  upsertChargeConfirmation(before, next, row);
}

function updateChargeConfirmationPaymentDate(confirmationId, paymentDate) {
  if (!requirePermission("financial:write", "Seu perfil nao permite alterar confirmacoes.")) {
    renderChargeChecklist();
    return;
  }
  const row = getChargeChecklistRows().find((item) => item.confirmationId === confirmationId);
  const before = getChargeConfirmation(confirmationId);
  if (!row || !before?.confirmed) return;
  upsertChargeConfirmation(before, { ...before, paymentDate }, row);
}

function upsertChargeConfirmation(before, next, row) {
  const index = (state.chargeConfirmations || []).findIndex((item) => item.id === next.id);
  state.chargeConfirmations = state.chargeConfirmations || [];
  if (index >= 0) state.chargeConfirmations[index] = next;
  else state.chargeConfirmations.push(next);
  addAuditLog(
    before ? "charge_confirmation_updated" : "charge_confirmation_created",
    "chargeConfirmations",
    next.id,
    before,
    { ...next, message: `${row.charge} - ${row.property} - ${formatChargeResponsible(row.responsible)}` },
    true,
  );
  saveState();
  renderAll();
}

function formatChargeResponsible(value) {
  return value === "locador" ? "Imobiliaria" : "Cliente";
}

function renderFinancialLaunches() {
  renderExpenses();
  renderPayments();
  renderMissingPayments();
}

function setDefaultMissingPaymentPeriod(overwrite = false) {
  const startInput = document.getElementById("missing-payment-start");
  const endInput = document.getElementById("missing-payment-end");
  if (!startInput || !endInput) return;
  const period = getDefaultMissingPaymentPeriod();
  if (overwrite || !startInput.value) startInput.value = period.startCompetence;
  if (overwrite || !endInput.value) endInput.value = period.endCompetence;
  if (overwrite) {
    const propertyInput = document.getElementById("missing-payment-property");
    if (propertyInput) propertyInput.value = "all";
  }
}

function getDefaultMissingPaymentPeriod(reference = getFinancialReferenceDate()) {
  const end = new Date(reference.getFullYear(), reference.getMonth() - 1, 1);
  const start = new Date(end.getFullYear(), 0, 1);
  if (start > end) start.setFullYear(start.getFullYear() - 1);
  return { startCompetence: toMonthValue(start), endCompetence: toMonthValue(end) };
}

function getMissingPaymentCompetences(contracts, payments, filters) {
  const start = parseCompetence(filters.startCompetence);
  const end = parseCompetence(filters.endCompetence);
  if (!start || !end || start > end) return [];

  const paymentKeys = new Set(payments.map((payment) => {
    const competence = getFinancialLaunchCompetence("payments", payment);
    return `${payment.contractId || ""}:${payment.propertyId || ""}:${competence}`;
  }));

  return listMonths(start, end)
    .flatMap((month) => contracts
      .filter((contract) => filters.propertyId === "all" || contract.propertyId === filters.propertyId)
      .filter((contract) => contractOverlapsPeriod(
        contract,
        firstDayOfMonth(month),
        new Date(month.getFullYear(), month.getMonth() + 1, 0),
      ))
      .filter((contract) => !isContractMonthInGracePeriod(contract, month))
      .filter((contract) => !paymentKeys.has(`${contract.id || ""}:${contract.propertyId || ""}:${toMonthValue(month)}`))
      .map((contract) => ({ contract, competence: toMonthValue(month) })))
    .sort((left, right) => right.competence.localeCompare(left.competence)
      || String(findProperty(left.contract.propertyId)?.description || "").localeCompare(String(findProperty(right.contract.propertyId)?.description || "")));
}

function renderMissingPayments() {
  const body = document.getElementById("missing-payments-body");
  if (!body) return;
  setDefaultMissingPaymentPeriod();
  const filters = {
    propertyId: document.getElementById("missing-payment-property")?.value || "all",
    startCompetence: document.getElementById("missing-payment-start")?.value || "",
    endCompetence: document.getElementById("missing-payment-end")?.value || "",
  };
  const start = parseCompetence(filters.startCompetence);
  const end = parseCompetence(filters.endCompetence);
  const message = document.getElementById("missing-payments-message");
  if (!start || !end || start > end) {
    setText("missing-payments-caption", "Periodo invalido");
    if (message) message.textContent = "A competencia inicial deve ser anterior ou igual a competencia final.";
    renderTable("missing-payments-body", [], () => "");
    return;
  }
  if (message) message.textContent = "";
  const rows = getMissingPaymentCompetences(state.contracts, state.payments, filters);
  const propertyLabel = filters.propertyId === "all" ? "todos os imoveis" : (findProperty(filters.propertyId)?.description || "imovel selecionado");
  setText("missing-payments-caption", `${rows.length} pendencia(s) - ${formatCompetence(filters.startCompetence)} a ${formatCompetence(filters.endCompetence)} - ${propertyLabel}`);
  updateMissingPaymentIndicators();
  renderTable("missing-payments-body", rows, ({ contract, competence }) => {
    const property = findProperty(contract.propertyId);
    const client = findClient(contract.clientId);
    return `
      <td><span class="status ${parseCompetence(competence) < firstDayOfMonth(getFinancialReferenceDate()) ? "overdue" : "open"}">${formatCompetence(competence)}</span></td>
      <td>${escapeHtml(property?.description || "-")}</td>
      <td>${escapeHtml(getContractCode(contract) || "-")}</td>
      <td>${escapeHtml(client?.name || "-")}</td>
      <td>${formatDate(contract.startDate)} a ${formatDate(contract.endDate)}</td>
      <td>${formatMoney(getContractMonthlyValueForCompetence(contract, parseCompetence(competence)))}</td>
      <td><button class="small-button" data-missing-contract="${escapeHtml(contract.id)}" data-missing-competence="${escapeHtml(competence)}" type="button">Lancar receita</button></td>
    `;
  });
}

function updateMissingPaymentIndicators() {
  const period = getDefaultMissingPaymentPeriod();
  const count = getMissingPaymentCompetences(state.contracts, state.payments, { propertyId: "all", ...period }).length;
  setText("metric-missing-payments", count);
  const badge = document.getElementById("missing-payments-nav-badge");
  if (badge) {
    badge.textContent = String(count);
    badge.classList.toggle("hidden", count === 0);
    badge.setAttribute("aria-label", `${count} competencia(s) sem receita`);
  }
}

function getPaymentDateForCompetence(contract, competence) {
  const month = parseCompetence(competence);
  if (!month) return toDateInputValue(getFinancialReferenceDate());
  const paymentMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const lastDay = new Date(paymentMonth.getFullYear(), paymentMonth.getMonth() + 1, 0).getDate();
  paymentMonth.setDate(Math.min(Math.max(Number(contract?.dueDay || 1), 1), lastDay));
  return toDateInputValue(paymentMonth);
}

function startMissingPaymentLaunch(contractId, competence) {
  if (!canWriteCollection("payments")) {
    alert("Seu perfil nao permite lancar receitas.");
    return;
  }
  const contract = state.contracts.find((item) => item.id === contractId);
  const form = document.getElementById("payment-form");
  if (!contract || !form) return;
  activateView("payments");
  form.reset();
  form.elements.id.value = "";
  form.elements.paymentDate.value = getPaymentDateForCompetence(contract, competence);
  form.elements.competence.value = competence;
  form.elements.competence.dataset.autoCompetence = "false";
  form.elements.propertyId.value = contract.propertyId;
  form.elements.contractId.value = contract.id;
  updatePaymentContractInfo(form);
  form.elements.amount.value = formatMoneyInputValue(getContractMonthlyValueForCompetence(contract, parseCompetence(competence)));
  form.elements.chargeAmount.value = "";
  form.elements.history.value = `Competencia ${formatCompetence(competence)} identificada no controle de pendencias.`;
  updatePaymentTotal(form);
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  form.elements.amount.focus({ preventScroll: true });
}

function getVisibleExpenses() {
  const filters = getFinancialLaunchFilters("expense");
  return getFilteredFinancialLaunches(state.expenses, getExpenseCompetenceDate, "expenseDate", filters);
}

function getVisiblePayments() {
  const filters = getFinancialLaunchFilters("payment");
  return getFilteredFinancialLaunches(state.payments, getPaymentCompetenceDate, "paymentDate", filters);
}

function getFinancialLaunchFilters(type) {
  return {
    propertyId: document.getElementById(`${type}-history-property`)?.value || "all",
    startDate: document.getElementById(`${type}-history-start`)?.value || "",
    endDate: document.getElementById(`${type}-history-end`)?.value || "",
  };
}

function getFilteredFinancialLaunches(rows, competenceGetter, dateKey, filters) {
  const hasFilters = hasFinancialLaunchFilters(filters);
  const startCompetence = parseCompetence(filters.startDate);
  const endCompetence = parseCompetence(filters.endDate);
  const filteredRows = rows
    .filter((row) => filters.propertyId === "all" || row.propertyId === filters.propertyId)
    .filter((row) => !startCompetence || competenceGetter(row) >= startCompetence)
    .filter((row) => !endCompetence || competenceGetter(row) <= endCompetence)
    .sort((left, right) => {
      const dateComparison = String(right.competence || right[dateKey] || "").localeCompare(String(left.competence || left[dateKey] || ""));
      if (dateComparison) return dateComparison;
      return String(right.id || "").localeCompare(String(left.id || ""));
    });
  return hasFilters ? filteredRows : filteredRows.slice(0, recentFinancialLaunchLimit);
}

function hasFinancialLaunchFilters(filters) {
  return filters.propertyId !== "all" || Boolean(filters.startDate || filters.endDate);
}

function getFinancialLaunchCaption(type, visibleCount) {
  const filters = getFinancialLaunchFilters(type);
  if (!hasFinancialLaunchFilters(filters)) {
    return `Ultimos ${Math.min(visibleCount, recentFinancialLaunchLimit)} lancamento(s) em ordem decrescente`;
  }
  const parts = [];
  if (filters.propertyId !== "all") parts.push(findProperty(filters.propertyId)?.description || "imovel selecionado");
  if (filters.startDate) parts.push(`desde ${formatCompetence(filters.startDate)}`);
  if (filters.endDate) parts.push(`ate ${formatCompetence(filters.endDate)}`);
  return `${visibleCount} lancamento(s) filtrado(s)${parts.length ? ` - ${parts.join(" | ")}` : ""}`;
}

function clearFinancialLaunchFilters(type) {
  const propertyInput = document.getElementById(`${type}-history-property`);
  const startInput = document.getElementById(`${type}-history-start`);
  const endInput = document.getElementById(`${type}-history-end`);
  if (propertyInput) propertyInput.value = "all";
  if (startInput) startInput.value = "";
  if (endInput) endInput.value = "";
  renderFinancialLaunches();
}

function renderFinancialErp() {
  const period = getErpPeriod();
  const receivables = buildAutomaticReceivables(period);
  const payments = state.payments.filter((payment) => isDateInPeriod(getPaymentCompetenceDate(payment), period.startDate, period.endDate));
  const expenses = state.expenses.filter((expense) => isDateInPeriod(getExpenseCompetenceDate(expense), period.startDate, period.endDate));
  const receivedRevenue = payments.reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
  const expectedRevenue = receivables.reduce((sum, item) => sum + item.expected, 0);
  const expensesTotal = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const overdueTotal = receivables.filter((item) => item.statusKey === "overdue").reduce((sum, item) => sum + item.balance, 0);
  const operatingResult = receivedRevenue - expensesTotal;
  const operatingMargin = receivedRevenue ? (operatingResult / receivedRevenue) * 100 : 0;
  const totalInvestment = state.properties.reduce((sum, property) => sum + Number(property.investmentValue || 0), 0);
  const annualizedRoi = totalInvestment ? (operatingResult / totalInvestment) * (12 / period.months.length) * 100 : 0;
  const accumulatedResult = getTotalAccumulatedResult();
  const totalRoi = totalInvestment ? (accumulatedResult / totalInvestment) * 100 : 0;

  setText("erp-expected-revenue", formatMoney(expectedRevenue));
  setText("erp-received-revenue", formatMoney(receivedRevenue));
  setText("erp-overdue-total", formatMoney(overdueTotal));
  setText("erp-cash-balance", formatMoney(operatingResult));
  setText("erp-operating-margin", `${formatNumber(operatingMargin)}%`);
  setText("erp-roi", `${formatNumber(annualizedRoi)}%`);
  setText("erp-total-roi", `${formatNumber(totalRoi)}%`);
  setText("erp-expenses-total", formatMoney(expensesTotal));
  setText("erp-operating-result", formatMoney(operatingResult));
  setText("erp-dre-period", `${formatMonth(period.startDate)} a ${formatMonth(period.endDate)}`);

  renderDreList(receivedRevenue, expensesTotal, overdueTotal, expectedRevenue);
  renderErpReceivables(receivables);
  renderErpCashflow(period, payments, expenses);
  renderErpExpenseCategories(expenses);
  renderErpPropertyProfitability(period, payments, expenses);
}

function setupErpPeriodFilters() {
  const yearInput = document.getElementById("erp-year");
  const startMonthInput = document.getElementById("erp-start-month");
  const endMonthInput = document.getElementById("erp-end-month");
  if (!yearInput || !startMonthInput || !endMonthInput) return;

  const reference = getFinancialReferenceDate();
  const years = getAvailableFinancialYears(reference);
  yearInput.innerHTML = years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");
  yearInput.value = String(reference.getFullYear());

  const months = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const label = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(2026, index, 1));
    return { value: String(month).padStart(2, "0"), label: capitalize(label) };
  });
  const monthOptions = months
    .map((month) => `<option value="${month.value}">${month.value} - ${month.label}</option>`)
    .join("");
  startMonthInput.innerHTML = monthOptions;
  endMonthInput.innerHTML = monthOptions;
  startMonthInput.value = "01";
  endMonthInput.value = String(reference.getMonth() + 1).padStart(2, "0");
}

function getAvailableFinancialYears(reference = new Date()) {
  const years = new Set([reference.getFullYear()]);
  const collectYear = (dateString) => {
    const date = parseDate(dateString);
    if (date) years.add(date.getFullYear());
  };
  state.contracts.forEach((contract) => {
    collectYear(contract.startDate);
    collectYear(contract.endDate);
  });
  state.payments.forEach((payment) => years.add((getPaymentCompetenceDate(payment) || parseDate(payment.paymentDate))?.getFullYear()));
  state.expenses.forEach((expense) => years.add((getExpenseCompetenceDate(expense) || parseDate(expense.expenseDate))?.getFullYear()));

  const sortedYears = [...years].filter(Boolean).sort((a, b) => b - a);
  const minYear = sortedYears[sortedYears.length - 1] || reference.getFullYear();
  const maxYear = sortedYears[0] || reference.getFullYear();
  for (let year = minYear - 1; year <= maxYear + 1; year += 1) {
    years.add(year);
  }
  return [...years].filter(Boolean).sort((a, b) => b - a);
}

function getErpPeriod() {
  const yearInput = document.getElementById("erp-year");
  const startMonthInput = document.getElementById("erp-start-month");
  const endMonthInput = document.getElementById("erp-end-month");
  const reference = getFinancialReferenceDate();
  const defaultYear = String(reference.getFullYear());
  const defaultStartMonth = "01";
  const defaultEndMonth = String(reference.getMonth() + 1).padStart(2, "0");

  if (!yearInput.value) yearInput.value = defaultYear;
  if (!startMonthInput.value) startMonthInput.value = defaultStartMonth;
  if (!endMonthInput.value) endMonthInput.value = defaultEndMonth;
  if (startMonthInput.value > endMonthInput.value) endMonthInput.value = startMonthInput.value;

  const year = Number(yearInput.value) || reference.getFullYear();
  const startDate = parseMonthValue(`${year}-${startMonthInput.value}`);
  const endMonth = parseMonthValue(`${year}-${endMonthInput.value}`);
  const endDate = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0);
  return { startDate, endDate, months: listMonths(startDate, endDate) };
}

function buildAutomaticReceivables(period) {
  const receivables = [];
  const activeContracts = state.contracts.filter((contract) => contractOverlapsPeriod(contract, period.startDate, period.endDate));

  activeContracts.forEach((contract) => {
    const contractStart = parseDate(contract.startDate);
    const contractEnd = parseDate(contract.endDate);
    const dueDay = Number(contract.dueDay || 10);
    period.months.forEach((monthDate) => {
      const monthStart = firstDayOfMonth(monthDate);
      const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
      if (!contractStart || !contractEnd || contractStart > monthEnd || contractEnd < monthStart) return;

      const dueDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), Math.min(dueDay, monthEnd.getDate()));
      const inGracePeriod = isContractMonthInGracePeriod(contract, monthDate);
      receivables.push({
        contract,
        property: findProperty(contract.propertyId),
        client: findClient(contract.clientId),
        dueDate,
        month: toMonthValue(monthDate),
        expected: inGracePeriod ? 0 : getContractMonthlyValueForCompetence(contract, monthDate),
        received: 0,
        inGracePeriod,
        note: inGracePeriod ? "Periodo de carencia para inicio do pagamento." : getSecurityDepositNote(contract),
      });
    });
  });

  const receivableContractKeys = new Set(receivables.map((item) => `contract:${item.contract.id}:${item.month}`));
  const paymentDetailsByKey = {};
  const paymentsByPropertyMonth = state.payments.reduce((groups, payment) => {
    const paymentDate = getPaymentCompetenceDate(payment);
    if (!paymentDate || !isDateInPeriod(paymentDate, period.startDate, period.endDate)) return groups;
    const key = getAutomaticReceivablePaymentGroupKey(payment, paymentDate, receivableContractKeys);
    groups[key] = (groups[key] || 0) + Number(payment.totalAmount || 0);
    paymentDetailsByKey[key] = paymentDetailsByKey[key] || [];
    paymentDetailsByKey[key].push(payment);
    return groups;
  }, {});

  receivables
    .sort((a, b) => a.dueDate - b.dueDate)
    .forEach((item) => {
      const contractKey = `contract:${item.contract.id}:${item.month}`;
      const propertyKey = `property:${item.contract.propertyId}:${item.month}`;
      const contractAvailable = paymentsByPropertyMonth[contractKey] || 0;
      const propertyAvailable = paymentsByPropertyMonth[propertyKey] || 0;
      const propertyReceived = contractAvailable > 0
        ? Math.min(propertyAvailable, Math.max(item.expected - contractAvailable, 0))
        : Math.min(item.expected, propertyAvailable);
      item.received = contractAvailable + propertyReceived;
      const fromContract = Math.min(paymentsByPropertyMonth[contractKey] || 0, item.received);
      paymentsByPropertyMonth[contractKey] = Math.max((paymentsByPropertyMonth[contractKey] || 0) - fromContract, 0);
      paymentsByPropertyMonth[propertyKey] = Math.max((paymentsByPropertyMonth[propertyKey] || 0) - (item.received - fromContract), 0);
      item.balance = Math.max(item.expected - item.received, 0);
      item.statusKey = getReceivableStatus(item);
      item.status = getReceivableStatusLabel(item.statusKey);
    });

  Object.entries(paymentsByPropertyMonth).forEach(([key, amount]) => {
    if (amount <= 0.005) return;
    const payments = paymentDetailsByKey[key] || [];
    const sample = payments[0];
    if (!sample) return;
    const paymentDate = getPaymentCompetenceDate(sample) || parseDate(sample.paymentDate) || period.startDate;
    const month = key.split(":").pop() || toMonthValue(paymentDate);
    const contract = sample.contractId ? state.contracts.find((item) => item.id === sample.contractId) : null;
    const client = findClient(contract?.clientId) || (sample.lessorName ? { name: sample.lessorName } : null);
    const dueDate = parseDate(sample.paymentDate) || paymentDate;
    receivables.push({
      contract: contract || { id: sample.contractId || "", propertyId: sample.propertyId },
      property: findProperty(sample.propertyId),
      client,
      dueDate,
      month,
      expected: amount,
      received: amount,
      balance: 0,
      inGracePeriod: false,
      statusKey: "paid",
      status: getReceivableStatusLabel("paid"),
      note: "Lancamento recebido sem contrato ativo correspondente no periodo.",
    });
  });

  return receivables.sort((a, b) => a.dueDate - b.dueDate);
}

function getAutomaticReceivablePaymentGroupKey(payment, paymentDate, receivableContractKeys = new Set()) {
  const month = toMonthValue(paymentDate);
  const contractKey = payment.contractId ? `contract:${payment.contractId}:${month}` : "";
  const propertyKey = `property:${payment.propertyId}:${month}`;
  return contractKey && receivableContractKeys.has(contractKey) ? contractKey : propertyKey;
}

function getReceivableStatus(item) {
  if (item.inGracePeriod) return "grace";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (item.balance <= 0) return "paid";
  if (item.received > 0) return "partial";
  if (item.dueDate < today) return "overdue";
  return "open";
}

function getReceivableStatusLabel(status) {
  return {
    paid: "Recebido",
    partial: "Parcial",
    overdue: "Vencido",
    open: "Em aberto",
    grace: "Carencia",
  }[status];
}

function isContractMonthInGracePeriod(contract, monthDate) {
  const months = Number(contract?.gracePeriodMonths || 0);
  if (!contract?.hasGracePeriod || months <= 0) return false;
  const start = parseDate(contract.startDate);
  if (!start) return false;
  const startIndex = start.getFullYear() * 12 + start.getMonth();
  const monthIndex = monthDate.getFullYear() * 12 + monthDate.getMonth();
  return monthIndex >= startIndex && monthIndex < startIndex + months;
}

function renderDreList(revenue, expenses, overdue, expectedRevenue) {
  const rows = [
    ["Receita operacional recebida", revenue],
    ["(-) Despesas operacionais", -expenses],
    ["Resultado operacional", revenue - expenses],
    ["Contas a receber previstas", expectedRevenue],
    ["Inadimplencia vencida", -overdue],
  ];
  document.getElementById("erp-dre-list").innerHTML = rows
    .map(([label, value]) => `
      <div class="dre-row ${value < 0 ? "negative" : ""}">
        <span>${escapeHtml(label)}</span>
        <strong>${formatMoney(value)}</strong>
      </div>
    `)
    .join("");
}

function renderErpReceivables(receivables) {
  renderTable(
    "erp-receivables-body",
    receivables,
    (item) => `
      <td>${formatDate(toDateInputValue(item.dueDate))}</td>
      <td>${escapeHtml(item.property?.description || "-")}</td>
      <td>${escapeHtml(item.client?.name || "-")}</td>
      <td>${formatMoney(item.expected)}</td>
      <td>${formatMoney(item.received)}</td>
      <td>${formatMoney(item.balance)}</td>
      <td><span class="status ${item.statusKey}">${item.status}</span></td>
      <td>${escapeHtml(item.note || "-")}</td>
    `,
  );
}

function renderErpCashflow(period, payments, expenses) {
  const rows = period.months.map((monthDate) => {
    const month = toMonthValue(monthDate);
    const inflow = payments
      .filter((payment) => toMonthValue(getPaymentCompetenceDate(payment)) === month)
      .reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
    const outflow = expenses
      .filter((expense) => toMonthValue(getExpenseCompetenceDate(expense)) === month)
      .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    return { monthDate, inflow, outflow, balance: inflow - outflow };
  });

  renderTable(
    "erp-cashflow-body",
    rows,
    (row) => `
      <td>${formatMonth(row.monthDate)}</td>
      <td>${formatMoney(row.inflow)}</td>
      <td>${formatMoney(row.outflow)}</td>
      <td><strong class="${row.balance < 0 ? "negative-text" : "positive-text"}">${formatMoney(row.balance)}</strong></td>
    `,
  );
}

function renderErpExpenseCategories(expenses) {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const rows = Object.entries(
    expenses.reduce((groups, expense) => {
      const category = expense.expenseType || "Outros";
      groups[category] = (groups[category] || 0) + Number(expense.amount || 0);
      return groups;
    }, {}),
  )
    .map(([category, amount]) => ({ category, amount, share: total ? (amount / total) * 100 : 0 }))
    .sort((a, b) => b.amount - a.amount);

  renderTable(
    "erp-expense-category-body",
    rows,
    (row) => `
      <td>${escapeHtml(row.category)}</td>
      <td>${formatMoney(row.amount)}</td>
      <td>${formatNumber(row.share)}%</td>
    `,
  );
}

function renderErpPropertyProfitability(period, payments, expenses) {
  const rows = state.properties
    .map((property) => {
      const revenue = payments
        .filter((payment) => payment.propertyId === property.id)
        .reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
      const expenseTotal = expenses
        .filter((expense) => expense.propertyId === property.id)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
      const result = revenue - expenseTotal;
      const margin = revenue ? (result / revenue) * 100 : 0;
      const roi = calculatePropertyRoi(property, result, period.months.length);
      const investment = Number(property.investmentValue || 0);
      return { property, revenue, expenses: expenseTotal, result, margin, roi, investment, accumulatedResult: roi.accumulatedResult || 0 };
    })
    .filter((row) => row.revenue || row.expenses || row.investment)
    .sort((a, b) => b.result - a.result);
  const maxAbsMargin = Math.max(...rows.map((row) => Math.abs(row.margin)), 1);

  renderTable(
    "erp-property-profitability-body",
    rows,
    (row, index) => {
      const tone = row.result < 0 ? "negative" : row.result > 0 ? "positive" : "neutral";
      const barWidth = Math.max(4, Math.min(100, Math.round((Math.abs(row.margin) / maxAbsMargin) * 100)));
      return `
        <td>
          <div class="property-profitability-title">
            <span class="rank-badge">${index + 1}</span>
            <div>
              <strong>${escapeHtml(row.property.description)}</strong>
              <span>${row.investment ? `Investimento: ${formatMoney(row.investment)} | Resultado acumulado: ${formatMoney(row.accumulatedResult)}` : "Investimento nao informado"}</span>
            </div>
          </div>
        </td>
        <td>${formatMoney(row.revenue)}</td>
        <td>${formatMoney(row.expenses)}</td>
        <td>
          <strong class="profitability-result ${tone}">${formatMoney(row.result)}</strong>
        </td>
        <td>
          <div class="profitability-meter">
            <div class="profitability-meter-head">
              <strong class="${tone === "negative" ? "negative-text" : "positive-text"}">${formatNumber(row.margin)}%</strong>
              <span>${row.revenue ? "sobre receita" : "sem receita"}</span>
            </div>
            <div class="profitability-track">
              <div class="profitability-bar ${tone}" style="width: ${barWidth}%"></div>
            </div>
          </div>
        </td>
        <td>
          <div class="roi-stack">
            <span>Anual <strong>${row.investment ? `${formatNumber(row.roi.annual)}%` : "-"}</strong></span>
            <span>Total <strong>${row.investment ? `${formatNumber(row.roi.total)}%` : "-"}</strong></span>
          </div>
        </td>
        <td>
          <span class="profitability-status ${tone}">${getProfitabilityStatusLabel(row)}</span>
        </td>
      `;
    },
  );
}

function getProfitabilityStatusLabel(row) {
  if (!row.revenue && !row.expenses) return "Sem movimento";
  if (row.result < 0) return "Atenção";
  if (row.margin >= 60) return "Alta rentabilidade";
  if (row.margin >= 25) return "Rentavel";
  if (row.result > 0) return "Margem baixa";
  return "Equilibrado";
}

async function loadAccessUsers(force = false) {
  if (!canManageUsers() || !window.SupabaseSync?.listAccessUsers || accessUsersLoading) return;
  if (!force && accessUsersLoadedAt && Date.now() - accessUsersLoadedAt < 30000) return;
  accessUsersLoading = true;
  try {
    const result = await window.SupabaseSync.listAccessUsers();
    accessUsers = result.users || [];
    accessUsersLoadedAt = Date.now();
  } catch (error) {
    setText("access-message", `Gestão de usuários indisponível: ${error.message || error}`);
  } finally {
    accessUsersLoading = false;
    renderAccessUsers();
  }
}

function renderAccessUsers() {
  const body = document.getElementById("access-users-body");
  if (!body) return;
  if (!canManageUsers()) {
    body.innerHTML = '<tr><td colspan="5" class="empty-state">Somente administradores podem visualizar usuários.</td></tr>';
    return;
  }
  if (!window.SupabaseSync?.listAccessUsers) {
    body.innerHTML = '<tr><td colspan="5" class="empty-state">Publique a função de usuários no Supabase para ativar esta lista.</td></tr>';
    return;
  }
  if (!accessUsersLoadedAt && !accessUsersLoading) queueMicrotask(() => loadAccessUsers());
  if (accessUsersLoading && !accessUsers.length) {
    body.innerHTML = '<tr><td colspan="5" class="empty-state">Carregando usuários...</td></tr>';
    return;
  }
  const current = getCurrentUser();
  body.innerHTML = accessUsers.length ? accessUsers.map((user) => `
    <tr>
      <td><strong>${escapeHtml(user.name || user.email)}</strong></td>
      <td>${escapeHtml(user.email)}</td>
      <td><select class="compact-select" data-access-role="${escapeHtml(user.user_id)}" ${user.user_id === current?.id ? "disabled" : ""}>${Object.entries(roleLabels).map(([value,label]) => `<option value="${value}" ${user.role === value ? "selected" : ""}>${label}</option>`).join("")}</select></td>
      <td><span class="status-badge ${user.active ? "status-active" : "status-inactive"}">${user.active ? "Ativo" : "Desativado"}</span></td>
      <td>${user.user_id !== current?.id && user.active ? `<button class="small-button danger-button" type="button" data-delete-user="${escapeHtml(user.user_id)}">Desativar</button>` : "-"}</td>
    </tr>`).join("") : '<tr><td colspan="5" class="empty-state">Nenhum usuário cadastrado.</td></tr>';
}

function renderAuditLogs() {
  const body = document.getElementById("audit-log-body");
  if (!body) return;
  const summary = document.getElementById("audit-log-summary");
  const startValue = document.getElementById("audit-start")?.value || "";
  const endValue = document.getElementById("audit-end")?.value || "";
  const startDate = startValue ? new Date(`${startValue}T00:00:00`) : null;
  const endDate = endValue ? new Date(`${endValue}T23:59:59.999`) : null;
  const allRows = [...(state.auditLogs || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const hasPeriodFilter = Boolean(startDate || endDate);
  const rows = hasPeriodFilter
    ? allRows
        .filter((log) => {
          const createdAt = new Date(log.createdAt);
          if (Number.isNaN(createdAt.getTime())) return false;
          if (startDate && createdAt < startDate) return false;
          if (endDate && createdAt > endDate) return false;
          return true;
        })
        .slice(0, 120)
    : allRows
        .filter((log) => log.collection === "auth" || log.action === "login_success" || log.action === "logout")
        .slice(0, 5);
  if (summary) {
    summary.textContent = hasPeriodFilter
      ? `${rows.length} evento(s) no periodo selecionado`
      : "Ultimos cinco acessos";
  }
  renderTable(
    "audit-log-body",
    rows,
    (log) => `
      <td>${formatDateTime(log.createdAt)}</td>
      <td>${escapeHtml(log.userName || "Sistema")}</td>
      <td>${escapeHtml(log.action)}</td>
      <td>${escapeHtml(log.collection)}</td>
      <td>${escapeHtml(getAuditType(log))}</td>
      <td>${escapeHtml(log.summary)}</td>
    `,
  );
}

function renderBackupPanel() {
  const status = document.getElementById("backup-status");
  const address = document.getElementById("backup-address");
  const select = document.getElementById("backup-select");
  if (!status || !address || !select) return;

  const backups = loadBackups().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const latest = backups[0] || null;
  if (!latest) {
    status.textContent = "Nenhum backup local gerado.";
    address.textContent = backupFolderReady
      ? `Destino automatico: ${preferredBackupFolderLabel}`
      : `Endereco local: localStorage:${backupKey}. Para outro PC, use Baixar backup e depois Importar arquivo de backup. Em navegadores compativeis, Escolher pasta local tambem grava automaticamente.`;
    select.innerHTML = `<option value="">Nenhum backup disponivel</option>`;
    return;
  }

  const counts = latest.counts || getBusinessCounts(latest.state || {});
  status.textContent = `Ultimo backup: ${formatDateTime(latest.createdAt)} - ${latest.reasonLabel || getBackupReasonLabel(latest.reason)} - ${counts.properties || 0} imoveis, ${counts.clients || 0} clientes, ${counts.contracts || 0} contratos, ${counts.payments || 0} receitas, ${counts.expenses || 0} despesas.`;
  address.textContent = `Endereco local: ${latest.storageAddress || `localStorage:${backupKey}:${latest.id}`} | Arquivo sugerido: ${latest.fileName || createBackupFileName(latest.createdAt)}`;
  select.innerHTML = backups
    .map((backup) => {
      const backupCounts = backup.counts || getBusinessCounts(backup.state || {});
      const label = `${formatDateTime(backup.createdAt)} - ${backup.reasonLabel || getBackupReasonLabel(backup.reason)} - ${backupCounts.properties || 0} imoveis`;
      return `<option value="${escapeHtml(backup.id)}">${escapeHtml(label)}</option>`;
    })
    .join("");
}

function getAuditType(log) {
  if (log.collection === "auth" || log.collection === "users") return "Seguranca";
  if (log.financial) return "Financeiro";
  if (log.collection === "sync" || log.collection === "system") return "Sistema";
  return "Operacional";
}

function renderReports() {
  updateReportModeVisibility();
  const dataset = getReportDataset();
  const propertyId = document.getElementById("report-property").value;
  const clientId = document.getElementById("report-client").value;
  const status = document.getElementById("report-status").value;
  const filters = getReportFilters();
  const movementFilters = getReportMovementFilters();
  if (dataset !== "financial") {
    renderRegistrationReport(dataset, propertyId, clientId, status, filters);
    return;
  }
  const payments = getFilteredPayments(filters, propertyId, clientId, status);

  const rows = state.contracts
    .filter((contract) => propertyId === "all" || contract.propertyId === propertyId)
    .filter((contract) => clientId === "all" || contract.clientId === clientId)
    .filter((contract) => status === "all" || getContractStatus(contract).key === status)
    .filter((contract) => contractMatchesReportFilters(contract, filters))
    .map((contract) => toReportRow(contract, filters));

  renderReportMetrics(rows, payments);
  renderRevenueReport(movementFilters.includeRevenue ? payments : []);
  renderPropertyReports(rows, filters, movementFilters.includeRevenue ? payments : [], movementFilters);
  renderExpenseDetailReport(rows, filters, movementFilters);
  renderExpenseTypeReport(rows, filters, movementFilters);
  renderChargesReport(propertyId, clientId, status, filters, movementFilters);
  renderSummaryReport(rows, filters);
  updateReportMovementVisibility(movementFilters);

  if (movementFilters.includeRevenue) {
    renderTable(
      "reports-body",
      rows,
      (row) => `
        <td>${escapeHtml(row.property)}</td>
        <td>${escapeHtml(row.client)}</td>
        <td>${escapeHtml(row.contact)}</td>
        <td>${row.period}</td>
        <td>${formatMoney(row.monthlyValue)}</td>
        <td>${escapeHtml(row.financialTerms)}</td>
        <td>${formatMoney(row.expenses)}</td>
        <td><span class="status ${row.statusKey}">${row.status}</span></td>
      `,
    );
  } else {
    renderTable("reports-body", [], () => "");
  }
}

function updateReportModeVisibility() {
  const isRegistrationReport = getReportDataset() !== "financial";
  const showAnalytic = !isRegistrationReport && reportMode === "analytic";
  const showAnalyticDetails = showAnalytic && hasActiveReportFilters();
  document.querySelectorAll(".analytic-report").forEach((item) => item.classList.toggle("hidden", !showAnalytic));
  document.querySelectorAll(".analytic-detail-report").forEach((item) => item.classList.toggle("hidden", !showAnalyticDetails));
  if (showAnalyticDetails) updateReportMovementVisibility();
  document.querySelector("#reports > .metrics-grid")?.classList.toggle("hidden", isRegistrationReport);
  document.querySelector(".registration-report")?.classList.toggle("hidden", !isRegistrationReport);
  document.querySelector(".report-mode")?.classList.toggle("hidden", isRegistrationReport);
  const summary = document.getElementById("summary-report");
  if (summary) summary.classList.toggle("active", !isRegistrationReport && reportMode === "summary");
  updateReportExportOptionsVisibility();
}

function hasActiveReportFilters() {
  const filters = getReportFilters();
  return (
    (document.getElementById("report-property")?.value || "all") !== "all" ||
    (document.getElementById("report-client")?.value || "all") !== "all" ||
    (document.getElementById("report-status")?.value || "all") !== "all" ||
    filters.expenseType !== "all" ||
    !getReportMovementFilters().includeRevenue ||
    !getReportMovementFilters().includeExpenses ||
    getReportMovementFilters().expenseView !== "summary" ||
    Boolean(filters.startDate || filters.endDate || filters.minValue || filters.maxValue)
  );
}

function updateReportMovementVisibility(movementFilters = getReportMovementFilters()) {
  const showDetails = getReportDataset() === "financial" && reportMode === "analytic" && hasActiveReportFilters();
  const showRevenue = showDetails && movementFilters.includeRevenue;
  const showExpenses = showDetails && movementFilters.includeExpenses;
  const showBoth = showRevenue && showExpenses;
  toggleReportSection("revenue-report-body", showRevenue);
  toggleReportSection("property-report-body", showBoth);
  toggleReportSection("charges-report-body", showExpenses);
  toggleReportSection("expense-detail-report-body", showExpenses && movementFilters.expenseView === "detailed");
  toggleReportSection("expense-type-report-body", showExpenses && movementFilters.expenseView === "summary");
  toggleReportSection("reports-body", showRevenue);
}

function toggleReportSection(bodyId, visible) {
  document.getElementById(bodyId)?.closest(".analytic-detail-report")?.classList.toggle("hidden", !visible);
}

function getReportDataset() {
  return document.getElementById("report-dataset")?.value || "financial";
}

function renderRegistrationReport(dataset = getReportDataset(), propertyId = "all", clientId = "all", status = "all", filters = getReportFilters()) {
  const report = getRegistrationReportData(dataset, propertyId, clientId, status, filters);
  setText("registration-report-title", report.title);
  setText("registration-report-count", `${report.rows.length} registro(s)`);
  const head = document.getElementById("registration-report-head");
  if (head) head.innerHTML = report.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("");
  renderTable(
    "registration-report-body",
    report.rows,
    (row) => row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join(""),
  );
}

function getRegistrationReportData(dataset = getReportDataset(), propertyId = "all", clientId = "all", status = "all", filters = getReportFilters()) {
  if (dataset === "properties") return getPropertiesRegistrationReport(propertyId, clientId, status);
  if (dataset === "clients") return getClientsRegistrationReport(propertyId, clientId, status);
  return getContractsRegistrationReport(propertyId, clientId, status, filters);
}

function getPropertiesRegistrationReport(propertyId, clientId, status) {
  const rows = state.properties
    .filter((property) => propertyId === "all" || property.id === propertyId)
    .map((property) => {
      const contracts = state.contracts.filter((contract) => contract.propertyId === property.id && (clientId === "all" || contract.clientId === clientId));
      const activeContracts = contracts.filter((contract) => getContractStatus(contract).key !== "expired");
      const expiredContracts = contracts.filter((contract) => getContractStatus(contract).key === "expired");
      const statusKey = activeContracts.length ? "active" : expiredContracts.length ? "expired" : "none";
      return {
        statusKey,
        row: [
          property.description || "-",
          property.type || "-",
          property.area || "-",
          property.location || "-",
          property.investmentValue ? formatMoney(property.investmentValue) : "-",
          activeContracts.length ? "Ativo" : expiredContracts.length ? "Encerrado" : "Sem contrato",
          String(contracts.length),
        ],
      };
    })
    .filter((item) => status === "all" || item.statusKey === status || (status === "ending" && item.statusKey === "active"))
    .map((item) => item.row);
  return { title: "Relatorio do cadastro de imoveis", headers: ["Imovel", "Tipo", "Area", "Localizacao", "Investimento", "Situacao", "Contratos"], rows };
}

function getClientsRegistrationReport(propertyId, clientId, status) {
  const rows = state.clients
    .filter((client) => clientId === "all" || client.id === clientId)
    .map((client) => {
      const contracts = state.contracts.filter((contract) => contract.clientId === client.id && (propertyId === "all" || contract.propertyId === propertyId));
      const activeContracts = contracts.filter((contract) => getContractStatus(contract).key !== "expired");
      const expiredContracts = contracts.filter((contract) => getContractStatus(contract).key === "expired");
      const statusKey = activeContracts.length ? "active" : expiredContracts.length ? "expired" : "none";
      return {
        statusKey,
        row: [
          client.document || "-",
          client.name || "-",
          client.contact || "-",
          client.phone || "-",
          client.email || "-",
          activeContracts.length ? "Ativo" : expiredContracts.length ? "Encerrado" : "Sem contrato",
          String(contracts.length),
        ],
      };
    })
    .filter((item) => status === "all" || item.statusKey === status || (status === "ending" && item.statusKey === "active"))
    .map((item) => item.row);
  return { title: "Relatorio do cadastro de clientes", headers: ["Documento", "Nome", "Contato", "Telefone", "E-mail", "Situacao", "Contratos"], rows };
}

function getContractsRegistrationReport(propertyId, clientId, status, filters) {
  const rows = state.contracts
    .filter((contract) => propertyId === "all" || contract.propertyId === propertyId)
    .filter((contract) => clientId === "all" || contract.clientId === clientId)
    .filter((contract) => status === "all" || getContractStatus(contract).key === status)
    .filter((contract) => contractMatchesReportFilters(contract, filters))
    .map((contract) => {
      const property = findProperty(contract.propertyId);
      const client = findClient(contract.clientId);
      const contractStatus = getContractStatus(contract);
      return [
        property?.description || "-",
        client?.name || "-",
        formatCpfCnpj(client?.document || ""),
        `${formatDate(contract.startDate)} a ${formatDate(contract.endDate)}`,
        formatMoney(contract.monthlyValue),
                getContractAdjustedRentText(contract),
        `Dia ${contract.dueDay || 1}`,
        getContractFinancialTermsText(contract),
        `${contract.adjustmentFrequency || "-"} - ${contract.adjustmentMethod || "-"}`,
        contractStatus.label,
      ];
    });
  return { title: "Relatorio do cadastro de contratos", headers: ["Imovel", "Cliente", "Documento", "Vigencia", "Valor mensal", "Valor ajustado", "Vencimento", "Garantia/carencia", "Reajuste", "Situacao"], rows };
}

function getReportFilters() {
  return {
    expenseType: document.getElementById("report-expense-type")?.value || "all",
    startDate: document.getElementById("report-start")?.value || "",
    endDate: document.getElementById("report-end")?.value || "",
    minValue: parseMoneyInput(document.getElementById("report-min-value")?.value || ""),
    maxValue: parseMoneyInput(document.getElementById("report-max-value")?.value || ""),
  };
}

function getReportMovementFilters() {
  return {
    includeRevenue: document.getElementById("report-include-revenue")?.checked !== false,
    includeExpenses: document.getElementById("report-include-expenses")?.checked !== false,
    expenseView: document.getElementById("report-expense-view")?.value || "summary",
  };
}

function contractMatchesReportFilters(contract, filters) {
  const startsBeforeEnd = !filters.endDate || parseDate(contract.startDate) <= parseDate(filters.endDate);
  const endsAfterStart = !filters.startDate || parseDate(contract.endDate) >= parseDate(filters.startDate);
  const valueForFilter = getContractMonthlyValueForCompetence(contract, getReportReferenceDate(filters));
  const aboveMin = !filters.minValue || valueForFilter >= filters.minValue;
  const belowMax = !filters.maxValue || valueForFilter <= filters.maxValue;
  return startsBeforeEnd && endsAfterStart && aboveMin && belowMax;
}

function getReportReferenceDate(filters = getReportFilters()) {
  if (filters.startDate) return parseDate(filters.startDate);
  if (filters.endDate) return parseDate(filters.endDate);
  return getFinancialReferenceDate();
}

function renderReportMetrics(rows, payments = getFilteredPayments()) {
  const revenue = payments.reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
  const chargesReceived = payments.reduce((sum, payment) => sum + Number(payment.chargeAmount || 0), 0);
  const ownerExpenses = rows.reduce((sum, row) => sum + row.ownerExpenses, 0);
  const averageTicket = payments.length ? revenue / payments.length : 0;
  const propertyTotals = payments.reduce((totals, payment) => {
    const property = findProperty(payment.propertyId)?.description || "-";
    totals[property] = (totals[property] || 0) + Number(payment.totalAmount || 0);
    return totals;
  }, {});
  const topProperty = Object.entries(propertyTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const netMargin = revenue ? ((revenue - ownerExpenses) / revenue) * 100 : 0;

  setText("report-revenue", formatMoney(revenue));
  setText("report-owner-expenses", formatMoney(ownerExpenses));
  setText("report-net-revenue", formatMoney(revenue - ownerExpenses));
  setText("report-tenant-charges", formatMoney(chargesReceived));
  setText("report-contract-count", rows.length);
  setText("report-average-ticket", formatMoney(averageTicket));
  setText("report-top-property", topProperty);
  setText("report-net-margin", `${formatNumber(netMargin)}%`);
}

function renderSummaryReport(reportRows, filters = getReportFilters()) {
  const summary = getSummaryReportData(reportRows, filters);
  setText("summary-period", getSummaryPeriodLabel(filters));
  setText("summary-properties", summary.propertyCount);
  setText("summary-clients", summary.clientCount);
  setText("summary-active-contracts", summary.activeContracts);
  setText("summary-ending-contracts", summary.endingContracts);
  setText("summary-gross-revenue", formatMoney(summary.revenue));
  setText("summary-entered-expenses", formatMoney(summary.expenses));
  setText("summary-net-result", formatMoney(summary.netResult));
  setText("summary-net-margin", `${formatNumber(summary.netMargin)}%`);

  renderTable(
    "summary-report-body",
    [
      { indicator: "Carteira filtrada", result: `${summary.contractCount} contrato(s)`, note: `${summary.activeContracts} ativo(s), ${summary.endingContracts} a vencer e ${summary.expiredContracts} encerrado(s).` },
      { indicator: "Receita recebida", result: formatMoney(summary.revenue), note: `Ticket medio de ${formatMoney(summary.averageTicket)} por pagamento lancado.` },
      { indicator: "Encargos recebidos", result: formatMoney(summary.chargesReceived), note: `${summary.paymentCount} pagamento(s) lancado(s) no recorte atual.` },
      { indicator: "Despesas apropriadas", result: formatMoney(summary.expenses), note: `${summary.expenseCount} lancamento(s) de despesa no recorte atual.` },
      { indicator: "Resultado liquido", result: formatMoney(summary.netResult), note: `Margem gerencial de ${formatNumber(summary.netMargin)}% sobre a receita filtrada.` },
      { indicator: "Maior receita", result: summary.topProperty, note: summary.topProperty === "-" ? "Sem imovel com receita no filtro." : "Imovel com maior participacao na receita bruta." },
      { indicator: "Encargos do cliente", result: `${summary.tenantCharges} encargo(s)`, note: "Quantidade de impostos e taxas sob responsabilidade do cliente nos contratos filtrados." },
    ],
    (row) => `
      <td>${escapeHtml(row.indicator)}</td>
      <td>${escapeHtml(row.result)}</td>
      <td>${escapeHtml(row.note)}</td>
    `,
  );

  renderTable(
    "summary-property-body",
    summary.propertyRows,
    (row) => `
      <td>${escapeHtml(row.property)}</td>
      <td>${formatMoney(row.revenue)}</td>
      <td>${formatMoney(row.chargesReceived)}</td>
      <td>${formatMoney(row.expenses)}</td>
      <td>${formatMoney(row.netResult)}</td>
      <td>${formatNumber(row.participation)}%</td>
    `,
  );
}

function getSummaryReportData(reportRows, filters = getReportFilters()) {
  const propertyId = document.getElementById("report-property")?.value || "all";
  const clientId = document.getElementById("report-client")?.value || "all";
  const status = document.getElementById("report-status")?.value || "all";
  const payments = getFilteredPayments(filters, propertyId, clientId, status);
  const revenue = payments.reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
  const chargesReceived = payments.reduce((sum, payment) => sum + Number(payment.chargeAmount || 0), 0);
  const clientIds = new Set(reportRows.map((row) => row.clientId));
  const reportPropertyIds = new Set(reportRows.map((row) => row.propertyId));
  const paymentPropertyIds = new Set(payments.map((payment) => payment.propertyId));
  const expenses = getFilteredExpenses(filters).filter((expense) => reportPropertyIds.size || paymentPropertyIds.size ? reportPropertyIds.has(expense.propertyId) || paymentPropertyIds.has(expense.propertyId) : true);
  const propertyIds = new Set([...reportPropertyIds, ...paymentPropertyIds, ...expenses.map((expense) => expense.propertyId)]);
  const expensesTotal = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const activeContracts = reportRows.filter((row) => row.statusKey === "active").length;
  const endingContracts = reportRows.filter((row) => row.statusKey === "ending").length;
  const expiredContracts = reportRows.filter((row) => row.statusKey === "expired").length;
  const tenantCharges = getFilteredChargeRows().filter((row) => row.responsible === "cliente" && reportRows.some((reportRow) => reportRow.contractId === row.contractId)).length;
  const averageTicket = payments.length ? revenue / payments.length : 0;
  const netResult = revenue - expensesTotal;
  const netMargin = revenue ? (netResult / revenue) * 100 : 0;
  const propertyRows = [...propertyIds]
    .map((propertyId) => {
      const property = findProperty(propertyId);
      const propertyPayments = payments.filter((payment) => payment.propertyId === propertyId);
      const propertyRevenue = propertyPayments.reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
      const propertyCharges = propertyPayments.reduce((sum, payment) => sum + Number(payment.chargeAmount || 0), 0);
      const propertyExpenses = expenses.filter((expense) => expense.propertyId === propertyId).reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
      return {
        property: property?.description || "-",
        revenue: propertyRevenue,
        chargesReceived: propertyCharges,
        expenses: propertyExpenses,
        netResult: propertyRevenue - propertyExpenses,
        participation: revenue ? (propertyRevenue / revenue) * 100 : 0,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  return {
    revenue,
    chargesReceived,
    paymentCount: payments.length,
    expenses: expensesTotal,
    expenseCount: expenses.length,
    netResult,
    netMargin,
    propertyCount: propertyIds.size,
    clientCount: clientIds.size,
    contractCount: reportRows.length,
    activeContracts,
    endingContracts,
    expiredContracts,
    tenantCharges,
    averageTicket,
    topProperty: propertyRows[0]?.property || "-",
    propertyRows,
  };
}

function getSummaryPeriodLabel(filters = getReportFilters()) {
  if (filters.startDate && filters.endDate) return `${formatDate(filters.startDate)} a ${formatDate(filters.endDate)}`;
  if (filters.startDate) return `A partir de ${formatDate(filters.startDate)}`;
  if (filters.endDate) return `Ate ${formatDate(filters.endDate)}`;
  return "Todos os periodos";
}

function renderRevenueReport(payments = getFilteredPayments()) {
  const rows = payments
    .map((payment) => ({
      ...payment,
      property: findProperty(payment.propertyId)?.description || "-",
    }))
    .sort((a, b) => String(b.paymentDate).localeCompare(String(a.paymentDate)));

  renderTable(
    "revenue-report-body",
    rows,
    (row) => `
      <td>${escapeHtml(row.property)}</td>
      <td>${formatDate(row.paymentDate)}</td>
      <td>${formatCompetence(row.competence)}</td>
      <td>${formatMoney(row.amount)}</td>
      <td>${formatMoney(row.chargeAmount)}</td>
      <td>${formatMoney(row.totalAmount)}</td>
      <td>${escapeHtml(row.history || "-")}</td>
    `,
  );
}

function renderPropertyReports(reportRows, filters = getReportFilters(), payments = getFilteredPayments(filters), movementFilters = getReportMovementFilters()) {
  const rows = state.properties
    .map((property) => {
      const propertyContracts = reportRows.filter((row) => row.propertyId === property.id);
      const revenue = payments.filter((payment) => payment.propertyId === property.id).reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);
      const enteredExpenses = movementFilters.includeExpenses ? getEnteredExpenses(property.id, filters) : 0;
      const ownerCharges = propertyContracts.reduce((sum, row) => sum + row.ownerChargeCount, 0);
      const ownerExpenses = enteredExpenses;
      return {
        property: property.description,
        revenue,
        enteredExpenses,
        ownerCharges,
        netRevenue: revenue - ownerExpenses,
      };
    })
    .filter((row) => row.revenue > 0 || row.enteredExpenses > 0 || row.ownerCharges > 0);

  renderTable(
    "property-report-body",
    rows,
    (row) => `
      <td>${escapeHtml(row.property)}</td>
      <td>${formatMoney(row.revenue)}</td>
      <td>${formatMoney(row.enteredExpenses)}</td>
      <td>${row.ownerCharges} taxa(s)</td>
      <td>${formatMoney(row.netRevenue)}</td>
    `,
  );

  renderChart("expense-chart", rows, "enteredExpenses", "expense");
  renderChart("net-chart", rows, "netRevenue", "net");
}

function renderExpenseDetailReport(reportRows, filters = getReportFilters(), movementFilters = getReportMovementFilters()) {
  if (!movementFilters.includeExpenses || movementFilters.expenseView !== "detailed") {
    renderTable("expense-detail-report-body", [], () => "");
    return;
  }
  const propertyIds = new Set(reportRows.map((row) => row.propertyId));
  const expenses = getFilteredExpenses(filters)
    .filter((expense) => propertyIds.has(expense.propertyId))
    .filter((expense) => !filters.minValue || Number(expense.amount || 0) >= filters.minValue)
    .filter((expense) => !filters.maxValue || Number(expense.amount || 0) <= filters.maxValue)
    .filter((expense) => !expense.adjustedDue || isDateYearUpToCurrent(expense.adjustedDue))
    .map((expense) => ({
      ...expense,
      property: findProperty(expense.propertyId)?.description || "-",
    }))
    .sort((a, b) => String(a.property || "").localeCompare(String(b.property || "")) || String(a.expenseType || "").localeCompare(String(b.expenseType || "")) || String(a.expenseDate).localeCompare(String(b.expenseDate)));
  const groupedRows = buildGroupedExpenseDetailRows(expenses);

  renderTable(
    "expense-detail-report-body",
    groupedRows,
    (row) => `
      ${renderGroupedExpenseDetailRow(row)}
    `,
  );
}

function buildGroupedExpenseDetailRows(expenses) {
  const rows = [];
  let currentProperty = "";
  let currentType = "";
  let propertyTotal = 0;
  let typeTotal = 0;
  let typeCount = 0;
  const closeType = () => {
    if (!currentType) return;
    rows.push({ kind: "expense-type-total", label: currentType, count: typeCount, total: typeTotal });
    currentType = "";
    typeTotal = 0;
    typeCount = 0;
  };
  const closeProperty = () => {
    if (!currentProperty) return;
    closeType();
    rows.push({ kind: "expense-property-total", property: currentProperty, total: propertyTotal });
    currentProperty = "";
    propertyTotal = 0;
  };
  expenses.forEach((expense) => {
    const property = expense.property || "-";
    const type = expense.expenseType || "Outros";
    if (property !== currentProperty) {
      closeProperty();
      currentProperty = property;
      rows.push({ kind: "expense-property", property });
    }
    if (type !== currentType) {
      closeType();
      currentType = type;
    }
    const amount = Number(expense.amount || 0);
    rows.push({ kind: "expense-detail", ...expense, expenseType: type });
    typeTotal += amount;
    propertyTotal += amount;
    typeCount += 1;
  });
  closeProperty();
  return rows;
}

function renderGroupedExpenseDetailRow(row) {
  if (row.kind === "expense-property") return `<td class="report-group-row" colspan="5">${escapeHtml(row.property)}</td>`;
  if (row.kind === "expense-type-total") return `<td class="report-subtotal-row" colspan="4">Total ${escapeHtml(row.label)} (${row.count} lancamento(s))</td><td class="report-total-cell">${formatMoney(row.total)}</td>`;
  if (row.kind === "expense-property-total") return `<td class="report-total-row" colspan="4">Total do imovel ${escapeHtml(row.property)}</td><td class="report-total-cell">${formatMoney(row.total)}</td>`;
  return `
    <td>${formatDate(row.expenseDate)}</td>
    <td>${escapeHtml(row.expenseType || "-")}</td>
    <td>${escapeHtml(row.note || "-")}</td>
    <td>${escapeHtml(row.contractCode || "-")}</td>
    <td>${formatMoney(row.amount)}</td>
  `;
}

function renderExpenseTypeReport(reportRows, filters = getReportFilters(), movementFilters = getReportMovementFilters()) {
  if (!movementFilters.includeExpenses || movementFilters.expenseView !== "summary") {
    renderTable("expense-type-report-body", [], () => "");
    return;
  }
  const propertyIds = new Set(reportRows.map((row) => row.propertyId));
  const expenses = getFilteredExpenses(filters).filter((expense) => propertyIds.has(expense.propertyId));
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const grouped = expenses.reduce((rows, expense) => {
    const key = expense.expenseType || "Outros";
    rows[key] ||= { expenseType: key, count: 0, total: 0 };
    rows[key].count += 1;
    rows[key].total += Number(expense.amount || 0);
    return rows;
  }, {});

  renderTable(
    "expense-type-report-body",
    Object.values(grouped).sort((a, b) => a.expenseType.localeCompare(b.expenseType)),
    (row) => `
      <td>${escapeHtml(row.expenseType)}</td>
      <td>${row.count}</td>
      <td>${formatMoney(row.total)}</td>
      <td>${formatNumber(total ? (row.total / total) * 100 : 0)}%</td>
    `,
  );
}

function renderChargesReport(propertyId, clientId, status, filters = getReportFilters(), movementFilters = getReportMovementFilters()) {
  const rows = movementFilters.includeExpenses
    ? getFilteredChargeRows(propertyId, clientId, status)
      .filter((row) => contractMatchesReportFilters(row.contract, filters))
      .filter((row) => row.responsible === "locador")
      .filter((row) => filters.expenseType === "all" || row.expenseType === filters.expenseType)
      .filter((row) => isDateYearUpToCurrent(row.adjustedDue))
      .sort((a, b) => String(a.property || "").localeCompare(String(b.property || "")) || String(a.charge || "").localeCompare(String(b.charge || "")) || String(a.adjustedDue || "").localeCompare(String(b.adjustedDue || "")))
    : [];
  const reportRows = buildGroupedChargeRows(rows);

  renderTable(
    "charges-report-body",
    reportRows,
    (row) => `
      ${renderGroupedChargeRow(row)}
    `,
  );
}

function buildGroupedChargeRows(charges) {
  const rows = [];
  let currentProperty = "";
  let currentCharge = "";
  let propertyCount = 0;
  let chargeCount = 0;
  const closeCharge = () => {
    if (!currentCharge) return;
    rows.push({ kind: "charge-type-total", label: currentCharge, count: chargeCount });
    currentCharge = "";
    chargeCount = 0;
  };
  const closeProperty = () => {
    if (!currentProperty) return;
    closeCharge();
    rows.push({ kind: "charge-property-total", property: currentProperty, count: propertyCount });
    currentProperty = "";
    propertyCount = 0;
  };
  charges.forEach((charge) => {
    const property = charge.property || "-";
    const label = charge.charge || "-";
    if (property !== currentProperty) {
      closeProperty();
      currentProperty = property;
      rows.push({ kind: "charge-property", property });
    }
    if (label !== currentCharge) {
      closeCharge();
      currentCharge = label;
    }
    rows.push({ kind: "charge-detail", ...charge });
    chargeCount += 1;
    propertyCount += 1;
  });
  closeProperty();
  return rows;
}

function renderGroupedChargeRow(row) {
  if (row.kind === "charge-property") return `<td class="report-group-row" colspan="5">${escapeHtml(row.property)}</td>`;
  if (row.kind === "charge-type-total") return `<td class="report-subtotal-row" colspan="5">Total ${escapeHtml(row.label)}: ${row.count} encargo(s)</td>`;
  if (row.kind === "charge-property-total") return `<td class="report-total-row" colspan="5">Total do imovel ${escapeHtml(row.property)}: ${row.count} encargo(s)</td>`;
  return `
    <td>${escapeHtml(row.client)}</td>
    <td>${escapeHtml(row.charge)}</td>
    <td>${escapeHtml(capitalize(row.responsible))}</td>
    <td>${escapeHtml(row.baseDue)}</td>
    <td>${formatDate(row.adjustedDue)}</td>
  `;
}

function renderChart(id, rows, valueKey, tone) {
  const target = document.getElementById(id);
  const visibleRows = rows.filter((row) => row[valueKey] !== 0);
  if (!visibleRows.length) {
    target.innerHTML = document.getElementById("empty-template").innerHTML;
    return;
  }

  const max = Math.max(...visibleRows.map((row) => Math.abs(row[valueKey])));
  target.innerHTML = visibleRows
    .map((row) => {
      const width = Math.max(3, Math.round((Math.abs(row[valueKey]) / max) * 100));
      const barClass = [
        "chart-bar",
        tone === "expense" ? "expense" : "",
        row[valueKey] < 0 ? "negative" : "",
      ].join(" ");
      return `
        <div class="chart-row">
          <div class="chart-label">
            <span>${escapeHtml(row.property)}</span>
            <strong>${formatMoney(row[valueKey])}</strong>
          </div>
          <div class="chart-track">
            <div class="${barClass}" style="width: ${width}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderChargeSummary(contract) {
  return chargeRules
    .map((rule) => {
      const responsible = contract[rule.key] || "cliente";
      return `<span class="mini-line">${escapeHtml(rule.label)}: ${escapeHtml(capitalize(responsible))}</span>`;
    })
    .join("");
}

function renderContractFinancialTerms(contract) {
  const rows = [];
  if (contract.hasSecurityDeposit && Number(contract.securityDepositMonths || 0) > 0) {
    rows.push(`Caucao: ${Number(contract.securityDepositMonths)} mes(es)`);
  }
  if (contract.hasGracePeriod && Number(contract.gracePeriodMonths || 0) > 0) {
    rows.push(`Carencia: ${Number(contract.gracePeriodMonths)} mes(es)`);
  }
  return rows.length ? rows.map((row) => `<span class="mini-line">${escapeHtml(row)}</span>`).join("") : "-";
}

function renderContractAdjustedRent(contract) {
  const adjustments = normalizeRentAdjustments(contract);
  if (!contract?.hasAdjustedRent || !adjustments.length) return "-";
  return adjustments
    .map((adjustment) => `
      <span class="mini-line">
        ${escapeHtml(formatCompetence(adjustment.competence))}: ${formatMoney(adjustment.monthlyValue)}
        <small>${formatDate(adjustment.startDate)} a ${formatDate(adjustment.endDate)}${adjustment.note ? ` - ${escapeHtml(adjustment.note)}` : ""}</small>
      </span>
    `)
    .join("");
}

function getContractFinancialTermsText(contract) {
  const rows = [];
  if (contract.hasSecurityDeposit && Number(contract.securityDepositMonths || 0) > 0) {
    rows.push(`Caucao: ${Number(contract.securityDepositMonths)} mes(es)`);
  }
  if (contract.hasGracePeriod && Number(contract.gracePeriodMonths || 0) > 0) {
    rows.push(`Carencia: ${Number(contract.gracePeriodMonths)} mes(es)`);
  }
  return rows.length ? rows.join(" | ") : "-";
}

function getSecurityDepositNote(contract) {
  const months = Number(contract?.securityDepositMonths || 0);
  if (!contract?.hasSecurityDeposit || months <= 0) return "";
  return `Caucao de ${months} mes(es): compensar nas mensalidades conforme contrato.`;
}

function addAuditLog(action, collection, recordId, before, after, financial = false) {
  const user = getCurrentUser();
  const beforeSummary = summarizeRecord(before);
  const afterSummary = summarizeRecord(after);
  const summary = beforeSummary && afterSummary
    ? `${beforeSummary} -> ${afterSummary}`
    : afterSummary || beforeSummary || "-";
  state.auditLogs = [
    ...(state.auditLogs || []),
    {
      id: uid("audit"),
      createdAt: new Date().toISOString(),
      userId: user?.id || "system",
      userName: user?.username || "Sistema",
      userRole: user?.role || "system",
      action,
      collection,
      recordId,
      financial,
      summary,
      before: before ? structuredClone(before) : null,
      after: after ? structuredClone(after) : null,
    },
  ].slice(-500);
  saveState();
}

function summarizeRecord(record) {
  if (!record) return "";
  if (record.username) return `${record.username} (${roleLabels[record.role] || record.role || "sem perfil"})`;
  if (record.description) return record.description;
  if (record.name) return record.name;
  if (record.chargeKey && record.dueDate) return `${record.message || record.chargeKey} | vencimento ${formatDate(record.dueDate)} | ${record.confirmed ? "confirmado" : "pendente"}`;
  if (record.paymentDate) return `${formatDate(record.paymentDate)} ${formatMoney(record.totalAmount || record.amount)}`;
  if (record.expenseDate) return `${formatDate(record.expenseDate)} ${formatMoney(record.amount)} ${record.expenseType || ""}`.trim();
  if (record.monthlyValue) return `${formatMoney(record.monthlyValue)} ${record.startDate || ""}`.trim();
  if (record.message) return record.message;
  if (record.endpoint) return record.endpoint;
  return record.id || JSON.stringify(record).slice(0, 80);
}

function renderTable(bodyId, rows, rowTemplate) {
  const body = document.getElementById(bodyId);
  if (!body) return;
  if (!rows.length) {
    const colspan = document.getElementById(bodyId)?.closest("table")?.querySelectorAll("thead th").length || 8;
    body.innerHTML = `<tr><td colspan="${colspan}">${document.getElementById("empty-template").innerHTML}</td></tr>`;
    return;
  }
  body.innerHTML = rows
    .map((row, index) => {
      try {
        return `<tr>${rowTemplate(row, index)}</tr>`;
      } catch (error) {
        console.error(`Falha ao exibir registro na tabela ${bodyId}`, row?.id || index, error);
        return `<tr><td colspan="${body.closest("table")?.querySelectorAll("thead th").length || 8}">Registro com dados invalidos. Use Editar para revisar.</td></tr>`;
      }
    })
    .join("");
}

function renderList(id, rows, template) {
  const target = document.getElementById(id);
  if (!rows.length) {
    target.innerHTML = document.getElementById("empty-template").innerHTML;
    return;
  }
  target.innerHTML = rows.map((row) => `<article class="list-item">${template(row)}</article>`).join("");
}

function actions(collection, id, formId) {
  const editButton = canWriteCollection(collection) ? `<button class="small-button" data-edit="${collection}:${id}:${formId}" type="button">Editar</button>` : "";
  const deleteButton = canDeleteRecords() ? `<button class="small-button" data-delete="${collection}:${id}" type="button">Excluir</button>` : "";
  if (!editButton && !deleteButton) return "-";
  return `
    <div class="actions-cell">
      ${editButton}
      ${deleteButton}
    </div>
  `;
}

function editRecord(collection, id, formId) {
  if (!canWriteCollection(collection)) {
    alert("Seu perfil nao permite editar este registro.");
    return;
  }
  const record = state[collection].find((item) => item.id === id);
  const form = document.getElementById(formId);
  if (!record) return;

  Object.entries(record).forEach(([key, value]) => {
    if (!form.elements[key]) return;
    if (form.elements[key].type === "checkbox") {
      form.elements[key].checked = Boolean(value);
      return;
    }
    form.elements[key].value = value;
    if (form.elements[key].matches?.("[data-money-input]")) {
      form.elements[key].value = formatMoneyInputValue(value);
    }
  });
  if (formId === "payment-form") {
    updatePaymentTotal(form);
    updatePaymentContractInfo(form);
  }
  if (formId === "expense-form") {
    updateExpenseContractInfo(form);
  }
  if (formId === "contract-form") {
    form.elements.rentAdjustments.value = JSON.stringify(normalizeRentAdjustments(record));
    renderContractAdjustmentRows(form, normalizeRentAdjustments(record));
    syncContractFinancialTermFields(form);
  }
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindTableActions() {
  document.querySelector(".content").addEventListener("click", (event) => {
    const openMissingPaymentsButton = event.target.closest("[data-open-missing-payments]");
    if (openMissingPaymentsButton) {
      activateView("payments", { showAccessAlert: true });
      document.querySelector(".missing-payments-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const missingPaymentButton = event.target.closest("[data-missing-contract]");
    if (missingPaymentButton) {
      startMissingPaymentLaunch(missingPaymentButton.dataset.missingContract, missingPaymentButton.dataset.missingCompetence);
      return;
    }

    const editUserButton = event.target.closest("[data-edit-user]");
    if (editUserButton) {
      editAccessUser(editUserButton.dataset.editUser);
      return;
    }

    const deleteUserButton = event.target.closest("[data-delete-user]");
    if (deleteUserButton) {
      deleteAccessUser(deleteUserButton.dataset.deleteUser);
      return;
    }

    const editButton = event.target.closest("[data-edit]");
    if (editButton) {
      const [collection, id, formId] = editButton.dataset.edit.split(":");
      editRecord(collection, id, formId);
      return;
    }

    const deleteButton = event.target.closest("[data-delete]");
    if (deleteButton) {
      const [collection, id] = deleteButton.dataset.delete.split(":");
      deleteRecord(collection, id);
    }
  });
}

function deleteRecord(collection, id) {
  if (!requirePermission("admin:write", "Apenas administradores podem excluir registros.")) return;
  if (!canDeleteRecordSafely(collection, id)) return;
  if (!confirm("Deseja excluir este registro?")) return;
  const before = state[collection].find((item) => item.id === id);
  state[collection] = state[collection].filter((item) => item.id !== id);
  addAuditLog("record_deleted", collection, id, before, null, isFinancialCollection(collection));
  saveState();
  renderAll();
}

async function editAccessUser(userId, role) {
  if (!canManageUsers()) {
    alert("Apenas administradores podem alterar perfis.");
    return;
  }
  const before = accessUsers.find((user) => user.user_id === userId);
  try {
    await window.SupabaseSync.updateAccessUserRole(userId, role);
    addAuditLog("user_role_updated", "auth", userId, before, { username: before?.email, role }, false);
    await loadAccessUsers(true);
    setText("access-message", "Perfil atualizado com sucesso.");
  } catch (error) {
    setText("access-message", `Não foi possível alterar o perfil: ${error.message || error}`);
    await loadAccessUsers(true);
  }
}

async function deleteAccessUser(userId) {
  if (!canManageUsers()) {
    alert("Apenas administradores podem desativar usuários.");
    return;
  }
  const user = accessUsers.find((item) => item.user_id === userId);
  if (!user || !confirm(`Desativar o acesso de ${user.name || user.email}?`)) return;
  try {
    await window.SupabaseSync.deactivateAccessUser(userId);
    addAuditLog("user_deactivated", "auth", userId, user, null, false);
    await loadAccessUsers(true);
    setText("access-message", "Acesso desativado.");
  } catch (error) {
    setText("access-message", `Não foi possível desativar: ${error.message || error}`);
  }
}

function toReportRow(contract, filters = getReportFilters()) {
  const property = findProperty(contract.propertyId);
  const client = findClient(contract.clientId);
  const expenses = getFilteredExpenses(filters)
    .filter((expense) => expenseBelongsToContract(expense, contract))
    .reduce((sum, expense) => sum + expense.amount, 0);
  const ownerChargeCount = chargeRules.filter((rule) => (contract[rule.key] || "cliente") === "locador").length;
  const status = getContractStatus(contract);
  const referenceDate = getReportReferenceDate(filters);

  return {
    contractId: contract.id,
    propertyId: contract.propertyId,
    clientId: contract.clientId,
    property: property?.description || "-",
    client: client?.name || "-",
    contact: client ? `${client.contact} | ${client.phone}` : "-",
    period: `${formatDate(contract.startDate)} a ${formatDate(contract.endDate)}`,
    monthlyValue: getContractMonthlyValueForCompetence(contract, referenceDate),
    adjustedRent: getContractAdjustedRentText(contract),
    financialTerms: getContractFinancialTermsText(contract),
    expenses,
    ownerExpenses: expenses,
    ownerChargeCount,
    status: status.label,
    statusKey: status.key,
  };
}

function expenseBelongsToContract(expense, contract) {
  if (!expense || !contract) return false;
  if (expense.contractId) return expense.contractId === contract.id;
  if (expense.propertyId !== contract.propertyId) return false;
  const expenseDate = getExpenseCompetenceDate(expense);
  const start = parseDate(contract.startDate);
  const end = parseDate(contract.endDate);
  return Boolean(expenseDate && start && end && expenseDate >= start && expenseDate <= end);
}

function getContractStatus(contract) {
  const days = daysUntil(contract.endDate);
  if (days < 0) return { key: "expired", label: "Encerrado" };
  if (days <= 90) return { key: "ending", label: "A vencer" };
  return { key: "active", label: "Ativo" };
}

function openWhatsApp(contractId) {
  const message = buildContractMessage(contractId);
  if (!message.client?.phone) {
    alert("Cliente sem telefone cadastrado.");
    return;
  }
  const phone = message.client.phone.replace(/\D/g, "");
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message.text)}`, "_blank");
}

function openEmail(contractId) {
  const message = buildContractMessage(contractId);
  if (!message.client?.email) {
    alert("Cliente sem e-mail cadastrado.");
    return;
  }
  const subject = encodeURIComponent("Aviso sobre contrato de locacao");
  const body = encodeURIComponent(message.text);
  window.location.href = `mailto:${message.client.email}?subject=${subject}&body=${body}`;
}

async function shareChargesAttachment(contractId) {
  const message = buildContractMessage(contractId);
  const attachment = buildChargesAttachment(contractId);
  if (!attachment || !message.client?.phone) {
    alert("Contrato sem cliente, telefone ou taxas para gerar anexo.");
    return;
  }

  const file = new File([attachment.csv], attachment.fileName, { type: "text/csv" });
  const sharePayload = {
    title: "Impostos e taxas do contrato",
    text: message.text,
    files: [file],
  };

  if (navigator.canShare && navigator.canShare(sharePayload) && navigator.share) {
    await navigator.share(sharePayload);
    return;
  }

  downloadTextFile(attachment.csv, attachment.fileName, "text/csv;charset=utf-8");
  openWhatsApp(contractId);
  alert("O anexo foi baixado. No WhatsApp, clique no icone de anexar e selecione o arquivo gerado.");
}

function buildChargesAttachment(contractId) {
  const contract = state.contracts.find((item) => item.id === contractId);
  if (!contract) return null;

  const property = findProperty(contract.propertyId);
  const client = findClient(contract.clientId);
  const rows = chargeRules.map((rule) => {
    const dueDate = getChargeDueDate(rule);
    return [
      property?.description || "-",
      client?.name || "-",
      rule.label,
      capitalize(contract[rule.key] || "cliente"),
      rule.baseLabel,
      formatDate(toIsoDate(adjustToPreviousBusinessDay(dueDate))),
    ];
  });

  const csvRows = [
    ["Imovel", "Cliente", "Imposto ou taxa", "Responsavel", "Vencimento base", "Vencimento ajustado"],
    ...rows,
  ];
  const csv = csvRows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";")).join("\n");
  const safeName = `${property?.description || "imovel"}-${client?.name || "cliente"}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return {
    csv,
    fileName: `impostos-taxas-${safeName || "contrato"}.csv`,
  };
}

function downloadTextFile(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function buildContractMessage(contractId) {
  const contract = state.contracts.find((item) => item.id === contractId);
  const client = findClient(contract?.clientId);
  const property = findProperty(contract?.propertyId);
  const dueDate = nextDueDate(contract?.dueDay);
  const terms = getContractFinancialTermsText(contract);
  const termsText = terms === "-" ? "" : ` Condicoes financeiras: ${terms}.`;
  const currentMonthlyValue = getContractMonthlyValueForDate(contract, dueDate);
  const adjustedText = contract?.hasAdjustedRent ? ` Valor ajustado cadastrado: ${getContractAdjustedRentText(contract)}.` : "";
  const text = `Ola, ${client?.contact || client?.name || ""}. Lembramos que o contrato do imovel ${property?.description || ""} possui aluguel mensal de ${formatMoney(currentMonthlyValue)} com vencimento em ${formatDate(dueDate)}. Vigencia atual: ${formatDate(contract?.startDate)} a ${formatDate(contract?.endDate)}.${termsText}${adjustedText}`;
  return { client, text };
}

function nextDueDate(day) {
  const today = new Date();
  const due = new Date(today.getFullYear(), today.getMonth(), Math.min(Number(day || 1), 28));
  if (due < today) due.setMonth(due.getMonth() + 1);
  return due.toISOString().slice(0, 10);
}

function exportReportsCsv() {
  requestReportExport("csv");
}

function exportReportsExcel() {
  requestReportExport("excel");
}

function exportReportsPdf() {
  requestReportExport("pdf");
}

function requestReportExport(format) {
  if (getReportDataset() !== "financial") {
    runReportExport(format);
    return;
  }
  openExportSelection("report-export-selection", format);
}

function confirmReportExport() {
  const format = getPendingExportFormat("report-export-selection");
  closeExportSelection("report-export-selection");
  runReportExport(format);
}

function runReportExport(format) {
  const actions = {
    csv: performReportsCsv,
    excel: performReportsExcel,
    pdf: performReportsPdf,
  };
  actions[format || "pdf"]?.();
}

function exportFinancialErpCsv() {
  openExportSelection("erp-export-selection", "csv");
}

function exportFinancialErpExcel() {
  openExportSelection("erp-export-selection", "excel");
}

function exportFinancialErpPdf() {
  openExportSelection("erp-export-selection", "pdf");
}

function confirmFinancialErpExport() {
  const format = getPendingExportFormat("erp-export-selection");
  closeExportSelection("erp-export-selection");
  const actions = {
    csv: performFinancialErpCsv,
    excel: performFinancialErpExcel,
    pdf: performFinancialErpPdf,
  };
  actions[format || "pdf"]?.();
}

function openExportSelection(panelId, format) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.dataset.pendingExport = format;
  panel.classList.remove("hidden");
  updateExportConfirmLabel(panelId, format);
  if (panelId === "report-export-selection") updateReportExportOptionsVisibility();
  syncExportMaster(panelId === "report-export-selection" ? "report-export-all" : "erp-export-all", panelId === "report-export-selection" ? "report-export-section" : "erp-export-section");
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeExportSelection(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.classList.add("hidden");
  panel.dataset.pendingExport = "";
}

function getPendingExportFormat(panelId) {
  return document.getElementById(panelId)?.dataset.pendingExport || "pdf";
}

function updateExportConfirmLabel(panelId, format) {
  const label = { csv: "CSV", excel: "Excel", pdf: "PDF" }[format] || "PDF";
  const buttonId = panelId === "report-export-selection" ? "report-export-confirm" : "erp-export-confirm";
  const button = document.getElementById(buttonId);
  if (button) button.textContent = `Confirmar exportacao ${label}`;
}
function setupExportSelectionControls() {
  bindExportSelectionControl("report-export-all", "report-export-section", updateReportExportOptionsVisibility);
  bindExportSelectionControl("erp-export-all", "erp-export-section");
  document.getElementById("report-export-confirm")?.addEventListener("click", confirmReportExport);
  document.getElementById("report-export-cancel")?.addEventListener("click", () => closeExportSelection("report-export-selection"));
  document.getElementById("erp-export-confirm")?.addEventListener("click", confirmFinancialErpExport);
  document.getElementById("erp-export-cancel")?.addEventListener("click", () => closeExportSelection("erp-export-selection"));
  updateReportExportOptionsVisibility();
}

function bindExportSelectionControl(masterId, itemName, afterChange = null) {
  const master = document.getElementById(masterId);
  const items = [...document.querySelectorAll(`input[name="${itemName}"]`)];
  if (!master || !items.length || master.dataset.exportSelectionBound === "true") return;
  master.dataset.exportSelectionBound = "true";
  const syncMaster = () => {
    const activeItems = items.filter((item) => !item.closest(".hidden"));
    const checkedCount = activeItems.filter((item) => item.checked).length;
    master.checked = activeItems.length > 0 && checkedCount === activeItems.length;
    master.indeterminate = checkedCount > 0 && checkedCount < activeItems.length;
  };
  master.addEventListener("change", () => {
    items.forEach((item) => {
      if (!item.closest(".hidden")) item.checked = master.checked;
    });
    syncMaster();
    afterChange?.();
  });
  items.forEach((item) => item.addEventListener("change", () => {
    syncMaster();
    afterChange?.();
  }));
  syncMaster();
}

function updateReportExportOptionsVisibility() {
  const isFinancial = getReportDataset() === "financial";
  const selection = document.getElementById("report-export-selection");
  if (!isFinancial) selection?.classList.add("hidden");
  document.getElementById("report-export-analytic-options")?.classList.toggle("hidden", !isFinancial || reportMode !== "analytic");
  document.getElementById("report-export-summary-options")?.classList.toggle("hidden", !isFinancial || reportMode !== "summary");
  syncExportMaster("report-export-all", "report-export-section");
}

function syncExportMaster(masterId, itemName) {
  const master = document.getElementById(masterId);
  const items = [...document.querySelectorAll(`input[name="${itemName}"]`)].filter((item) => !item.closest(".hidden"));
  if (!master || !items.length) return;
  const checkedCount = items.filter((item) => item.checked).length;
  master.checked = checkedCount === items.length;
  master.indeterminate = checkedCount > 0 && checkedCount < items.length;
}

function getSelectedReportExportTables() {
  const tables = REPORT_EXPORT_TABLES[reportMode] || REPORT_EXPORT_TABLES.analytic;
  const selectedKeys = getSelectedExportKeys("report-export-all", "report-export-section", tables.map((table) => table.key));
  return tables.filter((table) => selectedKeys.includes(table.key));
}

function getSelectedErpExportKeys() {
  return getSelectedExportKeys("erp-export-all", "erp-export-section", ERP_EXPORT_KEYS);
}

function getSelectedExportKeys(masterId, itemName, allowedKeys) {
  const master = document.getElementById(masterId);
  if (!master || master.checked) return allowedKeys;
  const allowed = new Set(allowedKeys);
  return [...document.querySelectorAll(`input[name="${itemName}"]:checked`)]
    .map((item) => item.value)
    .filter((key) => allowed.has(key));
}

function ensureExportSelection(sections) {
  if (sections.length) return true;
  alert("Selecione pelo menos um relatorio para exportar.");
  return false;
}

function getTableRows(selector) {
  return [...document.querySelectorAll(`${selector} tr`)].map((tr) =>
    [...tr.querySelectorAll("td")].map((td) => td.innerText.replace(/\s+/g, " ").trim()),
  ).filter((row) => row.length);
}

function buildCsvSections(sections) {
  const lines = [];
  sections.forEach((section) => {
    lines.push(section.title);
    if (section.headers?.length) lines.push(section.headers.map(escapeCsvCell).join(";"));
    section.rows.forEach((row) => lines.push(row.map(escapeCsvCell).join(";")));
    lines.push("");
  });
  return "\ufeff" + lines.join("\n");
}

function escapeCsvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function getReportExportSections() {
  return getSelectedReportExportTables().map((table) => ({ ...table, rows: getTableRows(table.selector) }));
}

function getErpExportSections(data) {
  const sections = [
    { key: "summary", title: "DRE imobiliaria", sheet: "DRE", headers: null, rows: data.summary },
    { key: "cashflow", title: "Fluxo de caixa", sheet: "Fluxo de caixa", headers: data.cashflow.headers, rows: data.cashflow.rows },
    { key: "receivables", title: "Contas a receber", sheet: "Contas a receber", headers: data.receivables.headers, rows: data.receivables.rows },
    { key: "expenseCategories", title: "Despesas por categoria", sheet: "Despesas categoria", headers: data.expenseCategories.headers, rows: data.expenseCategories.rows },
    { key: "profitability", title: "Rentabilidade por imovel", sheet: "Rentabilidade", headers: data.profitability.headers, rows: data.profitability.rows },
  ];
  const selected = new Set(getSelectedErpExportKeys());
  return sections.filter((section) => selected.has(section.key));
}
function performReportsCsv() {
  if (getReportDataset() !== "financial") {
    const report = getCurrentRegistrationReportData();
    const csv = [report.headers, ...report.rows].map((row) => row.map(escapeCsvCell).join(";")).join("\n");
    downloadTextFile("\ufeff" + csv, `${getRegistrationReportFileBase(report)}.csv`, "text/csv;charset=utf-8");
    return;
  }
  renderReports();
  const sections = getReportExportSections();
  if (!ensureExportSelection(sections)) return;
  downloadTextFile(
    buildCsvSections(sections),
    reportMode === "summary" ? "relatorio-gerencial-locacoes.csv" : "relatorio-locacoes.csv",
    "text/csv;charset=utf-8",
  );
}

function performReportsExcel() {
  renderReports();
  if (getReportDataset() !== "financial") {
    const report = getCurrentRegistrationReportData();
    const workbook = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8" /></head>
      <body>
        <h2>${escapeHtml(report.title)}</h2>
        <table>
          <thead><tr>${report.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>${report.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </body>
    </html>
  `;
    downloadTextFile(workbook, `${getRegistrationReportFileBase(report)}.xls`, "application/vnd.ms-excel;charset=utf-8");
    return;
  }
  const sections = getReportExportSections();
  if (!ensureExportSelection(sections)) return;
  const htmlSections = sections.map((section) => `
    <h2>${escapeHtml(section.title)}</h2>
    <table>
      <thead><tr>${section.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>${section.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  `);
  const workbook = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8" /></head>
      <body>${htmlSections.join("<br />")}</body>
    </html>
  `;
  downloadTextFile(workbook, reportMode === "summary" ? "relatorio-gerencial-locacoes.xls" : "relatorio-locacoes.xls", "application/vnd.ms-excel;charset=utf-8");
}

function performReportsPdf() {
  renderReports();
  if (getReportDataset() !== "financial") {
    exportRegistrationReportPdf();
    return;
  }
  const sections = getReportExportSections();
  if (!ensureExportSelection(sections)) return;
  const styles = document.querySelector("link[rel='stylesheet']").href;
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Permita pop-ups para gerar o PDF.");
    return;
  }
  const sectionHtml = sections.map((section) => `
    <section class="panel table-wrap">
      <div class="panel-header"><h3>${escapeHtml(section.title)}</h3><span>${section.rows.length} registro(s)</span></div>
      <table class="management-table">
        <thead><tr>${section.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>${section.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </section>
  `).join("");
  printWindow.document.write(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Relatorio - ${companyName}</title>
        <link rel="stylesheet" href="${styles}" />
        <style>
          body { background: #fff; padding: 24px; }
          .print-header { display: flex; align-items: center; gap: 18px; margin-bottom: 18px; }
          .print-header img { width: 220px; }
          .panel { box-shadow: none; margin-bottom: 18px; }
          table { table-layout: fixed; width: 100%; }
          th, td { overflow-wrap: anywhere; word-break: break-word; font-size: 11px; }
        </style>
      </head>
      <body>
        <header class="print-header">
          <img src="logo-imobiliaria-rio.svg" alt="${companyName}" />
          <div>
            <h1>Relatorio ${reportMode === "summary" ? "sintetico gerencial" : "analitico"}</h1>
            <p>Gerado em ${formatDate(toIsoDate(new Date()))}</p>
          </div>
        </header>
        ${sectionHtml}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 400);
}
function getCurrentRegistrationReportData() {
  return getRegistrationReportData(
    getReportDataset(),
    document.getElementById("report-property")?.value || "all",
    document.getElementById("report-client")?.value || "all",
    document.getElementById("report-status")?.value || "all",
    getReportFilters(),
  );
}

function getRegistrationReportFileBase(report) {
  return report.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function exportRegistrationReportPdf() {
  const report = getCurrentRegistrationReportData();
  const styles = document.querySelector("link[rel='stylesheet']").href;
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Permita pop-ups para gerar o PDF.");
    return;
  }
  printWindow.document.write(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHtml(report.title)} - ${companyName}</title>
        <link rel="stylesheet" href="${styles}" />
        <style>
          body { background: #fff; padding: 24px; }
          .print-header { display: flex; align-items: center; gap: 18px; margin-bottom: 18px; }
          .print-header img { width: 220px; }
          .panel { box-shadow: none; }
        </style>
      </head>
      <body>
        <header class="print-header">
          <img src="logo-imobiliaria-rio.svg" alt="${companyName}" />
          <div>
            <h1>${escapeHtml(report.title)}</h1>
            <p>Gerado em ${formatDate(toIsoDate(new Date()))}</p>
          </div>
        </header>
        <table>
          <thead><tr>${report.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>${report.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 400);
}

function createSampleData() {
  const propertyA = { id: uid("property"), description: "Sala comercial 204", type: "Sala comercial", area: "45 m2", location: "Aldeota, Fortaleza" };
  const propertyB = { id: uid("property"), description: "Terreno BR-116", type: "Terreno", area: "1.800 m2", location: "Eusebio, CE" };
  const clientA = { id: uid("client"), document: "12.345.678/0001-90", name: "Comercial Lima Ltda", contact: "Mariana Lima", phone: "5585999999999", email: "cliente@example.com" };
  const clientB = { id: uid("client"), document: "529.982.247-25", name: "Joao Pereira", contact: "Joao Pereira", phone: "5585888888888", email: "joao@example.com" };

  return {
    properties: [propertyA, propertyB],
    clients: [clientA, clientB],
    contracts: [
      { id: uid("contract"), propertyId: propertyA.id, clientId: clientA.id, startDate: "2026-01-01", endDate: "2027-01-01", monthlyValue: 2800, adjustmentFrequency: "Anual", adjustmentMethod: "IPCA", dueDay: 10, hasSecurityDeposit: true, securityDepositMonths: 2, hasGracePeriod: true, gracePeriodMonths: 1, condoFeeResponsible: "cliente", iptuResponsible: "locador", spuResponsible: "locador", fireFeeResponsible: "cliente" },
      { id: uid("contract"), propertyId: propertyB.id, clientId: clientB.id, startDate: "2025-08-01", endDate: "2026-07-31", monthlyValue: 5200, adjustmentFrequency: "Anual", adjustmentMethod: "IGP-M", dueDay: 5, hasSecurityDeposit: false, securityDepositMonths: 0, hasGracePeriod: false, gracePeriodMonths: 0, condoFeeResponsible: "locador", iptuResponsible: "cliente", spuResponsible: "cliente", fireFeeResponsible: "cliente" },
    ],
    expenses: [
      { id: uid("expense"), propertyId: propertyA.id, expenseType: "Manutencao", expenseDate: "2026-05-10", amount: 450, note: "Reparo eletrico" },
      { id: uid("expense"), propertyId: propertyB.id, expenseType: "Impostos e taxas", expenseDate: "2026-04-20", amount: 1300, note: "Taxa municipal" },
    ],
    payments: [
      { id: uid("payment"), propertyId: propertyA.id, paymentDate: "2026-05-10", amount: 2800, chargeAmount: 0, totalAmount: 2800, history: "Pagamento no vencimento" },
      { id: uid("payment"), propertyId: propertyB.id, paymentDate: "2026-05-12", amount: 5200, chargeAmount: 180, totalAmount: 5380, history: "Pagamento com encargo por atraso" },
    ],
    chargeConfirmations: [],
  };
}

function getFilteredChargeRows(propertyId = document.getElementById("report-property")?.value || "all", clientId = document.getElementById("report-client")?.value || "all", status = document.getElementById("report-status")?.value || "all") {
  return state.contracts
    .filter((contract) => propertyId === "all" || contract.propertyId === propertyId)
    .filter((contract) => clientId === "all" || contract.clientId === clientId)
    .filter((contract) => status === "all" || getContractStatus(contract).key === status)
    .flatMap((contract) => {
      const property = findProperty(contract.propertyId);
      const client = findClient(contract.clientId);
      return chargeRules.map((rule) => {
        const dueDate = getChargeDueDate(rule);
        return {
          property: property?.description || "-",
          client: client?.name || "-",
          charge: rule.label,
          chargeKey: rule.key,
          expenseType: getChargeExpenseType(rule),
          contract,
          contractId: contract.id,
          responsible: contract[rule.key] || "cliente",
          baseDue: rule.baseLabel,
          adjustedDue: toIsoDate(adjustToPreviousBusinessDay(dueDate)),
        };
      });
    });
}

function getChargeExpenseType(rule) {
  if (["iptuResponsible", "spuResponsible", "fireFeeResponsible"].includes(rule.key)) return "Impostos e taxas";
  if (rule.key === "condoFeeResponsible") return "Condominio";
  return "Outros";
}

function isDateYearUpToCurrent(dateValue, referenceDate = new Date()) {
  const parsed = parseDate(dateValue);
  return !parsed || parsed.getFullYear() <= referenceDate.getFullYear();
}

function getChargeDueDate(rule) {
  const today = new Date();
  if (rule.kind === "monthly") {
    const dueDate = new Date(today.getFullYear(), today.getMonth(), rule.day);
    if (dueDate < today) dueDate.setMonth(dueDate.getMonth() + 1);
    return dueDate;
  }

  const dueDate = new Date(today.getFullYear(), rule.month, rule.day);
  if (dueDate < today) dueDate.setFullYear(dueDate.getFullYear() + 1);
  return dueDate;
}

function adjustToPreviousBusinessDay(date) {
  const adjusted = new Date(date);
  while (adjusted.getDay() === 0 || adjusted.getDay() === 6) {
    adjusted.setDate(adjusted.getDate() - 1);
  }
  return adjusted;
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function getFilteredExpenses(filters = getReportFilters()) {
  return state.expenses
    .filter((expense) => filters.expenseType === "all" || expense.expenseType === filters.expenseType)
    .filter((expense) => !filters.startDate || getExpenseCompetenceDate(expense) >= parseDate(filters.startDate))
    .filter((expense) => !filters.endDate || getExpenseCompetenceDate(expense) <= parseDate(filters.endDate));
}

function getFilteredPayments(filters = getReportFilters(), propertyId = document.getElementById("report-property")?.value || "all", clientId = document.getElementById("report-client")?.value || "all", status = document.getElementById("report-status")?.value || "all") {
  const allowedProperties = getAllowedPaymentPropertyIds(clientId, status);
  return state.payments
    .filter((payment) => propertyId === "all" || payment.propertyId === propertyId)
    .filter((payment) => !allowedProperties || allowedProperties.has(payment.propertyId))
    .filter((payment) => !filters.startDate || getPaymentCompetenceDate(payment) >= parseDate(filters.startDate))
    .filter((payment) => !filters.endDate || getPaymentCompetenceDate(payment) <= parseDate(filters.endDate))
    .filter((payment) => !filters.minValue || Number(payment.totalAmount || 0) >= filters.minValue)
    .filter((payment) => !filters.maxValue || Number(payment.totalAmount || 0) <= filters.maxValue);
}

function getAllowedPaymentPropertyIds(clientId, status) {
  if (clientId === "all" && status === "all") return null;
  return new Set(
    state.contracts
      .filter((contract) => clientId === "all" || contract.clientId === clientId)
      .filter((contract) => status === "all" || getContractStatus(contract).key === status)
      .map((contract) => contract.propertyId),
  );
}

function getEnteredExpenses(propertyId, filters = getReportFilters()) {
  return getFilteredExpenses(filters)
    .filter((expense) => expense.propertyId === propertyId)
    .reduce((sum, expense) => sum + expense.amount, 0);
}

function capitalize(value) {
  return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1);
}

function findProperty(id) {
  return state.properties.find((property) => property.id === id);
}

function findClient(id) {
  return state.clients.find((client) => client.id === id);
}

function getContractsForProperty(propertyId) {
  if (!propertyId) return [];
  return state.contracts
    .filter((contract) => contract.propertyId === propertyId)
    .sort((left, right) => String(right.startDate || "").localeCompare(String(left.startDate || "")));
}

function findActiveContractForDate(contracts, launchDate) {
  const date = parseDate(launchDate);
  if (!date || !Array.isArray(contracts)) return null;
  return contracts.find((contract) => {
    const start = parseDate(contract.startDate);
    const end = parseDate(contract.endDate);
    return start && end && date >= start && date <= end;
  }) || null;
}

function findFinancialContract(propertyId, launchDate, preferredContractId = "") {
  if (!propertyId) return null;
  const matchingContracts = getContractsForProperty(propertyId);
  if (!matchingContracts.length) return null;

  const activeContract = findActiveContractForDate(matchingContracts, launchDate);
  if (activeContract) return activeContract;

  if (preferredContractId) {
    const preferred = matchingContracts.find((contract) => contract.id === preferredContractId);
    if (preferred) return preferred;
  }

  return matchingContracts.length === 1 ? matchingContracts[0] : null;
}

function getContractCode(contract) {
  if (!contract?.id) return "";
  return String(contract.id).replace(/^contract-?/, "CTR-").slice(0, 12).toUpperCase();
}

function daysUntil(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${dateString}T00:00:00`);
  return Math.ceil((target - today) / 86400000);
}

function toMonthValue(date) {
  if (!date) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function parseMonthValue(value) {
  const [year, month] = String(value || "").split("-").map(Number);
  return new Date(year || new Date().getFullYear(), (month || 1) - 1, 1);
}

function listMonths(startDate, endDate) {
  const months = [];
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  while (cursor <= end) {
    months.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return months.length ? months : [new Date(startDate.getFullYear(), startDate.getMonth(), 1)];
}

function toDateInputValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("pt-BR", { month: "2-digit", year: "numeric" }).format(date);
}

function parseMoneyInput(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const raw = String(value ?? "").trim();
  if (!raw) return 0;
  const cleaned = raw.replace(/[^\d,.-]/g, "");
  const isNegative = cleaned.includes("-");
  const unsigned = cleaned.replace(/-/g, "");
  const commaIndex = unsigned.lastIndexOf(",");
  const dotIndex = unsigned.lastIndexOf(".");
  let normalized = unsigned;

  if (commaIndex >= 0 && dotIndex >= 0) {
    const decimalSeparator = commaIndex > dotIndex ? "," : ".";
    const thousandsSeparator = decimalSeparator === "," ? "." : ",";
    normalized = unsigned
      .replace(new RegExp(`\\${thousandsSeparator}`, "g"), "")
      .replace(decimalSeparator, ".");
  } else if (commaIndex >= 0) {
    normalized = unsigned.replace(/\./g, "").replace(",", ".");
  } else if ((unsigned.match(/\./g) || []).length > 1) {
    normalized = unsigned.replace(/\./g, "");
  } else if (/^\d{1,3}\.\d{3}$/.test(unsigned)) {
    normalized = unsigned.replace(".", "");
  }

  const number = Number(normalized);
  if (!Number.isFinite(number)) return 0;
  return isNegative ? -number : number;
}

function formatMoneyInputValue(value) {
  if (value === "" || value == null) return "";
  return numberFormatter.format(parseMoneyInput(value));
}

function bindCurrencyFields(root = document) {
  root.querySelectorAll("[data-money-input]").forEach(bindCurrencyInput);
}

function bindCurrencyInput(input) {
  if (!input || input.dataset.moneyBound === "true") return;
  input.dataset.moneyBound = "true";
  input.autocomplete = input.autocomplete || "off";
  input.addEventListener("blur", () => {
    input.value = formatMoneyInputValue(input.value);
  });
  input.addEventListener("focus", () => {
    input.select?.();
  });
}

function formatMoney(value) {
  return moneyFormatter.format(Number(value || 0));
}

function formatNumber(value) {
  return numberFormatter.format(Number(value || 0));
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(`${dateString}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? "-" : dateFormatter.format(date);
}

function isValidDateTime(dateString) {
  if (!dateString) return false;
  return !Number.isNaN(new Date(dateString).getTime());
}

function formatDateTime(dateString) {
  if (!isValidDateTime(dateString)) return "-";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(dateString));
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}


/* =========================================================================
 * Exportacoes do ERP financeiro - PDF, Excel (xlsx) e CSV
 * Usa SheetJS (XLSX global) e jsPDF + autoTable carregados via CDN no HTML.
 * Em caso de bloqueio da CDN, fallback para .xls (HTML) e janela de impressao.
 * ========================================================================= */

function getErpExportData() {
  renderFinancialErp();
  const period = getErpPeriod();
  const receivables = buildAutomaticReceivables(period);
  const payments = state.payments.filter((p) =>
    isDateInPeriod(getPaymentCompetenceDate(p), period.startDate, period.endDate),
  );
  const expenses = state.expenses.filter((e) =>
    isDateInPeriod(getExpenseCompetenceDate(e), period.startDate, period.endDate),
  );
  const receivedRevenue = payments.reduce((s, p) => s + Number(p.totalAmount || 0), 0);
  const expectedRevenue = receivables.reduce((s, i) => s + i.expected, 0);
  const expensesTotal = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const overdueTotal = receivables
    .filter((i) => i.statusKey === "overdue")
    .reduce((s, i) => s + i.balance, 0);
  const operatingResult = receivedRevenue - expensesTotal;
  const operatingMargin = receivedRevenue ? (operatingResult / receivedRevenue) * 100 : 0;
  const totalInvestment = state.properties.reduce(
    (s, p) => s + Number(p.investmentValue || 0),
    0,
  );
  const annualizedRoi = totalInvestment
    ? (operatingResult / totalInvestment) * (12 / period.months.length) * 100
    : 0;
  const accumulatedResult = getTotalAccumulatedResult();
  const totalRoi = totalInvestment ? (accumulatedResult / totalInvestment) * 100 : 0;

  const summary = [
    ["Periodo", `${formatMonth(period.startDate)} a ${formatMonth(period.endDate)}`],
    ["Recebiveis previstos", formatMoney(expectedRevenue)],
    ["Recebido no periodo", formatMoney(receivedRevenue)],
    ["Inadimplencia vencida", formatMoney(overdueTotal)],
    ["Despesas operacionais", formatMoney(expensesTotal)],
    ["Resultado operacional", formatMoney(operatingResult)],
    ["Margem operacional", `${formatNumber(operatingMargin)}%`],
    ["ROI anualizado", `${formatNumber(annualizedRoi)}%`],
    ["Resultado acumulado", formatMoney(accumulatedResult)],
    ["ROI total acumulado", `${formatNumber(totalRoi)}%`],
  ];

  const receivablesRows = receivables.map((i) => [
    formatDate(toDateInputValue(i.dueDate)),
    i.property?.description || "-",
    i.client?.name || "-",
    Number(i.expected.toFixed(2)),
    Number(i.received.toFixed(2)),
    Number(i.balance.toFixed(2)),
    i.status,
    i.note || "-",
  ]);

  const cashflowRows = period.months.map((monthDate) => {
    const month = toMonthValue(monthDate);
    const inflow = payments
      .filter((p) => toMonthValue(getPaymentCompetenceDate(p)) === month)
      .reduce((s, p) => s + Number(p.totalAmount || 0), 0);
    const outflow = expenses
      .filter((e) => toMonthValue(getExpenseCompetenceDate(e)) === month)
      .reduce((s, e) => s + Number(e.amount || 0), 0);
    return [formatMonth(monthDate), Number(inflow.toFixed(2)), Number(outflow.toFixed(2)), Number((inflow - outflow).toFixed(2))];
  });

  const expenseCatRows = Object.entries(
    expenses.reduce((g, e) => {
      const k = e.expenseType || "Outros";
      g[k] = (g[k] || 0) + Number(e.amount || 0);
      return g;
    }, {}),
  )
    .map(([cat, amt]) => [cat, Number(amt.toFixed(2)), expensesTotal ? Number(((amt / expensesTotal) * 100).toFixed(2)) : 0])
    .sort((a, b) => b[1] - a[1]);

  const propRows = state.properties
    .map((property) => {
      const revenue = payments
        .filter((p) => p.propertyId === property.id)
        .reduce((s, p) => s + Number(p.totalAmount || 0), 0);
      const expTotal = expenses
        .filter((e) => e.propertyId === property.id)
        .reduce((s, e) => s + Number(e.amount || 0), 0);
      const result = revenue - expTotal;
      const margin = revenue ? (result / revenue) * 100 : 0;
      const roi = calculatePropertyRoi(property, result, period.months.length);
      const investment = Number(property.investmentValue || 0);
      return {
        values: [
          property.description,
          Number(investment.toFixed(2)),
          Number(revenue.toFixed(2)),
          Number(expTotal.toFixed(2)),
          Number(result.toFixed(2)),
          Number(margin.toFixed(2)),
          investment ? Number(roi.annual.toFixed(2)) : "-",
          investment ? Number(roi.accumulatedResult.toFixed(2)) : "-",
          investment ? Number(roi.total.toFixed(2)) : "-",
          getProfitabilityStatusLabel({ revenue, expenses: expTotal, result, margin }),
        ],
        revenue,
        expenses: expTotal,
        result,
        investment,
      };
    })
    .filter((row) => row.revenue || row.expenses || row.result || row.investment)
    .map((row) => row.values);

  return {
    period,
    summary,
    receivables: { headers: ["Vencimento", "Imovel", "Cliente", "Previsto", "Recebido", "Saldo", "Status", "Observacao"], rows: receivablesRows },
    cashflow: { headers: ["Mes", "Entradas", "Saidas", "Saldo"], rows: cashflowRows },
    expenseCategories: { headers: ["Categoria", "Total", "Participacao %"], rows: expenseCatRows },
    profitability: {
      headers: ["Imovel", "Investimento", "Receita", "Despesas", "Resultado", "Margem %", "ROI anualizado %", "Resultado acumulado", "ROI total %", "Leitura"],
      rows: propRows,
    },
  };
}

function performFinancialErpExcel() {
  const data = getErpExportData();
  const sections = getErpExportSections(data);
  if (!ensureExportSelection(sections)) return;
  const fileName = `erp-financeiro-${toMonthValue(data.period.startDate)}_a_${toMonthValue(data.period.endDate)}.xlsx`;

  const xlsx = window.XLSX;
  if (!xlsx) {
    alert("Biblioteca XLSX nao carregou. Verifique sua conexao para gerar o arquivo Excel.");
    return;
  }
  const wb = xlsx.utils.book_new();
  const addSheet = (name, headers, rows, prefix = []) => {
    const aoa = [...prefix];
    if (headers) aoa.push(headers);
    aoa.push(...rows);
    const ws = xlsx.utils.aoa_to_sheet(aoa);
    xlsx.utils.book_append_sheet(wb, ws, name.slice(0, 31));
  };
  sections.forEach((section, index) => {
    const prefix = index === 0 ? [[`ERP Financeiro - ${companyName}`], [`Gerado em ${formatDate(toIsoDate(new Date()))}`], []] : [];
    addSheet(section.sheet || section.title, section.headers, section.rows, prefix);
  });
  xlsx.writeFile(wb, fileName);
}

function performFinancialErpPdf() {
  const data = getErpExportData();
  const sections = getErpExportSections(data);
  if (!ensureExportSelection(sections)) return;
  const fileName = `erp-financeiro-${toMonthValue(data.period.startDate)}_a_${toMonthValue(data.period.endDate)}.pdf`;

  const jsPDFCtor = window.jspdf?.jsPDF;
  if (!jsPDFCtor) {
    alert("Biblioteca jsPDF nao carregou. Verifique sua conexao para gerar o PDF.");
    return;
  }
  const doc = new jsPDFCtor({ unit: "pt", format: "a4" });
  doc.setFontSize(16);
  doc.text(`ERP Financeiro - ${companyName}`, 40, 50);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    `Periodo: ${formatMonth(data.period.startDate)} a ${formatMonth(data.period.endDate)}    -    Gerado em ${formatDate(toIsoDate(new Date()))}`,
    40,
    68,
  );
  doc.setTextColor(0);

  const drawTable = (title, headers, rows) => {
    if (typeof doc.autoTable !== "function") {
      doc.setFontSize(12);
      doc.text(title, 40, doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 30 : 100);
      return;
    }
    doc.autoTable({
      head: headers ? [headers] : undefined,
      body: rows.map((r) => r.map((c) => (typeof c === "number" ? formatMoneyOrNumber(c) : String(c)))),
      startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 24 : 90,
      margin: { left: 40, right: 40 },
      styles: { fontSize: 8, cellPadding: 3, overflow: "linebreak", minCellHeight: 12 },
      headStyles: { fillColor: [92, 23, 27], textColor: 255 },
      didDrawPage: () => {
        doc.setFontSize(11);
        doc.setTextColor(92, 23, 27);
        doc.text(title, 40, doc.lastAutoTable?.finalY ? 40 : 86);
        doc.setTextColor(0);
      },
    });
  };

  sections.forEach((section) => drawTable(section.title, section.headers, section.rows));
  doc.save(fileName);
}
function formatMoneyOrNumber(value) {
  if (Number.isFinite(value)) return formatMoney(value);
  return String(value);
}

function performFinancialErpCsv() {
  const data = getErpExportData();
  const sections = getErpExportSections(data);
  if (!ensureExportSelection(sections)) return;
  downloadTextFile(
    buildCsvSections(sections),
    `erp-financeiro-${toMonthValue(data.period.startDate)}_a_${toMonthValue(data.period.endDate)}.csv`,
    "text/csv;charset=utf-8",
  );
}























































