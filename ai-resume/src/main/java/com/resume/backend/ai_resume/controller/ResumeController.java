package com.resume.backend.ai_resume.controller;

import com.resume.backend.ai_resume.service.ResumeService;
import com.resume.backend.ai_resume.ResumeRequest;
//import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }


    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> getResumeData(
            @RequestBody ResumeRequest resumeRequest
    ) throws IOException {

        Map<String, Object> stringObjectMap = resumeService.generateResumeResponse(resumeRequest.userDescription());
        return new ResponseEntity<>(stringObjectMap, HttpStatus.OK);

    }

    @PostMapping("/calculate-ats-score")
    public ResponseEntity<Map<String, Double>> calculateAtsScore(
            @RequestBody String resumeJson
    ) throws IOException {
        double atsScore = resumeService.calculateAtsScore(resumeJson);
        return new ResponseEntity<>(Map.of("atsScore", atsScore), HttpStatus.OK);
    }


}
