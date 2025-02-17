// Componente do Botão de Download (DownloadButton)
const DownloadButton = ({
  onClick,
  isLoading,
  showButton,
}: {
  onClick: () => void;
  isLoading: boolean;
  showButton: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={!showButton || isLoading} // Se `showButton` for falso ou estiver carregando, o botão fica desativado
      className={`w-full py-2 px-4 rounded-lg transition-colors ${
        showButton
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {isLoading ? "Baixando..." : "Baixar Vídeo"}
    </button>
  );
};

export default DownloadButton;
