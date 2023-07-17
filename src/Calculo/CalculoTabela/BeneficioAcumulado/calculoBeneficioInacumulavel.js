import { getcalculoBeneficioinacumulavel } from "../../../api/calculadora/calculo/getBeneficioInacumulavel";
import { quantosDiasFaltaParaAcabarOMes } from "../../Helps/quantosDiasFaltaParaAcabarOMes";
import { validarValorDoDiaSerConsideradoNaTabelaDeCalculo } from "../../Helps/validarValorDoDiaSerConsideradoNaTabelaDeCalculo";
console.log("ENTROU NA PARTE DE CALCULO DO SAMIR")
var contadorMesDe13SalarioBeneficioInacumulavel = 0;
var contadorMesDe13SalarioSalarioBeneficioPrincipal = 0;
var arrayDeQUnatidadeDeMessesDeCadaAno = []
export async function calculoBeneficioInacumulavel(informationBeneficioPrincpal, beneficiosAcumulados, tabelaPrincipal) {
  console.log("CalculoBeneficioAcumulavel")
  const { inicioCalculo, dip } = informationBeneficioPrincpal;
  tabelaPrincipal = tabelaPrincipal.map((linhaTabelaPrincipal) => {
    conatdorDe13SalarioBeneficioPrincipal(linhaTabelaPrincipal, inicioCalculo, dip)
    if (linhaTabelaPrincipal.data.split("/")[0] == "13Salario") {
      arrayDeQUnatidadeDeMessesDeCadaAno.push({
        data: linhaTabelaPrincipal.data,
        quantidadeDeMes: contadorMesDe13SalarioSalarioBeneficioPrincipal
      })
    }
    return {
      data: linhaTabelaPrincipal.data,
      reajusteAcumulado: linhaTabelaPrincipal.reajusteAcumulado,
      devido: linhaTabelaPrincipal.salario,
      reajusteRecebido: 0,
      recebido: 0,
      salario: linhaTabelaPrincipal.salario,
      correcao: linhaTabelaPrincipal.correcao,
      salarioCorrigido: linhaTabelaPrincipal.salarioCorrigido,
      juros: linhaTabelaPrincipal.juros,
      salarioJuros: linhaTabelaPrincipal.salarioJuros,
      salarioTotal: linhaTabelaPrincipal.salarioTotal,
    }
  });
  const tabelasFeitas = await beneficiosAcumulados.map(async (beneficioInacumulavel) => {
    console.log("Acumulados")
    console.log(beneficiosAcumulados)
    const { dib, dcb } = beneficioInacumulavel;
    contadorMesDe13SalarioBeneficioInacumulavel = 0;
    contadorMesDe13SalarioSalarioBeneficioPrincipal = 0;
    const body = {
      inicioCalculo: beneficioInacumulavel.dib,
      dip: beneficioInacumulavel.dcb,
      rmi: beneficioInacumulavel.rmi,
      salario13: beneficioInacumulavel.salario13,
      limiteMinimoMaximo: beneficioInacumulavel.limiteMinimoMaximo,
      salarioMinimo: beneficioInacumulavel.salarioMinimo,
      porcentagemRMI: parseFloat(beneficioInacumulavel.porcentagemRmi),
      salario13Obrigatorio: beneficioInacumulavel.salario13Obrigatorio,
      selic: informationBeneficioPrincpal.selic,
    };
    const tabelaBeneficioInacumulavel = await getcalculoBeneficioinacumulavel(body)
    console.log("TabelaBeneficio: " + tabelaBeneficioInacumulavel)
    console.log(tabelaBeneficioInacumulavel)
    tabelaPrincipal = await Promise.all(tabelaPrincipal.map(async (linhaTabelaPrincipal) => {
      let [, mesDCBBeneficioInacumulavel, anoDCBBeneficioInacumulavel] = beneficioInacumulavel.dcb.split("/")
      var [diaLinhaTabelaPrincipal, mesLinhaTabelaPrincipal, anoLinhaTabelaPrincipal] = linhaTabelaPrincipal.data.split("/")
      //console.log("mesDCBBeneficioInacumulavel ", mesDCBBeneficioInacumulavel, "anoDCBBeneficioInacumulavel ", anoDCBBeneficioInacumulavel)
      if(anoLinhaTabelaPrincipal > anoDCBBeneficioInacumulavel || (anoLinhaTabelaPrincipal == anoDCBBeneficioInacumulavel && mesLinhaTabelaPrincipal > mesDCBBeneficioInacumulavel) ){
        return linhaTabelaPrincipal;
      }
      if (diaLinhaTabelaPrincipal != "01" && diaLinhaTabelaPrincipal != "13Salario") {
        diaLinhaTabelaPrincipal = "01"
      }
      let linhaBeneficioInacumulavel = await tabelaBeneficioInacumulavel.find(linha => linha.data == (diaLinhaTabelaPrincipal + "/" + mesLinhaTabelaPrincipal + "/" + anoLinhaTabelaPrincipal))
      if (linhaBeneficioInacumulavel !== undefined) {
        if (beneficioInacumulavel.beneficio.includes("Seguro Desemprego") ||
          beneficioInacumulavel.beneficio.includes("Auxílio Emergencial") ||
          beneficioInacumulavel.beneficio.includes("Seguro Defesa")) {
          return await descontarBeneficioEspecial(linhaTabelaPrincipal, linhaBeneficioInacumulavel, inicioCalculo, dip, dib, dcb, beneficioInacumulavel.salario13);
        } else {
          return await decontar(linhaTabelaPrincipal, linhaBeneficioInacumulavel, inicioCalculo, dip, dib, dcb, beneficioInacumulavel.salario13);
        }
      } else {
        return linhaTabelaPrincipal
      }
    }));
    return await tabelaPrincipal
  });
  return tabelasFeitas[tabelasFeitas.length - 1];
}

async function conatdorDe13SalarioBeneficioPrincipal(linhaTabelaPrincipal, inicioCalculo, dip) {
  if (linhaTabelaPrincipal.data == inicioCalculo || linhaTabelaPrincipal.data == dip) {
    if ((linhaTabelaPrincipal.data == inicioCalculo && (quantosDiasFaltaParaAcabarOMes(inicioCalculo) >= 15) ||
      (linhaTabelaPrincipal.data == dip && (parseInt(dip.split("/")[0]) >= 15))
    )) {
      // console.log("é janeiro", (parseInt(linhaTabelaPrincipal.data.split("/")[1]) === 1), "contadorMesDe13SalarioSalarioBeneficioPrincipa", contadorMesDe13SalarioSalarioBeneficioPrincipal)
      contadorMesDe13SalarioSalarioBeneficioPrincipal++;
    }
  } else {
    if (parseInt(linhaTabelaPrincipal.data.split("/")[1]) === 1) {
      contadorMesDe13SalarioSalarioBeneficioPrincipal = 1;
    } else if (linhaTabelaPrincipal.data.split("/")[0] != "13Salario") {
      contadorMesDe13SalarioSalarioBeneficioPrincipal++;
    }
  }

}

async function descontarBeneficioEspecial(linhaTabelaPrincipal, linhaBeneficioInacumulavel, inicioCalculo, dip, dib, dcb, salario13) {
  let recebido = await verificadorRecibidoEmDib_InicioCalculo_DIP_DCB(linhaTabelaPrincipal.data, dib, inicioCalculo, dip, dcb, linhaTabelaPrincipal.devido);
  if (salario13 && recebido >= (linhaBeneficioInacumulavel.salario / 2) && linhaTabelaPrincipal.data.split("/")[0] != "13Salario") {
    contadorMesDe13SalarioBeneficioInacumulavel++;
    if (parseInt(linhaTabelaPrincipal.data.split("/")[1]) === 1) {
      contadorMesDe13SalarioBeneficioInacumulavel = 1;
    }
  } else if (parseInt(linhaTabelaPrincipal.data.split("/")[1]) === 1) {
    contadorMesDe13SalarioBeneficioInacumulavel = 1;
  }
  if (linhaTabelaPrincipal.data.split("/")[0] == "13Salario") {
    let mesRecibidosNoAno = arrayDeQUnatidadeDeMessesDeCadaAno.find(obj => obj.data === linhaTabelaPrincipal.data).quantidadeDeMes;
    recebido = (recebido / mesRecibidosNoAno) * contadorMesDe13SalarioBeneficioInacumulavel;
  }
  return {
    data: linhaTabelaPrincipal.data,
    reajusteAcumulado: linhaTabelaPrincipal.reajusteAcumulado,
    devido: Math.floor((linhaTabelaPrincipal.devido - recebido) * 100) / 100,
    reajusteRecebido: linhaTabelaPrincipal.reajusteAcumulado,
    recebido: Math.floor((linhaTabelaPrincipal.recebido) * 100) / 100,
    salario: Math.floor((linhaTabelaPrincipal.salario - recebido) * 100) / 100,
    correcao: linhaTabelaPrincipal.correcao,
    salarioCorrigido: Math.floor((linhaTabelaPrincipal.salario - recebido) * linhaTabelaPrincipal.correcao * 100) / 100,
    juros: linhaTabelaPrincipal.juros,
    salarioJuros: Math.floor((linhaTabelaPrincipal.salario - recebido) * linhaTabelaPrincipal.juros * linhaTabelaPrincipal.correcao * 100) / 100,
    salarioTotal: Math.floor((linhaTabelaPrincipal.salario - recebido) * (linhaTabelaPrincipal.juros + 1) * linhaTabelaPrincipal.correcao * 100) / 100,
  };
}

async function decontar(linhaTabelaPrincipal, linhaBeneficioInacumulavel, inicioCalculo, dip, dib, dcb, salario13) {
  let recebido = await verificadorRecibidoEmDib_InicioCalculo_DIP_DCB(linhaTabelaPrincipal.data, dib, inicioCalculo, dip, dcb, linhaBeneficioInacumulavel.salario);
  if (salario13 && recebido >= (linhaBeneficioInacumulavel.salario / 2) && linhaTabelaPrincipal.data.split("/")[0] != "13Salario") {
    contadorMesDe13SalarioBeneficioInacumulavel++;
    if (parseInt(linhaTabelaPrincipal.data.split("/")[1]) === 1) {
      contadorMesDe13SalarioBeneficioInacumulavel = 1;
      contadorMesDe13SalarioSalarioBeneficioPrincipal = 1;
    }
  } else if (parseInt(linhaTabelaPrincipal.data.split("/")[1]) === 1) {
    contadorMesDe13SalarioBeneficioInacumulavel = 1;
    contadorMesDe13SalarioSalarioBeneficioPrincipal = 1;
  }
  if (linhaTabelaPrincipal.data.split("/")[0] == "13Salario") {
    recebido = recebido * (contadorMesDe13SalarioBeneficioInacumulavel) / 12;


  }
  return {
    data: linhaTabelaPrincipal.data,
    reajusteAcumulado: linhaTabelaPrincipal.reajusteAcumulado,
    devido: linhaTabelaPrincipal.devido,
    reajusteRecebido: Math.floor((linhaTabelaPrincipal.reajusteAcumulado * linhaBeneficioInacumulavel.reajusteAcumulado) * 10000) / 10000,
    recebido: Math.floor((linhaTabelaPrincipal.recebido + recebido) * 100) / 100,
    salario: Math.floor((linhaTabelaPrincipal.salario - recebido) * 100) / 100,
    correcao: linhaTabelaPrincipal.correcao,
    salarioCorrigido: Math.floor((linhaTabelaPrincipal.salario - recebido) * linhaTabelaPrincipal.correcao * 100) / 100,
    juros: linhaTabelaPrincipal.juros,
    salarioJuros: Math.floor((linhaTabelaPrincipal.salario - recebido) * linhaTabelaPrincipal.juros * linhaTabelaPrincipal.correcao * 100) / 100,
    salarioTotal: Math.floor((linhaTabelaPrincipal.salario - recebido) * (linhaTabelaPrincipal.juros + 1) * linhaTabelaPrincipal.correcao * 100) / 100,
  };
}
async function verificadorRecibidoEmDib_InicioCalculo_DIP_DCB(dataLinhaTabela, dib, inicioCalculo, dip, dcb, recebido) {

  if (mesmoMesAno(dataLinhaTabela, dib) || mesmoMesAno(dataLinhaTabela, inicioCalculo) || mesmoMesAno(dataLinhaTabela, dip) || mesmoMesAno(dataLinhaTabela, dcb)) {
    const diasConsiderados = await calcularDiasConsiderados(dataLinhaTabela, dib, inicioCalculo, dip, dcb);
    if (diasConsiderados === null) {
      return recebido;
    } else {
      return recebido * diasConsiderados / 30;
    }
  } else {
    return recebido;
  }
}

function mesmoMesAno(data1, data2) {
  const mesAno1 = data1.split("/").slice(1).join("/");
  const mesAno2 = data2.split("/").slice(1).join("/");
  return mesAno1 === mesAno2;
}


async function calcularDiasConsiderados(dataLinhaTabela, dib, inicioCalculo, dip, dcb) {
  if (mesmoMesAno(dib, inicioCalculo) && mesmoMesAno(dataLinhaTabela, dib)) {
    return parseInt(dib.split("/")[0]) > parseInt(inicioCalculo.split("/")[0])
      ? validarValorDoDiaSerConsideradoNaTabelaDeCalculo(quantosDiasFaltaParaAcabarOMes(dib), parseInt(dib.split("/")[1]))
      : validarValorDoDiaSerConsideradoNaTabelaDeCalculo(quantosDiasFaltaParaAcabarOMes(inicioCalculo), inicioCalculo.split("/")[1]);
  } else if (mesmoMesAno(dataLinhaTabela, dib)) {
    return validarValorDoDiaSerConsideradoNaTabelaDeCalculo(quantosDiasFaltaParaAcabarOMes(dib), parseInt(dib.split("/")[1]));
  } else if (mesmoMesAno(dataLinhaTabela, inicioCalculo)) {
    return validarValorDoDiaSerConsideradoNaTabelaDeCalculo(quantosDiasFaltaParaAcabarOMes(inicioCalculo), inicioCalculo.split("/")[1]);
  } else if (mesmoMesAno(dib, dip) && mesmoMesAno(dataLinhaTabela, dip)) {
    return parseInt(dip.split("/")[0]) - parseInt(dib.split("/")[0]) || null;
  } else if (mesmoMesAno(inicioCalculo, dcb) && mesmoMesAno(dataLinhaTabela, dcb)) {
    return parseInt(dcb.split("/")[0]) - parseInt(inicioCalculo.split("/")[0]) || null;
  } else if (mesmoMesAno(dip, dcb) && mesmoMesAno(dataLinhaTabela, dip)) {
    return parseInt(dip.split("/")[0]) < parseInt(dcb.split("/")[0])
      ? validarValorDoDiaSerConsideradoNaTabelaDeCalculo(dip.split("/")[0], dip.split("/")[1])
      : validarValorDoDiaSerConsideradoNaTabelaDeCalculo(dcb.split("/")[0], dcb.split("/")[1]);
  } else if (mesmoMesAno(dataLinhaTabela, dip)) {
    return validarValorDoDiaSerConsideradoNaTabelaDeCalculo(dip.split("/")[0], dip.split("/")[1]);
  } else if (mesmoMesAno(dataLinhaTabela, dcb)) {
    return validarValorDoDiaSerConsideradoNaTabelaDeCalculo(dcb.split("/")[0], dcb.split("/")[1]);
  } else {
    return null;
  }
}