package com.inventory.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.modelmapper.ModelMapper;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.inventory.repository.ProductionRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.RawMaterialRepository;
import com.inventory.repository.ProductRawMaterialRepository;
import com.inventory.dto.ProductionResponseDto;
import com.inventory.dto.ProductionDto;
import com.inventory.entity.Product;
import com.inventory.entity.Production;
import com.inventory.entity.RawMaterial;
import com.inventory.entity.ProductRawMaterial;

@Service
public class ProductionService {
	
	private final ProductionRepository repository;
	private final ProductRepository productRepository;
	private final RawMaterialRepository rawMaterialRepository;
	private final ProductRawMaterialRepository prmRepository;
	private final ModelMapper mapper;
	
	public ProductionService(
			ProductionRepository repository,
			ProductRepository productRepository,
			RawMaterialRepository rawMaterialRepository,
			ProductRawMaterialRepository prmRepository,
			ModelMapper mapper
	) {
		this.repository = repository;
		this.productRepository = productRepository;
		this.rawMaterialRepository = rawMaterialRepository;
		this.prmRepository = prmRepository;
		this.mapper = mapper;
	}
	
	public Page<Production> searchByName(String name, Pageable pageable) {
		return repository.findByProduct_NameContainingIgnoreCase(name, pageable);
	}
	
	public List<Production> suggestion() {	
		Pageable pageable = PageRequest.of(0, 10, Sort.by("price").descending());
		List<Product> products = productRepository
		        .findAll(pageable)
		        .getContent();
		
		List<Production> suggestions = new ArrayList<>();
		Map<Long, RawMaterial> mapRawMaterials = new HashMap<>();
		
		for (Product product : products) {
			List<ProductRawMaterial> productRawMaterials = prmRepository.findByProductId(product.getId());

			double maxProduction = 0;
			
			for (ProductRawMaterial relation : productRawMaterials) {
				RawMaterial raw = mapRawMaterials.get(relation.getRawMaterial().getId());
				double stockTemp = raw != null ? raw.getQuantity() : 0;
				
				double quantityStock = relation.getRawMaterial().getQuantity() - stockTemp;
				double quantityRequired = relation.getQuantity();
				
				int possible = (int) Math.floor(quantityStock / quantityRequired);
				
				if (maxProduction == 0 || possible < maxProduction) {
					maxProduction = possible;
				}
			}
			
			if (maxProduction == 0) continue;
			
			double totalValue = maxProduction * product.getPrice();

			for (ProductRawMaterial relation : productRawMaterials) {
				RawMaterial updatedRawMaterial = relation.getRawMaterial();
				updatedRawMaterial.setQuantity(relation.getQuantity() * maxProduction);
				mapRawMaterials.put(relation.getRawMaterial().getId(), updatedRawMaterial);
			}
			
			suggestions.add(new Production(
				product,
				maxProduction,
				product.getPrice(),
				totalValue
			));
		}
		
		return suggestions;
	}
	
	@Transactional
	public List<ProductionResponseDto> save(ProductionDto[] dto) {

		List<Long> productsIds = Arrays.stream(dto)
				.map(ProductionDto::getProductId)
				.toList();
		
		List<Product> products = productRepository.findAllById(productsIds);
		
		if (products.size() != productsIds.size()) {
			throw new RuntimeException("Um ou mais produtos não encontradas");
		}

		Map<Long, RawMaterial> mapRawMaterials = new HashMap<>();
		List<Production> productions = new ArrayList<>();
		
		for (ProductionDto production : dto) {
			List<ProductRawMaterial> productRawMaterials = prmRepository.findByProductId(production.getProductId());

			if (productRawMaterials.isEmpty()) {
			    throw new RuntimeException("Produto não possui matérias-primas cadastradas. ID: " + production.getProductId());
			}
			
			Product product = productRawMaterials.get(0).getProduct();
			
			double maxProduction = Integer.MAX_VALUE;
			
			for (ProductRawMaterial relation : productRawMaterials) {
				RawMaterial raw = mapRawMaterials.get(relation.getRawMaterial().getId());
				double stockTemp = raw != null ? raw.getQuantity() : relation.getRawMaterial().getQuantity();
				System.out.println(stockTemp);
				double quantityRequired = relation.getQuantity();
				
				int possible = (int) Math.floor(stockTemp / quantityRequired);
				
				if (possible < maxProduction) {
					maxProduction = possible;
				}
			}
			
			if (maxProduction < production.getQuantity()) {
				throw new RuntimeException("Quantidade ultrapassada. Estoque disponível para o produto " + product.getName() + ": " + maxProduction);
			}
			
			double totalValue = production.getQuantity() * product.getPrice();

			for (ProductRawMaterial relation : productRawMaterials) {
				RawMaterial updatedRawMaterial = relation.getRawMaterial();
				RawMaterial raw = mapRawMaterials.get(relation.getRawMaterial().getId());
				double stockTemp = raw != null ? raw.getQuantity() : updatedRawMaterial.getQuantity();
				
				updatedRawMaterial.setQuantity(stockTemp - (relation.getQuantity() * production.getQuantity()));
				mapRawMaterials.put(relation.getRawMaterial().getId(), updatedRawMaterial);
			}
			
			productions.add(new Production(
				product,
				production.getQuantity(),
				product.getPrice(),
				totalValue
			));
		}
		
		System.out.println(mapRawMaterials.values());
		
		rawMaterialRepository.saveAll(mapRawMaterials.values());
		
		return repository.saveAll(productions)
				.stream()
				.map(p -> mapper.map(p, ProductionResponseDto.class))
				.toList();
	}
}
