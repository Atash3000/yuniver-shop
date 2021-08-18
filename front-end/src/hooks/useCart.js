import {useState,useEffect} from 'react'

function useCart() {
   const [cart, setCart] = useState(() => {
     const localData = localStorage.getItem('cart')
     return localData ? JSON.parse(localData) : []
   })



    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
   

  return [cart,setCart];
}

export default useCart
