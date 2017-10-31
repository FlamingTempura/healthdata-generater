# mhealthgen - Random health data generator

__mhealthgen__ is a node.js library for generating realistic health-related
information about a person in JSON format. The generated data include data
types commonly recorded by modern consumer
[mhealth](https://en.wikipedia.org/wiki/MHealth) devices, like Apple Watch,
blood pressure cuffs, and patient diaries: blood pressure, calories burned,
caloric intake, heart rate, height, weight, sleep, life satisfaction,
prescriptions, clinic visits, diagnoses, and symptoms.

Example portion of some random data generated using mhealthgen:

```json
{
  "firstName": "Charles",
  "lastName": "Wirth",
  "birthdate": "1963-02-24T13:42:52.344Z",
  "sex": "male",
  "bloodType": "a+",
  "normalHeight": 150,
  "normalWeight": 90,
  "normalSleepHours": 8,
  "normalBurn": 2770,
  "restingHeartRate": 60,
  "nodes": [
    { "date": "2016-10-27T15:23:58.320Z", "type": "hr", "source": "iwatch-hr", "value": 61 },
    { "date": "2016-10-28T00:13:53.190Z", "type": "sleep", "source": "fitbit-sleep", "value": 12.7 },
    { "date": "2016-10-28T12:07:29.737Z", "type": "intake", "source": "fitbit - intake", "value": 2513 },
    { "date": "2016-10-29T22:19:42.538Z", "type": "weight", "source": "scales", "value": 95.5 },
    { "date": "2016-10-31T15:25:43.758Z", "type": "bp_diastolic", "source": "valuemed-bp", "value": 80 },
    { "date": "2016-10-31T15:25:43.758Z", "type": "bp_systolic", "source": "valuemed-bp", "value": 112  }
  ],
  "sources": [
    { "id": "fitbit - intake", "name": "Fitbit App", "types": ["intake"] },
    { "id": "iwatch-hr", "name": "Apple Watch", "types": ["hr"], "precision": 1 },
    { "id": "valuemed-bp", "name": "ValueMed Blood Pressure Cuff", "types": ["bp_diastolic", "bp_systolic"], "precision": 2 },
    { "id": "scales", "types": ["weight"], "precision": 0.5 },
    { "id": "fitbit-sleep", "device": "Fitbit Surge", "types": ["sleep"], "precision": 0.1 }
  ],
  "types": [
    { "id": "bp_diastolic", "name": "Diastolic blood pressure", "unit": "mmHg" },
    { "id": "bp_systolic", "name": "Systolic blood pressure", "unit": "mmHg" },
    { "id": "intake", "name": "Caloric intake", "unit": "kcal" },
    { "id": "hr", "name": "Heart rate", "unit": "bpm" },
    { "id": "sleep", "name": "Sleep", "unit": "hours" },
    { "id": "weight", "name": "Body weight", "unit": "kg" }
  ]
}
```

This tool is not intended to be used for medical purposes, but may help to
test tools for working with health data. The normal ranges of health
measurements mostly uses UK population averages.

## Installation

Install node.js.

Via npm:
```
npm install mhealthgen
```

## Usage

To generate a health data for a random person to `person.json` using CLI:

```
node mhealthgen person.json
```

Full CLI usage:

```
node mhealthgen [options] <outfile>
```
Options:
* `person` - existing person profile (this can be a json file previously generated)
* `days` - number of days to generate (default 30)
* `associations` - adjust values based on associated preceding events (default `true`)
* `fluctuations` - adjust values based on random fluctuations (default `true`)

To use the API (options match the CLI options):

```js
let healthdata = require('healthdata');
healthdata.generate();

let dennis = require('people/dennis.json');
healthdata.generate({ person: dennis });
```

## Implementation

Values are sampled using _sources_ - these are the devices or techniques that
the fictional person used to take measurements, such as an Apple Watch or
blood pressure cuff. The frequency that the person uses this varies from
person to person. The values are generated in three stages:

1. _Initial_: An initial value is computed, based on, for example, a population average for patient's age/sex
2. _Associations_: The value is adjusted based on any associated preceding events. For example, physical acitivity in the past hour will increase blood pressure.
3. _Fluctuations_: To account of other factors which haven't been specifically considered in the generator, simplex noise is used to create random fluctuations in the value.

## Health datatypes

[//]: # (DATATYPES)
[//]: # (DATATYPES!)

## Sources

[//]: # (SOURCES)
[//]: # (SOURCES!)

## Todo

* Associations
* Descriptions of provenance in nodes
* Use of existing ontologies/schemas: SNOWMED, LOINC, openmhealth
