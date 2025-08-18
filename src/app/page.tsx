type HomeProps = {
  name: string
}

const Home = ({ name }: HomeProps) => {
  return (
    <div>
      <h1 className="text-2xl">Logged in as {name}</h1>
    </div>
  )
}

export default Home
