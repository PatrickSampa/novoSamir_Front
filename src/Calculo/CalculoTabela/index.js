import { calculoBeneficioInacumulavel } from "./BeneficioAcumulado/calculoBeneficioInacumulavel";
import { calculoBeneficioPrincipal } from "./BeneficioPrincpal/calculoBeneficioPrincipal";

export async function calculoTabelaPrincipal(informationBeneficioPrincpal, beneficiosAcumulados){
  var tabelaPrincipal = await calculoBeneficioPrincipal(informationBeneficioPrincpal);
  if(beneficiosAcumulados.length > 0){
    const tabelaBeneficioInacumulavel = await calculoBeneficioInacumulavel(informationBeneficioPrincpal, beneficiosAcumulados, tabelaPrincipal);
    
    return await tabelaBeneficioInacumulavel;
  }else{
    return await tabelaPrincipal
  }
}
