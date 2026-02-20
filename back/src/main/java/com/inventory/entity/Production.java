package com.inventory.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "PRODUCTIONS")
public class Production {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "production_id", sequenceName = "PRODUCTION_ID", allocationSize = 1)
	private Long id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "PRODUCT_ID", nullable = false)
	private Product product;

	private Double quantity;
	
	private Double price_unit;
	
	private Double total_value;
	
	public Production () {
			
	}
	
	public Production (Product product, Double quantity, Double price_unit , Double total_value) {
		this.product = product;
		this.quantity = quantity;
		this.price_unit = price_unit ;
		this.total_value = total_value;
	}
		
	public Long getId() {
		return id;
	}
		
	public Product getProduct() {
		return product;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}
	
	public Double getQuantity() {
		return quantity;
	}
		
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
		
	public Double getPriceUnit() {
		return price_unit ;
	}
		
	public void setPriceUnit(Double price_unit) {
		this.price_unit  = price_unit;
	}
	
	public Double getTotalValue() {
		return total_value;
	}
	
	public void setTotalValue(Double total_value) {
		this.total_value = total_value;
	}
}
