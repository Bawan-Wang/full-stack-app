import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 若使用 React Router

function App() {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({ id: '', name: '' });
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate(); // 導航用

  const fetchWorkers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/workers');
      const data = await response.json();
      setWorkers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('載入工人列表失敗:', error);
      setWorkers([]); // fallback to empty array on error
    }
  };

  const handleAddWorker = async () => {
    try {
      await fetch('http://localhost:8080/api/workers', {
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

  const handleFileButtonClick = (workerName) => {
    // 導向 /file/workerName 頁面
    navigate(`/file/${workerName}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',     // 水平置中
        alignItems: 'flex-start',     // 靠上對齊
        minHeight: '100vh',
        backgroundColor: '#f8f8f8',
        fontFamily: 'Arial',
        paddingTop: '40px',
      }}
    >
      <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
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
                <th>檔案</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>
                    <button onClick={() => handleFileButtonClick(worker.name)}>
                      上傳/下載
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
