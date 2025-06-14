package com.example.backend.service.impl;

import com.example.backend.dao.WorkerDao;
import com.example.backend.dto.WorkerRequest;
import com.example.backend.model.Worker;
import com.example.backend.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

@Component
public class WorkerServiceImpl implements WorkerService {

    @Autowired
    private WorkerDao workerDao;

    private final Path uploadDir;

    public WorkerServiceImpl() {
        String projectRoot = System.getProperty("user.dir");
        uploadDir = Paths.get(projectRoot, "uploads");
        File uploadDirectory = uploadDir.toFile();
        if (!uploadDirectory.exists()) {
            if (!uploadDirectory.mkdirs()) {
                throw new RuntimeException("Failed to create upload directory");
            }
        }
    }

    @Override
    public Worker createWorker(WorkerRequest workerRequest) {
        Worker worker = new Worker();
        worker.setName(workerRequest.getName());
        worker.setCreatedDate(new Date());
        worker.setLastModifiedDate(new Date());
        return workerDao.createWorker(worker);
    }

    @Override
    public List<Worker> getAllWorkers() {
        return workerDao.getAllWorkers();
    }

    @Override
    public String uploadFile(String workerName, MultipartFile file) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if (fileName.contains("..")) {
            throw new IllegalArgumentException("Invalid file path");
        }

        Path folderPath = uploadDir.resolve(workerName);
        File uploadDirectory = folderPath.toFile();
        if (!uploadDirectory.exists()) {
            if (!uploadDirectory.mkdirs()) {
                throw new RuntimeException("Failed to create upload directory");
            }
        }

        Path path = folderPath.resolve(fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    @Override
    public ResponseEntity<byte[]> downloadFile(String workerName, String fileName) throws Exception {
        if (fileName.contains("..")) {
            return ResponseEntity.badRequest().body(null);
        }

        Path folderPath = uploadDir.resolve(workerName);
        Path path = folderPath.resolve(fileName);
        
        if (!Files.exists(path)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        byte[] data = Files.readAllBytes(path);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);

        String contentType = Files.probeContentType(path);
        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.valueOf(contentType))
                .body(data);
    }

    @Override
    public List<String> listFiles(String workerName) throws Exception {
        Path folderPath = uploadDir.resolve(workerName);
        File folder = folderPath.toFile();
        if (!folder.exists() || !folder.isDirectory()) {
            return List.of();
        }
        String[] fileNames = folder.list();
        return fileNames != null ? List.of(fileNames) : List.of();
    }
} 