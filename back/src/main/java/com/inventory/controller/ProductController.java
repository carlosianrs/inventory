package com.inventory.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.inventory.entity.Product;
import com.inventory.service.ProductService;
import com.inventory.dto.ProductDto;
import com.inventory.dto.ProductResponseDto;

@RestController
@RequestMapping("/products")
public class ProductController {
	
	private final ProductService service;
	
	public ProductController(ProductService service) {
		this.service = service;
	}
	
	@PostMapping
	public ResponseEntity<ProductResponseDto> create(@RequestBody @jakarta.validation.Valid ProductDto dto) {
		
		Product product = new Product(
			dto.getName(),
			dto.getCode(),
			dto.getPrice()
		);
		
		ProductResponseDto response = service.save(product);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping
	public ResponseEntity<List<ProductResponseDto>> list() {
		return ResponseEntity.ok(service.findAll());
	}
	
	@PutMapping("/{id}")
	public Product update(@PathVariable Long id,
							@RequestBody @jakarta.validation.Valid ProductDto dto) {
		
		Product product = new Product(
			dto.getName(),
			dto.getCode(),
			dto.getPrice()
		);
		
		return service.update(id, product);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	
	@GetMapping("search")
	public Page<Product> search(@RequestParam(required = false, defaultValue = "") String name, Pageable pageable) {
		return service.searchByName(name, pageable);
	}
}
