import { calculoBeneficioInacumulavel } from "./BeneficioAcumulado/calculoBeneficioInacumulavel";
import { calculoBeneficioPrincipal } from "./BeneficioPrincpal/calculoBeneficioPrincipal";

export async function calculoTabelaPrincipal(informationBeneficioPrincpal, beneficiosAcumulados){
  var tabelaPrincipal = await calculoBeneficioPrincipal(informationBeneficioPrincpal);
  if(beneficiosAcumulados.length > 0){
    return await calculoBeneficioInacumulavel(informationBeneficioPrincpal, beneficiosAcumulados, tabelaPrincipal);
  }else{
    return await tabelaPrincipal
  }
}
