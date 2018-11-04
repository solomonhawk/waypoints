import { shuffle } from 'lodash'

export const lemon = '#F1C848'
export const strawberry = '#E95468'
export const watermelon = '#DF369A'
export const bubblegum = '#C02C76'
export const electricSky = '#72DFE4'
export const dreamsicle = '#EC7433'
export const deepSea = '#123983'
export const twilight = '#2B2354'
export const plum = '#6D2B8F'
export const plum2 = '#5B1E84'
export const plum3 = '#221832'

let colors = [
  lemon,
  strawberry,
  watermelon,
  bubblegum,
  electricSky,
  dreamsicle,
  deepSea,
  twilight,
  plum,
  plum2
]

export function randomColor() {
  return shuffle(colors).pop()
}
