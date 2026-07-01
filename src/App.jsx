import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {

  const [imoveis, setImoveis] = useState([])

  useEffect(() => {
    buscarImoveis()
  }, [])

  async function buscarImoveis() {

    const { data, error } = await supabase
      .from('imoveis')
      .select('*')

    if (error) {
      console.log(error)
      return
    }

    setImoveis(data)
  }

  return (
    <div>
      <h1>App Imobiliária</h1>

      {imoveis.map((item) => (
        <div key={item.id}>
          <p>{item.descricao}</p>
        </div>
      ))}
    </div>
  )
}

export default App