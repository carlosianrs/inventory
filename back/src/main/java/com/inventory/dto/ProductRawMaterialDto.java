package com.inventory.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProductRawMaterialDto {

	private Long rawMaterialId;
	private Double quantity;
	
	@NotNull(message = "Raw Material Id is required")
	@Positive(message = "Raw Material Id must be greater than zero")
	public Long getRawMaterialId() {
		return rawMaterialId;
	}
	
	@NotNull(message = "Quantity is required")
	@Positive(message = "Quantity must be greater than zero")
	public Double getQuantity() {
		return quantity;
	}
	
	public void setRawMaterialCode(Long rawMaterialId) {
		this.rawMaterialId = rawMaterialId;
	}
	
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
}
