class AbrigoAnimais {
  animais = [
    {
      nome: "Rex",
      especie: "cão",
      brinquedos: ["RATO", "BOLA"],
    },
    {
      nome: "Mimi",
      especie: "gato",
      brinquedos: ["BOLA", "LASER"],
    },
    {
      nome: "Fofo",
      especie: "gato",
      brinquedos: ["BOLA", "RATO", "LASER"],
    },
    {
      nome: "Zero",
      especie: "gato",
      brinquedos: ["RATO", "BOLA"],
    },
    {
      nome: "Bola",
      especie: "cão",
      brinquedos: ["CAIXA", "NOVELO"],
    },
    {
      nome: "Bebe",
      especie: "cão",
      brinquedos: ["LASER", "RATO", "BOLA"],
    },
    {
      nome: "Loco",
      especie: "jabuti",
      brinquedos: ["SKATE", "RATO"],
    },
  ];

  brinquedosValidos = new Set();

  constructor() {
    const todosOsBrinquedosComDuplicatas = this.animais.flatMap(
      (animal) => animal.brinquedos
    );

    this.brinquedosValidos = new Set(todosOsBrinquedosComDuplicatas);
  }

  validaAnimal(listaNomesAnimais) {
    let nomesAnimais = listaNomesAnimais.split(",");
    const nomesValidos = this.animais.map((a) => a.nome);

    for (const animal of nomesAnimais) {
      if (!nomesValidos.includes(animal)) {
        return { erro: "Animal inválido", lista: null };
      }
    }

    let duplicatas = nomesAnimais.filter(
      (animal, index) => nomesAnimais.indexOf(animal) !== index
    );
    if (duplicatas.length > 0) return { erro: "Animal inválido", lista: null };

    return { erro: null, lista: nomesAnimais };
  }

  validaBrinquedo(listaBrinquedos) {
    let nomesBrinquedos = listaBrinquedos.split(",");

    for (const brinquedo of nomesBrinquedos) {
      if (!this.brinquedosValidos.has(brinquedo)) {
        return { erro: "Brinquedo inválido", lista: null };
      }
    }

    let duplicatas = nomesBrinquedos.filter(
      (brinquedo, index) => nomesBrinquedos.indexOf(brinquedo) !== index
    );
    if (duplicatas.length > 0)
      return { erro: "Brinquedo inválido", lista: null };

    return { erro: null, lista: nomesBrinquedos };
  }

  _verificaOrdemBrinquedos(brinquedosOferecidos, brinquedosFavoritos) {
    let favIndex = 0;
    for (const oferecido of brinquedosOferecidos) {
      if (oferecido.trim() === brinquedosFavoritos[favIndex]) {
        favIndex++;
      }
      if (favIndex === brinquedosFavoritos.length) {
        return true;
      }
    }
    return false;
  }

  escolherPessoa(brinquedosPessoa1, brinquedosPessoa2, animais) {
    const adotadosPessoa1 = [];
    const adotadosPessoa2 = [];
    const brinquedosUsados1 = new Set();
    const brinquedosUsados2 = new Set();

    const brinquedosOferecidos1 = brinquedosPessoa1
      .split(",")
      .map((b) => b.trim());
    const brinquedosOferecidos2 = brinquedosPessoa2
      .split(",")
      .map((b) => b.trim());
    const listaNomesAnimais = animais.split(",").map((n) => n.trim());

    const destinos = [];

    for (const nomeAnimal of listaNomesAnimais) {
      const animal = this.animais.find((a) => a.nome === nomeAnimal);
      if (!animal) continue;

      let podeAdotar1 = false;
      let podeAdotar2 = false;

      // --- Condições para Pessoa 1 ---
      if (adotadosPessoa1.length < 3) {
        let condicaoOk = true;
        if (
          animal.especie === "gato" &&
          animal.brinquedos.some((b) => brinquedosUsados1.has(b))
        ) {
          condicaoOk = false;
        }
        if (condicaoOk) {
          if (animal.nome === "Loco") {
            podeAdotar1 =
              adotadosPessoa1.length > 0 &&
              animal.brinquedos.every((b) => brinquedosOferecidos1.includes(b));
          } else {
            podeAdotar1 = this._verificaOrdemBrinquedos(
              brinquedosOferecidos1,
              animal.brinquedos
            );
          }
        }
      }

      // --- Condições para Pessoa 2 ---
      if (adotadosPessoa2.length < 3) {
        let condicaoOk = true;
        if (
          animal.especie === "gato" &&
          animal.brinquedos.some((b) => brinquedosUsados2.has(b))
        ) {
          condicaoOk = false;
        }
        if (condicaoOk) {
          if (animal.nome === "Loco") {
            podeAdotar2 =
              adotadosPessoa2.length > 0 &&
              animal.brinquedos.every((b) => brinquedosOferecidos2.includes(b));
          } else {
            podeAdotar2 = this._verificaOrdemBrinquedos(
              brinquedosOferecidos2,
              animal.brinquedos
            );
          }
        }
      }

      // --- Decisão ---
      if (podeAdotar1 && !podeAdotar2) {
        destinos.push(`${animal.nome} - pessoa 1`);
        adotadosPessoa1.push(animal.nome);
        if (animal.especie === "gato")
          animal.brinquedos.forEach((b) => brinquedosUsados1.add(b));
      } else if (podeAdotar2 && !podeAdotar1) {
        destinos.push(`${animal.nome} - pessoa 2`);
        adotadosPessoa2.push(animal.nome);
        if (animal.especie === "gato")
          animal.brinquedos.forEach((b) => brinquedosUsados2.add(b));
      } else {
        destinos.push(`${animal.nome} - abrigo`);
      }
    }

    destinos.sort();

    return { erro: null, lista: destinos };
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const validacaoBp1 = this.validaBrinquedo(brinquedosPessoa1);
    if (validacaoBp1.erro) return validacaoBp1;

    const validacaoBp2 = this.validaBrinquedo(brinquedosPessoa2);
    if (validacaoBp2.erro) return validacaoBp2;

    const validacaoOrdem = this.validaAnimal(ordemAnimais);
    if (validacaoOrdem.erro) return validacaoOrdem;

    return this.escolherPessoa(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );
  }
}

export { AbrigoAnimais as AbrigoAnimais };
