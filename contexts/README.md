# 📁 Carpeta `contexts/`

Esta carpeta contiene los **contextos JSON-LD oficiales** del proyecto **Digital Waste Passport**.

Un contexto JSON-LD define **cómo deben interpretarse los datos**, qué significan las propiedades y a qué vocabularios semánticos están conectadas (UNECE, DPP, etc.).

En este proyecto, los contextos son **parte del modelo**, no simples utilidades técnicas.

---

## 🎯 Para qué existe esta carpeta

Los contextos sirven para:

* Garantizar compatibilidad con **UNECE UNTP**
* Garantizar compatibilidad con **UNECE DPP (Digital Product Passport)**
* Asegurar que todos los datos siguen **la ontología BRI**
* Evitar que cada productor de datos use propiedades distintas

En otras palabras:

> Los contextos son la **API semántica** del sistema.

---

## 🧱 Arquitectura semántica

Este proyecto sigue la arquitectura oficial de UNECE:

```
UNECE UNTP Core
        ↑
UNECE DPP
        ↑
BRI Waste Ontology (este proyecto)
        ↑
Contexts (JSON-LD)
        ↑
Datos (pasaportes, certificados, etc.)
```

Los datos **nunca** usan directamente UNECE o schema.org.
Siempre usan **un contexto de esta carpeta**.

---

## 📌 Regla fundamental

Todos los documentos JSON-LD deben usar **un único contexto oficial** de esta carpeta.

Correcto:

```json
"@context": "https://…/contexts/digitalWastePassport.jsonld"
```

Incorrecto:

```json
"@context": {
  "untp": "...",
  "schema": "...",
  "dpp": "..."
}
```

El contexto ya contiene internamente las referencias a UNECE, DPP y Schema.org.

---

## 🧩 Por qué no se permiten contextos mezclados

Mezclar vocabularios directamente en los datos:

* Rompe la interoperabilidad
* Hace imposible validar correctamente
* Impide cumplir DPP y Verifiable Credentials
* Genera ambigüedad legal y semántica

Usar contextos oficiales evita todo esto.

---

## 🧠 Qué hace realmente un contexto

Un contexto JSON-LD:

* Mapea nombres simples (`wasteHandler`, `email`, `geoLocation`)
* A las URIs oficiales de:

  * UNECE
  * UNECE DPP
  * Ontología BRI
  * Schema.org (cuando UNECE no cubre algo)

Así se consigue:

* Interoperabilidad global
* Control local
* Compatibilidad futura

---

## 🧪 Versionado

Los contextos deben versionarse.

Ejemplo:

```
/contexts/v0.1/digitalWastePassport.jsonld
/contexts/v0.2/digitalWastePassport.jsonld
```

Los datos deben apuntar siempre a una versión concreta para garantizar estabilidad.

---

## 🧾 En una frase

> **Los contextos son el contrato semántico del sistema.
> Si cambia el contexto, cambia el significado de los datos.**


