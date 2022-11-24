export function transformToDinero(numero){
  if(numero < 1000) return `$${numero}`
  if(numero >= 1000 && numero < 10000) return `$${numero.toString()[0]}.${numero.toString().slice(1)}`
  if(numero >= 10000 && numero < 100000) return `$${numero.toString().slice(0 ,2)}.${numero.toString().slice(2)}`
  if(numero >= 100000 && numero < 1000000) return `$${numero.toString().slice(0 ,3)}.${numero.toString().slice(3)}`
}

export function validateFormForProduct({talles,img,select,stock}){
  if(talles.length === 0){
    alert("Debes agregar al menos un talle")
    return true 
  }
  if(img === ""){
    alert("Debe subir una imagen")
    return true 
  }
  if(select === ""){
    alert("Seleccionar una opcion de stock antes de enviar")
    return true 
  }
  if(stock === 0){
    alert("El stock no puede ser 0 , marcar sin stock o por encargue")
    return true 
  }
}

export const TABS = {
  PRODUCTS: "PRODUCTS",
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
}
