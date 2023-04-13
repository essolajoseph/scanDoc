import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class OrthographeService {

    dictionnaire?: Set<string>;

    constructor(private http: HttpClient) {
        this.http.get<string[]>('../../assets/dictionnaire/dictionnaire.json').subscribe(mots => {
          this.dictionnaire = new Set<string>(mots);
        });
      }

  public estCorrect(mot: string): boolean { 
    return this.dictionnaire?.has(mot) ?? false;
  }

  public corrigerTexte(texte: string): string {
    const mots = texte.toLowerCase().split(/\W+/);
    const motsCorriges: string[] = [];
    for (const mot of mots) {
      if (this.estCorrect(mot)) {
        motsCorriges.push(mot);
      } else {
        motsCorriges.push(this.getCorrection(mot));
      }
    }
    return motsCorriges.join(' ');
  }

  private getCorrection(mot: string): string {
    let correction = '';
    let distanceMin = 3;
    for (const motDuDico of this.dictionnaire!) {
      const distance = this.distanceLevenshtein(mot, motDuDico);
      if (distance < distanceMin) {
        distanceMin = distance;
        correction = motDuDico;
      }
    }
    return correction;
  }

  private distanceLevenshtein(s: string, t: string): number {
    const d: number[][] = [];
    const n = s.length;
    const m = t.length;
    if (n === 0) {
      return m;
    }
    if (m === 0) {
      return n;
    }
    for (let i = 0; i <= n; i++) {
      d[i] = [];
      d[i][0] = i;
    }
    for (let j = 0; j <= m; j++) {
      d[0][j] = j;
    }
    for (let j = 1; j <= m; j++) {
      for (let i = 1; i <= n; i++) {
        if (s[i - 1] === t[j - 1]) {
          d[i][j] = d[i - 1][j - 1];
        } else {
          d[i][j] = Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1;
        }
      }
    }
    return d[n][m];
  }
  
}
