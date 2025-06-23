package com.example.backend.service.impl;

import com.example.backend.dao.BulletinBoardDao;
import com.example.backend.model.BulletinBoardMessage;
import com.example.backend.service.BulletinBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BulletinBoardServiceImpl implements BulletinBoardService {
    @Autowired
    private BulletinBoardDao bulletinBoardDao;

    @Override
    public List<BulletinBoardMessage> getAllMessages() {
        return bulletinBoardDao.getAllMessages();
    }

    @Override
    public void createMessage(BulletinBoardMessage message) {
        bulletinBoardDao.createMessage(message);
    }
} 