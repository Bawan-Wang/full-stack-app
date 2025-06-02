import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FilePage = () => {
  const { workerName } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [downloadFileName, setDownloadFileName] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');
  const [fileList, setFileList] = useState([]);

  // 上傳檔案
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('請選擇要上傳的檔案。');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('workerId', workerName);

    try {
      const response = await axios.post(`http://localhost:8080/upload/${workerName}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus(response.data || '上傳成功');
      setFile(null);
      fetchFileList(); // 上傳後刷新列表
    } catch (error) {
      console.error('上傳失敗：', error);
      setUploadStatus('上傳失敗');
    }
  };

  const handleDownloadByFileName = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/download/${workerName}/${fileName}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadStatus(`下載 ${fileName} 成功`);
    } catch (error) {
      console.error('下載失敗：', error);
      setDownloadStatus(`下載 ${fileName} 失敗`);
    }
  };


  // 取得檔案列表
  const fetchFileList = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/files/${workerName}`);
      setFileList(response.data);
    } catch (error) {
      console.error('取得檔案列表失敗：', error);
    }
  }, [workerName]);

  useEffect(() => {
    fetchFileList();
  }, [fetchFileList]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',    // 水平置中
        alignItems: 'flex-start',    // 靠上對齊
        minHeight: '100vh',
        backgroundColor: '#f8f8f8',
        fontFamily: 'Arial',
        paddingTop: '40px',          // 與上方留點空隙
      }}
    >
      <div style={{ display: 'flex', padding: '40px', maxWidth: '1000px', width: '100%' }}>
        {/* 左邊區塊：上傳/下載 */}
        <div style={{ flex: 1, marginRight: '40px' }}>
          <h2>{workerName} 的檔案管理</h2>

          <button
            onClick={() => navigate(-1)}
            style={{ marginBottom: '20px', padding: '6px 12px' }}
          >
            返回上一頁
          </button>

          <div style={{ marginBottom: '30px' }}>
            <h3>📤 上傳檔案</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ marginLeft: '10px' }}>上傳</button>
            <p>{uploadStatus}</p>
          </div>
        </div>

        {/* 右邊區塊：檔案列表 */}
        <div style={{ flex: 1 }}>
          <h3>📁 檔案列表</h3>
          {fileList.length > 0 ? (
            <table border="1" cellPadding="8" cellSpacing="0">
              <thead>
                <tr>
                  <th>序號</th>
                  <th>檔案名稱</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {fileList.map((fileName, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{fileName}</td>
                    <td>
                      <button onClick={() => handleDownloadByFileName(fileName)}>
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
