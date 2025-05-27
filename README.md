# AI Resume Generator 
A web-based application that leverages AI to **generate professional resumes** and calculate **ATS (Applicant Tracking System) scores** from user input. Built using **Spring Boot (backend)** and **React with Tailwind CSS (frontend)**, the project integrates with local and external LLMs for intelligent content generation and optimization feedback.

---

##  Features
- ✅ AI-powered resume generation
- ✅ ATS (Applicant Tracking System) score calculation
- ✅ Interactive frontend with modern UI
- ✅ Integration with local LLMs (DeepSeek via Ollama)
- ✅ Option to switch to fast remote API-based model calls
- ✅ Uses **Spring AI** to simplify prompt engineering and LLM interaction

---

##  UI Snapshots
> ![image](https://github.com/user-attachments/assets/b79285ac-14a4-4970-97f1-7ca8a4ee8e6f)
![image](https://github.com/user-attachments/assets/01249c70-c345-42ce-9bd9-d86894042d58)
![image](https://github.com/user-attachments/assets/66b0d5a3-d6c1-425d-ac70-ed52414ea7ca)
![image](https://github.com/user-attachments/assets/de359757-154b-4def-b92a-34a45120f0cf)

---

## Tech Stack

### Backend (Spring Boot + Spring AI)
- Java 17+
- **Spring Boot 3+**
- **Spring AI** (for seamless LLM integration)
- Spring Web
- Spring Security (if used)
- Jackson (for JSON parsing)
- Custom services for AI processing

### Frontend (React)
- React.js
- Tailwind CSS
- Axios for API calls
- Animated and responsive design

### AI Integration
- Initially used [Ollama](https://ollama.com/) to run the **DeepSeek** model locally
- Now supports **remote API-based LLMs** for faster and scalable generation
- **Spring AI** is used in the backend to interact with both local and remote LLMs using a pluggable interface

---

## 🤖 AI Model Integration

This project supports **two different approaches** for AI model integration, allowing flexibility between local and remote LLM usage:

### 1. Remote API-based LLMs (Currently Used)
The project currently uses remote API-based models for faster response times and better scalability. The implementation details are available in the project source code.

### 2. Local LLM with Ollama (Alternative Option)

For users who prefer running models locally, the project also supports Ollama integration.

#### Setup Ollama:
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull and run DeepSeek model
ollama pull deepseek-coder

# Start the model (runs on http://localhost:11434)
ollama run deepseek-coder
```

#### Configuration:
```yaml
# application.properties
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=deepseek-coder
spring.ai.ollama.chat.options.temperature=0.7
```

#### Implementation:
```java
@Service
public class LocalAIResumeService {
    
    @Autowired
    private ChatClient chatClient;
    
    public String generateResume(String prompt) {
        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
    
    public double calculateATSScore(String resumeData) {
        String atsPrompt = "Analyze this resume for ATS compatibility and provide a score out of 100: " + resumeData;
        String response = chatClient.prompt()
                .user(atsPrompt)
                .call()
                .content();
        // Parse the response to extract numerical score
        return parseATSScore(response);
    }
    
    private double parseATSScore(String response) {
        // Implementation to extract numerical score from response
        // This would parse the model's response to find the score
        return 75.0; // Placeholder
    }
}
```

