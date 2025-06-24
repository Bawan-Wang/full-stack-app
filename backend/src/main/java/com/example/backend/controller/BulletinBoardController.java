package com.example.backend.controller;

import com.example.backend.model.BulletinBoardMessage;
import com.example.backend.service.BulletinBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bulletinboard")
public class BulletinBoardController {
    @Autowired
    private BulletinBoardService bulletinBoardService;

    @GetMapping
    public ResponseEntity<List<BulletinBoardMessage>> getAllMessages() {
        List<BulletinBoardMessage> messages = bulletinBoardService.getAllMessages();
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<Void> createMessage(@RequestBody BulletinBoardMessage message) {
        bulletinBoardService.createMessage(message);
        return ResponseEntity.ok().build();
    }
} 