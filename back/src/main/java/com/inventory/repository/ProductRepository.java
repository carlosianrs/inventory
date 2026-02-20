package com.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import org.springframework.data.domain.Page;

import com.inventory.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	boolean existsByCode(Long code);
	Optional<Product> findByCode(Long code);
	Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
