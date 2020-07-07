import knightAnswers from './roles/knight.js'
import knaveAnswers from './roles/knave.js'
import dragonAnswers from './roles/dragon.js'
import monkAnswers from './roles/monk.js'


//hard coding all this for now... figure out later where these go and how the module takes in inputs
const numChars = 3
const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
const roles = ['K', 'N', 'D', 'M']
const characters = alpha.slice(0, -(alpha.length-numChars))
const identities = Object.fromEntries(characters.map(char => [char,roles[Math.floor(Math.random() * roles.length)]]))


export default function checkByRole(identities, question, qParams, answerer) {
  switch (identities[answerer]) {
    case 'K':
      return knightAnswers(identities, question, qParams)
    case 'N':
      return knaveAnswers(identities, question, qParams)
    case 'D':
      return dragonAnswers(identities, question, qParams)
    case 'M':
      return monkAnswers(identities, question, qParams)
    default:
      console.log('invalid answerer identity')
      return
  }
}

console.log(JSON.stringify(identities, null, 2))
console.log(checkByRole(identities, 'Knight', null, 'A'))
console.log(checkByRole(identities, 'Same', ['all'], 'A'))
