export function quantosDiasFaltaParaAcabarOMes(data) {
    const [dia, mes, ano] = data.split('/');
    const date = new Date(ano, mes - 1, dia);
    var ultimoDiaMes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    if(ultimoDiaMes > 30){
        ultimoDiaMes = 30;
    }
    return ultimoDiaMes - date.getDate();
}