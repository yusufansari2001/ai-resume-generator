package com.resume.backend.ai_resume.service;

import java.io.IOException;
import java.util.Map;

public interface ResumeService {
    Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException;
    public double calculateAtsScore(String resumeJson)throws IOException;
}
