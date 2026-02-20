package com.inventory.dto;

public class ProductResponseDto {
	
	private Long id;
	private Long code;
	private String name;
	private Double price;
	
	public ProductResponseDto () {}
	
	public Long getId() {
		return id;
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
	
	public void setId(Long id) {
		this.id = id;
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
