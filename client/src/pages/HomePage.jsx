import { useAuth } from "../context/authContext"

function HomePage() {
  const data = useAuth()
  console.log(data)

  return (
    <div>HomePage</div>
  )
}

export default HomePage