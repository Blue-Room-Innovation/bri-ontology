Què és automàtic ara

El paquet de contracts llegeix config.yml i, quan fas npm run contracts:build, fa tot això automàticament:
Mira build_version i generation.artifacts
Copia schemas i tipus des de build/<build_version>/...
Regenera els fitxers “current” (schema keys tipats + mapa de tipus) i el registry runtime de schemas
Això passa via sync-artifacts.mjs.
Els fitxers que es regeneren i NO has d’editar a mà són:

index.ts
schema-registry.ts
Cas 1) Modifico shapes però em quedo a la mateixa versió (ex: v0.1)
Manualment has de fer:

Regenerar artefactes perquè v0.1 reflecteixi els canvis:
npm run generate:types (o el pipeline que feu servir)
Reconstruir el paquet contracts:
npm run contracts:build
(Recomanat) Executar el consumer-test:
npm run contracts:test
I ja està.

Cas 2) Afegeixo un nou “contracte” (nova shape → nou schema/ts) dins la mateixa versió
Exemple: afegeixes una nova shape que vols publicar com a schema validable.

Manualment has de fer:

Afegir l’entrada nova a generation.artifacts a config.yml amb només l’ID (schemaKey) que veurà el consumidor (ex: dwp, dmwp, recycling).

I definir els paths concrets als conversions:

- conversion.shacl_to_json.<id> (input/output + opcions com naming)
- conversion.json_to_ts.<id> (input/output + source)

Els noms de fitxer (.schema.json i .ts) es deriven dels `output` d’aquestes conversions.
Assegurar que el pipeline realment genera aquests fitxers a build/<build_version>/
npm run generate:types (o equivalent)
npm run contracts:build
npm run contracts:test
No cal tocar cap fitxer TS del package: el SchemaKeyCurrent i el mapping de tipus es regeneren sols.

Important per evitar trencar usuaris

Si canvies name, canvies el schemaKey → és “breaking change” per consumidors.
Si canvies json_schema també pots trencar consumidors que importin el JSON schema com a fitxer.
Cas 3) Creo una nova versió (ex: v0.2)
Hi ha 2 maneres de treballar segons com vulguis que ho consumeixin.

3A) Vull que els consumidors usin sempre “current” (recomanat)
Això és el més barat: els imports NO canvien.

Manualment has de fer:

A config.yml:
Canviar build_version: "v0.2"
Actualitzar generation.artifacts si han canviat noms/fitxers o n’has afegit de nous
Generar el build de la nova versió:
npm run generate:types (o el pipeline que generi build/v0.2/...)
Build + test del paquet:
npm run contracts:build
npm run contracts:test
I ja està: els consumidors que importin:

@blueroominnovation/ontology-contracts/current
@blueroominnovation/ontology-contracts/schemas/current/\*
passen a veure el nou “current” automàticament.
3B) Vull tenir imports versionats explícits (ex: /v0.2) com a API estable
Això encara NO és 100% automàtic: avui mantenim /v0.1 fix i current dinàmic.

Manualment, a més del 3A, hauries de:

Afegir un entrypoint de versió nou (ex: ./v0.2) a package.json dins exports
Crear el fitxer packages/ontology-contracts/src/v0.2/index.ts (barrel de tipus) i exportar-lo des de l’entrypoint principal si vols
(Opcional) Afegir ./schemas/v0.2/\* a exports si vols accés directe als fitxers versionats
Si no necessites imports versionats, recomano quedar-te amb current i evitar aquest cost.

Cas 4) Publicar una nova release del paquet
Manualment:

Incrementar version a package.json
npm run contracts:build (ja fa sync:artifacts + tsc)
Publicar (el vostre flux: npm publish, CI, etc.)
Si vols, puc afegir una secció curta al README arrel explicant aquests 4 casos i recomanant “current vs versioned”, perquè quedi documentat per tothom.
