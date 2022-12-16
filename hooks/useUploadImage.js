import { ref, uploadBytesResumable , getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { storage } from "../utils/configFirebase";

export const useUploadImage = () =>{
    const [img, setImg] = useState([]);
    const [progress, setProgress] = useState(false);
  
    const uploadImage = (file) => {
        if(!file) return;
        const storageRef = ref(storage, `images/${file.name}`)
        const task = uploadBytesResumable(storageRef, file)

        const promise = new Promise((resolve, reject) => {
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
              reject(error)
            },
            () => {
              getDownloadURL(task.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL)
                setImg([downloadURL, ...img ])
                resolve(downloadURL)
              })
            }
          )
        })
        return promise
    }
  
    return { img , setImg , progress , uploadImage}
  }