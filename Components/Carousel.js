import Image from "next/image";
import React, { useEffect, useRef } from "react";
import LeftIcon from "../Icons/LeftIcon";
import RightIcon from "../Icons/RightIcon";
import s from "../styles/Carousel.module.css";

export default function Carousel({ product  , interval}) {
   const leftButton = useRef(null);
   const rightButton = useRef(null);
   const slideShow = useRef(null);
   const intervalSlideShow = useRef(null);
   const renders = useRef(0);

   const previous = () => {
      // Preguntamos si tiene elementos hijos antes de ejecutar el código
      if(slideShow.current && slideShow.current?.children.length > 0){

        // Obtenemos el index del último elemento del slideShow
        const index = slideShow.current?.children.length - 1
        // Obtenemos el último elemento del slideShow
        const lastElement = slideShow.current?.children[index]; 
        slideShow.current.insertBefore(lastElement, slideShow.current.firstChild);

        slideShow.current.style.transition = 'none';
        slideShow.current.style.transform = `translateX(-${lastElement.clientWidth}px)`;

        setTimeout(() => {
          if(slideShow.current){
            slideShow.current.style.transition = `300ms ease-out all`;
            slideShow.current.style.transform = `translateX(0px)`;
          }
        }, 30);
      };
   }

   const next = () => {
      if(slideShow.current && slideShow.current?.children.length > 0){

         // Obtenemos el primer elemento del slideShow
         const firstElement = slideShow.current?.children[0]; 
 
         // Agregamos la transición al slideShow
         slideShow.current.style.transition = `300ms ease-out all`;
         
         // Movemos el slideShow a la izquierda con el ancho del primer elemento
         slideShow.current.style.transform = `translateX(-${firstElement.clientWidth}px)`
 
 
         // Función que se ejecuta cuando termina la transición
         const transition = () => {
           if(slideShow.current){
             // Eliminamos la transición del slideShow para que no se vea el cambio
             slideShow.current.style.transition = 'none';
 
             // Movemos el slideShow a la posición inicial
             slideShow.current.style.transform = 'translateX(0px)';
 
             // Lo que hacemos es mover el primer elemento al final , lo que sucede aca es que el primer elemento ya existe en el DOM y al existir en este no crea uno nuevo sino que lo desplaza al final
             slideShow.current.appendChild(firstElement);
 
             slideShow.current.removeEventListener('transitionend', transition)
           }
         }
 
         // Agregamos el evento transitionend al slideShow
         slideShow.current.addEventListener('transitionend', transition)
 
       }
   }


  
   function stopInterval() {
        clearInterval(intervalSlideShow.current);
   }

   useEffect(() => {
      if(typeof window !== 'undefined' && interval){
         if(renders.current === 0) {
            renders.current = 1
            return
         }
         function startInterval() {
         intervalSlideShow.current = setInterval(() => {
            next();
         }, interval);
         }
         startInterval();

         slideShow.current?.addEventListener('mouseenter', () => {
            stopInterval()
         })

         slideShow.current?.addEventListener('mouseleave', () => {
            startInterval()
         })

         slideShow.current?.addEventListener('touchstart', () => {
            stopInterval()
         })

         slideShow.current?.addEventListener('touchend', () => {
            startInterval()
         })
   
         leftButton.current?.addEventListener('mouseenter', () => {
            stopInterval()
         })

         leftButton.current?.addEventListener('mouseleave', () => {
            startInterval()
         })

         leftButton.current?.addEventListener('touchstart', () => {
            stopInterval()
         })

         leftButton.current?.addEventListener('touchend', () => {
            startInterval()
         })
         
         rightButton.current?.addEventListener('mouseenter', () => {
            stopInterval()
         })

         rightButton.current?.addEventListener('mouseleave', () => {
            startInterval()
         })

         rightButton.current?.addEventListener('touchstart', () => {
            stopInterval()
         })

         rightButton.current?.addEventListener('touchend', () => {
            startInterval()
         })
      }

    }, [interval]);

   return (
      <div className={s.container}>
         <div className='relative'>
            <div ref={slideShow} className={s.carousel}>
                  {product.img.map((img, index) => (
                     <div className={s.carousel__slide} key={img}>
                           <Image src={img} alt='calzado' width={500} height={650} />
                     </div>
                  ))}
            </div>
            <div className={s.controllers}>
                <button ref={leftButton} onClick={previous}>
                    <LeftIcon />
                </button>
                <button ref={rightButton} onClick={next} derecho>
                    <RightIcon />
                </button>
            </div>
         </div>
      </div>
   );
}
