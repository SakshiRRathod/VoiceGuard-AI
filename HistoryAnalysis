import React from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  filename: string;
  result: string;
  confidence: number;
  date: string;
}

interface HistoryAnalysisProps {
  history: HistoryItem[];
}

const HistoryAnalysis = ({ history }: HistoryAnalysisProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const totalAnalyzed = history.length;
  const fakeCount = history.filter(item => item.result === "Fake").length;
  const realCount = history.filter(item => item.result === "Real").length;
  
  const getConfidenceColorClass = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-700";
    if (confidence >= 0.8) return "text-blue-700";
    if (confidence >= 0.7) return "text-yellow-700";
    return "text-orange-700";
  };
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Analysis History</h2>
      
      {history.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-700">{totalAnalyzed}</div>
              <div className="text-sm text-slate-500">Total Analyzed</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700">{realCount}</div>
              <div className="text-sm text-green-600">Real Voices</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-700">{fakeCount}</div>
              <div className="text-sm text-red-600">Fake Voices</div>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-lg border bg-white shadow">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border-b p-3 text-left font-medium">Sample Name</th>
                    <th className="border-b p-3 text-left font-medium">Result</th>
                    <th className="border-b p-3 text-left font-medium">Confidence</th>
                    <th className="border-b p-3 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="border-b p-3">
                        <div className="truncate max-w-[150px]">{item.filename}</div>
                      </td>
                      <td className="border-b p-3">
                        <div className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          item.result === "Fake"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        )}>
                          {item.result === "Fake" ? (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          ) : (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          )}
                          {item.result}
                        </div>
                      </td>
                      <td className="border-b p-3">
                        <span className={getConfidenceColorClass(item.confidence)}>
                          {Math.round(item.confidence * 100)}%
                        </span>
                      </td>
                      <td className="border-b p-3 text-slate-500">
                        {formatDate(item.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {history.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <p>No analysis history available</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-slate-500">
            Showing {history.length} most recent analyses
          </div>
        </>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <div className="text-lg font-medium text-slate-700 mb-2">No Analysis History</div>
          <p className="text-slate-500">
            Upload or record audio samples to build your analysis history.
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoryAnalysis;
