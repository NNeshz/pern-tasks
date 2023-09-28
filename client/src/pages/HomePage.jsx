import { useAuth } from "../context/authContext"
import { Card } from "../components/ui"

function HomePage() {
  const data = useAuth()
  console.log(data)

  return (
    <div className="mx-20 mt-10">
      <Card>
        <h1 className="text-3xl font-bold">Home Page</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, sit at illum nemo laborum quas! Eaque quam veniam ab adipisci nulla voluptatibus ea natus pariatur magni praesentium, saepe porro soluta distinctio molestias quidem labore, sit at? Tempore reprehenderit maxime saepe!</p>
      </Card>
    </div>
  )
}

export default HomePage