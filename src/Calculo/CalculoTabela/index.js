import { calculoBeneficioInacumulavel } from "./BeneficioAcumulado/calculoBeneficioInacumulavel";
import { calculoBeneficioPrincipal } from "./BeneficioPrincpal/calculoBeneficioPrincipal";

export async function calculoTabelaPrincipal(informationBeneficioPrincpal, beneficiosAcumulados){
  var tabelaPrincipal = await calculoBeneficioPrincipal(informationBeneficioPrincpal);
  console.log("RETRONO ACUMULADF0ODSSSS " + JSON.stringify(tabelaPrincipal))
  if(beneficiosAcumulados.length > 0){
    const tabelaBeneficioInacumulavel = await calculoBeneficioInacumulavel(informationBeneficioPrincpal, beneficiosAcumulados, tabelaPrincipal);
    //console.log("Acukfasadasda: ",tabelaBeneficioInacumulavel)
    return await tabelaBeneficioInacumulavel;
  }else{
    return await tabelaPrincipal
  }
}
