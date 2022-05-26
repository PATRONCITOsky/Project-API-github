const API = "https://api.github.com/users/";


//se corto el metodo buscar

const ella = Vue.createApp({
  data() {
    return {
      message: 'Hello SKY!',
      busqueda: null,
      result: null,
      error: null
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

    }
  }
})//se monta esta información en el html div app y ya se puede usar en el index