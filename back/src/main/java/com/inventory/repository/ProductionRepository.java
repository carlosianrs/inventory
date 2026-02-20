package com.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import com.inventory.entity.Production;

public interface ProductionRepository extends JpaRepository<Production, Long> {
	boolean existsByProductId(Long productId);
	Page<Production> findByProduct_NameContainingIgnoreCase(String productName, Pageable pageable);
}
