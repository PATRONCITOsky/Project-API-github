const API = "https://api.github.com/users/";

async function Buscar(){
    const response = await fetch(API + 'PATRONCITOsky')
    //ahora quiero traer la info en formato json
    const data = await response.json()
    console.log(data)
}

const app = Vue.createApp({
    data() {
        return {
          message: 'Hello SKY!'
        }
      }
})//se monta esta información en el html div app y ya se puede usar en el index