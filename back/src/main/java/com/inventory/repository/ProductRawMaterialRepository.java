package com.inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.entity.ProductRawMaterial;

public interface ProductRawMaterialRepository extends JpaRepository<ProductRawMaterial, Long> {
	List<ProductRawMaterial> findByRawMaterialId(Long rawMaterialId);
	List<ProductRawMaterial> findByProductId(Long productId);
	void deleteAllByProductId(Long productId);
	boolean existsByProductId(Long productId);
}
