package com.inventory.service;

import java.util.List;
import java.util.Arrays;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.modelmapper.ModelMapper;

import com.inventory.repository.ProductRawMaterialRepository;
import com.inventory.repository.RawMaterialRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.dto.ProductRawMaterialResponseDto;
import com.inventory.dto.ProductRawMaterialDto;
import com.inventory.entity.ProductRawMaterial;
import com.inventory.entity.Product;
import com.inventory.entity.RawMaterial;

@Service
public class ProductRawMaterialService {
	
	private final ProductRawMaterialRepository repository;
	private final ProductRepository productRepository;
	private final RawMaterialRepository rawMaterialRepository;
	private final ModelMapper mapper;
	
	public ProductRawMaterialService (
		ProductRawMaterialRepository repository,
		ProductRepository productRepository,
		RawMaterialRepository rawMaterialRepository,
		ModelMapper mapper
	) {
		this.repository = repository;
		this.productRepository = productRepository;
		this.rawMaterialRepository = rawMaterialRepository;
		this.mapper = mapper;
	}
	
	@Transactional
	public List<ProductRawMaterialResponseDto> save(Long productId, ProductRawMaterialDto[] dto) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new RuntimeException("Product not found"));
		
		List<Long> rawMaterialsIds = Arrays.stream(dto)
				.map(ProductRawMaterialDto::getRawMaterialId)
				.toList();
		
		List<RawMaterial> rawMaterials = rawMaterialRepository.findAllById(rawMaterialsIds);
		
		if (rawMaterials.size() != rawMaterialsIds.size()) {
			throw new RuntimeException("Um ou mais matérias-primas não encontradas");
		}
		
		repository.deleteAllByProductId(productId);
		
		List<ProductRawMaterial> entities = Arrays.stream(dto)
				.map(prm -> {
					RawMaterial rawMaterial = rawMaterials.stream()
	                    .filter(rm -> rm.getId().equals(prm.getRawMaterialId()))
	                    .findFirst()
	                    .orElseThrow();
					
					return new ProductRawMaterial(
						product,
						rawMaterial,
						prm.getQuantity()
					);
				})
				.toList();
		
		return repository.saveAll(entities)
				.stream()
				.map(p -> mapper.map(p, ProductRawMaterialResponseDto.class))
				.toList();
	}
	
	public List<ProductRawMaterialResponseDto> findByProductId(Long productId) {
		return repository.findByProductId(productId)
				.stream()
				.map(prm -> mapper.map(prm, ProductRawMaterialResponseDto.class))
				.toList();
	}
	
	public List<ProductRawMaterialResponseDto> findByRawMaterialId(Long rawMaterialId) {
		return repository.findByRawMaterialId(rawMaterialId)
				.stream()
				.map(prm -> mapper.map(prm, ProductRawMaterialResponseDto.class))
				.toList();
	}
	
	public Page<ProductRawMaterial> findAll(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
