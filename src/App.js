import React, { useState, useEffect } from "react";
import api from './services/api';

import Header from './components/Header';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Manoel Vieira"
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const newRepository = repositories.filter(repository => repository.id !== id)
    setRepositories(newRepository);
  }

  return (
    <>
      <Header title="Repositorios" />
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>{repository.title}
            <button className="remove" onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;

