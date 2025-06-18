package com.example.backend.dao.impl;

import com.example.backend.dao.WorkerDao;
import com.example.backend.model.Worker;
import com.example.backend.rowmapper.WorkerRowMapper;
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
public class WorkerDaoImpl implements WorkerDao {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public Worker createWorker(Worker worker) {
        String sql = "INSERT INTO workers(name, created_date, last_modified_date) " +
                "VALUES (:name, :createdDate, :lastModifiedDate)";

        Map<String, Object> map = new HashMap<>();
        map.put("name", worker.getName());
        map.put("createdDate", worker.getCreatedDate());
        map.put("lastModifiedDate", worker.getLastModifiedDate());

        KeyHolder keyHolder = new GeneratedKeyHolder();

        namedParameterJdbcTemplate.update(sql, new MapSqlParameterSource(map), keyHolder);

        int workerId = keyHolder.getKey().intValue();
        worker.setId(workerId);

        return worker;
    }

    @Override
    public List<Worker> getAllWorkers() {
        String sql = "SELECT id, name, created_date, last_modified_date FROM workers";

        Map<String, Object> map = new HashMap<>();

        List<Worker> workers = namedParameterJdbcTemplate.query(sql, map, new WorkerRowMapper());

        return workers;
    }

    @Override
    public void updateLastModifiedDateByName(String workerName, java.util.Date date) {
        String sql = "UPDATE workers SET last_modified_date = :date WHERE name = :name";
        Map<String, Object> map = new HashMap<>();
        map.put("date", date);
        map.put("name", workerName);
        namedParameterJdbcTemplate.update(sql, map);
    }
} 