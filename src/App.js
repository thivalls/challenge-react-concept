import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState({});

  useEffect(() => {
    const loadRepositories = api.get('repositories').then((response) => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const newRepository = await api.post('repositories', repository);

    setRepositories([...repositories, newRepository.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter(item =>
        item.id !== id
      ))
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
