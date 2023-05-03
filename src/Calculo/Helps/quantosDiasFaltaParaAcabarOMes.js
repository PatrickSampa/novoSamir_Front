export function quantosDiasFaltaParaAcabarOMes(data) {
    const [dia, mes, ano] = data.split('/');
    const date = new Date(ano, mes - 1, dia);
    var ultimoDiaMes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const diasTrabalhados = ultimoDiaMes - date.getDate() + 1;
    
    //dias trabalhados tem que ser no maximo 30 dias 
    if(diasTrabalhados >= 30){
        return 30;
    }
    //verificar se é mes de fervereiro fervereiro, se for dias trabalhados for igual ou maior que 28 ele retorna 30
    else if(parseInt(mes) === 2 && diasTrabalhados >= 28){
        return 30;
    }else{
        return diasTrabalhados;
    }

}