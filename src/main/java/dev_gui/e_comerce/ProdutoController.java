package dev_gui.e_comerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public List<Produto> findAll(){
        return produtoRepository.findAll();
    }

    @PostMapping
    public Produto save(@RequestBody Produto produto){
        return produtoRepository.save(produto);
    }
@DeleteMapping("/{id}")
    public void delete(@PathVariable long id){
        produtoRepository.deleteById(id);
    }

}
