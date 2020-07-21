import getTruthValue from './logic/getTruthValue.js'


export default function answerByRole(identities, answerer, questions) {
  const tVal = getTruthValue(identities, answerer, questions)
  switch (identities[answerer]) {
    case 'K':
      return tVal
    case 'N':
      return !tVal
    case 'D':
      const knightPresent = Object.values(identities).find(id => id === 'K')
      if (knightPresent) {
        return !tVal
      }
      return tVal
    case 'M':
      // TODO: implement a  more crafty Monk here...
      return [true, false][Math.floor(Math.random() * 2)]
    default:
      console.log('invalid answerer identity')
      return
  }
}
