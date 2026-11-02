import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const initialMessages = [
  {
    id: 1,
    author: "vendedor",
    text: "Olá! Sou da equipe Atual Design. Como posso ajudar a transformar seu ambiente?",
  },
];

export default function Chat() {
  const [mensagens, setMensagens] = useState(initialMessages);
  const [mensagem, setMensagem] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.cartSummary) {
      setMensagem(location.state.cartSummary);
    }
  }, [location.state]);

  function enviarMensagem(event) {
    event.preventDefault();
    const texto = mensagem.trim();

    if (!texto) {
      return;
    }

    setMensagens((atuais) => [
      ...atuais,
      { id: Date.now(), author: "cliente", text: texto },
    ]);
    setMensagem("");
  }

  return (
    <>
      <Navbar />

      <main className="chat-page">
        <section className="chat-intro" aria-labelledby="chat-title">
          <span className="eyebrow">Atendimento personalizado</span>
          <h1 id="chat-title">Vamos conversar sobre o seu projeto?</h1>
          <p>
            Conte o que você imaginou. Nosso especialista está pronto para orientar
            você em cada detalhe.
          </p>
        </section>

        <section className="chat-panel" aria-label="Chat com vendedor">
          <header className="chat-panel-header">
            <div className="seller-avatar" aria-hidden="true">AD</div>
            <div>
              <h2>Consultor Atual Design</h2>
              <span className="seller-status">
                <span aria-hidden="true" />
                Online agora
              </span>
            </div>
          </header>

          <div className="chat-messages" aria-live="polite">
            {mensagens.map((item) => (
              <div className={`chat-message ${item.author}`} key={item.id}>
                <span className="chat-message-author">
                  {item.author === "vendedor" ? "Consultor Atual Design" : "Você"}
                </span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <form className="chat-composer" onSubmit={enviarMensagem}>
            <label className="sr-only" htmlFor="chat-message">
              Digite sua mensagem
            </label>
            <input
              id="chat-message"
              type="text"
              value={mensagem}
              onChange={(event) => setMensagem(event.target.value)}
              placeholder="Escreva sua mensagem..."
              autoComplete="off"
            />
            <button className="chat-send-button" type="submit" aria-label="Enviar mensagem">
              Enviar
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
