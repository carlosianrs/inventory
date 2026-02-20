package com.inventory.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.inventory.service.ProductionService;
import com.inventory.dto.ProductionDto;
import com.inventory.dto.ProductionResponseDto;
import com.inventory.entity.Production;

@RestController
@RequestMapping("/productions")
public class ProductionController {
	
	private final ProductionService service;
	
	public ProductionController(ProductionService service) {
		this.service = service;
	}
	
	@GetMapping("/search")
	public Page<Production> searchByName(@RequestParam(required = false, defaultValue = "") String name, Pageable pageable) {
		return service.searchByName(name, pageable);
	}
	
	@GetMapping("/suggestions")
	public List<Production> suggestion() {
		return service.suggestion();
	}
	
	@PostMapping
	public List<ProductionResponseDto> save(@RequestBody @jakarta.validation.Valid ProductionDto[] dto) {
		return service.save(dto);
	}
}
