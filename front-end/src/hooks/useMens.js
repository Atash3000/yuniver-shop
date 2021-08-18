import{ useState, useEffect, useCallback } from 'react'
import axios from 'axios'
function useMens() {
    const [mensProducts, setMensProducts] = useState([])
  const fetchMensDate = useCallback(async () => {
    const { data } = await axios.get(`/api/v1/products/`)
    setMensProducts(data.data.mens)
  }, [])
  useEffect(() => {
    fetchMensDate()
  }, [fetchMensDate])

  return {value: mensProducts, setMensProducts};
}

export default useMens
