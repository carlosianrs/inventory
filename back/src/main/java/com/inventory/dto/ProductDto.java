package com.inventory.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProductDto {
	
	@NotBlank(message = "Name is required")
	private String name;
	
	@NotNull(message = "Code is required")
	@Positive(message = "Code must be greater than zero")
	private Long code;
	
	@NotNull(message = "Price is required")
	@Positive(message = "Price must be greater than zero")
	private Double price;
	
	public ProductDto() {
		
	}
	
	public String getName() {
		return name;
	}
	
	public Long getCode() {
		return code;
	}
	
	public Double getPrice() {
		return price;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setCode(Long code) {
		this.code = code;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}
}
