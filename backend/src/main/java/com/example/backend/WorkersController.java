package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class WorkersController {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

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

}
