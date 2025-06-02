package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
public class WorkersController {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private static final Logger logger = LoggerFactory.getLogger(WorkersController.class);
    private final Path uploadDir;

    public WorkersController() {
        // 获取项目根目录
        String projectRoot = System.getProperty("user.dir");

        // 构造上传目录的路径，确保路径格式正确
        uploadDir = Paths.get(projectRoot, "uploads");

        // 创建 uploads 目录（如果不存在的话）
        File uploadDirectory = uploadDir.toFile();
        if (!uploadDirectory.exists()) {
            if (!uploadDirectory.mkdirs()) {
                throw new RuntimeException("Failed to create upload directory");
            }
        }
    }

    @PostMapping("/workers")
    public String insert(@RequestBody Workers workers) {
        String sql = "INSERT INTO workers(id, name) VALUES (:workersId, :workersName)";
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("workersId", workers.getId());
        map.put("workersName", workers.getName());
        namedParameterJdbcTemplate.update(sql, map);
        return "執行 INSERT SQL";
    }

    @GetMapping("/getWorkers")
    public List<Workers> query() {

        String sql = "SELECT id, name FROM workers";

        Map<String, Object> map = new HashMap<>();

        WorkersRowMapper rowMapper = new WorkersRowMapper();

        List<Workers> list = namedParameterJdbcTemplate.query(sql, map, rowMapper);

        return list;
    }

    @PostMapping("/upload/{workerName}")
    public ResponseEntity<String> uploadFile(@PathVariable String workerName, @RequestParam("file") MultipartFile file) {
        try {
            // Get file name
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            // Validate file name
            if (fileName.contains("..")) {
                return ResponseEntity.badRequest().body("Invalid file path.");
            }

            // Construct a file path
            Path folder_path = uploadDir.resolve(workerName);
            File uploadDirectory = folder_path.toFile();
            if (!uploadDirectory.exists()) {
                if (!uploadDirectory.mkdirs()) {
                    throw new RuntimeException("Failed to create upload directory");
                }
            }
            Path path = folder_path.resolve(fileName);

            // Save a file
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            logger.info("File uploaded successfully: {}", path.toAbsolutePath());

            return ResponseEntity.ok("File uploaded successfully: " + fileName);
        } catch (IOException e) {
            logger.error("Failed to upload file", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    @GetMapping("/download/{workerName}/{fileName}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String workerName, @PathVariable String fileName) {
        try {
            // Validate file name
            if (fileName.contains("..")) {
                return ResponseEntity.badRequest().body(null);
            }

            // Construct a file path
            Path folder_path = uploadDir.resolve(workerName);
            File uploadDirectory = folder_path.toFile();
            if (!uploadDirectory.exists()) {
                if (!uploadDirectory.mkdirs()) {
                    throw new RuntimeException("Failed to create upload directory");
                }
            }
            Path path = folder_path.resolve(fileName);
            if (!Files.exists(path)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Get the content of file
            byte[] data = Files.readAllBytes(path);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);

            // Get the MIME type of file
            String contentType = Files.probeContentType(path);
            if (contentType == null) {
                contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // Default
            }

            logger.info("File downloaded successfully: {}", path.toAbsolutePath());

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.valueOf(contentType))
                    .body(data);
        } catch (IOException e) {
            logger.error("Failed to download file", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
