import { ref, uploadBytesResumable , getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { storage } from "./configFirebase";

export const useUploadImage = () =>{
  const [img, setImg] = useState("");
  const [progress, setProgress] = useState(false);

  const uploadImage = (file) => {
      if(!file) return;
      const storageRef = ref(storage, `images/${file.name}`)
      const task = uploadBytesResumable(storageRef, file)
      task.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          if(progress === 0){
            setProgress(true)
          }
          if(progress === 100){
            setProgress(false)
          }
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(task.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            setImg(downloadURL)
          })
        }
      )
  }

  return { img , setImg , progress , uploadImage}
}

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
