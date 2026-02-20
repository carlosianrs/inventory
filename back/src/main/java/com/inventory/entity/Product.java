package com.inventory.entity;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "PRODUCTS")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "product_id", sequenceName = "PRODUCT_ID", allocationSize = 1)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private Long code;

	@Column(nullable = false)
	private String name;
	
	private Double price;
	
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductRawMaterial> rawMaterials;
	
	public Product () {
		
	}
	
	public Product (String name, Long code, Double price) {
		this.name = name;
		this.code = code;
		this.price = price;
	}
	
	public Long getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Long getCode() {
		return code;
	}
	
	public void setCode(Long code) {
		this.code = code;
	}
	
	public Double getPrice() {
		return price;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}
}
