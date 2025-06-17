import { useState, useCallback } from 'react';
import { workerService } from '../services/api';

export const useFileManagement = (workerName) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');

  const fetchFileList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await workerService.listFiles(workerName);
      setFileList(response.data);
    } catch (err) {
      setError(err.message);
      setFileList([]);
    } finally {
      setLoading(false);
    }
  }, [workerName]);

  const uploadFile = useCallback(async (file) => {
    try {
      setLoading(true);
      setError(null);
      const response = await workerService.uploadFile(workerName, file);
      setUploadStatus(response.data || '上傳成功');
      await fetchFileList();
    } catch (err) {
      setError(err.message);
      setUploadStatus('上傳失敗');
    } finally {
      setLoading(false);
    }
  }, [workerName, fetchFileList]);

  const downloadFile = useCallback(async (fileName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await workerService.downloadFile(workerName, fileName);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setDownloadStatus(`下載 ${fileName} 成功`);
    } catch (err) {
      setError(err.message);
      setDownloadStatus(`下載 ${fileName} 失敗`);
    } finally {
      setLoading(false);
    }
  }, [workerName]);

  return {
    fileList,
    loading,
    error,
    uploadStatus,
    downloadStatus,
    fetchFileList,
    uploadFile,
    downloadFile,
  };
}; 