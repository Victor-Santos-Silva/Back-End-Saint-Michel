const pacienteService = require("../../../services/pacienteService");
const { Paciente } = require("../../../models");

jest.mock("../../../models");

describe("PacienteService - create", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const dadosValidos = () => ({
    nomeCompleto: "Victor Silva",
    data_nascimento: "2000-01-01",
    cpf: "12345678901",
    rg: "123456789",
    genero: "Masculino",
    endereco: "Rua das Flores 123",
    telefone: "11999999999",
    convenio_medico: "Unimed",
    plano_convenio: "Premium",
    tipo_sanguineo: "O+",
    email: "victor@email.com",
    senha: "Senha@123",
  });

  it("Deve lançar erro se CPF já existir", async () => {
    Paciente.findOne.mockResolvedValueOnce({ id: 1 });

    await expect(pacienteService.create(dadosValidos())).rejects.toThrow(
      "CPF já está em uso por outro paciente.",
    );
  });

  it("Deve lançar erro se RG já existir", async () => {
    Paciente.findOne
      .mockResolvedValueOnce(null) // CPF ok
      .mockResolvedValueOnce({ id: 1 }); // RG já existe

    await expect(pacienteService.create(dadosValidos())).rejects.toThrow(
      "RG já está em uso por outro paciente.",
    );
  });

  it("Deve lançar erro se email já estiver em uso", async () => {
    Paciente.findOne
      .mockResolvedValueOnce(null) //CPF ok
      .mockResolvedValueOnce(null) //RG ok
      .mockResolvedValueOnce({ id: 1 }); // Email já existe

    await expect(pacienteService.create(dadosValidos())).rejects.toThrow(
      "Email já está em uso por outro paciente.",
    );
  });

  it("Deve criar paciente com sucesso", async () => {
    Paciente.findOne
      .mockResolvedValueOnce(null) // CPF ok
      .mockResolvedValueOnce(null) // RG ok
      .mockResolvedValueOnce(null); // Email ok

    Paciente.create.mockResolvedValue({ id: 1 });

    const resultado = await pacienteService.create(dadosValidos());

    expect(Paciente.create).toHaveBeenCalled();
    expect(resultado).toHaveProperty("id");
  });
});
