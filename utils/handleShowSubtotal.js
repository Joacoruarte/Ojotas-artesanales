import { transformNumberForRender } from './utils'

export const handleShowSubtotal = (cart) => {
  const subtotal = cart.reduce((a, b) => parseInt(a) + parseInt(b.price) * parseInt(b.stock[Object.keys(b.stock)[0]]), 0)
  return `$${transformNumberForRender(subtotal)}`
}
