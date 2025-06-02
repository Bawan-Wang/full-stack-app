import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 加入 useNavigate
import axios from 'axios';

const FilePage = () => {
  const { workerId, workerName } = useParams();
  const navigate = useNavigate(); // 初始化導航函數

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [downloadFileName, setDownloadFileName] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('請選擇要上傳的檔案。');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('workerId', workerId);

    try {
      const response = await axios.post('http://localhost:8080/upload/'+workerName, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus(response.data || '上傳成功');
    } catch (error) {
      console.error('上傳失敗：', error);
      setUploadStatus('上傳失敗');
    }
  };

  const handleDownload = async () => {
    if (!downloadFileName) {
      setDownloadStatus('請輸入要下載的檔案名稱。');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/download/${workerName}/${downloadFileName}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadStatus('下載成功');
    } catch (error) {
      console.error('下載失敗：', error);
      setDownloadStatus('下載失敗');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2> {workerName} 的檔案管理</h2>

      <button
        onClick={() => navigate(-1)} // 回到上一頁
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

      <div>
        <h3>📥 下載檔案</h3>
        <input
          type="text"
          placeholder="請輸入檔案名稱"
          value={downloadFileName}
          onChange={(e) => setDownloadFileName(e.target.value)}
        />
        <button onClick={handleDownload} style={{ marginLeft: '10px' }}>下載</button>
        <p>{downloadStatus}</p>
      </div>
    </div>
  );
};

export default FilePage;
