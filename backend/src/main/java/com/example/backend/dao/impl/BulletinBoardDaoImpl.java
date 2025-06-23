package com.example.backend.dao.impl;

import com.example.backend.dao.BulletinBoardDao;
import com.example.backend.model.BulletinBoardMessage;
import com.example.backend.rowmapper.BulletinBoardRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class BulletinBoardDaoImpl implements BulletinBoardDao {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public List<BulletinBoardMessage> getAllMessages() {
        String sql = "SELECT id, name, subject, content, created_at FROM bulletinboard ORDER BY created_at DESC";
        return namedParameterJdbcTemplate.query(sql, new HashMap<>(), new BulletinBoardRowMapper());
    }

    @Override
    public void createMessage(BulletinBoardMessage message) {
        String sql = "INSERT INTO bulletinboard (name, subject, content, created_at) VALUES (:name, :subject, :content, NOW())";
        Map<String, Object> map = new HashMap<>();
        map.put("name", message.getName());
        map.put("subject", message.getSubject());
        map.put("content", message.getContent());
        namedParameterJdbcTemplate.update(sql, new MapSqlParameterSource(map), new GeneratedKeyHolder());
    }
} 