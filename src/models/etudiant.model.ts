export class Etudiant{
    matricule: string
    nom:string
    prenom:string
    date_naissance:Date
    lieu_naissance:string

    constructor(matricule:string, nom:string, prenom:string, date_naissance:Date,lieu_naissance:string) {
        this.date_naissance=date_naissance,
        this.lieu_naissance=lieu_naissance,
        this.matricule=matricule,
        this.nom=nom,
        this.prenom=prenom
    }
}