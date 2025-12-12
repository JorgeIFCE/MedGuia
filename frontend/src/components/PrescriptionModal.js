import React, { useEffect, useState } from "react";
import "./PrescriptionModal.css";

function PrescriptionModal({ qtdMedicamentos, onClose }) {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    // Cria as linhas dinamicamente
    const linhas = Array.from({ length: qtdMedicamentos }, () => ({
      nome: "",
      vezesAoDia: "",
      dias: "",
    }));
    setMedicamentos(linhas);
  }, [qtdMedicamentos]);

  const handleChange = (index, field, value) => {
    const updated = [...medicamentos];
    updated[index][field] = value;
    setMedicamentos(updated);
  };

  // ---- 📄 GERAR PDF ----
  const gerarPDF = () => {
    const conteudo = medicamentos
      .map(
        (m, i) =>
          `${i + 1}. Medicamento: ${m.nome}\n   ${m.vezesAoDia}x ao dia por ${m.dias} dias\n`
      )
      .join("\n");

    const texto = `
        MedGuia - Receita Médica

${conteudo}

____________________________________
Assinatura

Data: ${new Date().toLocaleDateString("pt-BR")}
`;

    const blob = new Blob([texto], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "receita_medica.txt"; // Você pode trocar para .pdf quando usar PDF real
    link.click();
  };

  return (
    <div className="modal-overlay-r">
      <div className="modal-r">
        <h1>MedGuia</h1>

        <div className="med-table">
          <div className="table-header">
            <span>Medicamento</span>
            <span>Vezes ao dia</span>
            <span>Período</span>
          </div>

          {medicamentos.map((m, index) => (
            <div key={index} className="table-row">
              <input
                type="text"
                placeholder="Nome do medicamento"
                value={m.nome}
                onChange={(e) =>
                  handleChange(index, "nome", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Quantas vezes ao dia"
                value={m.vezesAoDia}
                onChange={(e) =>
                  handleChange(index, "vezesAoDia", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Número de dias"
                value={m.dias}
                onChange={(e) =>
                  handleChange(index, "dias", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <div className="modal-footer-r">
          <button className="btn-download" onClick={gerarPDF}>
            Baixar PDF
          </button>

          <button className="btn-close" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionModal;
