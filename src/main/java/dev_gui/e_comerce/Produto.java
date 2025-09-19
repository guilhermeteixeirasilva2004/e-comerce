package dev_gui.e_comerce;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Diz ao spring que esta é uma entidade de banco de dados
public class Produto {
    @Id // define a chave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nome;
    private double preco;

    public Produto(){

    }

    public Produto(String nome, double preco){
        this.nome = nome;
        this.preco = preco;
    }

    public long getId(){
        return id;
    }
    public String getNome() {
        return nome;
    }
    public double getPreco(){
        return preco;
    }


    public void setNome(String nome) {
        this.nome = nome;
    }
    void setPreco(double preco) {
        this.preco = preco;
    }
    public void setId(long id){
        this.id = (int)id;
    }
}
