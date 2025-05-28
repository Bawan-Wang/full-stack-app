import React, { useState } from 'react';

function App() {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({ id: '', name: '' });
  const [showTable, setShowTable] = useState(false);

  const fetchWorkers = async () => {
    try {
      const response = await fetch('http://localhost:8080/getWorkers');
      const data = await response.json();
      setWorkers(data);
    } catch (error) {
      console.error('載入工人列表失敗:', error);
    }
  };

  const handleAddWorker = async () => {
    try {
      await fetch('http://localhost:8080/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: parseInt(newWorker.id),
          name: newWorker.name
        })
      });
      setNewWorker({ id: '', name: '' });
      fetchWorkers();
    } catch (error) {
      console.error('新增工人失敗:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewWorker({
      ...newWorker,
      [e.target.name]: e.target.value
    });
  };

  const toggleTable = () => {
    setShowTable(!showTable);
    if (!showTable) fetchWorkers();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>➕ 新增工人</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={newWorker.id}
          onChange={handleInputChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newWorker.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleAddWorker}>新增</button>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={toggleTable}>
          {showTable ? '隱藏工人列表' : '顯示工人列表'}
        </button>
      </div>

      {showTable && (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;