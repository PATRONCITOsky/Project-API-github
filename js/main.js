const API = "https://api.github.com/users/";


//se corto el metodo buscar

const app = Vue.createApp({
    data() {
        return {
          message: 'Hello SKY!',
          busqueda: null,
          result: null
        }
      },
      
      //La palabra function ya no es necesaria ya que se usa un metodo
      methods: {
        async  Buscar(){
          const response = await fetch(API + this.busqueda)
          //ahora quiero traer la info en formato json
          const data = await response.json()
          console.log(data)
          this.result = true
      }
      }
})//se monta esta información en el html div app y ya se puede usar en el index