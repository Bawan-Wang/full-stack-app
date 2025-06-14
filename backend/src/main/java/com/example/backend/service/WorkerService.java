package com.example.backend.service;

import com.example.backend.dto.WorkerRequest;
import com.example.backend.model.Worker;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface WorkerService {
    Worker createWorker(WorkerRequest workerRequest);
    List<Worker> getAllWorkers();
    String uploadFile(String workerName, MultipartFile file) throws Exception;
    ResponseEntity<byte[]> downloadFile(String workerName, String fileName) throws Exception;
    List<String> listFiles(String workerName) throws Exception;
} 