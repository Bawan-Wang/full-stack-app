package com.example.backend.controller;

import com.example.backend.dto.WorkerRequest;
import com.example.backend.model.Worker;
import com.example.backend.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
public class WorkersController {
    private static final Logger logger = LoggerFactory.getLogger(WorkersController.class);

    @Autowired
    private WorkerService workerService;

    @PostMapping
    public ResponseEntity<Worker> createWorker(@RequestBody WorkerRequest workerRequest) {
        Worker worker = workerService.createWorker(workerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(worker);
    }

    @GetMapping
    public ResponseEntity<List<Worker>> getAllWorkers() {
        List<Worker> workers = workerService.getAllWorkers();
        return ResponseEntity.ok(workers);
    }

    @PostMapping("/{workerName}/upload")
    public ResponseEntity<String> uploadFile(
            @PathVariable String workerName,
            @RequestParam("file") MultipartFile file) {
        try {
            String fileName = workerService.uploadFile(workerName, file);
            return ResponseEntity.ok("File uploaded successfully: " + fileName);
        } catch (Exception e) {
            logger.error("Failed to upload file", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload file: " + e.getMessage());
        }
    }

    @GetMapping("/{workerName}/download/{fileName}")
    public ResponseEntity<byte[]> downloadFile(
            @PathVariable String workerName,
            @PathVariable String fileName) {
        try {
            return workerService.downloadFile(workerName, fileName);
        } catch (Exception e) {
            logger.error("Failed to download file", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{workerName}/files")
    public ResponseEntity<List<String>> listFiles(@PathVariable String workerName) {
        try {
            List<String> files = workerService.listFiles(workerName);
            return ResponseEntity.ok(files);
        } catch (Exception e) {
            logger.error("Failed to list files", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
} 