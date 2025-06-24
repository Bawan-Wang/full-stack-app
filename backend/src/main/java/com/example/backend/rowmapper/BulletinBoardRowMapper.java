package com.example.backend.rowmapper;

import com.example.backend.model.BulletinBoardMessage;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BulletinBoardRowMapper implements RowMapper<BulletinBoardMessage> {
    @Override
    public BulletinBoardMessage mapRow(ResultSet rs, int rowNum) throws SQLException {
        BulletinBoardMessage msg = new BulletinBoardMessage();
        msg.setId(rs.getInt("id"));
        msg.setName(rs.getString("name"));
        msg.setSubject(rs.getString("subject"));
        msg.setContent(rs.getString("content"));
        msg.setCreatedAt(rs.getTimestamp("created_at"));
        return msg;
    }
} 