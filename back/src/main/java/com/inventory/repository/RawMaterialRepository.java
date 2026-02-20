package com.inventory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.inventory.entity.RawMaterial;

public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
	boolean existsByCode(Long code);
	Optional<RawMaterial> findByCode(Long code);
	Page<RawMaterial> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
