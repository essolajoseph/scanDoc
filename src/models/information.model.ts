export class Information{
    faculte:string;
    matricule:string;
    numeroReleve:string;
    filiere:string;
    niveau:string;
    mgp:string;
    decision:string;
    annee:string;

    constructor(faculte:string, matricule:string, numeroReleve:string, filiere:string, niveau:string,mgp:string, decision:string,annee:string){
      this.faculte=faculte;
      this.annee=annee;
      this.matricule=matricule;
      this.niveau=niveau;
      this.numeroReleve=numeroReleve;
      this.filiere=filiere;
      this.mgp=mgp;
      this.decision=decision;

    }
}