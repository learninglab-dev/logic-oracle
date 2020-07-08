import answerByRole from './index.js'


const roles = ['K', 'N', 'D', 'M']
const identities = {
  A: 'D',
  B: 'N',
  C: roles[Math.floor(Math.random() * roles.length)],
  D: 'M'
}


test('Are you a dragon? returns false only if Knight present', () => {
  console.log(identities)
  const result = answerByRole(identities, 'A', 'Dragon')
  const knightPresent = identities.C === 'K' ? true : false
  console.log(`C's role is: ${identities.C}`);
  console.log(result)
  expect(result).toBe(!knightPresent)
})
