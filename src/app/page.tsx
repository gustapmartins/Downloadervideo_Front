"use client";
import { useState, useEffect, useCallback } from "react";
import DownloadButton from "@/Components/DownloadButton";
import InputField from "@/Components/InputField";
import QualityList from "@/Components/QualityList";

// Hook personalizado para buscar qualidades do vídeo
const useVideoQualities = (videoUrl: string) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!videoUrl) {
      setQualities([]);
      setError("");
      return;
    }

    setError("");
    setIsLoading(true);

    fetch(
      `${process.env.API_BASE_URL}/api/v1/DownloaderVideo/available-qualities?url=${encodeURIComponent(
        videoUrl
      )}`
    )
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Erro ao buscar a qualidade.")
      )
      .then(setQualities)
      .catch((err) => {
        setError(err);
        setQualities([]);
      })
      .finally(() => setIsLoading(false));
  }, [videoUrl]);

  return { qualities, isLoading, error, setError };
};

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const { qualities, isLoading, setError, error } = useVideoQualities(videoUrl);

  const isValidUrl = useCallback((url: string) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  }, []);

  const downloadFile = async (downloadUrl: string) => {
    try {
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        setError("Erro ao baixar o vídeo.");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      alert("Download concluído!");
    } catch (err) {
      alert("Erro ao baixar o vídeo.");
    }
  };

  const handleDownload = async () => {
    if (!videoUrl) {
      setError("Por favor, insira uma URL válida.");
      return;
    }

    setIsDownloading(true);
    
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/api/v1/DownloaderVideo/downloadVideo?url=${videoUrl}&quality=${selectedQuality}`,
        { method: "POST" }
      );

      if (!response.ok) {
        setError("Erro ao iniciar o download do vídeo.");
        return;
      }

      const { content: downloadUrl } = await response.json();
      if (!downloadUrl) {
        setError("Nenhuma URL de download recebida.");
        return;
      }

      downloadFile(downloadUrl);
    } catch (err) {
      setError("Ocorreu um erro inesperado ao baixar o vídeo.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Baixador de vídeos do YouTube
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Baixe vídeos do YouTube, transcreva para texto, extraia ou adicione
          legendas!
        </p>

        <InputField videoUrl={videoUrl} setVideoUrl={setVideoUrl} />

        <QualityList
          error={error}
          isLoading={isLoading}
          qualities={qualities}
          selectedQuality={selectedQuality}
          onSelectQuality={setSelectedQuality}
        />

        <DownloadButton
          onClick={handleDownload}
          isLoading={isDownloading}
          showButton={isValidUrl(videoUrl) && qualities.length > 0}
        />

        <p className="text-gray-500 text-sm text-center mt-6">
          Ao baixar este vídeo do YouTube, você concorda com as Diretrizes de
          Uso.
        </p>
      </div>
    </div>
  );
}
