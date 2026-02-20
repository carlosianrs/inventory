package com.inventory.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.modelmapper.ModelMapper;

import com.inventory.entity.RawMaterial;
import com.inventory.repository.RawMaterialRepository;
import com.inventory.dto.RawMaterialResponseDto;

@Service
public class RawMaterialService {
	
	private final RawMaterialRepository repository;
	private final ModelMapper mapper;
	
	public RawMaterialService(RawMaterialRepository repository, ModelMapper mapper) {
		this.repository = repository;
		this.mapper = mapper;
	}
	
	public RawMaterialResponseDto save(RawMaterial rawMaterial) {
		if (repository.existsByCode(rawMaterial.getCode())) {
			throw new RuntimeException("Raw Material already exists");
		}
		
		RawMaterial saved = repository.save(rawMaterial);
		return mapper.map(saved, RawMaterialResponseDto.class);
	}
	
	public List<RawMaterialResponseDto> findAll() {
		return repository.findAll()
				.stream()
				.map(r -> mapper.map(r, RawMaterialResponseDto.class))
				.toList();
	}
	
	public RawMaterial update(Long id, RawMaterial updatedRawMaterial) {
		
		RawMaterial rawMaterial = repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Raw Material not found"));
		
		repository.findByCode(updatedRawMaterial.getCode())
        	.filter(p -> !p.getId().equals(id))
            .ifPresent(p -> {
                throw new RuntimeException("Código já está em uso");
            });
		
		rawMaterial.setName(updatedRawMaterial.getName());
		rawMaterial.setCode(updatedRawMaterial.getCode());
		rawMaterial.setQuantity(updatedRawMaterial.getQuantity());
		
		return repository.save(rawMaterial);
	}
	
	public void delete(Long id) {
		repository.deleteById(id);
	}
	
	public Page<RawMaterial> searchByName(String name, Pageable pageable) {
		return repository.findByNameContainingIgnoreCase(name, pageable);
	}
}
