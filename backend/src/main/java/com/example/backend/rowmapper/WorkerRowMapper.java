package com.example.backend.rowmapper;

import com.example.backend.model.Worker;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WorkerRowMapper implements RowMapper<Worker> {

    @Override
    public Worker mapRow(ResultSet resultSet, int i) throws SQLException {
        Worker worker = new Worker();

        worker.setId(resultSet.getInt("id"));
        worker.setName(resultSet.getString("name"));
        worker.setCreatedDate(resultSet.getTimestamp("created_date"));
        worker.setLastModifiedDate(resultSet.getTimestamp("last_modified_date"));

        return worker;
    }
} 