import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkers } from '../hooks/useWorkers';
import { commonStyles } from '../styles/common';

const HomePage = () => {
  const navigate = useNavigate();
  const { workers, loading, error, fetchWorkers, addWorker } = useWorkers();
  const [newWorker, setNewWorker] = useState({ name: '' });

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const handleInputChange = (e) => {
    setNewWorker({
      ...newWorker,
      [e.target.name]: e.target.value
    });
  };

  const handleAddWorker = async () => {
    if (!newWorker.name.trim()) return;
    await addWorker(newWorker);
    setNewWorker({ name: '' });
  };

  const handleFileButtonClick = (workerName) => {
    navigate(`/file/${workerName}`);
  };

  return (
    <div style={commonStyles.container}>
      <div>
        <h2>➕ 新增工人</h2>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newWorker.name}
            onChange={handleInputChange}
            style={commonStyles.input}
          />
          <button 
            onClick={handleAddWorker}
            style={commonStyles.button}
            disabled={loading}
          >
            新增
          </button>
        </div>

        {error && <div style={commonStyles.error}>{error}</div>}

        <table style={commonStyles.table}>
          <thead>
            <tr>
              <th style={commonStyles.tableCell}>ID</th>
              <th style={commonStyles.tableCell}>Name</th>
              <th style={commonStyles.tableCell}>檔案</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td style={commonStyles.tableCell}>{worker.id}</td>
                <td style={commonStyles.tableCell}>{worker.name}</td>
                <td style={commonStyles.tableCell}>
                  <button 
                    onClick={() => handleFileButtonClick(worker.name)}
                    style={commonStyles.button}
                  >
                    上傳/下載
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage; 