import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, Play, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface AudioRecorderProps {
  onAnalyze: (file?: File) => void;
  isAnalyzing: boolean;
  analysisResult: {
    result: string;
    confidence: number;
  } | null;
}

const AudioRecorder = ({ onAnalyze, isAnalyzing, analysisResult }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        setRecordingComplete(true);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingComplete(false);
      setAudioBlob(null);
      setAudioUrl(null);
      
      toast("Recording started", {
        description: "Speak clearly for best analysis results"
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast("Microphone access denied", {
        description: "Please allow microphone access to record audio",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast("Recording completed", {
        description: "Your audio is ready for analysis"
      });
    }
  };

  const handleAnalyze = () => {
    if (audioBlob) {
      const file = new File([audioBlob], `recording-${Date.now()}.wav`, { type: 'audio/wav' });
      onAnalyze(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Record Voice Sample</h2>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-4 relative">
            {isRecording ? (
              <div className="absolute inset-0 rounded-full animate-pulse bg-red-100 opacity-70"></div>
            ) : null}
            <div 
              className={cn(
                "w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all",
                isRecording 
                  ? "border-red-500 bg-red-50" 
                  : recordingComplete 
                  ? "border-green-500 bg-green-50" 
                  : "border-blue-300 bg-white"
              )}
            >
              {isRecording ? (
                <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
              ) : recordingComplete ? (
                <Play className="h-12 w-12 text-green-500" />
              ) : (
                <Mic className="h-12 w-12 text-blue-400" />
              )}
            </div>
          </div>
          
          {isRecording && (
            <div className="text-sm text-red-500 animate-pulse mb-2">Recording in progress...</div>
          )}
          
          <div className="flex gap-4">
            {!isRecording ? (
              <Button 
                onClick={startRecording} 
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Recording
              </Button>
            ) : (
              <Button 
                onClick={stopRecording} 
                variant="destructive"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Recording
              </Button>
            )}
          </div>
        </div>
        
        {recordingComplete && audioUrl && (
          <div className="mb-6 flex flex-col items-center">
            <audio src={audioUrl} controls className="mb-4 w-full" />
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isAnalyzing ? (
                <>Analyzing...</>
              ) : (
                <>Analyze Recording</>
              )}
            </Button>
          </div>
        )}

        {analysisResult && (
          <div className={cn(
            "mt-8 p-4 rounded-lg border text-center",
            analysisResult.result === "Fake" 
              ? "border-red-200 bg-red-50" 
              : "border-green-200 bg-green-50"
          )}>
            <div className="text-2xl font-bold mb-2">
              {analysisResult.result === "Fake" ? (
                <div className="flex items-center justify-center text-red-600">
                  <AlertTriangle className="mr-2 h-6 w-6" />
                  Deepfake Detected
                </div>
              ) : (
                <div className="text-green-600">
                  Real Voice Confirmed
                </div>
              )}
            </div>
            <div className="text-lg mb-3">
              Confidence: {Math.round(analysisResult.confidence * 100)}%
            </div>
            <p className={cn(
              "text-sm",
              analysisResult.result === "Fake" ? "text-red-600" : "text-green-600"
            )}>
              {analysisResult.result === "Fake" 
                ? "This voice appears to be synthetically generated."
                : "This voice appears to be from a real human."}
            </p>
          </div>
        )}
        
        <div className="mt-8 text-sm text-gray-500 bg-gray-50 rounded p-3">
          <p className="font-medium mb-1">Privacy Notice:</p>
          <p>Audio recordings are processed locally in your browser and are not stored on our servers unless you explicitly choose to save them.</p>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
