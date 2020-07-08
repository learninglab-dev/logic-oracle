# Questions

This list is in progress as the Oracle is developed. It represents the questions the Oracle can currently answer and will be updated as new question types are added.

Sample question text is merely illustrative of what you might show to users in your interface. The module only sees the value strings and params.

Question Value | Sample Question Text | Truth Values* | Params
--- | --- | --- | ---|
`'Knight'`| Is A a Knight? | `true` if A is a knight; `false` otherwise | `['A']` a singleton array containing the name of the specified character
`'Knave'`| Is A a Knave? | `true` if A is a knave; `false` otherwise | `['A']` a singleton array containing the name of the specified character
`'Dragon'`| Is A a Dragon? | `true` if A is a dragon; `false` otherwise | `['A']` a singleton array containing the name of the specified character
`'Monk'`| Is A a Monk? | `true` if A is a monk; `false` otherwise | `['A']` a singleton array containing the name of the specified character
`'Same'` | Are you all the same? | `true` if all specified characters share the same role; `false` otherwise | `['all']` singleton array containing `'all'` or a list of names `['A', 'B', 'E']`
`'Different'` | Are A and C different? | `true` if all specified characters share the same role; `false` otherwise | `['all']` singleton array containing `'all'` or a list of names `['A', 'C']`

*Note that these truth values do not necessarily correspond to what the module will return because returns are filtered through the answerer's identity. For example, if a Dragon is asked 'Are you a dragon?', the module will return `true` only if no Knight is present.
