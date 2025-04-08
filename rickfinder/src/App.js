import React, { useState, useEffect } from 'react'; // importa dois hooks e react
import axios from 'axios'; // importa axios para fazer requisições HTTP
import './App.css'; // importa o CSS principal

// Importação de componentes
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Card from './components/Card';

function App() {
  // Estados principais da aplicação
  const [data, setData] = useState({ results: [] }); // Guarda os resultados da API
  const [query, setQuery] = useState(''); // Armazena o que o usuário digita
  const [search, setSearch] = useState(''); // Armazena a string para buscar personagens
  const [darkMode, setDarkMode] = useState(false); // Estado para alternar modo claro/escuro

  // Manipula envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita reload da página
    setSearch(query); // Atualiza o estado de busca
  };

  // Função assíncrona para buscar personagens na API
  const searchCharacters = async () => {
    try {
      const result = await axios(
        `https://rickandmortyapi.com/api/character/?name=${search}`
      );
      setData(result.data); // Atualiza estado com os dados recebidos
    } catch (error) {
      setData({ results: [] }); // Evita erro se nenhum personagem for encontrado
      console.error("Erro ao buscar personagens:", error);
    }
  };

  // Hook que dispara a busca sempre que o estado 'search' mudar
  useEffect(() => {
    if (search) {
      searchCharacters();
    }
  }, [search]);

  // Retorno do componente principal
  return (
    // Aplica a classe 'dark-mode' dinamicamente se darkMode for true
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header /> {/* Componente de cabeçalho */}
  
      {/* Botão para alternar entre modo claro e escuro */}
      <div className="mode-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          Alternar para modo {darkMode ? 'claro' : 'escuro'}
        </button>
      </div>
  
      {/* Área principal onde fica o formulário e os resultados */}
      <div className="results-wrapper">
  
        {/* Formulário de busca de personagens */}
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text" // Campo de texto para digitar o nome
            placeholder="Digite o nome do personagem" // Texto que aparece antes de digitar
            value={query} // Valor atual do input (controlado por estado)
            onChange={(e) => setQuery(e.target.value)} // Atualiza o estado 'query' conforme digita
          />
          <button type="submit">Buscar</button> {/* Botão para enviar o formulário */}
        </form>
  
        {/* Lista de resultados da API */}
        <div className="results">
          {data.results.length > 0 ? ( // Se há personagens encontrados...
            data.results.map((item) => ( // Mapeia e exibe cada personagem usando o componente Card
              <Card
                key={item.id} // Sempre coloque uma chave única ao mapear
                image={item.image} // Envia imagem como prop
                name={item.name} // Nome do personagem
                species={item.species} // Espécie
                status={item.status} // Status (desconhecido,etc)
                location={item.location.name} // Última localização conhecida
              />
            ))
          ) : (
            // Se não houver resultados
            <p>Tem não FIH!.</p>
          )}
        </div>
      </div>
  
      <Footer /> {/* Rodapé da aplicação */}
    </div>
  );
}
  export default App;

