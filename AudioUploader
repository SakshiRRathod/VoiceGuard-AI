import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, AlertTriangle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioUploaderProps {
  onAnalyze: (file?: File) => void;
  isAnalyzing: boolean;
  analysisResult: {
    result: string;
    confidence: number;
  } | null;
}

const AudioUploader = ({ onAnalyze, isAnalyzing, analysisResult }: AudioUploaderProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      alert('Please upload an audio file');
      return;
    }
    
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleAnalyze = () => {
    if (audioFile) {
      onAnalyze(audioFile);
    }
  };

  const handleRemoveFile = () => {
    setAudioFile(null);
    setAudioUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Upload Voice Sample</h2>
        
        {!audioFile ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
              isDragging 
                ? "border-blue-400 bg-blue-50" 
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="mb-2 font-medium">Drop your audio file here, or click to browse</p>
            <p className="text-xs text-gray-500">
              Supported formats: WAV, MP3, M4A (Max 10MB)
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3 bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="mr-3 bg-blue-100 p-2 rounded">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>
                <div className="truncate max-w-[200px]">
                  <p className="font-medium text-sm">{audioFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRemoveFile}
                className="hover:bg-blue-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <audio src={audioUrl || ''} controls className="w-full mb-4" />
            
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing} 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Audio"}
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
                <div className="flex items-center justify-center text-green-600">
                  <Check className="mr-2 h-6 w-6" />
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
          <p className="font-medium mb-1">Tips for best results:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use clear audio without background noise</li>
            <li>Ensure voice samples are at least 3 seconds long</li>
            <li>Higher quality audio yields more accurate results</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioUploader;
