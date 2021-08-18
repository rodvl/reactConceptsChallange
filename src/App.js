import React, {useEffect, useState} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    getData();
  },[])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Aplicativo ${Date.now()}`,
      url: "link1",
      techs: ["node"]
    });
      setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(e => e.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(e => (<li key={e.id}>
          {e.title}

          <button onClick={() => handleRemoveRepository(e.id)}>
            Remover
          </button>
        </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
