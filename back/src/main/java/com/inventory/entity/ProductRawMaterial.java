package com.inventory.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "PRODUCT_RAW_MATERIAL")
public class ProductRawMaterial {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "product_raw_material_seq", sequenceName = "PRODUCT_RAW_MATERIAL_SEQ", allocationSize = 1)
	private Long id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "PRODUCT_ID", nullable = false)
	private Product product;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "RAW_MATERIAL_ID", nullable = false)
	private RawMaterial rawMaterial;
	
	@Column(nullable = false)
	private Double quantity;
	
	public ProductRawMaterial () {
		
	}
	
	public ProductRawMaterial (Product product, RawMaterial rawMaterial, Double quantity) {
		this.product = product;
		this.rawMaterial = rawMaterial;
		this.quantity = quantity;
	}
	
	public Long getId() {
		return id;
	}
	
	public Product getProduct() {
		return product;
	}
	
	public RawMaterial getRawMaterial() {
		return rawMaterial;
	}
	
	public Double getQuantity() {
		return quantity;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}
	
	public void setRawMaterial(RawMaterial rawMaterial) {
		this.rawMaterial = rawMaterial;
	}
	
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
}
