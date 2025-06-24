package com.example.backend.dao;

import com.example.backend.model.BulletinBoardMessage;
import java.util.List;

public interface BulletinBoardDao {
    List<BulletinBoardMessage> getAllMessages();
    void createMessage(BulletinBoardMessage message);
} 