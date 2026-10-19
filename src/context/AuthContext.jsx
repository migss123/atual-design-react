import { createContext, useContext, useState, useCallback } from "react";

const STORAGE_KEY = "usuarioCadastro";
const SESSION_KEY = "usuarioLogado";

const AuthContext = createContext(null);

// Lê o usuário cadastrado salvo no localStorage (mesma chave do projeto original).
function lerUsuarioCadastrado() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : null;
}

export function AuthProvider({ children }) {
  const [logado, setLogado] = useState(() => !!localStorage.getItem(SESSION_KEY));

  // Salva/atualiza o cadastro do usuário (chamado pela tela de Cadastro).
  const cadastrar = useCallback((dadosUsuario) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosUsuario));
  }, []);

  // Confere as credenciais informadas contra o usuário cadastrado.
  const login = useCallback((identificador, senhaInserida) => {
    const usuario = lerUsuarioCadastrado();

    if (!usuario) {
      return { sucesso: false, mensagem: "Nenhum usuário cadastrado ainda." };
    }

    const loginValido =
      identificador === usuario.email ||
      identificador === usuario.cpf ||
      identificador === usuario.telefone;
    const senhaValida = senhaInserida === usuario.senha;

    if (loginValido && senhaValida) {
      localStorage.setItem(SESSION_KEY, "true");
      setLogado(true);
      return { sucesso: true, nome: usuario.nome || "usuário" };
    }

    return { sucesso: false, mensagem: "Dados incorretos. Verifique suas credenciais." };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setLogado(false);
  }, []);

  const usuario = lerUsuarioCadastrado();

  return (
    <AuthContext.Provider value={{ logado, usuario, cadastrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
  }
  return context;
}
