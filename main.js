

const APIF = "https://graph.facebook.com/";
const TOKEN = "?fields=id,name,email,picture,birthday,age_range&access_token=EAAIS0dzeWM4BAGQ4m4Ml5Uw3x2r4EI8ARZAXp7SPOGeSXm3bqrRmxOPiwM2GgtNez7nFy2RoC88gTFoZAMxLfffA0vlT8hduq7uOjg7yXUQEFf6AC8H87rB0cetczprIl7v8IokdbkUBZCMjsl96JTvcJ4PQRN3IvTQfk3cGVaZB1xr7cNPJ";


const app = Vue.createApp({
    data() {
        return {
            message: 'Dio!',
            busqueda: null,
            result: null,
            error: null,
            favoritos: new Map()
        }
    },

    created(){
        //console.log("CREADO")
        const FavoritosGuardados = JSON.parse(window.localStorage.getItem("misfavoritos"))
    
        //esta evaluando si existe y ademas midiendo su longitud.
        //se abrevia con ?
        if(FavoritosGuardados?.length){
          //recreamos el map con un nuevo nombre
          //quiero reconstruir favoritos
          //quiero reconstruir los favoritos
          //creo un map que es una coleccion con key y value
          const favoritosRebuild = new Map(
            //me valgo del método map para obtener el id como una key y el arreglo completo
            //como el value de mi Map
            FavoritosGuardados.map(alias=>[alias.id, alias]))
            //asignamos a la variavle favoritos de la instancia el valor del nuevo
            //favoritosRebuild
            
          this.favoritos = favoritosRebuild
        }
        //console.log(FavoritosGuardados)
      },

      computed: {
        //queremos saber si está en favoritos
        estaFavoritos(){
          return this.favoritos.has(this.result.id)
        },
    
        TodosFavoritos(){
          //pasamos la info a un autentico array
          return Array.from(this.favoritos.values())
          //El metodo values() traerá solo los valores sin las claves
        }
    
      },

    methods: {
        async Buscar() {
            this.result = this.error = null
            try {
                const response = await fetch(APIF + this.busqueda + TOKEN)
                if(!response.ok)throw new Error("Usuario")
                const data = await response.json()
                console.log(data)
                this.result = data
            } catch (error) {
                this.error = error
            } finally {
                this.busqueda = null
            }

        },
        
        addFavorito(){
            this.favoritos.set(this.result.id, this.result);
            this.actulizarStorage()
          },
      
          RemoverFavorito(){
            this.favoritos.delete(this.result.id);  
            this.actulizarStorage()
          },
      
          actulizarStorage(){
            window.localStorage.setItem('misfavoritos',JSON.stringify(this.TodosFavoritos) )
          },
      
          mostrarFavorito(parametro){
            //tipo array con objetos de javacript o tipo json
            this.result = parametro
          }

    }
})
