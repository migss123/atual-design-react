import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "atualDesignInsumos";

const initialInventory = [
  {
    id: "mdf-15mm",
    nome: "MDF 15mm",
    codigo: "MD-015",
    imagem: "",
    categoria: "Madeiras",
    quantidade: 42,
    unidade: "chapas",
    custo: 189.9,
    customFields: [
      { id: "acabamento", label: "Acabamento", value: "Cru" },
      { id: "fornecedor", label: "Fornecedor", value: "Duratex" },
    ],
    variantes: ["Carvalho", "Branco Supremo", "Grafite"],
  },
  {
    id: "linho-natural",
    nome: "Linho natural",
    codigo: "TEC-042",
    imagem: "",
    categoria: "Tecidos",
    quantidade: 8,
    unidade: "metros",
    custo: 74.5,
    customFields: [{ id: "cor", label: "Cor", value: "Areia" }],
    variantes: ["Areia", "Off-white"],
  },
  {
    id: "puxador-concha",
    nome: "Puxador concha",
    codigo: "PUX-011",
    imagem: "",
    categoria: "Puxadores",
    quantidade: 0,
    unidade: "unidades",
    custo: 18.9,
    customFields: [{ id: "acabamento", label: "Acabamento", value: "Latão escovado" }],
    variantes: [],
  },
];

const InventoryContext = createContext(null);

function readInventory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialInventory;
  } catch (error) {
    console.error("Não foi possível carregar o estoque salvo.", error);
    return initialInventory;
  }
}

export function InventoryProvider({ children }) {
  const [insumos, setInsumos] = useState(readInventory);

  const handleAddInsumo = useCallback(async (insumo) => {
    const novo = { ...insumo, id: crypto.randomUUID() };
    setInsumos((current) => {
      const next = [...current, novo];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    return novo;
  }, []);

  const handleUpdateInsumo = useCallback(async (id, changes) => {
    let updated;
    setInsumos((current) => {
      const next = current.map((item) => item.id === id ? { ...item, ...changes } : item);
      updated = next.find((item) => item.id === id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    return updated;
  }, []);

  const handleDeleteInsumo = useCallback(async (id) => {
    setInsumos((current) => {
      const next = current.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(() => ({
    insumos,
    handleAddInsumo,
    handleUpdateInsumo,
    handleDeleteInsumo,
  }), [insumos, handleAddInsumo, handleUpdateInsumo, handleDeleteInsumo]);

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error("useInventory precisa ser usado dentro de InventoryProvider");
  return context;
}
