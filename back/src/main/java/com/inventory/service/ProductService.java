package com.inventory.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.modelmapper.ModelMapper;

import com.inventory.entity.Product;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.ProductRawMaterialRepository;
import com.inventory.repository.ProductionRepository;
import com.inventory.dto.ProductResponseDto;

@Service
public class ProductService {
	
	private final ProductRepository repository;
	private final ProductRawMaterialRepository prmRepository;
	private final ProductionRepository productionRepository;
	private final ModelMapper mapper;

    public ProductService(ProductRepository repository, ProductRawMaterialRepository prmRepository, ProductionRepository productionRepository, ModelMapper mapper) {
        this.repository = repository;
        this.prmRepository = prmRepository;
        this.productionRepository = productionRepository;
        this.mapper = mapper;
    }
    
    public ProductResponseDto save(Product product) {
    	if (repository.existsByCode(product.getCode())) {
    		throw new RuntimeException("Código já está em uso");
    	}
    	
    	Product saved = repository.save(product);
    	return mapper.map(saved, ProductResponseDto.class);
    }
    
    public List<ProductResponseDto> findAll() {
    	return repository.findAll()
    			.stream()
    			.map(p -> mapper.map(p, ProductResponseDto.class))
    			.toList();
    }
    
    public Product update(Long id, Product updatedProduct) {
    	
    	Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    	
    	repository.findByCode(updatedProduct.getCode())
          .filter(p -> !p.getId().equals(id))
          .ifPresent(p -> {
             throw new RuntimeException("Código já está em uso");
          });

    	product.setCode(updatedProduct.getCode());
    	product.setName(updatedProduct.getName());
    	product.setPrice(updatedProduct.getPrice());
    	
    	return repository.save(product);
    }
    
    public void delete(Long id) {
    	if (prmRepository.existsByProductId(id)) {
    		throw new RuntimeException("Não é permitido realizar a exclusão");
    	}
    	if (productionRepository.existsByProductId(id)) {
    		throw new RuntimeException("Não é permitido realizar a exclusão");
    	}
    	repository.deleteById(id);
    }
    
    public Page<Product> searchByName(String name, Pageable pageable) {
    	return repository.findByNameContainingIgnoreCase(name, pageable);
    }
}
