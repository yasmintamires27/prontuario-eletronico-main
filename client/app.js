const FORM_ID = 'TextoFormulario';
const API_URL = 'http://localhost:3000/api/prontuarios'; // depois muda pro Render


function initFormulario() {
  const formulario = document.getElementById(FORM_ID);
  if (!formulario) {
    console.error('Formulário não encontrado!');
    return;
  }

  formulario.addEventListener('submit', handleSubmit);
}


function coletarDadosFormulario() {
  return {
    id: Date.now(),
    Paciente: {
      nome: document.getElementById('NomePaciente').value.trim(),
      Telefone: document.getElementById('Telefone').value.trim(),
      DataNascimento: document.getElementById('DataNascimento').value.trim()
    },
    Reclamacoes: {
      Queixa: document.getElementById('Queixa').value.trim(),
      Medicamentos: document.getElementById('Medicamentos').value.trim(),
    },
    Plano: {
      Diagnostico: document.getElementById('Diagnostico').value.trim(),
      Conduta: document.getElementById('Conduta').value.trim(),
    }
  };
}


async function enviarParaAPI(prontuario) {
  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prontuario)
    });

    if (!resposta.ok) {
      throw new Error('Erro ao enviar dados');
    }
    const data = await resposta.json();
    alert(data.message || '✅ Prontuário enviado com sucesso!');
  } catch (erro) {
    console.error('Erro ao enviar prontuário:', erro);
    alert('❌ Erro ao conectar com o servidor.');
  }
}


async function handleSubmit(event) {
  event.preventDefault();

  const prontuario = coletarDadosFormulario();

  await enviarParaAPI(prontuario);

  event.target.reset();
}


initFormulario();
