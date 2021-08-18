import React, { createContext, useState} from 'react'
import axios from 'axios'
import useProducts from '../hooks/useProducts'
import useCart from '../hooks/useCart'
import useMens from '../hooks/useMens'
import useWishList from '../hooks/useWishList';

export const productContext = createContext()




function ProductContextProvider(props) {

  // data from CUSTOM hook.Located in HOOKS folder
  const { value: mensProducts } = useMens()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { products } = useProducts()
  const [cart, setCart] = useCart();
    const [order, setOrder] = useState({})
  const [wishList, setWishlist] = useWishList()

  const [shippingAddress, setShippingAddess] = useState(() => {
    const localData = localStorage.getItem('shippingAddress')
    return localData ? JSON.parse(localData) : {}
  })
  const [paymentMethod, setPaymentMethod] = useState(() => {
    const localData = localStorage.getItem('paymentMethod')
    return localData ? JSON.parse(localData) : 'paypal'
  })

  const [orderDetails, setOrderDetails] = useState({})

  const addToCart = async (productId, qty, size) => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/products/${productId}`)
      setLoading(false)
      let product = data.data.product
      setCart((prevState) => {
        let prevProduct = prevState.find(
          (el) => el.id === product._id && el.size === size
        )
        const objIndex = prevState.findIndex(
          (obj) => obj.size === size && obj.id === product.id
        )

        let newProduct = {
          id: product._id,
          product: product._id,
          name: product.name,
          image: product.imageCover,
          price: product.price,
          qty: qty,
          size: size,
          options: product.options,
          department: product.department,
          slug: product.slug,
        }
        if (prevProduct && prevProduct.size === size) {
          prevState.splice(objIndex, 1, newProduct)
          return [...prevState]
        }

        if (prevProduct && prevProduct.qty !== qty) {
          prevState.splice(objIndex, 1, newProduct)
          return [...prevState]
        } else if (prevProduct && prevProduct.size !== size) {
          return [...prevState, newProduct]
        } else {
          return [...prevState, newProduct]
        }
      })
    } catch (error) {
      setLoading(false)
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }

  const saveShippingAddress = (data) => {
    let userData = {
      address: data.address,
      fullName: data.fullName,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
    }
   

    setShippingAddess(userData)
    //localStorage.setItem('shippingAddress', JSON.stringify(data))
  }


  const savePaymentMethod = (data) => {
    setPaymentMethod(data)
  }

  const reNameDepartment = (department) => {
    // this function renames product department
    if (department === 'mens') {
      return 'mens-clothing'
    }
    if (department === 'womens') {
      return 'womens-clothing'
    }
    if (department === 'accessories') {
      return 'accessories'
    }
  }

  const createOrder = async (order,token) => {
    setLoading(true)
    try {
      setLoading(true)
      const { data } = await axios.post('/api/v1/orders', order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLoading(false)

      setOrder(data.data.order)
      localStorage.removeItem('cart')
      localStorage.removeItem('wishList')
    } catch (error) {
      setLoading(false)
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }

  const detailsOrder = async (orderId,token) => {
   
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setLoading(false)
      setOrderDetails(data.data.order)
      
    } catch (error) {
      setLoading(false)
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }

  return (
    <productContext.Provider
      value={{
        cart,
        setCart,
        products,
        error,
       
        loading,
        
        wishList,
        setWishlist,
        mensProducts,
        saveShippingAddress,
        addToCart,
        createOrder,
        reNameDepartment,
        shippingAddress,
        savePaymentMethod,
        paymentMethod,
        setPaymentMethod,
       setLoading,
       
        order,
        orderDetails,
       
        detailsOrder,
      }}
    >
      {props.children}
    </productContext.Provider>
  )
}

export default ProductContextProvider
