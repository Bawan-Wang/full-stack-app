package com.example.backend.dao;

import com.example.backend.model.Worker;
import java.util.List;

public interface WorkerDao {
    Worker createWorker(Worker worker);
    List<Worker> getAllWorkers();
} 