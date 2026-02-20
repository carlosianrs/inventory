package com.inventory.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.inventory.dto.ProductRawMaterialDto;
import com.inventory.dto.ProductRawMaterialResponseDto;
import com.inventory.entity.ProductRawMaterial;
import com.inventory.service.ProductRawMaterialService;

@RestController
@RequestMapping("/product_raw_materials")
public class ProductRawMaterialController {
	
	private final ProductRawMaterialService service;
	
	public ProductRawMaterialController (ProductRawMaterialService service) {
		this.service = service;
	}
	
	@PostMapping("/{productId}")
	public ResponseEntity<List<ProductRawMaterialResponseDto>> create(@PathVariable Long productId, @RequestBody @jakarta.validation.Valid ProductRawMaterialDto[] dto) {
		
		List<ProductRawMaterialResponseDto> response = service.save(productId, dto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping
	public Page<ProductRawMaterial> findAll(Pageable pageable) {
		return service.findAll(pageable);
	}
	
	@GetMapping("/product/{productId}")
	public ResponseEntity<List<ProductRawMaterialResponseDto>> findByProductId(@PathVariable Long productId) {
		return ResponseEntity.ok(service.findByProductId(productId));
	}
	
	@GetMapping("/{rawMaterialId}")
	public ResponseEntity<List<ProductRawMaterialResponseDto>> findByRawMaterialId(@PathVariable Long rawMaterialId) {
		return ResponseEntity.ok(service.findByRawMaterialId(rawMaterialId));
	}
}
