import {useState} from 'react'

function useWishList() {
    const [wishList, setWishlist] = useState(() => {
      const localDate = localStorage.getItem('wishlist')
      return localDate ? JSON.parse(localDate) : []
    });

      //  useEffect(() => {
      //    localStorage.setItem('wishlist', JSON.stringify(wishList))
      //  }, [wishList])

  return [wishList, setWishlist]
    
 
}

export default useWishList
