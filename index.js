const express = require("express");
const cors = require("cors");

const servidor = express();
const porta = 3300;

servidor.use(express.json());
servidor.listen(porta);
servidor.use(cors())

  usuarios = [
    {
      id: 0,
      nome: "Pedro Lucas Pinheiro",
      email: "pedrolp@example.com",
      senha: "senha123"
    },
    {
      id: 1,
      nome: "Luíza Martins",
      email:"luisamartion@example.com",
      senha:"senha123"
    },
    {
      id: 2,
      nome: "José Pedro",
      email:"josepedro@example.com",
      senha:"senha123"
    },
    {
      id: 3,
      nome: "Maria Souza",
      email:"mariasouza@example.com",
      senha:"senha123"
    }]
    

  artigos = [
      {
        titulo:"A ciência por trás de cinco métodos que ajudam a viver mais e melhor",
        link:"https://www.bbc.com/portuguese/curiosidades-59085103",
        
      },
      {
        titulo:"Por que um prato de comida colorido faz bem à saúde",
        link:"https://www.bbc.com/portuguese/vert-fut-59021957"
      },
      {
        titulo:"A cidade dos EUA onde água contaminada não permite nem escovar dentes",
        link:"https://www.bbc.com/portuguese/internacional-59086119"
      }
    ]

  dicas = [
    {
      id:1,
      mensagem:"Evite ficar sozinho ou em más companhias. As más companhias são aquelas que podem lhe induzir, persuadir a voltar ao vicio ou largar sua tentativa de abandonar."
    }
  ]

  motivacional = [
    {
      id:1,
      mensagem:"Não importa o qão escura seja a noite. Sua luz nunca se apagará."
    }
  ]
/*_______________________________________INFORMAÇÕES_USUÁRIO_______________________________________*/ 

function exiteUsuarioigual(id, nome, email){
  for(i = 0; i < usuarios.length; i++){
   
      if(usuarios[i].nome === nome || usuarios[i].email === email|| usuarios[i].id === id){ 
        console.log(true)
        return true
        
      }
      
  }
  return false
}
//Método GET => mostra os usuarios cadastrados
servidor.get("/usuarios", (req, res) => {
  res.json(usuarios);
  console.log("recebi um get");
})
servidor.get("/usuario/:id", (req, res) => {
  const { id } = req.params;
  const resposta = usuarios.find(item => item.id == id)
  res.json(resposta)
})

//Método POST => cadastra novos usuários
servidor.post("/novo-usuario", (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var newUser = req.body;
    
    if(id != undefined && nome != undefined && email != undefined && senha != undefined){

      const userExist = exiteUsuarioigual(id, nome, email);
        
        if(!userExist){
          usuarios.push(newUser);
          res.status(200).send(usuarios);
        }else{res.status(200).send("Nome ou email já existente")}
        
    }else{
      res.status(200).send("Nome, id ou email já existente")
    }
    console.log("recebi um post");
    
})
//Método PUT => modifica usuarios
 servidor.put("/modificar-usuario/:id", (req, res) => {
   const { id } = req.params
   if(req.body.nome != undefined && req.body.nome !== ""){
     usuarios[id].nome = req.body.nome; 
   }
   if(req.body.email != undefined && req.body.email !== ""){
    usuarios[id].email = req.body.email; 
   }
   if(req.body.senha != undefined && req.body.senha !== ""){
    usuarios[id].senha = req.body.senha; 
   }
   res.json(usuarios)
 })
//Método DELETE => remove usuarios
 servidor.delete("/remover-usuario/:id", (req, res) =>{
   const { id } = req.params
   console.log(id)
   usuarios.splice(id, 1)
  res.json(usuarios)
 })

/*____________________________________  INFORMÇÕES_CARDS____________________________________________*/

servidor.get("/artigos", (req, res) => {
  res.json(artigos);
})
servidor.get("/dicas", (req, res) => {
  res.json(dicas);
})
servidor.get("/motivacional", (req, res) => {
  res.json(motivacional);
})