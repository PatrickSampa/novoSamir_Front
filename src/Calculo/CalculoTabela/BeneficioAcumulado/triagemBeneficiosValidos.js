export async function triagemBeneficiosValidos({ beneficio, inicioCalculo, dip }, arrayBeneficiosAcumaladosRecebido, listBeneficiosInacumulaveis) {
  console.log("ENTROU NA FUNCTION TRIAGEMBENEFIICOS")
  const beneficioPrincipal = listBeneficiosInacumulaveis.find(beneficioDetalhado => parseInt(beneficioDetalhado.name.split("-")[0]) === parseInt(beneficio.split("-")[0]));
  const arrayBeneficioAcumuladosContaveis = [];
  console.log("AcumuladosRecebidos")
  console.log(arrayBeneficiosAcumaladosRecebido)
  console.log(beneficioPrincipal)
  for (const beneficioInacumulaves of arrayBeneficiosAcumaladosRecebido) {
    if (beneficioInacumulaves.obrigatorio || beneficioInacumulaves.beneficio == "Seguro Desemprego" || beneficioInacumulaves.beneficio == "Seguro Defesa" || beneficioInacumulaves.beneficio == "Auxílio Emergencial" || beneficioPrincipal.inacumulavel.find(beneficio => parseInt(`${beneficioInacumulaves.beneficio.split("-")[0]}`) === parseInt(`${beneficio.split("-")[0]}`))) {
      console.log("Entrou aqui?????????")
      if (compararDatas({ inicioCalculo, dip }, beneficioInacumulaves))
        arrayBeneficioAcumuladosContaveis.push(beneficioInacumulaves);
    }
  }
  console.log("ArrayBeneficios")
  console.log(arrayBeneficioAcumuladosContaveis)
  return arrayBeneficioAcumuladosContaveis.sort((evento1, evento2) => {
    const data1 = new Date(evento1.dcb.split('/').reverse().join('-'));
    const data2 = new Date(evento2.dcb.split('/').reverse().join('-'));
    return data1 - data2;
  });
}

function compararDatas({ inicioCalculo, dip }, { dib, dcb }) {
  console.log(inicioCalculo, dip, dib, dcb)
  console.log(Date.parse(inicioCalculo.split('/').reverse().join('-')) <= Date.parse(dcb.split('/').reverse().join('-')) && Date.parse(dib.split('/').reverse().join('-')) <= Date.parse(dip.split('/').reverse().join('-')))
  return Date.parse(inicioCalculo.split('/').reverse().join('-')) <= Date.parse(dcb.split('/').reverse().join('-')) && Date.parse(dib.split('/').reverse().join('-')) <= Date.parse(dip.split('/').reverse().join('-'));
}
