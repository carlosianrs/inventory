package com.inventory.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class RawMaterialDto {
	
	@NotBlank(message = "Name is required")
	private String name;
	
	@NotNull(message = "Code is required")
	@Positive(message = "Code must be greater than zero")
	private Long code;
	
	@NotNull(message = "Quantity is required")
	@Positive(message = "Quantity must be greater than zero")
	private Double quantity;
	
	public RawMaterialDto () {
		
	}
	
	public String getName() {
		return name;
	}
	
	public Long getCode() {
		return code;
	}
	
	public Double getQuantity() {
		return quantity;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setCode(Long code) {
		this.code = code;
	}
	
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
}
