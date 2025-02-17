const InputField = ({
  videoUrl,
  setVideoUrl,
}: {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
}) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        Cole aqui o URL de um vídeo do YouTube
      </label>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Ex: https://www.youtube.com/watch?v=..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
