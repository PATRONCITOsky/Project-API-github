const API = "https://api.github.com/users/";


//se corto el metodo buscar

const ella = Vue.createApp({
  data() {
    return {
      //Propiedades
      message: 'Hello SKY!',
      busqueda: null,
      result: null,
      error: null,
      favoritos: new Map()//se crea un map para guardar los 
    }
  },
//created hacer parte de los ciclos de vida de Vue
//aquí vamos a obtener los valores que estén en el localStorage
  created(){
    //console.log("CREADO")
    const FavoritosGuardados = JSON.parse(window.localStorage.getItem("misfavoritos"))
    if(FavoritosGuardados.length){
      //recreamos el map con un nuevo nombre
      //const favoritosnew = new Map()
    }
    //console.log(FavoritosGuardados)
  },
//Se crea el metodo computed
  computed: {
    //queremos saber si está en favoritos
    estaFavoritos(){
      return this.favoritos.has(this.result.id)
    },

    TodosFavoritos(){
      //pasamos la info a un autentico array
      return Array.from(this.favoritos.values())
      //El metodo values() traerá solo los valores sin las claves
    },

    actulizarStorage(){
      window.localStorage.setItem('misfavoritos',JSON.stringify(this.TodosFavoritos) )
    }

  },

  


  //La palabra function ya no es necesaria ya que se usa un metodo
  methods: {
    async Buscar() {
      // depende del error
      this.result = this.error = null
      try {
        const response = await fetch(API + this.busqueda)
        if(!response.ok)throw new Error("Usuario")
        //console.log(response)
        //ahora quiero traer la info en formato json
        const data = await response.json()
        console.log(data)
        this.result = data //cambiar tru por data
      } catch (error) {
        this.error = error
      }finally{
        this.busqueda = null
      }

    },//acá termina el metooo buscar
    
    addFavorito(){
      this.favoritos.set(this.result.id, this.result);
      this.actulizarStorage()
    },

    RemoverFavorito(){
      this.favoritos.delete(this.result.id);  
      this.actulizarStorage()
    }

  }
})//se monta esta información en el html div app y ya se puede usar en el index