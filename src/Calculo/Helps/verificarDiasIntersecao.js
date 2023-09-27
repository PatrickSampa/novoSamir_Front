import { ConverterToDate } from '../Helps/stringToDate'

export  function verificarDiasDeIntersecao(dataInicioTabela,inicioCalculoAtivo, fimCalculoAtivo, inicioCalculoInacumulado, fimCalculoInacumulado){
    console.log(ConverterToDate(inicioCalculoAtivo))
    if(inicioCalculoAtivo > inicioCalculoInacumulado && fimCalculoAtivo < fimCalculoAtivo || fimCalculoAtivo){
        const valorDiasRestantesMes = ConverterToDate(fimCalculoAtivo) - ConverterToDate(fimCalculoAtivo);
        console.log(fimCalculoInacumulado)
        return  valorDiasRestantesMes == 0 ? 1 : valorDiasRestantesMes;
    }
}