export function transformToDinero (numero) {
  if (numero < 1000) return `$${numero}`
  if (numero >= 1000 && numero < 10000) return `$${numero.toString()[0]}.${numero.toString().slice(1)}`
  if (numero >= 10000 && numero < 100000) return `$${numero.toString().slice(0, 2)}.${numero.toString().slice(2)}`
  if (numero >= 100000 && numero < 1000000) return `$${numero.toString().slice(0, 3)}.${numero.toString().slice(3)}`
}

export function validateFormForProduct ({ img, stock }) {
  if (img === '') {
    alert('Debe subir una imagen')
    return true
  }

  let count = 0
  const limit = Object.keys(stock).length
  Object.keys(stock).forEach((item) => stock[item] === 0 ? count++ : null)

  if (count === limit) {
    alert('Debe agregar al menos un stock')
    return true
  }
}

export const TAB_SELECT = {
  MANUAL: 'Agruegar Manual',
  SIN_STOCK: 'Marcar sin Stock',
  POR_ENCARGUE: 'Por encargue'
}

export const handleClickButton = (tab, select, setSelect) => {
  if (tab === TAB_SELECT.MANUAL) {
    setSelect(select !== TAB_SELECT.MANUAL ? TAB_SELECT.MANUAL : '')
  }
  if (tab === TAB_SELECT.SIN_STOCK) {
    setSelect(select !== TAB_SELECT.SIN_STOCK ? TAB_SELECT.SIN_STOCK : '')
  }
  if (tab === TAB_SELECT.POR_ENCARGUE) {
    setSelect(select !== TAB_SELECT.POR_ENCARGUE ? TAB_SELECT.POR_ENCARGUE : '')
  }
}

export const TABS = {
  PRODUCTS: 'PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT'
}
