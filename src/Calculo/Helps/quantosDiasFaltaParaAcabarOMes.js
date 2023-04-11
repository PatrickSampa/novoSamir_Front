export function quantosDiasFaltaParaAcabarOMes(data) {
    const [dia, mes, ano] = data.split('/');
    const date = new Date(ano, mes - 1, dia);
    const ultimoDiaMes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return ultimoDiaMes - date.getDate() + 1;
}