<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <!--LISTAGEM DE ERROS -->
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaltMessage}}
        </li>
      </ul>
      <form @submit.prevent="salvar">
          <label>Nome</label>
          <input type="text" placeholder="Nome" :v-model="produto.nome">
          <label>Quantidade</label>
          <input type="number" placeholder="QTD" v-model="produto.quantidade">
          <label>Valor</label>
          <input type="text" placeholder="Valor" v-model="produto.valor">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>
      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto of produtos" :key="produto.id">
            <td>{{produto.nome}}</td>
            <td>{{produto.quantidade}}</td>
            <td>{{produto.valor}}</td>
            <td>
              <button @click="editar(produto)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(produto)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Produto from './services/produtos'

  export default{

    data(){
      return{
        produto:{
            id:'',
            nome:'',
            quantidade:'',
            valor:'',
        },

        produtos:[],
        errors:[]
      }
    },
    //Montando a aplicação para receber a lista de produtos da api
    mounted(){
      //Chamando a função de listar
      this.listar()
    },

    //Criando os metodos do CRUD, salvar, visualizar, atualizar e deletar
    methods:{
      listar(){
        Produto.listar().then(resposta =>{
          this.produtos = resposta.data
        })
      },
      //salvando dados
      salvar(){
        if(!this.produto.id){
          Produto.salvar(this.produto).then(resposta =>{
            this.produto = {}
            alert('Salvo')
            this.listar()
            this.errors = []
          }).catch(e =>{
            this.errors = response.data.errors
          })
        //atualizar
        }else{
          Produto.atualizar(this.produto).then(resposta =>{
            this.produto = {}
            alert('Salvo')
            this.listar()
            this.errors = []
          }).catch(e =>{
            this.errors = response.data.errors
          })
        }

      },
      //editar produto
      editar(produto){
        this.produto = produto
      },
      //Remover produto + confirmação
      remover(produto){
        if(confirm('Deseja remover o produto?')){
          Produto.apagar(produto).then(resposta =>{
            this.listar()
            this.errors = []
          }).catch(e => {
            this.errors = e.response.data.errors
          })
        }
      }
    }
  }
</script>
