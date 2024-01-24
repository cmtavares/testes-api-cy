/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then(response => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": "Carlos Tavares",
                    "email": "carlos@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
               }
          }).then(response => {
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               expect(response.status).to.equal(201)
          })
     });

     it('Deve validar um usuário com email inválido', () => {
           cy.cadastrarUsuario('Carlos', 'carlos@qa.com', 'teste')
           .then(response => {
               expect(response.status).to.eq(400)
               expect(response.body.message).to.eq('Este email já está sendo usado')
           })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: { 
                         "nome": "Matheus",
                         "email": "matheus@qa.com.br",
                         "password": "teste",
                         "administrador": "true"
                     }
               }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
          })
     })
});

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[3]._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`
               }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
               })
          })
     });

