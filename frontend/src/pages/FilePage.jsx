import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFileManagement } from '../hooks/useFileManagement';
import { commonStyles } from '../styles/common';

const FilePage = () => {
  const { workerName } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  
  const {
    fileList,
    loading,
    error,
    uploadStatus,
    downloadStatus,
    fetchFileList,
    uploadFile,
    downloadFile,
  } = useFileManagement(workerName);

  useEffect(() => {
    fetchFileList();
  }, [fetchFileList]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    await uploadFile(file);
    setFile(null);
  };

  return (
    <div style={commonStyles.container}>
      {/* 移除 card 樣式，直接顯示內容 */}
      <div style={{ display: 'flex', maxWidth: '1000px', width: '100%' }}>
        {/* 左邊區塊：上傳/下載 */}
        <div style={{ flex: 1, marginRight: '40px' }}>
          <h2>{workerName} 的檔案管理</h2>

          <button
            onClick={() => navigate(-1)}
            style={commonStyles.button}
          >
            返回上一頁
          </button>

          <div style={{ marginBottom: '30px' }}>
            <h3>📤 上傳檔案</h3>
            <input type="file" onChange={handleFileChange} />
            <button 
              onClick={handleUpload} 
              style={{ ...commonStyles.button, marginLeft: '10px' }}
              disabled={loading || !file}
            >
              上傳
            </button>
            {uploadStatus && (
              <div style={commonStyles.success}>{uploadStatus}</div>
            )}
          </div>
        </div>

        {/* 右邊區塊：檔案列表 */}
        <div style={{ flex: 1 }}>
          <h3>📁 檔案列表</h3>
          {error && <div style={commonStyles.error}>{error}</div>}
          {downloadStatus && <div style={commonStyles.success}>{downloadStatus}</div>}
          
          {fileList.length > 0 ? (
            <table style={commonStyles.table}>
              <thead>
                <tr>
                  <th style={commonStyles.tableCell}>序號</th>
                  <th style={commonStyles.tableCell}>檔案名稱</th>
                  <th style={commonStyles.tableCell}>操作</th>
                </tr>
              </thead>
              <tbody>
                {fileList.map((fileName, index) => (
                  <tr key={index}>
                    <td style={commonStyles.tableCell}>{index + 1}</td>
                    <td style={commonStyles.tableCell}>{fileName}</td>
                    <td style={commonStyles.tableCell}>
                      <button 
                        onClick={() => downloadFile(fileName)}
                        style={commonStyles.button}
                        disabled={loading}
                      >
                        下載
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>目前沒有檔案。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePage; 