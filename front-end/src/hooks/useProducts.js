import { useState, useEffect } from 'react'
import axios from 'axios'

function useProducts() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      setLoading(false)
      const { data } = await axios.get('/api/v1/products')
      setProducts(data.data.products)
      
    } catch (error) {
      const {data} = error.response
      setLoading(false)
      setError(data.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return { products, error, loading }
}

export default useProducts
