package com.inventory.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProductionDto {
	
	@NotNull(message = "Product Id is required")
	@Positive(message = "Product Id must be greater than zero")
	private Long productId;
	
	@NotNull(message = "Quantity is required")
	@Positive(message = "Quantity must be greater than zero")
	private Double quantity;
	
	public ProductionDto() {
		
	}
	
	public Long getProductId() {
		return productId;
	}
	
	public void setProductId(Long productId) {
		this.productId = productId;
	}
		
	public Double getQuantity() {
		return quantity;
	}
	
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
}
