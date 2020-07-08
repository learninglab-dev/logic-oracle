# answer-deducer
### a.k.a The Oracle of Knights & Knaves

A module for deducing answers to yes-no questions on the Island of Knights & Knaves

### Installation

```
npm i answer-deducer
```
### Usage

First import the package:

```js
import deducer from 'answer-deducer'
//OR
const deducer = require('answer-deducer')
```

Then ask a question:
```js
const answer = deducer(identities, answerer, question, qParams)
```
Input | Syntax | Optional ?
--- | --- | ---
`identities`| `object` containing names and roles for all characters in your game, ex. `{A: 'K', B: 'N'}` | no
`answerer` | `string` naming the character the question is directed to, ex. `'A'` | no
`question`| `string` specifying the type of question being asked, ex. `'Same'`* | no
`qParams` | [`array`] modifiers or character names, ex. `['A', 'B']` | yes*

*See [Questions](./questions.md) for accepted values and required params.

Returns `true` or `false` in the role of the character specified as answerer. So, if the specified character is a Knave and the statement is true the module will return `false`. See below for more on character identities.

### Identities

You may name your characters any string you wish, though tradition would have it that your first character's name starts with 'A' and your second with 'B', etc. Character names are keys in your `identities` object with roles as values. Possible values for roles are the following:  

Value | Name | Speaks
--- | --- | ---
'K' | Knight | the truth, always
'N' | Knave | only lies
'D' | Dragon | the truth, except in the presence of a Knight
'M' | Monk | whatever they wish*

*Currently, this implemented by returning a random choice of `true` or `false` when a Monk is asked a question.
