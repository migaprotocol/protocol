import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Calculator() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to main page with calculator anchor
    navigate('/#calculator', { replace: true })
  }, [navigate])

  return null
}
