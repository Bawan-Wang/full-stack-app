import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkers } from '../hooks/useWorkers';
import { commonStyles } from '../styles/common';

// 日期格式化工具
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
};

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
              <th style={commonStyles.tableCell}>工號</th>
              <th style={commonStyles.tableCell}>名字</th>
              <th style={commonStyles.tableCell}>建立日期</th>
              <th style={commonStyles.tableCell}>最後修改日期</th>
              <th style={commonStyles.tableCell}>檔案</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td style={commonStyles.tableCell}>{worker.id}</td>
                <td style={commonStyles.tableCell}>{worker.name}</td>
                <td style={commonStyles.tableCell}>{formatDate(worker.createdDate)}</td>
                <td style={commonStyles.tableCell}>{formatDate(worker.lastModifiedDate)}</td>
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