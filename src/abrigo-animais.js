class AbrigoAnimais {
  brinquedos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]
  nomes = ["Rex", "Mimi", "Fofo", "Zero", "Bola", "Bebe", "Loco"]
  especies = ["gato", "cão", "jabuti"]

    
  validaAnimal(listaNomesAnimais){
    const ErroAnimal = new Error("Animal inválido")
    let nomesAnimais = listaNomesAnimais.split(",")
    let duplicatas = []
    
    // for (let i = 0; i >= nomesAnimais.length(); i++){
    //   if (this.nomes.includes(nomesAnimais[i])){
    //     throw ErroAnimal;
    //   }

  nomesAnimais.map((animal) => {
      if (!this.nomes.includes(animal)) {
      throw ErroAnimal;}
    });

    duplicatas = nomesAnimais.filter((animal, index) => nomesAnimais.indexOf(animal) !== index);
    if (duplicatas.length() > 0) throw ErroAnimal

    }


  


  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // const brinquedos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]
    // const nomes = ["Rex", "Mimi", "Fofo", "Zero", "Bola", "Bebe", "Loco"]
    // const especies = ["gato", "cão", "jabuti"]

    

    let bp1 = brinquedosPessoa1.split(",")
    let bp2 = brinquedosPessoa2.split(",")
    let ordem = ordemAnimais.split(",")
    console.log(bp1)
    console.log(bp2)
    console.log(ordem)



  }
}

export { AbrigoAnimais as AbrigoAnimais };
