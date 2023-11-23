class  Usuario {
    constructor(codigo, nome, cpf, rg, dataNascimento, endereco, cep, email){
        this.codigo = codigo;
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.cep = cep;
        this.email = email;
    }
      getCodigo() {
        return this.codigo;
      }
      setCodigo(codigo) {
        this.codigo = codigo;
      }

    getNome() {
        return this.nome;
      }
    setNome(nome) {
        this.nome = nome;
      }

    getCPF() {
        return this.cpf;
      }
    setCPF(cpf) {
        this.cpf = cpf;
      }

    getRG() {
        return this.rg;
      }
    setRG(rg) {
        this.rg = rg;
      }

    getDataNascimento() {
        return this.dataNascimento;
      }
      setDataNascimento(dataNascimento) {
        this.dataNascimento = dataNascimento;
      }

    getEndereco() {
        return this.endereco;
      }
    setEndereco(endereco) {
        this.endereco = endereco;
      }

    getCEP() {
        return this.cep;
      }
    setCEP(cep) {
        this.cep = cep;
      }

    getEmail() {
        return this.email;
      }
    setEmail(email) {
        this.email = email;
      }

}

const usuario = new Usuario(1, "João", "123.456.789-00", "1234567-8", "1990-01-15", "Rua A, 123", "12345-678", "joao@example.com");
usuario.setNome("felipe");

