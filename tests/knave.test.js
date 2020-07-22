import answerByRole from '../index.js'


const roles = ['K', 'N', 'D', 'M']
const identities = {
  A: 'N',
  B: 'K',
  C: roles[Math.floor(Math.random() * roles.length)],
  D: 'K'
}


test('Are you a knight? returns true', () => {
  console.log(identities)
  const result = answerByRole(identities, 'A', ['Knight'])
  console.log(result)
  expect(result).toBe(true)
})

test('Is B a knight? returns false', () => {
  const result = answerByRole(identities, 'A', ['Knight', ['B']])
  console.log(result)
  expect(result).toBe(false)
})

test('Are you all the same returns true', () => {
  const result = answerByRole(identities, 'A', ['Same', ['all']])
  console.log(result)
  expect(result).toBe(true)
})

test('Are you all different returns true', () => {
  const result = answerByRole(identities, 'A', ['Different', ['all']])
  console.log(result)
  expect(result).toBe(true)
})

test('Are A and C the same? returns not the truth value', () => {
  const result = answerByRole(identities, 'A', ['Same', ['A', 'C']])
  console.log(result)
  const truthValue = identities.A === identities.C
  expect(result).toBe(!truthValue)
})

test('Are A and C different? returns not the truth value', () => {
  const result = answerByRole(identities, 'A', ['Different', ['A', 'C']])
  console.log(result)
  const truthValue = !(identities.A === identities.C)
  expect(result).toBe(!truthValue)
})

test('Crazy sentence...', () => {
  const questions = {
    1: {
      1: ['Knight', ['A']],
      2: ['Knight', ['B']],
      c: 'AND'
    },
    2: {
      1: {
        1: ['Monk', ['C']],
        2: ['Dragon', ['C']],
        c: 'OR'
      },
      2: {
        1: ['Knave', ['D']],
        c: 'NOT'
      },
      c: 'AND'
    },
    c: 'IFF'
  }
  const result = answerByRole(identities, 'A', questions)
  const side1 = answerByRole(identities, 'A', questions[1])
  const side2 = answerByRole(identities, 'A', questions[2])
  console.log(`crazy sentence = ${result}`)
  console.log(JSON.stringify(identities, null, 2));
  expect(result).toEqual(!(side1 === side2))
})
