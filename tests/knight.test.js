import answerByRole from '../index.js'


//not using but here in case a random draw is useful for other tests
const numChars = 4
const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
const roles = ['K', 'N', 'D', 'M']
const characters = alpha.slice(0, -(alpha.length-numChars))
const randomRoles = Object.fromEntries(characters.map(char => [char,roles[Math.floor(Math.random() * roles.length)]]))

const identities = {
  A: 'K',
  B: 'N',
  C: roles[Math.floor(Math.random() * roles.length)],
  D: 'K'
}

// const questions = {
//   1: [predicate, params],
//   2: [predicate, params],
//   c: 'AND'
// }


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

test('Are you all the same returns false', () => {
  const result = answerByRole(identities, 'A', ['Same', ['all']])
  console.log(result)
  expect(result).toBe(false)
})

test('Are you all different returns false', () => {
  const result = answerByRole(identities, 'A', ['Different', ['all']])
  console.log(result)
  expect(result).toBe(false)
})

test('Are A and C the same? returns the correct truth value', () => {
  const result = answerByRole(identities, 'A', ['Same', ['A', 'C']])
  console.log(result)
  const truthValue = identities.A === identities.C
  expect(result).toBe(truthValue)
})

test('Are A and C different? returns the correct truth value', () => {
  const result = answerByRole(identities, 'A', ['Different', ['A', 'C']])
  console.log(result)
  const truthValue = !(identities.A === identities.C)
  expect(result).toBe(truthValue)
})

test('Is A a Knight and B a Knave? returns true', () => {
  const questions = {
    1: ['Knight', ['A']],
    2: ['Knave', ['B']],
    c: 'AND'
  }
  const result = answerByRole(identities, 'A', questions)
  console.log(`Is A a Knight and B a Knave? ${result}`)
  expect(result).toBe(true)
})

test('Is A a Knight and B a Knave and not the same? returns true', () => {
  const questions = {
    1: ['Knight', ['A']],
    2: ['Knave', ['B']],
    3: ['Different', ['A', 'B']],
    c: 'AND'
  }
  const result = answerByRole(identities, 'A', questions)
  console.log(`Is A a Knight and B a Knave and not the same? ${result}`)
  expect(result).toBe(true)
})

test('Is A or B a Knight and B a Knave? returns true', () => {
  const questions = {
      1: {
        1: ['Knight'],
        2: ['Knight', ['B']],
        c: 'OR'
      },
      2: ['Knave', ['B']],
      c: 'AND'
    }
    const result = answerByRole(identities, 'A', questions)
    console.log(`Is A or B a Knight and B a Knave? ${result}`)
    expect(result).toBe(true)
})

test('Is A or B a Knight but not both?', () => {
  const questions = {
    1: {
      1: ['Knight'],
      2: ['Knight', ['B']],
      c: 'OR'
    },
    2: {
      1: {
        1: ['Knight'],
        2: ['Knight', ['B']],
        c: 'AND'
      },
      c: 'NOT'
    },
    c: 'AND'
  }
  const result = answerByRole(identities, 'A', questions)
  console.log(`Is A or B a Knight but not both? ${result}`)
  expect(result).toBe(true)
})
