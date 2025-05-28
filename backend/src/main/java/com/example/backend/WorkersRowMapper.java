package com.example.backend;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WorkersRowMapper implements RowMapper {

    @Override
    public Workers mapRow(ResultSet rs, int rowNum) throws SQLException {
        Workers workers = new Workers();
        workers.setId(rs.getInt("id"));
        workers.setName(rs.getString("name"));
        return workers;
    }
}
