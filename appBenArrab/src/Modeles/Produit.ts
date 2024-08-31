export interface Produit {
    id: string;
    qualiter: string;//
    grammage: string;
    type: string;//
    poids: number;//
    date_stock: string;
    qte_stock: number;
    lignedepID:string;
    created_at:string;
    ligne_dep:{
      id: string;
      nomlignedep : string,
      depotID:string,
    }

  }
