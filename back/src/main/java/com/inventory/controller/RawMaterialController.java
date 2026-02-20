package com.inventory.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.inventory.entity.RawMaterial;
import com.inventory.service.RawMaterialService;
import com.inventory.dto.RawMaterialResponseDto;
import com.inventory.dto.RawMaterialDto;

@RestController
@RequestMapping("/raw_materials")
public class RawMaterialController {
	
	private final RawMaterialService service;

	public RawMaterialController(RawMaterialService service) {
		this.service = service;
	}
	
	@PostMapping
	public ResponseEntity<RawMaterialResponseDto> create(@RequestBody @jakarta.validation.Valid RawMaterialDto dto) {
		
		RawMaterial rawMaterial = new RawMaterial (
			dto.getName(),
			dto.getCode(),
			dto.getQuantity()
		);
		
		RawMaterialResponseDto response = service.save(rawMaterial);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping
	public ResponseEntity<List<RawMaterialResponseDto>> list() {
		return ResponseEntity.ok(service.findAll());
	}
	
	@PutMapping("/{id}")
	public RawMaterial update(@PathVariable Long id, @RequestBody @jakarta.validation.Valid RawMaterialDto dto) {
		
		RawMaterial rawMaterial = new RawMaterial (
			dto.getName(),
			dto.getCode(),
			dto.getQuantity()
		);
		
		return service.update(id, rawMaterial);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	
	@GetMapping("/search")
	public Page<RawMaterial> search(@RequestParam(required = false, defaultValue = "") String name, Pageable pageable) {
		return service.searchByName(name, pageable);
	}
}
