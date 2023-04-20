import { Injectable } from '@angular/core';
import { Information } from 'src/models/information.model';

@Injectable({
  providedIn: 'root'
})
export class GetInformationService {

  constructor() { }
  extraireInformations(texte: String) :Information{
    // Texte à analyser
   
    let information:Information;
    // Expression régulière pour extraire la faculté
    const regexFaculte = /FACULTE\s+DES\s+(\w+)/i;
    const matchFaculte = texte.match(regexFaculte);
    let faculte = matchFaculte ? matchFaculte[1] : null;
    
    // Expression régulière pour extraire le matricule
    const regexMatricule = /Matricule\s*:\s*(\w+)/;
    const matchMatricule = texte.match(regexMatricule);
    let matricule = matchMatricule ? matchMatricule[1] : null;
    
    // Expression régulière pour extraire le numéro de relevé
    let regexReleve = /N°\s*:\s*([\w/-]+)/;
    let matchReleve = texte.match(regexReleve);
    let releve = matchReleve ? matchReleve[1] : null;
     if(releve==null){
       regexReleve = /N°\s*([\w/-]+)/;
       matchReleve = texte.match(regexReleve);
       releve = matchReleve ? matchReleve[1] : null;
     }
    // Expression régulière pour extraire la MGP
    let regexMgp = /\(MGP\):\s*([\d.,/]+)/;
    let matchMgp = texte.match(regexMgp);
    let mgp = matchMgp ? matchMgp[1] : null;
    if(mgp==null){
     regexMgp = /\(MGP\):\s*([\d.,/]+)/;
     matchMgp = texte.match(regexMgp);
     mgp = matchMgp ? matchMgp[1] : null;
    }
    // Expression régulière pour extraire la décision
    const regexDecision = /Décision\s*:\s*(\w+)/;
    const matchDecision = texte.match(regexDecision);
    let decision = matchDecision ? matchDecision[1] : null;
    if(decision==null){
    const regexDecision = /Décision\s*(\w+)/;
    const matchDecision = texte.match(regexDecision);
      decision = matchDecision ? matchDecision[1] : null;
    }
    
    // Expression régulière pour extraire l'annee scolaire
    
    let regexAnneeScolaire=  /Année\s+Académique\s*:\s*([\w/]+)/i;
    let matchAnneeAcademique=texte.match(regexAnneeScolaire);
    let annee=matchAnneeAcademique?matchAnneeAcademique[1]:null;
    if(annee==null){
     regexAnneeScolaire=  /Année\s+Académique\s*([\w/]+)/i;
     matchAnneeAcademique=texte.match(regexAnneeScolaire);
     annee=matchAnneeAcademique?matchAnneeAcademique[1]:null;
    }
    // Expression reguliere pour extraire la filiere
    let regexFiliere= /filière\s*:\s*(.*?)\s*Level/i;
    let matchFiliere= texte.match(regexFiliere);
    let filiere= matchFiliere?matchFiliere[1]:null;
    if(filiere==null){
       regexFiliere= /filière\s*(.*?)\s*Level/i;
       matchFiliere= texte.match(regexFiliere);
       filiere= matchFiliere?matchFiliere[1]:null;
    }
    // Expression reguliere pour extraire le niveau
    let regexNiveau=/niveau\s*:\s*(.*?)\s*Filière/i;
    let matchNiveau=texte.match(regexNiveau);
    let niveau=matchNiveau?matchNiveau[1]:null;
    if(niveau==null){
       regexNiveau=/niveau\s*(.*?)\s*Filière/i;
      matchNiveau=texte.match(regexNiveau);
      niveau=matchNiveau?matchNiveau[1]:null;
    }

    information=new Information(faculte!,matricule!,releve!,filiere!,niveau!,mgp!,decision!,annee!);
 return information;
}
}
