package com.example.backend.service;

import com.example.backend.model.BulletinBoardMessage;
import java.util.List;

public interface BulletinBoardService {
    List<BulletinBoardMessage> getAllMessages();
    void createMessage(BulletinBoardMessage message);
} 