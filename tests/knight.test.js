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

test('Crazy sentence...', () => {
  const questions = {
    1: {
      1: ['Knight'],
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
  expect(result).toEqual(side1 === side2)
})

test('At least one of us is a Knight returns true', () => {
  const result = answerByRole(identities, 'A', ['Knight', ['least', 1]])
  expect(result).toBe(true)
})

test('At most one of us is a Knight returns false', () => {
  const result = answerByRole(identities, 'A', ['Knight', ['most', 1]])
  expect(result).toBe(false)
})

test('More than one of us is a Knight returns true', () => {
  const result = answerByRole(identities, 'A', ['Knight', ['more', 1]])
  expect(result).toBe(true)
})

test('More than one of us is a Dragon returns false', () => {
  const result = answerByRole(identities, 'A', ['Dragon', ['more', 1]])
  expect(result).toBe(false)
})

test('At least one of us is a Knave returns true', () => {
  const result = answerByRole(identities, 'A', ['Knave', ['least', 1]])
  expect(result).toBe(true)
})

test('Some of us are Monks return the correct truth value', () => {
  const result = answerByRole(identities, 'A', ['Monk', ['some']])
  const existsMonk = identities.C === 'M'
  console.log(`Monk? ${result}`)
  expect(result).toEqual(existsMonk)
})

test('At least 2 of us are the same returns true', () => {
  const result = answerByRole(identities, 'A', ['Same', ['least', 2]])
  expect(result).toBe(true)
})

test('At least 3 of us are the same returns true only if C is a Knight', () => {
  const result = answerByRole(identities, 'A', ['Same', ['least', 3]])
  const knightC = identities.C === 'K'
  expect(result).toEqual(knightC)
})
