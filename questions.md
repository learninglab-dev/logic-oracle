# Questions

This list is in progress as the Oracle is developed. It represents the questions the Oracle can currently answer and will be updated as new question types are added. Sample question text is merely illustrative of what you might show to users in your interface. The module only accepts questions as formatted objects.

Questions are best thought of as sentences in predicate logic, i.e. "Is it true that [sentence] ?" As such, questions consist of some combination of names, predicates, connectives and quantifiers.

## Components

### Names

Names can be any `'string'`. Each character must have a unique name, and names passed as arguments for questions must match names in your `identities` object. See Readme.md for how to construct that object.

### Predicates

At present the Oracle accepts the following predicates:

Predicate | Sample Questions | Truth Values*
--- | --- | --- |
`'Knight'`| Is A a Knight? Are B and C Knights? Is at least one of you a Knight? | `true` if specied character(s) is/are Knights; `false` otherwise
`'Knave'`| Is A a Knave? Are B and C Knaves? Is at most one of you a Knave? | `true` if specified character(s) are Knaves; `false` otherwise
`'Dragon'`| Is A a Dragon? Are B and C Dragons? Are more than one of you Dragons? | `true` if specified character(s) are Dragons; `false` otherwise
`'Monk'`| Is A a Monk? Are B and C Monks? Are less than three of you Monks? | `true` if specified characters(s) Monks; `false` otherwise
`'Same'` | Are you all the same? Are A and C the same? Are at least three of you the same? | `true` if all specified characters share the same role; `false` otherwise
`'Different'` | Are A and C different? Are some of you different? Are at most two of you different? | `true` if all specified characters have different roles; `false` otherwise

*Note that these truth values represent accurate answers to the questions and do not necessarily correspond to what the module will return because returns are filtered through the answerer's identity. For example, if a Dragon is asked 'Are you a Dragon?', the module will return `true` only if no Knight is present.

### Connectives

The following connectives can be used to combine statements:

Connective | Sample Questions | Truth Values
--- | --- | --- |
`'AND'` | Is A a Knight and B a knave? | `true` if all conjuncts are true; `false` otherwise
`'OR'` | Is A a Knight or a Dragon? | `true` if one or more disjuncts are true;* `false` otherwise
`'NOT'` | Are A and B not the same?* Is C not a Monk? | `true` if the statement is false; `false` otherwise
`'IF'` | Is it true that if A is a Knight, C is not a Dragon? | follows truth table for material conditional, i.e. is `false` only if the consequent is true and the antecedent false
`'IFF'` | Is A a Dragon if and only if B is not a Knight? | `true` if both statements share the same truth value; `false` otherwise

*OR here is inclusive. Use "and not both" for a question that uses exclusive OR.

### Quantifiers

The following quantifiers can be applied to all accepted predicates:

Quantifier | Sample Question | Required Inputs
--- | --- | --- |
`'all'` | Are all of you Knights? | `['all']`
`'some'` | Are some of you Knaves? | `['some']`
`'none'` | Are none of you Dragons? | `[none]`
`'least'` | Are at least two of you the same? | `['least', 2]`
`'most'` | Are at most three of you different? | `['most', 3]`
`'less'` | Are less than two of you Knights? | `['less', 2]`
`'more'` | Are are more than four of you the same? | `['more', 4]`


## Example Formatted Questions

1. Is A a Knight?
```js
['Knight', ['A']]
```
2. Are A and B Knights?
```js
['Knight', ['A', 'B']]
```
3. Are all of you Knights?
```js
['Knight', ['all']]
```
4. Are at least three of you the same?
```js
['Same', ['least', 3]]
```
5. Is A a Knight and B a Knave?
```js
{
  1: ['Knight', ['A']],
  2: ['Knave', ['B']],
  c: 'AND'
}
```
6. Is A not a Dragon?
```js
{
  1: ['Dragon', ['A']],
  c: 'NOT'
}
```
7. Is it true that if A is a Dragon, C is not a Knight?
```js
{
  1: ['Dragon', ['A']],
  2: {
    1: ['Knight', ['C']],
    c: 'NOT'
  }
  c: 'IF'
}
```
8. Is either A or B a Knight but not both?
```js
{
  1: {
    1: ['Knight', ['A']],
    2: ['Knight' ['B']],
    c: 'OR'
  },
  2: {
    1: {
      1: ['Knight', ['A']],
      2: ['Knight' ['B']],
      c: 'AND'
    },
    c: 'NOT'
  },
  c: 'AND'
}
```
