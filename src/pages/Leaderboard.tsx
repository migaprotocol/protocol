import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Leaderboard() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to main page with leaderboard anchor
    navigate('/#leaderboard', { replace: true })
  }, [navigate])

  return null
}
