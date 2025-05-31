# VoiceGuard-AI
VoiceGuard AI A deep learning-powered tool for detecting synthetic speech using a CNN-BiLSTM hybrid model. It analyzes voice samples for deepfake indicators, providing a confidence score for detection
Voice Fidelity Guard is a security-oriented web application that verifies the identity of users through voice authentication. By analyzing voice patterns, this project determines whether the speaker is a genuine registered user or an imposter. This system leverages machine learning and deep learning to ensure robust voice recognition for secure access.

## Overview
With the increase in security threats and identity theft, Voice Fidelity Guard introduces a new layer of protection using **voice biometrics**. It captures a user's voice sample and analyzes it using an AI model to verify authenticity.

### Key Features:
-  **Voice Recording Interface** — Record your voice directly from the browser.
-  **AI-Based Voice Analysis** — Uses deep learning models to analyze audio features like pitch, frequency, and tone.
- **Authentication Feedback** — Indicates whether the voice is authentic or not.
-  **Detailed Analysis Notebook** — Jupyter Notebook (`Voice.ipynb`) includes model training, preprocessing, and evaluation.

  ##  Tech Stack

| Frontend        | Backend         | Machine Learning     |
|------------------|------------------|------------------------|
| React.js         | Node.js / Express | Python (Jupyter Notebook) |
| Tailwind CSS     | Flask             | Librosa, Sklearn, TensorFlow |


##  Project Structure

 voice-guard/
├── client/                     # Frontend (React app)
├── server/                     # Backend (Node.js / Express)
├── model/                      # Python ML code
│   └── Voice.ipynb         # Jupyter notebook for model development
├── README.md                   # Project overview
└── package.json                # Dependencies

## 🚀 Getting Started

### Prerequisites

- Node.js
- Python 3.8+
- npm or yarn
- Jupyter Notebook (for running `.ipynb` file)

### Installation

1. **Clone the Repository**
   
   git clone https://github.com/your-username/voice-fidelity-guard.git
   cd voice-fidelity-guard
   

2. **Install Frontend Dependencies**
   
   cd client
   npm install
   

3. **Install Backend Dependencies**
   
   cd ../server
   npm install
  

4. **Run Jupyter Notebook (optional)**
   Open `Voice.ipynb` to view or retrain the model:
   
   jupyter notebook

   ##  Use Cases

- Secure Login Authentication
- Voice Biometric Verification
- Fraud Detection in Call Centers

##  Model Summary

The notebook (`Voice.ipynb`) implements and compares multiple deep learning models for detecting fake vs real voices:

-  **LSTM (Long Short-Term Memory)** — Captures long-term voice dependencies.
-  **CNN (Convolutional Neural Network)** — Learns spatial features from spectrograms.
-  **ResNet (Residual Network)** — Extracts deep hierarchical features.
-  **CNN-BiLSTM** — Combines spatial and temporal modeling for enhanced accuracy.

Each model was evaluated and compared based on accuracy and performance to determine the best-suited architecture for robust voice authentication.

## License

MIT © 2025 Sakshi sakshirathod8530@gmail.com
