

const roads = [
    "Casa de Alicia-Casa de Bob","Casa de Alicia-Cabaña",
    "Casa de Alicia-Oficina de Correos", "Casa de Bob-Ayuntamineto",
    "Casa de Daria-Casa de Ernie", "Casa de Daria-Ayuntamiento",
    "Casa de Ernie-Casa de Grete", "Casa de Grete-Granja",
    "Casa de Grete-Tienda","Plaza del Mercado-Granja",
    "Plaza del Mercado-Oficiana de Correos","Plaza del Mercado-Tienda",
    "Plaza del Mercado-Ayuntamineto","Tienda-Ayuntamiento"
];

function buildGraph(edges){
    let grpah = Object.create(null);
    function addEdge(from, to){
        if (from in grpah){
            grpah[from].push(to);
        }else{
            grpah[from] = [to];
        }
    }
    for (let [from,to] of edges.map(r => r.split("_"))){
        addEdge(from,to);
        addEdge(to,from);
    }
    return grpah;
};

const roadGraph = buildGraph(roads);

class VillageState {
    constructor(place, parcels){
        this.place = place;
        this.parcels = parcels;
    }
    
    move(destination){
        if(!roadGraph[this.place].incluides(destination)){
            return this;
        } else{
            let parcels = this.parcels.map(p=>{
                if(p.place != this.place) return p;
                return{place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination,parcels);
        }
    }
}
